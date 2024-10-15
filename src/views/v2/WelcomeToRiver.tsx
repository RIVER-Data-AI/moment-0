import useChatStore from "@/stores/useChatStore";
import React from "react";
import TildeHeaderV2 from "./TildeHeaderV2";

interface WelcomeToRiverProps {
  handleNextStep: () => void;
}

const WelcomeToRiver: React.FC<WelcomeToRiverProps> = ({ handleNextStep }) => {
  const { dataPoints } = useChatStore();

  return (
    <div className="fixed inset-0 h-full flex items-center justify-center ">
      <div className="max-w-md w-full h-full shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to River!
          </h1>
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <p className="text-gray-700">
                During sign-up you created {dataPoints.length ?? 0}{" "}
                <span className="font-semibold">data points.</span>
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-gray-700">
                This is your data. Keep it private or earn money from selling it
                - you&apos;re in control!
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <p className="font-semibold text-river-black text-opacity-70">
              Tap to explore
            </p>
            <img
              className="mt-2 ml-2 w-8"
              src="/arrow_flow.png"
              alt="Welcome to River"
            />
          </div>
          <div className="mt-4" onClick={handleNextStep}>
            <TildeHeaderV2 />
          </div>
        </div>

        <button
          onClick={handleNextStep}
          className="w-full bg-river-black text-white py-3 rounded-md font-semibold transition duration-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default WelcomeToRiver;
