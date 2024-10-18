import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TildeInfo from "@/components/TildeInfo";
const pages = [
  {
    title: "Welcome to River",
    content: () => (
      <p className="mb-12 text-2xl text-black text-opacity-60">
        On RIVER, everything is a{" "}
        <span className="font-extrabold italic">~wave</span>.
      </p>
    ),
  },
  {
    title: "When you ~wave",
    content: () => (
      <p className="mb-12 text-2xl text-black text-opacity-60">
        To a friend, to a group, to search, to shop...the{" "}
        <span className="font-bold italic">data</span> you create is 100% in
        your control.
      </p>
    ),
  },
  {
    title: "Keep your data private",
    content: () => (
      <div className="mb-12 text-2xl text-black text-opacity-60">
        <p className="font-extrabold italic">You control</p>
        <br />
        <ul className="list-inside list-disc">
          <li>who sees it</li>
          <li>who has access to it</li>
          <li>where they see it</li>
          <li>and for how long</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Sell your data",
    content: () => (
      <div className="mb-12 text-2xl text-black text-opacity-60">
        <p>
          If you want, <br />
          <span className="font-extrabold italic">Sell it real-time</span> to
          businesses and companies eager to buy it.
        </p>
      </div>
    ),
  },
  {
    title: "When you wave, you will always see this",
    content: () => (
      <>
        <img src="/tilde.png" alt="Tilde" className="mx-auto my-4 h-20 w-20" />
        {/* <p className="text-2xl font-medium mb-12 text-black text-opacity-60">
          Click on this at any time to see what&apos;s happening with your data.
        </p> */}
      </>
    ),
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo />,
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo index={0} />,
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo index={1} />,
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo index={2} />,
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo index={3} />,
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const handleNext = () => {
    // if (currentPage === pages.length - 1) {
    //   // If it's the last page, navigate to the chat page
    //   //   router.push("/task1");
    //   console.log("do nothing");
    // } else {
    setCurrentPage((prev) => prev + 1);
    // }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 text-center">
      <button
        className={`left-6 top-6 self-start rounded-md py-2 font-semibold text-black ${
          currentPage === 0 ? "invisible" : ""
        }`}
        onClick={handleBack}
      >
        Back
      </button>
      <AnimatePresence>
        {currentPage === pages.length && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white text-river-black"
          >
            <div className="fixed inset-0 flex h-full flex-col items-center justify-center text-river-black text-opacity-70">
              <div className="text-center text-2xl font-semibold text-river-black">
                Please go back to the questionnaire.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative w-full flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 flex h-full w-full flex-col justify-start"
          >
            <h1 className="mb-6 text-3xl font-bold text-black">
              {pages[currentPage]?.title}
            </h1>
            <div className="mb-12 whitespace-pre-line text-lg text-black text-opacity-60">
              {pages[currentPage]?.content()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="fixed bottom-0 left-0 w-full p-6">
        <button
          className="flex w-full items-center justify-center rounded-md bg-main-action px-6 py-3 font-semibold text-white"
          onClick={handleNext}
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
  );
}
