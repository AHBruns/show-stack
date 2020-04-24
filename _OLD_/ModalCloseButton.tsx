import React from "react";

export const ModalCloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-4 text-red-600 transition-transform duration-300 ease-in-out transform rounded-full bg-gray-50 hover:scale-110 focus:outline-none focus:border-red-600 focus:border-2"
    >
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
