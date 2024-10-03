import React from "react";

const TildeInfo = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="flex justify-between mb-4">
        <span className="text-2xl">~</span>
        <div className="flex space-x-2">
          {["diamond", "circle", "triangle", "briefcase"].map((icon, index) => (
            <div key={icon} className="flex items-center">
              <span
                className={`text-${
                  icon === "diamond"
                    ? "blue"
                    : icon === "circle"
                    ? "purple"
                    : icon === "triangle"
                    ? "green"
                    : "gray"
                }-500`}
              >
                {icon === "diamond"
                  ? "◆"
                  : icon === "circle"
                  ? "●"
                  : icon === "triangle"
                  ? "▲"
                  : "💼"}
              </span>
              <span className="ml-1">0</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <div className="text-center text-2xl mb-4">~</div>
        {[
          {
            icon: "◆",
            title: "Data",
            description: "Tracks your data and keeps it under your control.",
          },
          {
            icon: "$",
            title: "Potential value",
            description: "Collected data's potential value.",
          },
          {
            icon: "💰",
            title: "Earnings",
            description: "All the money that is yours.",
          },
          {
            icon: "💼",
            title: "Enterprises",
            description: "Businesses joining your waves.",
          },
        ].map((item, index) => (
          <div key={index} className="flex items-start mb-4 last:mb-0">
            <span className="mr-2 text-xl">{item.icon}</span>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TildeInfo;
