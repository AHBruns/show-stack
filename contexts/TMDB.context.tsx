import React from "react";
import useSWR from "swr";
import fetcher, { EType } from "../utils/fetcher";

export const TMDBContext = React.createContext(undefined);

export const TMDBProvider = ({ children }) => {
    const { data: televisionGenres, error: tvError } = useSWR(
        [EType.TMDB_TV_GENRES],
        fetcher
    );

    const { data: movieGenres, error: movieError } = useSWR(
        [EType.TMDB_MOVIE_GENRES],
        fetcher
    );

    const { data: config, error: configError } = useSWR(
        [EType.TMDB_CONFIG],
        fetcher
    );

    const newMovieGenres = movieGenres?.genres.map(({ id, name }) => {
        switch (name) {
            case "Action":
                return { id, name: "Action & Adventure" };
            case "Adventure":
                return { id, name: "Action & Adventure" };
            case "Science Fiction":
                return { id, name: "Sci-Fi & Fantasy" };
            case "Fantasy":
                return { id, name: "Sci-Fi & Fantasy" };
            case "War":
                return { id, name: "War & Politics" };
            default:
                return { id, name };
        }
    });

    const value = {
        televisionGenres: televisionGenres?.genres,
        movieGenres: movieGenres?.genres,
        genres: [
            ...(newMovieGenres || []),
            ...(televisionGenres?.genres || []),
        ],
        config,
    };

    return (
        <TMDBContext.Provider value={value}>{children}</TMDBContext.Provider>
    );
};
