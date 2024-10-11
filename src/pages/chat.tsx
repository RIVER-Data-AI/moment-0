import React, { useState } from "react";
import TildeHeader from "@/components/TildeHeader";
import ChatBubble from "@/components/ChatBubble";
import useChatStore from "@/stores/useChatStore";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const { messages, addMessage } = useChatStore();
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add message to Zustand store
    addMessage(inputValue, "user");

    // Send message to the API
    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputValue, sender: "user" }),
    });

    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-around pt-4 px-2 gap-2 items-center border-b-2 pb-4 border-primary-border">
        <img src="/logo.png" alt="Logo" className="w-5 h-5 mr-2" />
        <TildeHeader />
        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="/usa_flag.png"
            alt="USA Flag"
            className="w-12 h-12 object-cover"
          />
        </div>
      </div>
      <div className="text-center p-3">
        <div className="text-3xl text-black">Try it. Wave to someone.</div>
        <div className="text-black">
          And remember, on RIVER, your data is always 100% in your control. None
          of your data gets seen, shared, or sold without your express
          permission. It&apos;s your data!
        </div>
      </div>
      <div className="p-3 pb-16 flex flex-col">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} sender={msg.sender} />
        ))}
      </div>
      <div className="w-full bg-white fixed bottom-0 left-0 p-3 flex items-center gap-2">
        <span className="text-3xl text-primary-border font-bold">~</span>
        <input
          type="text"
          placeholder="Reply..."
          className="w-full p-2 border-2 border-primary-border rounded-full text-black placeholder:italic placeholder:text-opacity-70 placeholder:text-[#2D3648] placeholder:text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
      </div>
    </div>
  );
};

export default Chat;
