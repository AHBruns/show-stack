import React from "react";
import { ShowCardTag } from "./ShowCardTagsBar/ShowCardTag";

export const ShowCardTagsBar = () => {
  return (
    <div className="flex flex-wrap justify-start pb-2 pl-2 transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:scale-105 hover:shadow-lg hover:border-gray-200">
      {["HBO", "Alex", "Dad", "Mom", "Thriller"].map((name) => (
        <div key={name} className="mt-2 mr-2">
          <ShowCardTag name={name} />
        </div>
      ))}
    </div>
  );
};
