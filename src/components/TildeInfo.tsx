import React from "react";
import { MdLayers } from "react-icons/md";
import { PiCurrencyDollarSimpleFill as CoinIcon } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa";
import { PiCoinsBold } from "react-icons/pi";

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
      <div className="border-2 border-[#CBD2E0]">
        <div className="text-center text-2xl mb-4 border-b-2 border-[#CBD2E0]">
          ~
        </div>
        <div className="flex items-center justify-start mb-4 pb-4 border-[#CBD2E0] border-b-2">
          <div className="flex p-2">
            <MdLayers size={25} />
          </div>
          <div className="flex flex-col">
            <h3 className="flex font-semibold">Data</h3>
            <div className="flex text-sm text-gray-600 text-start">
              Tracks your data and keeps it under your control.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start mb-4 pb-4 border-[#CBD2E0] border-b-2">
          <div className="flex p-2">
            <CoinIcon size={25} />
          </div>
          <div className="flex flex-col">
            <h3 className="flex font-semibold">Potential Value</h3>
            <div className="flex text-sm text-gray-600 text-start">
              Collected data&apos;s potential value.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start mb-4 pb-4 border-[#CBD2E0] border-b-2">
          <span className="flex p-2">
            <PiCoinsBold size={25} />
          </span>
          <div className="flex flex-col">
            <h3 className="font-semibold text-start">Earnings</h3>
            <p className="text-sm text-gray-600 text-start">
              All the money that is yours.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start mb-4">
          <span className="flex p-2">
            <FaBriefcase size={25} />
          </span>
          <div>
            <h3 className="font-semibold text-start">Enterprises</h3>
            <p className="text-sm text-gray-600 text-start">
              Businesses joining your waves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TildeInfo;
