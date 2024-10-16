import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import Link from "next/link";
import clsx from "clsx";
import { MdLayers } from "react-icons/md";
import { PiCurrencyDollarSimpleFill as CoinIcon } from "react-icons/pi";
import { FaBriefcase } from "react-icons/fa";

interface SellingDataScreenProps {
  selectedSummary: {
    count: number;
    totalValue: number;
  };
  handleNextStep: () => void;
  isMobile: boolean;
}

const SellingDataScreen: React.FC<SellingDataScreenProps> = ({
  selectedSummary,
  handleNextStep,
  isMobile,
}) => {
  const [additionalModalInfo, setAdditionalModalInfo] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<React.ReactNode>(<MdLayers />);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current === null) return;
    setTimeout(() => {
      if (progressBarRef.current) progressBarRef.current.style.width = "100%";
    }, 1000);
    if (progressBarRef.current && progressTextRef.current) {
      progressTextRef.current.textContent = "1/3 Preparing data";
      setCurrentIcon(<MdLayers />);
    }
    setTimeout(() => {
      if (progressBarRef.current && progressTextRef.current) {
        progressTextRef.current.textContent = "2/3 Listing data in marketplace";
        setCurrentIcon(<CoinIcon />);
      }
    }, 2600);
    setTimeout(() => {
      if (progressBarRef.current && progressTextRef.current) {
        progressTextRef.current.textContent = "3/3 Matching potential buyers";
        setCurrentIcon(<FaBriefcase />);
      }
    }, 5300);
    setTimeout(() => {
      if (progressBarRef.current && progressTextRef.current) {
        progressTextRef.current.textContent = "";
        setCurrentIcon(null);
        setAdditionalModalInfo(true);
      }
    }, 8000);
    setTimeout(() => {
      handleNextStep();
    }, 10000);
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-col h-screen items-center justify-center text-river-black",
        isMobile && "absolute rounded-lg"
      )}
    >
      <div>
        {!additionalModalInfo ? (
          <div className="flex items-center justify-center gap-1">
            <IoIosLock size={25} />
            <p>Currently selling...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-[#219654]">
            <FaCheckCircle color="#219654" className="splash-animation" />
            <p className="bigger-animation">Sale Completed</p>
          </div>
        )}
      </div>
      <div className="my-6 flex w-full flex-col gap-3 px-10">
        <div className="border-2 bg-secondary-bg p-1 md:p-3 md:pr-32 flex items-center justify-center flex-col">
          <div>{selectedSummary.count ?? 0}</div>
          <div className="text-xs text-[#60758e]">Data points</div>
        </div>
        <div className="border-2 bg-secondary-bg p-1 md:p-3 md:pr-32 flex items-center justify-center flex-col">
          <div>${selectedSummary.totalValue?.toFixed(1) ?? 0} USD</div>
          <div className="text-xs text-[#60758e]">Total potential value</div>
        </div>
      </div>
      <div
        className={`progress-bar-container md:my-6 ${
          additionalModalInfo && "hidden"
        } `}
      >
        <div className="progress-bar" ref={progressBarRef}></div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {currentIcon && <div className="text-xl">{currentIcon}</div>}
        <div ref={progressTextRef}>1/3 Preparing data</div>
      </div>
      {/* {additionalModalInfo && (
        <div className="slide-up-fade-in flex flex-col mt-10 justify-center text-center md:my-2 md:w-full md:gap-6">
          <div>
            <button className="border bg-main-action px-6 py-3 text-xs text-white md:w-fit md:flex-1">
              Next
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SellingDataScreen;
