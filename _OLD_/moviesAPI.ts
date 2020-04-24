const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWMyNmM5ZmRiMmM2OGM5Y2E3YzIxMmM4YjM4MzA2NCIsInN1YiI6IjVlOWUwM2NlZDE4ZmI5MDAxZDkyMzlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SZ3CR5pMHSjcyOLLJZdF-PorXrPM5Fd-CuOm0IOjIr8";

export const multiSearch = async (str) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&page=1&include_adult=true&query=${str}`,
    {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8",
      }),
    }
  );
  return await res.json();
};
