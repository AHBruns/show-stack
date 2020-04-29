import React from "react";
import { ShowCard } from "./ShowsLayout/ShowCard";

const MemoizedShowCard = React.memo(ShowCard);

export const ShowsLayout = ({
    imgError,
    setImgError,
    genresToShow,
    showsData,
    invalidateOnShowsMutation,
}) => (
    <div className="relative w-full h-full overflow-scroll bg-gray-900 ">
        <div className="absolute inset-0">
            <div className="grid grid-cols-1 gap-12 p-6 sm:p-12 lg:grid-cols-2">
                {showsData
                    .filter((show) => {
                        if (
                            !genresToShow ||
                            Array.from(genresToShow).length === 0
                        )
                            return true;
                        return Array.from(genresToShow)
                            .map((genreToShow) => {
                                return (
                                    show.genres
                                        .split(",")
                                        .map((genre) => genre.trim())
                                        .indexOf(genreToShow) > -1
                                );
                            })
                            .reduce((acc, value) => acc || value, false);
                    })
                    .map((show, index) => (
                        <MemoizedShowCard
                            imgError={imgError}
                            setImgError={setImgError}
                            key={index}
                            invalidateOnShowsMutation={
                                invalidateOnShowsMutation
                            }
                            show={show}
                        />
                    ))
                    .reverse()}
            </div>
        </div>
    </div>
);
