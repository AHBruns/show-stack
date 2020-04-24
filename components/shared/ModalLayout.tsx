import React from "react";
import { ModalsStackContext, actions } from "../../contexts/ModalsStackContext";

export interface IModalLayout {
  bigBoi?: boolean;
  children: React.ReactElement;
}

export const ModalLayout = ({ bigBoi, children }: IModalLayout) => {
  const [_, dispatch] = React.useContext(ModalsStackContext);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-gray-900 opacity-50 pointer-events-auto"
        onClick={() => dispatch(actions.POP())}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`w-full ${
            bigBoi ? "max-w-4xl" : "max-w-lg"
          } bg-white border border-gray-200 shadow-2xl p-6 rounded-lg pointer-events-auto max-h-full overflow-scroll`}
        >
          {children}
        </div>
      </div>
    </>
  );
};
