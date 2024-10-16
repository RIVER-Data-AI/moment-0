import React from "react";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";

interface DataSaleOverlayProps {
  handleNextStep?: () => void;
}

const DataSaleOverlay: React.FC<DataSaleOverlayProps> = () => {
  return (
    <div className="fixed inset-0 h-full flex items-center justify-center ">
      <div className="max-w-md w-full h-full shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-500 text-xl mb-4">Well done</h2>
          <h1 className="text-3xl font-bold text-gray-800 mb-12">
            You&apos;ve made your first data sale and earned your first $$ on
            RIVER.
          </h1>
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                <PiCurrencyDollarSimpleFill />
              </span>
              <p className="text-gray-700 text-lg">
                Visit <span className="font-semibold">RiverBank</span> anytime
                to undo this, track or sell more data.
              </p>
            </div>

            <div className="flex items-center">
              <span className="text-2xl mr-3">
                <IoIosLock />
              </span>
              <p className="text-gray-700 text-lg">
                Visit <span className="font-semibold">Control</span> to manage
                your data permissions and privacy anytime.
              </p>
            </div>
          </div>
        </div>
        {/* <button
          onClick={handleNextStep}
          className="w-full bg-river-black text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go to River →
        </button> */}
      </div>
    </div>
  );
};

export default DataSaleOverlay;
