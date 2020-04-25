import React from "react";

export interface IDefaultTextArea {
  mt?: boolean;
  noAutoComplete?: boolean;
  id: string;
  label: string;
  name: string;
  onChange: (any) => void;
  onBlur: (any) => void;
  placeholder: string;
  value: any;
}

export const DefaultTextArea = ({
  mt,
  noAutoComplete,
  id,
  label,
  name,
  onChange,
  onBlur,
  placeholder,
  value,
}: IDefaultTextArea) => {
  return (
    <div className={`${mt ? "mt-4" : ""}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="rounded-md shadow-sm">
        <textarea
          autoComplete={noAutoComplete ? "off" : "on"}
          id={id}
          rows={3}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full mt-1 transition duration-150 ease-in-out focus:shadow-outline-gray focus:border-gray-500 form-textarea sm:text-sm sm:leading-5"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};
