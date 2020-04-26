import React from "react";
import Loader from "react-loaders";

export const Spinner = () => {
  return (
    <div className="relative">
      <Loader type="square-spin" active />
    </div>
  );
};
