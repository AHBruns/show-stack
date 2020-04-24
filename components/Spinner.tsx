import React from "react";
import Loader from "react-loaders";

export const Spinner = () => {
  return (
    <div className="relative w-20 h-20">
      <Loader type="square-spin" active />
    </div>
  );
};
