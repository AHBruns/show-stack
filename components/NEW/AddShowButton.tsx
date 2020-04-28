import React from "react";

export const AddShowButton = (props) => (
    <button
        {...props}
        className="p-2 text-gray-900 transition-all duration-300 ease-in-out transform bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto sm:hover:scale-110 focus:scale-110 focus:outline-none"
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
