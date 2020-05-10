// cspell:words TMDB
import { accessTokenTMDB } from "./tmdb/keys";
import {
    BaseTMDB,
    MultiSearchTMDB,
    TelevisionGenres,
    MovieGenres,
    Configuration,
    TV,
    Movie,
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

export const byID = async ({ tmdb_id, title }) => {
    let res1;
    try {
        res1 = await fetch(`${BaseTMDB}${TV}${tmdb_id}&language=en-US`, {
            headers: headers(),
        });
    } catch (err) {
        res1 = {
            json: () => undefined,
        };
    }
    let res2;

    try {
        res2 = await fetch(`${BaseTMDB}${Movie}${tmdb_id}&language=en-US`, {
            headers: headers(),
        });
    } catch (err) {
        res2 = {
            json: () => undefined,
        };
    }
    const resps = await Promise.all([res1.json(), res2.json()]);
    console.log(resps);
    if (resps[0].id === undefined && resps[1].id !== undefined)
        return { ...resps[1], media_type: "movie" };
    else if (resps[1].id === undefined && resps[0].id !== undefined)
        return { ...resps[0], media_type: "tv" };
    else if (
        resps[0].name === title ||
        resps[0].original_title === title ||
        resps[0].title === title
    )
        return { ...resps[0], media_type: "tv" };
    else if (
        resps[1].name === title ||
        resps[1].original_title === title ||
        resps[1].title === title
    )
        return { ...resps[1], media_type: "movie" };
    else throw "can't find a corresponding show";
};
