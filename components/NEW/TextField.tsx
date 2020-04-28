import React from "react";

export const TextField = ({ label, id, ...props }) => (
    <div>
        <label
            htmlFor={id}
            className="block text-sm font-medium leading-5 text-gray-700"
        >
            {label}
        </label>
        <div className="mt-1 rounded-md shadow-sm">
            <textarea
                {...props}
                id={id}
                className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5 focus:shadow-outline-gray focus:border-gray-500"
            />
        </div>
    </div>
);
