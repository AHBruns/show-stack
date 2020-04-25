import React from "react";
import { PrimaryOperationsMenu } from "../components/PrimaryOperationsMenu";
import { ShowsLayout } from "../components/ShowsLayout";

export default () => {
  return (
    <div className="relative flex-1 w-full max-h-full">
      <div className="absolute inset-0 flex flex-col items-center overflow-scroll bg-gray-900">
        <div className="w-full max-w-7xl">
          <ShowsLayout />
        </div>
      </div>
      <PrimaryOperationsMenu />
    </div>
  );
};
