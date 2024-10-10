import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TildeInfo from "@/components/TildeInfo";

const pages = [
  {
    title: "Welcome to River",
    content: () => (
      <p className="text-2xl mb-12 text-black text-opacity-60">
        On RIVER, everything is a{" "}
        <span className="font-extrabold italic">~wave</span>.
      </p>
    ),
  },
  {
    title: "When you ~wave",
    content: () => (
      <p className="text-2xl mb-12 text-black text-opacity-60">
        To a friend, to a group, to search, to shop...the{" "}
        <span className="font-bold italic">data</span> you create is 100% in
        your control.
      </p>
    ),
  },
  {
    title: "Keep your data private",
    content: () => (
      <div className="text-2xl mb-12  text-black text-opacity-60">
        <p className="font-extrabold italic">You control</p>
        <br />
        <ul className="list-disc list-inside">
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
      <div className="text-2xl mb-12 text-black text-opacity-60">
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
        <img src="/tilde.png" alt="Tilde" className="w-20 h-20 mx-auto my-4" />
        <p className="text-2xl font-medium mb-12 text-black text-opacity-60">
          Click on this at any time to see what&apos;s happening with your data.
        </p>
      </>
    ),
  },
  {
    title: "When you wave, you will always see this",
    content: () => <TildeInfo />,
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 text-center">
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0.5, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col justify-center"
          >
            <h1 className="text-3xl text-black font-bold mb-12">
              {pages[currentPage].title}
            </h1>
            <div className="text-lg mb-12 text-black text-opacity-60 whitespace-pre-line">
              {pages[currentPage].content()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="w-full fixed bottom-0 left-0 p-6 ">
        <button
          className="bg-main-action text-white font-semibold py-3 px-6 rounded-md w-full flex items-center justify-center"
          onClick={handleNext}
        >
          <span>Next</span>
          <svg
            className="w-4 h-4 ml-2"
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
