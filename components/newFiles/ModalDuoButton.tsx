import React from "react";

export const ModalDuoButton = ({ left, right }) => {
  return (
    <span className="relative z-0 flex items-stretch shadow-sm">
      <button
        onClick={left.onClick}
        type="submit"
        className="relative flex-1 px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray active:bg-gray-100 active:text-gray-700"
      >
        {left.name}
      </button>
      <button
        onClick={right.onClick}
        type="button"
        className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray active:bg-gray-100 active:text-gray-700"
      >
        {right.name}
      </button>
    </span>
  );
};
