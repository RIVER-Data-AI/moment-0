import { useState } from "react";

const pages = [
  {
    title: "Welcome to River",
    content: "On RIVER, everything is a ~wave.",
  },
  {
    title: "When you ~wave",
    content:
      "To a friend, to a group, to search, to shop...the data you create is 100% in your control.",
  },
  {
    title: "Keep your data private",
    content:
      "You control\nwho sees it\nwho has access to it\nwhere they see it\nand for how long",
  },
  {
    title: "Sell your data",
    content:
      "If you want Sell it real-time to businesses and companies eager to buy it.",
  },
  {
    title: "When you wave, you will always see this",
    content:
      "Click on this at any time to see what's happening with your data.",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main className="flex flex-1 flex-col justify-between w-full">
        <h1 className="text-3xl text-black font-bold mb-6">
          {pages[currentPage].title}
        </h1>
        <p className="text-lg mb-12 text-black text-opacity-60 whitespace-pre-line">
          {pages[currentPage].content}
        </p>
        <button
          className="bg-main-action text-white font-semibold py-3 px-6 rounded-md w-full flex items-center justify-center"
          onClick={handleNext}
        >
          {currentPage === pages.length - 1 ? "Finish" : "Next"}
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
      </main>
    </div>
  );
}
