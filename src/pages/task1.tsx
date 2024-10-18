import React, { useEffect, useCallback, useState, useRef } from "react";
import TildeHeader from "@/components/TildeHeader";
import ChatBubble from "@/components/ChatBubble";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomAction } from "@/libs/types";

import useChatStore from "@/stores/useChatStore";
import CustomActionButtons from "@/components/CustomActionButtons";
import SignUpForm from "@/components/SignUpForm";
import TildeInfo from "@/components/TildeInfo";

function extractOfferDetails(
  jsonString: string,
): { company: string; offer_text: string } | null {
  try {
    // Parse the entire JSON string
    const parsedData = JSON.parse(jsonString);

    // Extract the content from the nested structure
    const content = parsedData.data.choices[0].message.content;

    // Check if the content starts with "json"
    if (content.startsWith("json")) {
      // Remove the "json" prefix and parse the remaining JSON
      const offerJson = JSON.parse(content.slice(4));

      // Extract and return the company and offer_text
      return {
        company: offerJson.company,
        offer_text: offerJson.offer_text,
      };
    }

    return null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

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
    setRandomNumber,
    randomNumber,
  } = useChatStore();
  const { bottomRef, scrollToBottom } = useBottomRef();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [customAction, setCustomAction] = useState<CustomAction | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [datapoints, setDatapoints] = useState(0);
  const [potentialValue, setPotentialValue] = useState(0);
  const [enterprises, setEnterprises] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (messages.length > 1 && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  // call the chat api on component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_history: messages,
            new_message: "",
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
          aiResponse += chunk;

          const endStreamIndex = chunk.indexOf("END STREAM");
          if (endStreamIndex !== -1) {
            aiResponse = aiResponse.slice(
              0,
              aiResponse.length - (chunk.length - endStreamIndex),
            );
            break;
          }
        }

        if (aiResponse) {
          addMessage(aiResponse, "river");
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        addMessage("Sorry, there was an error initializing the chat.", "river");
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    if (messages.length > 0 || customAction) {
      scrollToBottom();
    }
  }, [messages, customAction]);

  useEffect(() => {
    const num = Math.floor(Math.random() * 5) + 1;
    setRandomNumber(num);
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

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

        // everytime a call is made update the datapoints, potential value but potential value should only increase in values between 0.01 and 0.1
        setDatapoints(datapoints + 1);
        setPotentialValue(potentialValue + Math.random() * 0.1);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let aiResponse = "";
        let postStreamData = "";
        let isJsonResponse = false;
        // let jsonResponse = "";

        while (true) {
          const { done, value } = await reader!.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          console.log("chunk", chunk);

          if (
            !isJsonResponse &&
            chunk.trim().toLowerCase().startsWith("json")
          ) {
            isJsonResponse = true;
            // jsonResponse = chunk.trim().slice(4);
            removeMessage(messageIndex);
            continue;
          }
          if (isJsonResponse) {
            // jsonResponse += chunk;
            const endStreamIndex = chunk.indexOf("END STREAM");
            if (endStreamIndex !== -1) {
              // jsonResponse += chunk.slice(0, endStreamIndex);
              postStreamData = chunk.slice(endStreamIndex + 10); // +10 to skip "END STREAM"
              console.log("found end stream for json: break");
              break;
            }
          } else {
            const endStreamIndex = chunk.indexOf("END STREAM");
            if (endStreamIndex !== -1) {
              aiResponse += chunk.slice(0, endStreamIndex);
              postStreamData = chunk.slice(endStreamIndex + 10); // +10 to skip "END STREAM"
              console.log("found end stream for normal response: break");
              break;
            } else {
              aiResponse += chunk;
            }
          }

          if (aiResponse) updateLatestMessage(aiResponse, messageIndex);
          scrollToBottom();
        }

        if (aiResponse) updateLatestMessage(aiResponse, messageIndex);
        scrollToBottom();

        // Parse the JSON response
        if (postStreamData) {
          try {
            const parsedResponse = JSON.parse(postStreamData);
            if (parsedResponse && parsedResponse?.customAction) {
              setCustomAction(parsedResponse.customAction);
            }
            const offerDetails = extractOfferDetails(postStreamData);
            if (offerDetails) {
              const { company, offer_text } = offerDetails;
              addMessage(
                `${company} has paid to jump on your ~wave.`,
                "event",
                company,
              );
              addMessage(offer_text, "company", company);
              addMessage("Invite someone to join your ~wave:", "river");
              // update the enterprises
              setEnterprises(enterprises + 1);
              setPotentialValue(potentialValue + randomNumber);
            }
          } catch (error) {
            console.error("Error parsing post-stream data:", error);
          }
        }
      } catch (error) {
        console.error("Error in chat stream:", error);
        updateLatestMessage(
          "Sorry, an error occurred while processing your request.",
          messageIndex,
        );
      }
    },
    [inputValue, messages, addMessage, updateLatestMessage, scrollToBottom],
  );

  return (
    <>
      {currentPage === 0 && (
        <div className="flex min-h-screen flex-col items-center justify-between p-6 text-center">
          <button
            className={`left-6 top-6 self-start rounded-md py-2 font-semibold text-black ${
              currentPage === 0 ? "invisible" : ""
            }`}
            onClick={() => {}}
          >
            Back
          </button>
          <main className="relative w-full flex-1 overflow-hidden">
            <div className="absolute left-0 top-0 mt-10 flex h-full w-full flex-col justify-start">
              <h1 className="mb-12 text-3xl font-bold text-black">
                When you wave, you will always see this
              </h1>
              <div className="mb-12 whitespace-pre-line text-lg text-black text-opacity-60">
                <TildeInfo highlightAll />
              </div>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 w-full p-6">
            <button
              className="flex w-full items-center justify-center rounded-md bg-main-action px-6 py-3 font-semibold text-white"
              onClick={handleNextPage}
            >
              <span>Next</span>
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {currentPage === 1 && (
        <div className="relative flex h-screen flex-col justify-end">
          <AnimatePresence>
            {showEndScreen && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white"
              >
                <div className="flex flex-col items-center justify-center text-river-black text-opacity-70">
                  <div className="text-4xl font-semibold">Account created.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed left-0 right-0 top-0 z-50 bg-green-500 p-2 text-center text-white"
              >
                Shared successfully.
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showShareOverlay && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white p-5 text-river-black"
              >
                <div className="flex h-full w-full flex-col justify-between rounded-lg bg-[#EDF0F7] p-6">
                  <div className="flex flex-grow flex-col justify-center p-2 text-start">
                    <div className="mb-4 flex justify-center text-2xl">
                      <img src="/logo.png" alt="Logo" className="h-10 w-10" />
                    </div>
                    <p className="mb-2 text-2xl">
                      I&apos;ve just created a ~wave on the new RIVER app
                    </p>
                    <p className="mb-4 text-2xl font-semibold">
                      and earned ${randomNumber} from a tiny amount of my data.
                    </p>
                    <p className="mb-2 text-2xl">
                      Imagine how much we can{" "}
                      <span className="font-semibold">earn together</span> by
                      just chatting like we normally do.
                    </p>
                    <p className="text-2xl">
                      On RIVER our data is{" "}
                      <span className="font-semibold">
                        100% in our control.
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 w-full rounded-lg bg-gray-800 py-3 font-semibold text-white"
                  onClick={handleShare}
                >
                  Share
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>{showSignUpForm && <SignUpForm />}</AnimatePresence>
          <div className="absolute left-0 right-0 top-0 z-10 flex flex-col items-center justify-around gap-2 bg-white pb-4 pt-20">
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="p-3 text-center">
                    <div className="text-3xl text-black">
                      Try it. Wave to someone.
                    </div>
                    <div className="text-black">
                      And remember, on RIVER, your data is always 100% in your
                      control. None of your data gets seen, shared, or sold
                      without your express permission. It&apos;s your data!
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex-grow" />
            <div
              ref={chatContainerRef}
              className={`overflow-y-auto p-3 ${
                customAction?.type === "wave" && "pb-48"
              } ${customAction?.type === "share" && "pb-64"} ${customAction?.type === "join" && "pb-56"}`}
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
                  className="fixed bottom-0 left-0 right-0 z-10 border-t-2 border-primary-border bg-white shadow-lg"
                >
                  <div className="flex w-full items-center justify-center gap-2 border-b-2 border-primary-border py-4">
                    <img src="/logo.png" alt="Logo" className="mr-2 h-5 w-5" />
                    <TildeHeader
                      datapoints={datapoints}
                      potentialValue={potentialValue}
                      enterprises={enterprises}
                    />
                    <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                      <img
                        src="/usa_flag.png"
                        alt="USA Flag"
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                  </div>
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
          </div>
          <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center bg-white">
            <div className="flex w-full items-center justify-center gap-2 px-2 py-4">
              <span className="text-3xl font-bold text-primary-border">~</span>
              <input
                type="text"
                placeholder="Reply..."
                className="w-full rounded-full border-2 border-primary-border p-2 text-black placeholder:text-sm placeholder:italic placeholder:text-[#2D3648] placeholder:text-opacity-70"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
            <div className="flex w-full items-center justify-center gap-2 border-t-2 border-primary-border py-4">
              <img src="/logo.png" alt="Logo" className="mr-2 h-5 w-5" />
              <AnimatePresence>
                <motion.div
                  initial={{ y: "-500px", opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    delay: 0.3,
                  }}
                >
                  <TildeHeader
                    datapoints={datapoints}
                    potentialValue={potentialValue}
                    enterprises={enterprises}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="/usa_flag.png"
                  alt="USA Flag"
                  className="h-12 w-12 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
