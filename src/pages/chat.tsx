import React from "react";
import TildeHeader from "@/components/TildeHeader";

const chat = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-around pt-4 px-2 gap-2 items-center border-b-2 pb-4 border-[#CBD2E0]">
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
      <div className="max-w-md mx-auto mt-8 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <h2 className="text-lg font-semibold text-black">
            River Intelligence
          </h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            I’ll help you to invite your friends later, but first, what’s your
            name?
          </p>
        </div>
        <input
          type="text"
          placeholder="Reply..."
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default chat;
