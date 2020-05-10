import React from "react";
import { FilterButton } from "./FilterButton";

const Flyout = ({ isShown, canShrink, children }: any) => (
    <div
        className={`py-2 text-gray-900 bg-white border border-gray-300 rounded-lg overflow-auto shadow-md transform transition-all origin-bottom-right ease-in-out duration-300 ${
            isShown
                ? "opacity-100 pointer-events-auto scale-100"
                : "opacity-0 pointer-events-none scale-50"
        } ${canShrink ? "flex-shrink-1" : "flex-shrink-0"}`}
    >
        {children}
    </div>
);

export const Filters = ({
    genresToShow,
    setGenresToShow,
    runtimeRange,
    setRuntimeRange,
    showsData,
}) => {
    const [filtersBarIsOpen, setFiltersBarIsOpen] = React.useState(false);

    const [filterType, setFilterType] = React.useState(undefined);

    const genres = Array.from(
        showsData.reduce((acc, show) => {
            if (!show.genres) return acc; // ignore genre-less things
            show.genres
                .split(",")
                .map((genre) => genre.trim())
                .filter((genre) => genre !== "NONE") // initially genre-less was denoted by genres = "NONE"
                .filter((genre) => genre)
                .forEach((genre) => acc.add(genre));
            return acc;
        }, new Set())
    );

    return (
        <div className="fixed inset-0 z-40 pointer-events-none">
            <div className="absolute top-0 left-0 flex flex-col items-end justify-end mt-4 ml-4 right-4 space-y-2 bottom-4">
                <Flyout
                    canShrink
                    isShown={filtersBarIsOpen && filterType !== undefined}
                >
                    {filterType === "genre" &&
                        (genres.length === 0 ? (
                            <h1 className="max-w-sm text-sm text-gray-700">
                                None of your current shows have genre data
                                attached to them. This may either be because
                                your shows are legacy (from before genres
                                existed on ShowStack), custom (the search
                                functionality wasn't used during creation), or
                                genre-less (they just weren't tagged in the
                                database). To get genre filtering simply add a
                                show that has a genre. Adding genres to existing
                                shows is coming soon!
                            </h1>
                        ) : (
                            <ul>
                                {genres.map((genre) => (
                                    <li
                                        onClick={() => {
                                            if (genresToShow?.has(genre)) {
                                                // just doing one genre at a time now
                                                //
                                                // genresToShow.delete(genre);
                                                // return setGenresToShow(
                                                //     new Set([
                                                //         ...Array.from(
                                                //             genresToShow ?? []
                                                //         ),
                                                //     ])
                                                // );
                                                return setGenresToShow(
                                                    new Set([])
                                                );
                                            } else
                                                return setGenresToShow(
                                                    // just doing one genre at a time now
                                                    //
                                                    // new Set([
                                                    //     ...Array.from(
                                                    //         genresToShow ?? []
                                                    //     ),
                                                    //     genre,
                                                    // ])
                                                    new Set([genre])
                                                );
                                        }}
                                        className={`pl-2 py-1 sm:hover:bg-gray-300 pr-4 cursor-pointer ${
                                            genresToShow?.has(genre)
                                                ? "bg-gray-200"
                                                : "bg-transparent"
                                        }`}
                                    >
                                        {genre}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    {filterType === "runtime" && (
                        <div className="w-72">
                            <div className="px-2 py-1">
                                <p className="text-sm">
                                    Max Runtime: {runtimeRange[1]} mins.
                                </p>
                                <div className="flex items-end justify-between pt-1 text-xs text-gray-500">
                                    {runtimeRange[0]} mins.&nbsp;&nbsp;
                                    <input
                                        type="range"
                                        min={runtimeRange[0]}
                                        max={500}
                                        value={runtimeRange[1]}
                                        onChange={(e) =>
                                            setRuntimeRange([
                                                runtimeRange[0],
                                                e.target.value,
                                            ])
                                        }
                                    />
                                    &nbsp;&nbsp;500 mins.
                                </div>
                            </div>
                            <div className="w-full px-2 py-1">
                                <p className="text-sm">
                                    Min Runtime: {runtimeRange[0]} mins.
                                </p>
                                <div className="flex items-end justify-between w-full pt-1 text-xs text-gray-500">
                                    0 mins. &nbsp;&nbsp;
                                    <input
                                        type="range"
                                        min={0}
                                        max={runtimeRange[1]}
                                        value={runtimeRange[0]}
                                        onChange={(e) =>
                                            setRuntimeRange([
                                                e.target.value,
                                                runtimeRange[1],
                                            ])
                                        }
                                    />
                                    &nbsp;&nbsp;
                                    {runtimeRange[1]} mins.
                                </div>
                            </div>
                        </div>
                    )}
                </Flyout>
                <Flyout isShown={filtersBarIsOpen}>
                    <ul>
                        <li
                            className="py-1 pl-2 pr-4 cursor-pointer sm:hover:bg-gray-300"
                            onClick={() => setFilterType("genre")}
                        >
                            By Genre
                        </li>
                        <li
                            className="py-1 pl-2 pr-4 cursor-pointer sm:hover:bg-gray-300"
                            onClick={() => setFilterType("runtime")}
                        >
                            By Runtime
                        </li>
                    </ul>
                </Flyout>
                <div className="flex items-center space-x-4">
                    <FilterButton
                        isX={filtersBarIsOpen}
                        onClick={() => {
                            setFiltersBarIsOpen(!filtersBarIsOpen);
                            setFilterType(undefined);
                            setGenresToShow(undefined);
                            setRuntimeRange([0, 500]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
