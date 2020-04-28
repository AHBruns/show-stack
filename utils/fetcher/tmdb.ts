// cspell:words TMDB
import { accessTokenTMDB } from "./tmdb/keys";
import { BaseTMDB, MultiSearchTMDB } from "./tmdb/urlSnippets";

export const search = async (searchString: string) => {
  if (searchString === "") return [];
  const headers = new Headers({
    Authorization: `Bearer ${accessTokenTMDB}`,
    "Content-Type": "application/json;charset=utf-8",
  });
  const res = await fetch(
    `${BaseTMDB}${MultiSearchTMDB}?language=en-US&page=1&include_adult=true&query=${searchString}`,
    { headers }
  );
  let data = await res.json();
  data = data.results;
  data = data.filter((result) => result.media_type !== "person");
  return data;
};
