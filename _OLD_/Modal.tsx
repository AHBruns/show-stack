import React from "react";
import { ModalCloseButton } from "./ModalCloseButton";

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`z-30 fixed inset-0 bg-gray-900 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`z-30 fixed inset-0 flex mt-24 items-center justify-center flex-col transition-all p-4 duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ModalCloseButton onClick={onClose} />
        {children}
      </div>
    </>
  );
};
