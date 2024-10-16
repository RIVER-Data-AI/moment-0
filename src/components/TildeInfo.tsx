import React from "react";
import { MdLayers } from "react-icons/md";
import { PiCurrencyDollarSimpleFill as CoinIcon } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa";
import { PiCoinsBold } from "react-icons/pi";

const TildeInfo: React.FC<{ index?: number; highlightAll?: boolean }> = ({
  index,
  highlightAll = false,
}) => {
  const isHighlighted = (sectionIndex: number) =>
    highlightAll || index === sectionIndex;
  const borderColor = (sectionIndex: number) =>
    isHighlighted(sectionIndex) ? "border-[#CBD2E0]" : "border-gray-200";
  const textColor = (sectionIndex: number) =>
    isHighlighted(sectionIndex) ? "text-black" : "text-gray-400";

  return (
    <div className="mx-auto max-w-sm">
      <div
        className={`mb-4 flex justify-between rounded-full border-2 bg-[#FAFAFA] px-3 text-sm ${borderColor(
          -1,
        )}`}
      >
        <span className="flex text-2xl">~</span>
        {[0, 1, 2, 3].map((sectionIndex) => (
          <div
            key={sectionIndex}
            className={`flex items-center border-l-2 ${borderColor(
              -1,
            )} pl-3 ${textColor(sectionIndex)}`}
          >
            <span
              className={
                isHighlighted(sectionIndex)
                  ? ""
                  : "text-gray-400 text-opacity-40"
              }
            >
              {sectionIndex === 0 && (
                <MdLayers
                  className={`${
                    isHighlighted(sectionIndex)
                      ? "text-blue-500"
                      : "text-gray-400 text-opacity-40"
                  }`}
                />
              )}
              {sectionIndex === 1 && (
                <CoinIcon
                  className={`${
                    isHighlighted(sectionIndex)
                      ? "text-purple-500"
                      : "text-gray-400 text-opacity-40"
                  }`}
                />
              )}
              {sectionIndex === 2 && (
                <CoinIcon
                  className={`${
                    isHighlighted(sectionIndex)
                      ? "text-green-500"
                      : "text-gray-400 text-opacity-40"
                  }`}
                />
              )}
              {sectionIndex === 3 && <FaBriefcase size={15} />}
            </span>
            <span className="ml-1">0</span>
          </div>
        ))}
      </div>
      <div className={`border-2 ${borderColor(-1)}`}>
        <div
          className={`mb-4 border-b-2 text-center text-2xl ${borderColor(-1)}`}
        >
          ~
        </div>
        {[
          {
            icon: <MdLayers size={25} />,
            title: "Data",
            description: "Tracks your data and keeps it under your control.",
          },
          {
            icon: <CoinIcon size={25} />,
            title: "Potential Value",
            description: "Collected data's potential value.",
          },
          {
            icon: <PiCoinsBold size={25} />,
            title: "Earnings",
            description: "All the money that is yours.",
          },
          {
            icon: <FaBriefcase size={25} />,
            title: "Enterprises",
            description: "Businesses joining your waves.",
          },
        ].map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`mb-4 flex items-center justify-start pb-4 ${
              sectionIndex < 3 ? `border-b-2 ${borderColor(-1)}` : ""
            }`}
          >
            <div className="flex p-2">{section.icon}</div>
            <div className="flex flex-col">
              <h3 className={`flex font-semibold ${textColor(sectionIndex)}`}>
                {section.title}
              </h3>
              <div
                className={`flex text-start text-sm ${textColor(sectionIndex)}`}
              >
                {section.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TildeInfo;
