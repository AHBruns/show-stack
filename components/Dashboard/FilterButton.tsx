import React from "react";

export const FilterButton = ({ isX, ...props }) => {
    return (
        <button
            {...props}
            className="p-2 text-gray-900 transition-all duration-300 ease-in-out transform bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto sm:hover:scale-110 focus:scale-110 focus:outline-none"
        >
            {isX ? (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                >
                    <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 pt-1"
                >
                    <path
                        d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V6.58579C21 6.851 20.8946 7.10536 20.7071 7.29289L14.2929 13.7071C14.1054 13.8946 14 14.149 14 14.4142V17L10 21V14.4142C10 14.149 9.89464 13.8946 9.70711 13.7071L3.29289 7.29289C3.10536 7.10536 3 6.851 3 6.58579V4Z"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
};
