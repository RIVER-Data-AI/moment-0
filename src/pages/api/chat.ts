import type { NextApiRequest, NextApiResponse } from "next";
import type { CustomAction } from "@/libs/types";

import OpenAI from "openai";

interface ConversationItem {
  sender: "user" | "river";
  message: string;
}

const WAVE_TOPICS = [
  "food",
  "fashion",
  "news",
  "sports",
  "weather",
  "shopping",
  "tech",
  "money",
  "travel",
  "music",
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prepareConversationHistory = (
  conversation_history: ConversationItem[]
) => {
  const conversationHistoryMessages: {
    role: "user" | "system" | "assistant";
    content: string;
  }[] = [];

  for (let i = 0; i < conversation_history.length; i += 2) {
    const userMessage = conversation_history[i];
    const assistantMessage = conversation_history[i + 1];

    conversationHistoryMessages.push(
      {
        role: "user",
        content: userMessage.message,
      },
      {
        role: "assistant",
        content: assistantMessage.message,
      }
    );
  }

  return conversationHistoryMessages;
};

const PROMPT_PREAMBLE =
  "Now, without using any words like 'certainly', 'of course', etc.,";

const SYSTEM_PROMPT = `
The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant is helping onboard a new user to River`;

const WAVE_TOPICS_PROMPT = `ask me what do I want to ~wave about today. Give possible responses of: food, fashion, news, sports, weather, shopping, tech, news, money, travel`;

const make_prompt = (input: string, len_history: number) => {
  const RIVER_CONVERSATION_PROMPT = [
    `${input}. ${PROMPT_PREAMBLE} Tell me "I’ll help you to invite your friends later, but first, what’s your name?"`,
    `${input}. ${PROMPT_PREAMBLE} ${WAVE_TOPICS_PROMPT}`,
  ];

  const index = Math.floor(len_history / 2);
  const promptTemplate = RIVER_CONVERSATION_PROMPT[index];
  if (promptTemplate) return promptTemplate;
  return input;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { conversation_history: conversation, new_message } = req.body as {
      conversation_history: ConversationItem[];
      new_message: string;
    };
    console.log("conversation in", conversation);
    const conversation_history = prepareConversationHistory(conversation);
    const prompt = make_prompt(new_message, conversation_history.length);
    console.log("conversation_history", conversation_history);
    console.log("prompt", prompt);
    try {
      const stream = openai.beta.chat.completions.stream({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...conversation_history,
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: true,
        max_tokens: 1000,
      });

      let fullResponse = "";
      stream.on("content", (delta) => {
        fullResponse += delta;
        res.write(delta);
      });

      const chatCompletion = await stream.finalChatCompletion();

      // Determine the custom action based on the response
      let customAction: CustomAction | null = null;

      if (fullResponse.toLowerCase().includes("wave about today")) {
        customAction = {
          type: "wave",
          options: WAVE_TOPICS,
        };
      } else if (fullResponse.toLowerCase().includes("provide your location")) {
        customAction = {
          type: "location",
          prompt: "Share your location",
        };
      } else if (
        fullResponse.toLowerCase().includes("share this with people")
      ) {
        customAction = {
          type: "share",
          prompt: "Share with friends",
        };
      }

      res.write("END STREAM");
      res.status(200).json({ data: chatCompletion, customAction });

      res.end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
