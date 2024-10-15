import React, { useEffect, useCallback, useState, useRef } from "react";
import TildeHeader from "@/components/TildeHeader";
import ChatBubble from "@/components/ChatBubble";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomAction } from "@/libs/types";

// import DatePicker from "@/components/DatePicker";
import useChatStore from "@/stores/useChatStore";
import CustomActionButtons from "@/components/CustomActionButtons";
import SignUpForm from "@/components/SignUpForm";
import EndScreen from "@/components/EndScreen";

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
  const {
    messages,
    addMessage,
    updateLatestMessage,
    removeMessage,
    showShareOverlay,
    setShowShareOverlay,
    showSignUpForm,
    showEndScreen,
  } = useChatStore();
  const { bottomRef, scrollToBottom } = useBottomRef();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [customAction, setCustomAction] = useState<CustomAction | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 || customAction) {
      scrollToBottom();
    }
  }, [messages, customAction]);

  const handleShare = () => {
    setShowShareOverlay(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      addMessage("Join RIVER to make your data work for you", "river");
      setCustomAction({
        type: "join",
      });
    }, 3000); // Hide the success message after 3 seconds
  };

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
        let isJsonResponse = false;
        let jsonResponse = "";

        while (true) {
          const { done, value } = await reader!.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          if (
            !isJsonResponse &&
            chunk.trim().toLowerCase().startsWith("json")
          ) {
            isJsonResponse = true;
            jsonResponse = chunk.trim().slice(4).trim(); // Remove "json" and any leading whitespace
            removeMessage(messageIndex);
            continue;
          }

          if (isJsonResponse) {
            jsonResponse += chunk;
            const endStreamIndex = jsonResponse.indexOf("END STREAM");
            if (endStreamIndex !== -1) {
              jsonResponse = jsonResponse.slice(0, endStreamIndex).trim();
              postStreamData = chunk.slice(chunk.indexOf("END STREAM") + 10); // +10 to skip "END STREAM"
              break;
            }
          } else {
            const endStreamIndex = chunk.indexOf("END STREAM");
            if (endStreamIndex !== -1) {
              aiResponse += chunk.slice(0, endStreamIndex);
              postStreamData = chunk.slice(endStreamIndex + 10); // +10 to skip "END STREAM"
              break;
            } else {
              aiResponse += chunk;
            }
          }

          if (isJsonResponse) {
            try {
              const parsedJsonResponse = JSON.parse(jsonResponse);
              const formattedResponse = {
                company: parsedJsonResponse.company || "",
                offer_text: parsedJsonResponse.offer_text || "",
              };

              // Generate messages for different types
              const eventMessage = `${formattedResponse.company} has paid to jump on your ~wave.`;
              const companyMessage = formattedResponse.offer_text;
              const riverMessage = `Invite someone to join your ~wave:`;

              // console.log(eventMessage, companyMessage, riverMessage);
              // Add messages to the chat
              addMessage(eventMessage, "event", formattedResponse.company);
              addMessage(companyMessage, "company", formattedResponse.company);
              addMessage(riverMessage, "river");

              scrollToBottom();
            } catch (error) {
              console.error("Error parsing JSON response:", error);
              console.log("Received JSON string:", jsonResponse);
            }
          }

          if (aiResponse) updateLatestMessage(aiResponse, messageIndex);
          scrollToBottom();
        }

        // Parse the JSON response
        if (postStreamData) {
          try {
            const parsedResponse = JSON.parse(postStreamData);
            if (parsedResponse && parsedResponse?.customAction) {
              setCustomAction(parsedResponse.customAction);
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
    <div className="flex flex-col">
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-green-500 text-white p-2 text-center z-50"
          >
            Shared successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEndScreen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 text-white mt-16 border-t-2 border-primary-border text-center z-50"
          >
            <EndScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white text-river-black z-40 flex items-center justify-center p-5 flex-col"
          >
            <div className="p-6 w-full h-full flex flex-col justify-between bg-[#EDF0F7] rounded-lg">
              <div className="text-start flex-grow flex flex-col justify-center p-2">
                <div className="flex text-2xl mb-4 justify-center">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                </div>
                <p className="text-2xl mb-2">
                  I&apos;ve just created a ~wave on the new RIVER app
                </p>
                <p className="text-2xl font-semibold mb-4">
                  and earned $2 from a tiny amount of my data.
                </p>
                <p className="text-2xl mb-2">
                  Imagine how much we can{" "}
                  <span className="font-semibold">earn together</span> by just
                  chatting like we normally do.
                </p>
                <p className="text-2xl">
                  On RIVER our data is{" "}
                  <span className="font-semibold">100% in our control.</span>
                </p>
              </div>
            </div>
            <button
              className="w-full bg-gray-800 text-white py-3 rounded-lg mt-4 font-semibold"
              onClick={handleShare}
            >
              Share
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{showSignUpForm && <SignUpForm />}</AnimatePresence>
      <div className="sticky top-0 left-0 right-0 bg-white z-10 flex justify-around pt-4 px-2 gap-2 items-center border-b-2 pb-4 border-primary-border">
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
        className={`flex-grow overflow-y-auto p-3 ${
          customAction?.type === "wave" ||
          customAction?.type === "share" ||
          customAction?.type === "join"
            ? "pb-96"
            : "pb-16"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <ChatBubble
              message={msg.message}
              sender={msg.sender}
              companyName={msg?.companyName}
            />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <AnimatePresence>
        {customAction && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed z-10 bottom-0 left-0 right-0 bg-white p-2 shadow-lg border-t-2 border-primary-border"
          >
            <CustomActionButtons
              action={customAction}
              onSelect={(option) => {
                handleSendMessage(option);
                setCustomAction(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex items-center gap-2">
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
