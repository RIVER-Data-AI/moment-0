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
  conversation_history.forEach((conversation_item) => {
    conversationHistoryMessages.push(
      {
        role: "user",
        content:
          conversation_item.sender === "user" ? conversation_item.message : "",
      },
      {
        role: "assistant",
        content:
          conversation_item.sender === "river" ? conversation_item.message : "",
      }
    );
  });

  return conversationHistoryMessages;
};

const SYSTEM_PROMPT = `
The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant is helping onboard a new user to River, every conversation is called a ~wave. So that's the theme of the convo. It follows the order of the interview:
- Asks for the user's name
- Asks for the user location politetly (Where are you ~waving from?)
- Asks "What do you want to ~wave about today?"
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { conversation } = req.body as { conversation: ConversationItem[] };
    console.log("conversation in", conversation);
    const conversation_history = prepareConversationHistory(conversation);
    console.log("conversation_history", conversation_history);
    try {
      const stream = openai.beta.chat.completions.stream({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...conversation_history,
        ],
        stream: true,
        max_tokens: 100,
      });

      stream.on("content", (delta) => {
        res.write(delta);
      });

      const chatCompletion = await stream.finalChatCompletion();
      res.write("END STREAM");
      res.status(200).json({ data: chatCompletion });

      res.end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
