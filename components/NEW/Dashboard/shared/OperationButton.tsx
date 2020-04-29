import React from "react";

export const OperationButton = ({ onClick, name }) => {
    return (
        <button
            onClick={onClick}
            className="px-2 py-1 m-2 font-thin transition-all duration-300 ease-in-out transform bg-gray-200 border border-gray-300 rounded-lg sm:bg-white sm:border-gray-100 sm:hover:scale-105 sm:hover:border-gray-200 sm:hover:shadow-lg focus:outline-none"
        >
            {name}
        </button>
    );
};
