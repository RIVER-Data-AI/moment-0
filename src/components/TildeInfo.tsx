import React from "react";
import { MdLayers } from "react-icons/md";
import { PiCurrencyDollarSimpleFill as CoinIcon } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa";

const TildeInfo = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="flex justify-between mb-4 bg-[#FAFAFA] rounded-full text-black text-sm px-3 border-2 border-[#CBD2E0]">
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
      <div className="border rounded-lg p-4">
        <div className="text-center text-2xl mb-4">~</div>
        <div className="flex items-start mb-4">
          <span className="mr-2 text-xl">◆</span>
          <div>
            <h3 className="font-semibold">Data</h3>
            <p className="text-sm text-gray-600">
              Tracks your data and keeps it under your control.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <span className="mr-2 text-xl">$</span>
          <div>
            <h3 className="font-semibold">Potential value</h3>
            <p className="text-sm text-gray-600">
              Collected data&apos;s potential value.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <span className="mr-2 text-xl">💰</span>
          <div>
            <h3 className="font-semibold">Earnings</h3>
            <p className="text-sm text-gray-600">
              All the money that is yours.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <span className="mr-2 text-xl">
            <FaBriefcase />
          </span>
          <div>
            <h3 className="font-semibold">Enterprises</h3>
            <p className="text-sm text-gray-600">
              Businesses joining your waves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TildeInfo;
