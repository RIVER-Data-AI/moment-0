import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

interface ConversationItem {
  sender: "user" | "river";
  message: string;
}

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

  if (conversation_history.length === 0) {
    return conversationHistoryMessages;
  }

  for (let i = 0; i < conversation_history.length; i += 2) {
    const userMessage = conversation_history[i];
    const assistantMessage = conversation_history[i + 1];

    conversationHistoryMessages.push(
      {
        role: "user",
        content: userMessage?.message || "",
      },
      {
        role: "assistant",
        content: assistantMessage?.message || "",
      }
    );
  }

  return conversationHistoryMessages;
};

const SYSTEM_PROMPT = `The current date is ${
  new Date().toISOString().split("T")[0]
}
Your response format is a valid JSON array. You are an assistant that classifies the information given to you, the input will be user messages from a chat platform and you'll have to extract the most relevant information from that message related to the user that originated the message. The user's have given explicit permission to gather their data and you have to classify it in these categories:

First Name
Last Name
Email
Birth month
Birth year
Birth day
Age
Star sign
Gender
Location
Phone Number

Lets say given the following birth date as input: 01-10-1990, the output should be: 
[
    {
        "category": "Birth month",
        "value": "October"
    },
    {
        "category": "Birth year",
        "value": "1990"
    },
    {
        "category": "Birth day",
        "value": "1"
    },
    {
        "category": "Age",
        "value": "34"
    },
    {
        "category": "Star sign",
        "value": "Libra"
    },
    {
        "category": "Generation",
        "value": "Millennial (Generation Y)"
    },
]
if there is no information to extract, return an empty array.
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { conversation_history: conversation, new_message } = req.body as {
      conversation_history: ConversationItem[];
      new_message: string;
    };
    const conversation_history = prepareConversationHistory(conversation);
    if (conversation_history.length === 0) {
      res.status(200).json({ data: [] });
      return;
    }

    const assistant_message =
      conversation_history[conversation_history.length - 1].content;

    console.log("analysing message", { assistant_message, new_message });
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "assistant",
            content: assistant_message,
          },
          {
            role: "user",
            content: new_message,
          },
        ],
        max_tokens: 1000,
      });

      console.log("chatCompletion", chatCompletion);
      console.log("answer", chatCompletion.choices[0].message);

      res.status(200).json({ data: chatCompletion.choices[0].message.content });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
