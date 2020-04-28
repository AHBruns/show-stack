import React from "react";

const Tag = ({ name }) => {
    return (
        <span className="hover:shadow-lg transition-all duration-300 ease-in-out transform sm:hover:scale-105 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-gray-500 sm:bg-gray-200 text-white sm:text-gray-800">
            {name}
        </span>
    );
};

export const ShowCardTagsBar = ({ show }) => {
    return (
        <div className="flex flex-wrap justify-start pb-2 pl-2 transition-all duration-300 ease-in-out transform bg-gray-100 border border-gray-300 rounded-lg sm:border-gray-100 sm:bg-white sm:hover:scale-105 sm:hover:shadow-lg sm:hover:border-gray-200">
            {show.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
                .map((name) => (
                    <div key={name} className="mt-2 mr-2">
                        <Tag name={name} />
                    </div>
                ))}
        </div>
    );
};
