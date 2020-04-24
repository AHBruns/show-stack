import React from "react";
import {
  ModalsStackContext,
  actions,
  modalNames,
} from "../../contexts/ModalsStackContext";

// todo : factor buttons out into reusable component

export const PrimaryOperationsMenuList = () => {
  const [_, dispatch] = React.useContext(ModalsStackContext);

  return (
    <div className="flex flex-col items-stretch w-full py-2 overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg pointer-events-auto">
      <button
        onClick={() => dispatch(actions.PUSH(modalNames.ADD_A_SHOW))}
        className="p-2 text-left hover:bg-gray-200 focus:outline-none focus:bg-gray-100"
      >
        Add A Show
      </button>
      <button
        onClick={() => dispatch(actions.PUSH(modalNames.CREATE_A_STACK))}
        className="p-2 text-left hover:bg-gray-200 focus:outline-none focus:bg-gray-100"
      >
        Create A Stack
      </button>
    </div>
  );
};
