import React from "react";

export const Input = ({ label, id, ...props }) => (
    <div>
        <label
            htmlFor={id}
            className="block text-sm font-medium leading-5 text-gray-700"
        >
            {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
            <input
                {...props}
                className="block w-full form-input sm:text-sm sm:leading-5 focus:shadow-outline-gray focus:border-gray-500"
                id={id}
            />
        </div>
    </div>
);
