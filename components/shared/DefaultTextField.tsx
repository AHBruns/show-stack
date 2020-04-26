import React from "react";

export interface IDefaultTextField {
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

export const DefaultTextField = ({
  mt,
  noAutoComplete,
  id,
  label,
  name,
  onChange,
  onBlur,
  placeholder,
  value,
}: IDefaultTextField) => {
  return (
    <div className={`${mt ? "mt-4" : ""}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          autoComplete={noAutoComplete ? "off" : "on"}
          className="block w-full form-input sm:text-sm sm:leading-5 focus:shadow-outline-gray focus:border-gray-500"
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};
