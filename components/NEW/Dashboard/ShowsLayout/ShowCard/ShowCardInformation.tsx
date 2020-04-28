import React from "react";
import { ShowCardOperationsBar } from "../shared/ShowCardOperationsBar";
import { ShowCardTagsBar } from "./ShowCardInformation/ShowCardTagsBar";

export const ShowCardInformation = ({ invalidateOnShowsMutation, show }) => {
    const [descriptionIsOpen, setDescriptionIsOpen] = React.useState(false);
    return (
        <div
            className={`flex flex-col flex-1 h-full pl-0 ${
                show.img ? "sm:pl-6 lg:pl-0 xl:pl-6" : ""
            } lg:mt-6 xl:mt-0`}
        >
            <h1 className="text-xl font-bold leading-tight tracking-wider text-gray-900 sm:text-3xl ">
                {show.img && (
                    <button
                        className="inline-flex items-end mr-1 transform translate-y-1 bg-gray-100 rounded-full sm:mr-0 sm:hidden focus:outline-none"
                        onClick={() => setDescriptionIsOpen(!descriptionIsOpen)}
                    >
                        {descriptionIsOpen ? (
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                            >
                                <path
                                    d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                            >
                                <path
                                    d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                )}
                {show.title || "Untitled"}
            </h1>
            {(descriptionIsOpen || !show.img) && (
                <p className="flex-1 block mt-2 text-sm tracking-wider text-gray-700 sm:hidden">
                    {show.description.length > 322
                        ? show.description.slice(0, 319).trim() + "..."
                        : show.description}
                </p>
            )}
            {show.tags && (
                <div className="mt-2">
                    <ShowCardTagsBar show={show} />
                </div>
            )}
            <p className="flex-1 hidden mt-2 text-sm tracking-wider text-gray-700 sm:block">
                {show.description.length > 322
                    ? show.description.slice(0, 319).trim() + "..."
                    : show.description}
            </p>
            <div className="flex-1" />
            <div className="hidden block mt-6 md:block lg:hidden">
                <ShowCardOperationsBar
                    invalidateOnShowsMutation={invalidateOnShowsMutation}
                    show={show}
                />
            </div>
        </div>
    );
};
