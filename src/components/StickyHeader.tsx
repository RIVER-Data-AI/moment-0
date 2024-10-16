import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TildeHeader from "./TildeHeader";

const StickyHeader = ({
  datapoints,
  potentialValue,
  enterprises,
}: {
  datapoints: number;
  potentialValue: number;
  enterprises: number;
}) => {
  const [, setViewportHeight] = useState(0);

  useEffect(() => {
    // Set initial viewport height
    setViewportHeight(window.visualViewport?.height || window.innerHeight);

    const handleResize = () => {
      // Use visualViewport height if available, fallback to innerHeight
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    // Listen to visualViewport changes if available, otherwise window resize
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <header
      className="fixed left-0 right-0 bg-white z-50 px-4 py-3 gap-2 flex items-center justify-between border-b-2 border-primary-border"
      style={{
        top: `${window.visualViewport ? window.visualViewport.offsetTop : 0}px`,
        height: "60px",
      }}
    >
      <img src="/logo.png" alt="Logo" className="w-5 h-5 mr-2" />
      <TildeHeader
        datapoints={datapoints}
        potentialValue={potentialValue}
        enterprises={enterprises}
      />
      <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src="/usa_flag.png"
          alt="USA Flag"
          className="w-12 h-12 object-cover"
        />
      </div>
    </header>
  );
};

// Use dynamic import with ssr: false to render this component only on the client side
export default dynamic(() => Promise.resolve(StickyHeader), { ssr: false });
