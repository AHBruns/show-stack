// cspell:words bigint
export const ADD_SHOW = `
  mutation ADD_SHOW(
    $img: String
    $description: String
    $title: String
    $tags: String
    $genres: String
    $stack_id: bigint!
  ) {
    insert_show(
      objects: {
        img: $img
        description: $description
        title: $title
        tags: $tags
        stack_id: $stack_id
        genres: $genres
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
      }
    }
  }
`;
