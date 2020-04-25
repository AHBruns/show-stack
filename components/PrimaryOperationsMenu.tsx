import React from "react";
import { PrimaryOperationsToggleButton } from "./PrimaryOperationsMenu/PrimaryOperationsToggleButton";
import { PrimaryOperationsMenuList } from "./PrimaryOperationsMenu/PrimaryOperationsMenuList";

export const PrimaryOperationsMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => {
          if (menuIsOpen) setMenuIsOpen(false);
        }}
        className={`absolute inset-0 ${
          menuIsOpen
            ? "pointer-events-auto bg-gray-900 opacity-50"
            : "pointer-events-none"
        }`}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end overflow-hidden pointer-events-none">
        <div
          className={`grid grid-cols-1 gap-4 m-4 transform transition-all w-full max-w-xs duration-300 ease-in-out ${
            menuIsOpen ? "" : "mb-16 translate-y-full"
          }`}
        >
          <div className="flex items-center justify-start">
            <PrimaryOperationsToggleButton
              menuIsOpen={menuIsOpen}
              setMenuIsOpen={setMenuIsOpen}
            />
          </div>
          <div className="flex items-center justify-start w-full">
            <PrimaryOperationsMenuList />
          </div>
        </div>
      </div>
    </>
  );
};
