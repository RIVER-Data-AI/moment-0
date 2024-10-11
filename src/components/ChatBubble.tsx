import React from "react";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "river";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`flex w-fit mt-2 px-4 py-2 rounded-lg ${
        isUser ? "bg-chat-primary-bg self-end" : "bg-chat-secondary-bg"
      }`}
    >
      <div className="flex items-center">
        {!isUser && (
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center mr-2">
            <img src="/logo.png" alt="Logo" className="w-5 h-5" />
          </div>
        )}
        <h2
          className={`text-lg font-semibold ${
            isUser ? "text-right text-white" : "text-black"
          }`}
        >
          {!isUser && "River Intelligence"}
        </h2>
      </div>
      <div>
        <p className={`${isUser ? "text-white" : "text-river-black"}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
