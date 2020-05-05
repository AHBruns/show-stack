// cspell:words bigint
export const ADD_SHOW = `
  mutation ADD_SHOW(
    $img: String
    $description: String
    $title: String
    $tags: String
    $genres: String
    $tmdb_id: bigint
    $stack_id: bigint!
    $tmdb_media_type: String
  ) {
    insert_show(
      objects: {
        img: $img
        description: $description
        title: $title
        tags: $tags
        stack_id: $stack_id
        genres: $genres
        tmdb_id: $tmdb_id
        tmdb_media_type: $tmdb_media_type
      }
    ) {
      returning {
        id
        tags
        title
        description
        img
        genres
        stack_id
        tmdb_id
        tmdb_media_type
      }
    }
  }
`;
