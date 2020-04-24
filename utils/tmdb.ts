import { accessTokenTMBD } from "./keys";
import { BaseTMBD, MultiSearchTMBD } from "./urlsSnippets"; // cspell:words TMBD

export const search = async (searchString: string) => {
  if (searchString === "") return [];
  const headers = new Headers({
    Authorization: `Bearer ${accessTokenTMBD}`,
    "Content-Type": "application/json;charset=utf-8",
  });
  const res = await fetch(
    `${BaseTMBD}${MultiSearchTMBD}?language=en-US&page=1&include_adult=true&query=${searchString}`,
    { headers }
  );
  let data = await res.json();
  data = data.results;
  data = data.filter((result) => result.media_type !== "person");
  return data;
};
