import React from "react";
import { DetailsCard } from "./DetailsCard";

export const Shows = ({
    genresToShow,
    runtimeRange,
    hideRuntimelessShows,
    showsData,
    invalidateOnShowsMutation,
    showTimestamps,
    buttonSVGs,
}: any) => {
    const [showSelectedShow, setShowSelectedShow] = React.useState(false);
    const [selectedShow, setSelectedShow] = React.useState(null);

    // todo : rip out this img grid into a sub-component
    return (
        <>
            <div className="relative w-full h-full overflow-y-scroll bg-gray-50">
                <div className="absolute top-0 left-0 right-0 flex flex-wrap justify-center m-4">
                    {showsData
                        .filter((show) => {
                            if (
                                !genresToShow ||
                                Array.from(genresToShow).length === 0
                            )
                                return true;
                            return Array.from(genresToShow)
                                .map((genreToShow) => {
                                    if (!show.genres) return false;
                                    return (
                                        show.genres
                                            .split(",")
                                            .map((genre) => genre.trim())
                                            .indexOf(genreToShow) > -1
                                    );
                                })
                                .reduce((acc, value) => acc || value, false);
                        })
                        .filter((show) => {
                            if (!show.tmdb_run_time)
                                return !hideRuntimelessShows;
                            return (
                                show.tmdb_run_time >= runtimeRange[0] &&
                                show.tmdb_run_time <= runtimeRange[1]
                            );
                        })
                        .map((showData) => {
                            return showData.img ? (
                                <div
                                    onClick={() => {
                                        setSelectedShow(showData);
                                        setShowSelectedShow(true);
                                    }}
                                    className="relative w-full m-4 transition-all duration-300 ease-in-out transform bg-gray-900 cursor-pointer sm:w-36 md:w-48 lg:w-56 xl:w-64 /w-full md:hover:scale-105"
                                >
                                    <div
                                        className="w-full h-0"
                                        style={{
                                            paddingTop: "150%",
                                        }}
                                    >
                                        <img
                                            className="absolute inset-0 object-cover"
                                            src={showData.img}
                                        />
                                        {showTimestamps && (
                                            <p className="absolute top-0 left-0 px-3 py-1 -mt-3 -ml-3 text-xs tracking-wider text-white bg-gray-800 rounded-full shadow-md">
                                                {showData.watched_timestamp
                                                    ? new Date(
                                                          showData.watched_timestamp
                                                      ).toLocaleDateString()
                                                    : "???"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setSelectedShow(showData);
                                        setShowSelectedShow(true);
                                    }}
                                    className="relative flex items-center justify-center w-full p-4 m-4 transition-all duration-300 ease-in-out transform bg-gray-800 cursor-pointer md:hover:scale-105 sm:w-36 md:w-48 lg:w-56 xl:w-64"
                                >
                                    <h1 className="text-2xl font-semibold text-center text-gray-50">
                                        {showData.title}
                                    </h1>
                                    {showTimestamps && (
                                        <p className="absolute top-0 left-0 px-3 py-1 -mt-3 -ml-3 text-xs tracking-wider text-white bg-gray-800 rounded-full shadow-md">
                                            {showData.watched_timestamp
                                                ? new Date(
                                                      showData.watched_timestamp
                                                  ).toLocaleDateString()
                                                : "???"}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
            <DetailsCard
                isShown={showSelectedShow}
                show={selectedShow}
                onClose={() => setShowSelectedShow(false)}
                invalidateOnShowsMutation={invalidateOnShowsMutation}
                buttonSVGs={buttonSVGs ?? {}}
            />
        </>
    );
};
