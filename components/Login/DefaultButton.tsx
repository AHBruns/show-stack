import React from "react";

export const DefaultButton = ({ mt, text, onClick, isSubmit, wideBoi }) => {
  return (
    <div className={`w-full ${mt ? "mt-4" : ""}`}>
      <span
        className={`inline-flex rounded-md shadow-sm  ${
          wideBoi ? "w-full" : ""
        }`}
      >
        <button
          onClick={onClick}
          type={isSubmit ? "submit" : "button"}
          className={`text-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 ${
            wideBoi ? "w-full" : ""
          }`}
        >
          {text}
        </button>
      </span>
    </div>
  );
};
