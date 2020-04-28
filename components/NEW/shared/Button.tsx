import React from "react";

export const Button = ({ children, ...props }) => (
    <div className="w-full rounded-md shadow-sm">
        <button
            {...props}
            className="w-full px-4 py-2 text-base font-medium leading-6 text-center text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
        >
            {children}
        </button>
    </div>
);
