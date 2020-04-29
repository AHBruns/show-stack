// cspell:words TMDB
import { accessTokenTMDB } from "./tmdb/keys";
import {
    BaseTMDB,
    MultiSearchTMDB,
    TelevisionGenres,
    MovieGenres,
    Configuration,
} from "./tmdb/urlSnippets";

const headers = () =>
    new Headers({
        Authorization: `Bearer ${accessTokenTMDB}`,
        "Content-Type": "application/json;charset=utf-8",
    });

export const search = async (searchString: string) => {
    if (searchString === "") return [];
    const res = await fetch(
        `${BaseTMDB}${MultiSearchTMDB}?language=en-US&page=1&include_adult=true&query=${searchString}`,
        { headers: headers() }
    );
    let data = await res.json();
    data = data.results;
    data = data.filter((result) => result.media_type !== "person");
    return data;
};

export const televisionGenres = async () => {
    const res = await fetch(`${BaseTMDB}${TelevisionGenres}?language=en-US`, {
        headers: headers(),
    });
    let data = await res.json();
    return data;
};

export const movieGenres = async () => {
    const res = await fetch(`${BaseTMDB}${MovieGenres}?language=en-US`, {
        headers: headers(),
    });
    let data = await res.json();
    return data;
};

export const config = async () => {
    const res = await fetch(`${BaseTMDB}${Configuration}?language=en-US`, {
        headers: headers(),
    });
    let data = await res.json();
    return data;
};
