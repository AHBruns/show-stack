import React from "react";

export const Error = ({ children, id, key }) => (
    <label
        htmlFor={id}
        key={key}
        className="block mt-1 text-xs font-medium leading-tight text-red-500"
    >
        {children}
    </label>
);
