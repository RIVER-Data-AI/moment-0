import React, { useEffect, useCallback, useState, useRef } from "react";
import TildeHeader from "@/components/TildeHeader";
import ChatBubble from "@/components/ChatBubble";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomAction } from "@/libs/types";

// import DatePicker from "@/components/DatePicker";
import useChatStore from "@/stores/useChatStore";
import CustomActionButtons from "@/components/CustomActionButtons";

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
  const [customAction, setCustomAction] = useState<CustomAction | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (messages.length > 0 && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = useCallback(
    async (message: string = inputValue) => {
      if (message.trim() === "") return;

      addMessage(message, "user");
      setInputValue("");
      const messageIndex = addMessage("", "river");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_history: messages,
            new_message: message,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let aiResponse = "";
        let postStreamData = "";
        while (true) {
          const { done, value } = await reader!.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          const endStreamIndex = chunk.indexOf("END STREAM");
          if (endStreamIndex !== -1) {
            aiResponse += chunk.slice(0, endStreamIndex);
            postStreamData = chunk.slice(endStreamIndex + 10); // +10 to skip "END STREAM"
            break;
          } else {
            aiResponse += chunk;
          }

          updateLatestMessage(aiResponse, messageIndex);
          scrollToBottom();
        }

        updateLatestMessage(aiResponse, messageIndex);
        scrollToBottom();

        // Parse the JSON response
        if (postStreamData) {
          try {
            const jsonResponse = JSON.parse(postStreamData);
            if (jsonResponse && jsonResponse?.customAction) {
              setCustomAction(jsonResponse.customAction);
            }
          } catch (error) {
            console.error("Error parsing post-stream data:", error);
          }
        }
      } catch (error) {
        console.error("Error in chat stream:", error);
        updateLatestMessage(
          "Sorry, an error occurred while processing your request.",
          messageIndex
        );
      }
    },
    [inputValue, messages, addMessage, updateLatestMessage, scrollToBottom]
  );

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
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1, height: "auto" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center p-3">
              <div className="text-3xl text-black">
                Try it. Wave to someone.
              </div>
              <div className="text-black">
                And remember, on RIVER, your data is always 100% in your
                control. None of your data gets seen, shared, or sold without
                your express permission. It&apos;s your data!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      {customAction && (
        <CustomActionButtons
          action={customAction}
          onSelect={(option) => {
            handleSendMessage(option);
            setCustomAction(null);
          }}
        />
      )}
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
