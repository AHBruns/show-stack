import React from "react";

export const ShowCardOperationButton = ({ name }) => {
  return (
    <button className="px-2 py-1 m-2 font-thin transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:scale-105 hover:border-gray-200 hover:shadow-lg">
      {name}
    </button>
  );
};
