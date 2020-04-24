// cSpell:enableCompoundWords

import React, { useState } from "react";
import { OperationButton } from "./primaryCard/OperationButton";
import { Modal } from "../Modal";

const operationSeq = (
  <>
    <OperationButton onClick={() => {}}>Update</OperationButton>
    <OperationButton onClick={() => {}}>Duplicate</OperationButton>
    <OperationButton onClick={() => {}}>Delete</OperationButton>
    <OperationButton onClick={() => {}}>Archive</OperationButton>
  </>
);
s;

const Operations = ({ show }) => {
  const [operationsMenuIsOpen, setOperationsMenuIsOpen] = useState(false);

  if (!show && operationsMenuIsOpen) setOperationsMenuIsOpen(false);

  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex items-center justify-start w-full overflow-visible transition-all duration-300 ease-in-out transform -mb-6 "
         ${
           show
             ? "opacity-50 hover:opacity-100"
             : "opacity-0 pointer-events-none"
         }`}
    >
      <button
        className={`z-10 p-2 -ml-6 text-white bg-red-600 rounded-full hover:scale-105 focus:outline-none transform transition-transform duration-300 ease-in-out ${
          operationsMenuIsOpen ? "rotate-45" : ""
        }`}
        onClick={() => setOperationsMenuIsOpen(!operationsMenuIsOpen)}
      >
        <svg
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M12 4V20M20 12L4 12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="absolute flex items-center w-screen h-64 overflow-x-hidden pointer-events-none">
        <div
          className={`absolute shadow-sm bg-white flex items-center pl-8 pr-3 border border-gray-100 rounded-r-full transform transition-all duration-1000 ease-in-out ${
            operationsMenuIsOpen ? "" : "-translate-x-full"
          }`}
        >
          {operationSeq}
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children }) => (
  <span className="px-3 py-1 mt-2 mr-2 text-xs font-semibold text-red-900 bg-red-600 rounded-full">
    {children}
  </span>
);

export const PrimaryCard = ({ img, title, tags, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgMenuIsOpen, setImgMenuIsOpen] = useState(false);

  return (
    <>
      <div
        key={title}
        className={`relative grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10 mt-6 transition-all duration-300 ease-in-out transform scale-90 rounded-lg hover:bg-gray-100 hover:shadow-inner hover:scale-95`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          onClick={() => setImgMenuIsOpen(!imgMenuIsOpen)}
          className={`relative col-span-1 overflow-hidden transition-transform duration-300 ease-in-out transform rounded-lg shadow-2xl cursor-pointer hover:scale-105`}
        >
          <img
            src={img}
            className="object-cover object-center min-w-full min-h-full rounded-lg shadow-inner"
          />
        </div>
        <div className="hidden sm:col-span-1 md:col-span-2 sm:block">
          <h1 className="p-2 text-3xl font-semibold leading-none tracking-wider text-gray-900">
            {title}
          </h1>
          <div className="flex flex-wrap px-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <p className="invisible p-2 mt-2 text-gray-800 sm:visible">
            {description}
          </p>
        </div>
        <div className="hidden sm:block">
          <Operations show={isHovered} />
        </div>
      </div>

      {/* begin modal */}
      <div className="sm:hidden">
        <Modal isOpen={imgMenuIsOpen} onClose={() => setImgMenuIsOpen(false)}>
          <div className="p-4 mt-6 rounded-lg shadow-2xl bg-gray-50">
            <div className="">
              <h1 className="p-2 text-3xl font-semibold leading-none tracking-wider text-gray-900">
                {title}
              </h1>
              <div className="flex flex-wrap px-2">
                {tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <p className="p-2 mt-2 text-gray-800">{description}</p>
            </div>
          </div>
          <div
            className={`flex-col flex-wrap items-stretch w-full p-4 mt-6 rounded-lg shadow-2xl pointer-events-auto bg-gray-50 ${
              imgMenuIsOpen ? "flex" : "hidden"
            }`}
          >
            {operationSeq}
          </div>
        </Modal>
      </div>
    </>
  );
};
