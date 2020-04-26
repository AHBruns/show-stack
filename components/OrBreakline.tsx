import React from "react";

export const OrBreakline = () => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm leading-5">
          <span className="px-2 text-gray-500 bg-white">Or</span>
        </div>
      </div>
    </div>
  );
};
