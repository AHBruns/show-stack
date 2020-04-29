import React, { useState } from "react";
import { ShowCardOperationsBar } from "./shared/ShowCardOperationsBar";
import { ShowCardInformation } from "./ShowCard/ShowCardInformation";

export const ShowCard = ({
    imgError,
    setImgError,
    invalidateOnShowsMutation,
    show,
}) => {
    const [posterThrewError, setPosterThrewError] = React.useState(false);

    return (
        <div className="flex flex-col w-full p-3 transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg sm:p-6 sm:hover:shadow-2xl sm:hover:scale-105 sm:hover:z-10 sm:hover:border-gray-200">
            <div className="flex flex-col items-center justify-center flex-1 sm:items-stretch lg:items-center xl:items-stretch sm:flex-row lg:flex-col md: xl:flex-row min-h-96 sm:min-h-80 md:min-h-72 lg:min-h-80">
                {show.img && !posterThrewError && (
                    <img
                        className="z-20 w-full transition-all duration-300 ease-in-out transform rounded-lg sm:w-auto sm:max-h-80 sm:hover:shadow-lg sm:hover:scale-105"
                        src={show.img}
                        onError={() => {
                            setImgError(true);
                            setPosterThrewError(true);
                        }}
                    />
                )}
                <div
                    className={`flex flex-col self-stretch flex-1 block ${
                        show.img ? "pt-3" : "pt-0"
                    } sm:pt-0`}
                >
                    <ShowCardInformation
                        posterThrewError={posterThrewError}
                        invalidateOnShowsMutation={invalidateOnShowsMutation}
                        show={show}
                    />
                </div>
            </div>
            {/* <div className="flex-1" /> */}
            <div className="mt-3 sm:mt-6 md:hidden lg:block">
                <ShowCardOperationsBar
                    invalidateOnShowsMutation={invalidateOnShowsMutation}
                    show={show}
                />
            </div>
        </div>
    );
};
