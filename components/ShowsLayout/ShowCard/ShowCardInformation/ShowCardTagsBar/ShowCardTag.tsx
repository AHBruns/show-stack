import React from "react";

export const ShowCardTag = ({ name }) => {
  return (
    <span className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-gray-200 text-gray-800">
      {name}
    </span>
  );
};
