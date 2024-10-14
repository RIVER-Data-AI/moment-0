import React, { useEffect, useState, useRef } from "react";
import TildeHeader from "@/components/TildeHeader";
import ChatBubble from "@/components/ChatBubble";
// import DatePicker from "@/components/DatePicker";
import useChatStore from "@/stores/useChatStore";

function useBottomRef() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    bottomRef,
    scrollToBottom,
  };
}

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const { messages, addMessage, updateLatestMessage } = useChatStore();
  const { bottomRef, scrollToBottom } = useBottomRef();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // load first system message
    addMessage("Welcome to RIVER. Wave to someone.", "river");
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    addMessage(inputValue, "user");
    setInputValue("");
    const messageIndex = addMessage("", "river");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_history: messages,
          new_message: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader!.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Check if the chunk contains the END STREAM marker
        const endStreamIndex = chunk.indexOf("END STREAM");
        if (endStreamIndex !== -1) {
          // If found, only add the content before END STREAM
          aiResponse += chunk.slice(0, endStreamIndex);
          break; // Exit the loop as we've reached the end of the desired content
        } else {
          aiResponse += chunk;
        }

        updateLatestMessage(aiResponse, messageIndex);
        scrollToBottom();
      }
      // Final update to ensure all content is displayed
      updateLatestMessage(aiResponse, messageIndex);
      scrollToBottom();
    } catch (error) {
      console.error("Error in chat stream:", error);
      updateLatestMessage(
        "Sorry, an error occurred while processing your request.",
        messageIndex
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
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
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-3 pb-16"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <ChatBubble message={msg.message} sender={msg.sender} />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {/* <DatePicker onSelectDate={(date) => console.log(date)} /> */}
      <div className="w-full bg-white p-3 flex items-center gap-2">
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
