import { gql } from "@apollo/client";

// cspell:words bigint
export const ADD_SHOW = `
  mutation ADD_SHOW(
    $img: String
    $description: String
    $title: String
    $tags: String
    $stack_id: bigint!
  ) {
    insert_show(
      objects: {
        img: $img
        description: $description
        title: $title
        tags: $tags
        stack_id: $stack_id
      }
    ) {
      returning {
        id
        tags
        title
        description
        img
        stack_id
      }
    }
  }
`;
