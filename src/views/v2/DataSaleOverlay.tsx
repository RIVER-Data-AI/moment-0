import React from "react";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";

interface DataSaleOverlayProps {
  handleNextStep?: () => void;
}

const DataSaleOverlay: React.FC<DataSaleOverlayProps> = ({
  handleNextStep,
}) => {
  return (
    <div className="fixed inset-0 flex h-full items-center justify-center">
      <div className="flex h-full w-full max-w-md flex-col justify-between p-6 shadow-lg">
        <div>
          <h2 className="mb-4 text-xl text-gray-500">Well done</h2>
          <h1 className="mb-12 text-3xl font-bold text-gray-800">
            You&apos;ve made your first data sale and earned your first $$ on
            RIVER.
          </h1>
          <div className="mb-8 space-y-4">
            <div className="flex items-center">
              <span className="mr-3 text-2xl">
                <PiCurrencyDollarSimpleFill />
              </span>
              <p className="text-lg text-gray-700">
                Visit <span className="font-semibold">RiverBank</span> anytime
                to undo this, track or sell more data.
              </p>
            </div>

            <div className="flex items-center">
              <span className="mr-3 text-2xl">
                <IoIosLock />
              </span>
              <p className="text-lg text-gray-700">
                Visit <span className="font-semibold">Control</span> to manage
                your data permissions and privacy anytime.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNextStep}
          className="w-full rounded-md bg-river-black py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DataSaleOverlay;
