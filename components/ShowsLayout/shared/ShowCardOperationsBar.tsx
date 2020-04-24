import React from "react";
import { ShowCardOperationButton } from "../ShowCard/ShowCardOperationsBar/ShowCardOperationButton";

export const ShowCardOperationsBar = ({}) => {
  return (
    <div className="flex flex-wrap justify-center p-2 transition-all duration-1000 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:scale-105 hover:shadow-2xl hover:border-gray-200">
      <ShowCardOperationButton name="Update" />
      <ShowCardOperationButton name="Archive" />
      <ShowCardOperationButton name="Duplicate" />
    </div>
  );
};
