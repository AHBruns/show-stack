import { GraphQLClient } from "graphql-request";
import {
    search,
    televisionGenres,
    movieGenres,
    config,
    byID,
} from "./fetcher/tmdb";

export enum EType {
    LOCAL_STORAGE,
    HASURA_GRAPHQL,
    TMDB_SEARCH,
    TMDB_TV_GENRES,
    TMDB_MOVIE_GENRES,
    TMDB_CONFIG,
}

export const hasuraClient = new GraphQLClient(
    "https://show-stack.herokuapp.com/v1/graphql",
    {
        headers: {
            "x-hasura-admin-secret": "show-stack-admin-secret",
        },
    }
);

export default (
    type: EType,
    storageKeyOrQueryOrBody: string,
    variableNames: string[],
    ...variables: string[]
) => {
    if (type === EType.LOCAL_STORAGE)
        return localStorage.getItem(storageKeyOrQueryOrBody);
    else if (type === EType.HASURA_GRAPHQL) {
        if (variableNames.length > 0) {
            const varObj = {};
            for (let i = 0; i < variableNames.length; i++)
                varObj[variableNames[i]] = variables[i];
            return hasuraClient.request(storageKeyOrQueryOrBody, varObj);
        } else return hasuraClient.request(storageKeyOrQueryOrBody);
    } else if (type === EType.TMDB_SEARCH) {
        return search(storageKeyOrQueryOrBody);
    } else if (type === EType.TMDB_TV_GENRES) {
        const result = televisionGenres();
        return result;
    } else if (type === EType.TMDB_MOVIE_GENRES) {
        return movieGenres();
    } else if (type === EType.TMDB_CONFIG) {
        return config();
    } else console.error("Unknown fetcher type.");
};
