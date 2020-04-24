import React from "react";

export const PrimaryOperationsToggleButton = ({
  menuIsOpen,
  setMenuIsOpen,
}) => {
  return (
    <button
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      className={`p-2 text-gray-900 pointer-events-auto transition-all duration-300 ease-in-out transform bg-white border border-gray-200 rounded-full shadow-lg hover:scale-110 focus:scale-110 focus:outline-none ${
        menuIsOpen ? "rotate-45" : ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
      >
        <path
          d="M12 4V20M20 12L4 12"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
