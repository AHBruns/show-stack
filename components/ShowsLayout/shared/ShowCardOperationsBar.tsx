import React from "react";
import { ShowCardOperationButton } from "../ShowCard/ShowCardOperationsBar/ShowCardOperationButton";
import { StackContext, actions } from "../../../contexts/StackContext";

export const ShowCardOperationsBar = ({ index }) => {
  const [stackState, stackDispatch] = React.useContext(StackContext);

  return (
    <div className="flex flex-wrap justify-center p-2 transition-all duration-1000 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:scale-105 hover:shadow-2xl hover:border-gray-200">
      <ShowCardOperationButton
        onClick={() =>
          alert("Show operations aren't ready quite yet. Check back soon.")
        }
        name="Update"
      />
      <ShowCardOperationButton
        onClick={() =>
          stackDispatch(actions.REMOVE(index, stackState, stackDispatch))
        }
        name="Delete"
      />
      <ShowCardOperationButton
        onClick={() =>
          alert("Show operations aren't ready quite yet. Check back soon.")
        }
        name="Duplicate"
      />
    </div>
  );
};
