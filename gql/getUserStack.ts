export const GET_USER_STACK = `
  query GET_USER_STACK($id: bigint!) {
    user_by_pk(id: $id) {
      stack {
        id
        name
        shows {
          description
          id
          img
          stack_id
          tags
          title
          genres
          watched
          watched_timestamp
          tmdb_media_type
          tmdb_id
          tmdb_run_time
        }
      }
    }
  }
`;
