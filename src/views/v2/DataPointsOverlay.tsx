import React from "react";
// import useChatStore from "@/stores/useChatStore";
import TildeHeaderV2 from "./TildeHeaderV2";
import { ImCross } from "react-icons/im";

interface DataPointsOverlayProps {
  onClose: () => void;
}

const dataPoints = [
  {
    category: "First Name",
    value: "Sebastian",
    potentialValue: 1.2861850771200007,
  },
  {
    category: "First Name",
    value: "Sebastian",
    potentialValue: 1.0588514069734056,
  },
  {
    category: "Last Name",
    value: "Escalante",
    potentialValue: 1.18951015708548,
  },
  {
    category: "Birth month",
    value: "September",
    potentialValue: 0.7658035528122109,
  },
  {
    category: "Birth year",
    value: "1999",
    potentialValue: 0.6364679981366901,
  },
  {
    category: "Birth day",
    value: "20",
    potentialValue: 0.6594276339133813,
  },
  {
    category: "Age",
    value: "25",
    potentialValue: 1.0961143695878124,
  },
  {
    category: "Star sign",
    value: "Virgo",
    potentialValue: 1.2060014328113182,
  },
  {
    category: "Generation",
    value: "Gen Z (Zoomer)",
    potentialValue: 1.193401846641284,
  },
];

const DataPointsOverlay: React.FC<DataPointsOverlayProps> = ({ onClose }) => {
  //   const { dataPoints } = useChatStore();

  //   console.log("dataPoints", dataPoints);

  const totalPotentialValue = dataPoints
    .reduce((sum, point) => sum + point.potentialValue, 0)
    .toFixed(1);

  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col p-2">
      <div
        onClick={onClose}
        className="flex text-2xl justify-end p-3 items-center"
      >
        <ImCross size={15} />
        <span className="font-semibold text-sm ml-2">Close</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-200">
        <TildeHeaderV2
          datapoints={dataPoints.length}
          potentialValue={Number(totalPotentialValue)}
          enterprises={0}
        />
        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="/usa_flag.png"
            alt="USA Flag"
            className="w-12 h-12 object-cover"
          />
        </div>
      </div>
      <div>
        <div className="relative mt-2 border-2 border-river-black">
          <div className="bg-red-400 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-river-black"></div>
          <h2 className="text-2xl font-semibold mb-4">1. Select</h2>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                <span>Select all</span>
              </label>
              {dataPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span>{point.category}</span>
                  </label>
                  <div className="flex items-center">
                    <span>{point.value}</span>
                    <span className="ml-2 text-gray-500">
                      · $ {point.potentialValue.toFixed(1)} USD
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span>{dataPoints.length} Data points</span>
              <span>Total potential value: ${totalPotentialValue}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
              Review and sell →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPointsOverlay;
