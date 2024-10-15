import React from "react";

interface NotchedContainerProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  notchColor?: string;
}

export default function NotchedContainer({
  children,
  className = "",
}: NotchedContainerProps) {
  return (
    <div className={className}>
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(50%)] -z-10"
        width="24"
        height="12"
        viewBox="0 0 24 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.2426 1.75736C11.3284 0.671573 13.0716 0.671573 14.1574 1.75736L24 11.6H0L9.84265 1.75736C10.9284 0.671573 12.6716 0.671573 13.7574 1.75736L23.6 11.6H0.400001L10.2426 1.75736Z"
          stroke="black"
          strokeWidth={2}
        />
      </svg>
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(50%)]"
        width="24"
        height="12"
        viewBox="0 0 24 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.2426 1.75736C11.3284 0.671573 13.0716 0.671573 14.1574 1.75736L24 11.6H0L9.84265 1.75736C10.9284 0.671573 12.6716 0.671573 13.7574 1.75736L23.6 11.6H0.400001L10.2426 1.75736Z"
          className={`fill-white`}
          strokeWidth="2"
        />
      </svg>
      <div className="p-2">{children}</div>
    </div>
  );
}
