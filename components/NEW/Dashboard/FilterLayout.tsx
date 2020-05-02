import React from "react";
import { FilterButton } from "./FilterLayout/FilterButton";
import { OperationButton } from "./shared/OperationButton";

export const FilterLayout = ({ genresToShow, setGenresToShow, showsData }) => {
    const [filtersBarIsOpen, setFiltersBarIsOpen] = React.useState(false);

    const [filterType, setFilterType] = React.useState(undefined);

    const genres = Array.from(
        showsData.reduce((acc, show) => {
            console.log(show);
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
            <div className="absolute flex flex-col items-end mt-4 ml-4 right-4 space-y-4 bottom-4">
                <div
                    className={`py-1 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md pointer-events-auto w-32 ${
                        filtersBarIsOpen && filterType === "genre"
                            ? "block"
                            : "hidden"
                    }`}
                >
                    {genres.length === 0 ? (
                        <h1 className="max-w-sm text-sm text-gray-700">
                            None of your current shows have genre data attached
                            to them. This may either be because your shows are
                            legacy (from before genres existed on ShowStack),
                            custom (the search functionality wasn't used during
                            creation), or genre-less (they just weren't tagged
                            in the database). To get genre filtering simply add
                            a show that has a genre. Adding genres to existing
                            shows is coming soon!
                        </h1>
                    ) : (
                        <ul>
                            {genres.map((genre) => (
                                <li
                                    onClick={() => {
                                        if (genresToShow?.has(genre)) {
                                            genresToShow.delete(genre);
                                            return setGenresToShow(
                                                new Set([
                                                    ...Array.from(
                                                        genresToShow ?? []
                                                    ),
                                                ])
                                            );
                                        } else
                                            return setGenresToShow(
                                                new Set([
                                                    ...Array.from(
                                                        genresToShow ?? []
                                                    ),
                                                    genre,
                                                ])
                                            );
                                    }}
                                    className={`px-2 py-1 sm:hover:bg-gray-300 cursor-pointer ${
                                        genresToShow?.has(genre)
                                            ? "bg-gray-200"
                                            : "bg-transparent"
                                    }`}
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <div
                        className={`bg-white text-gray-900 rounded-lg border-gray-300 shadow-md border pointer-events-auto ${
                            filtersBarIsOpen ? "block" : "hidden"
                        }`}
                    >
                        <OperationButton
                            onClick={() => setFilterType("genre")}
                            name="By Genre"
                        />
                    </div>
                    <FilterButton
                        isX={filtersBarIsOpen}
                        onClick={() => {
                            setFiltersBarIsOpen(!filtersBarIsOpen);
                            setFilterType(undefined);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
