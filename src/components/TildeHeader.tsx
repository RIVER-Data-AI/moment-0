import React from "react";
import { MdLayers } from "react-icons/md";
import { PiCurrencyDollarSimpleFill as CoinIcon } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa";

const TildeHeader = () => {
  return (
    <div className="flex w-[300px] justify-between bg-[#FAFAFA] rounded-full text-black text-sm px-3 border-2 border-[#CBD2E0]">
      <span className="flex text-2xl">~</span>
      <div className="flex items-center border-l-2 border-[#CBD2E0] pl-3">
        <span className="text-blue-500">
          <MdLayers />
        </span>
        <span className="ml-1">0</span>
      </div>
      <div className="flex items-center border-l-2 border-[#CBD2E0] pl-3">
        <span className="text-purple-500">
          <CoinIcon />
        </span>
        <span className="ml-1">0</span>
      </div>
      <div className="flex items-center border-l-2 border-[#CBD2E0] pl-3">
        <span className="text-green-500">
          <CoinIcon />
        </span>
        <span className="ml-1">0</span>
      </div>
      <div className="flex items-center border-l-2 border-[#CBD2E0] pl-3">
        <span className="text-gray-500">
          <FaBriefcase size={15} />
        </span>
        <span className="ml-1">0</span>
      </div>
    </div>
  );
};

export default TildeHeader;
