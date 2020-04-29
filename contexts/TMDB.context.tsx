import React from "react";
import useSWR from "swr";
import fetcher, { EType } from "../utils/fetcher";

export const TMDBContext = React.createContext(undefined);

export const TMDBProvider = ({ children }) => {
    const { data: televisionGenres, error: tvError } = useSWR(
        [EType.TMDB_TV_GENRES, true],
        fetcher
    );

    const { data: movieGenres, error: movieError } = useSWR(
        [EType.TMDB_MOVIE_GENRES, true],
        fetcher
    );

    const { data: config, error: configError } = useSWR(
        [EType.TMDB_CONFIG, true],
        fetcher
    );

    const value = {
        televisionGenres: televisionGenres?.genres,
        movieGenres: movieGenres?.genres,
        config,
    };

    return (
        <TMDBContext.Provider value={value}>{children}</TMDBContext.Provider>
    );
};
