import { gql } from "@apollo/client";

// cspell:words bigint
export const GET_STACK = gql`
  query GET_STACK($pk: bigint!) {
    stack_by_pk(id: $pk) {
      name
      id
      shows {
        id
        title
        description
        tags
        img
      }
    }
  }
`;
