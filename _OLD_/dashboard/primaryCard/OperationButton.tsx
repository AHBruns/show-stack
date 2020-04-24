import React from "react";

export const OperationButton = ({
  onClick,
  children,
}: {
  onClick?: (any) => any;
  children: String;
}) => (
  <button
    onClick={onClick}
    className="z-10 px-4 py-2 mx-2 my-2 text-xs subpixel-antialiased font-bold tracking-wider text-white transition-all duration-500 ease-in-out transform bg-red-600 rounded-full cursor-pointer pointer-events-auto hover:bg-red-500 focus:bg-red-500 focus:outline-none"
  >
    {children}
  </button>
);
