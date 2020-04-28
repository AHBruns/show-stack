import { gql } from "@apollo/client";

export const ADD_USER = `
  mutation ADD_USER($email: String!, $password: String!) {
    insert_user(
      objects: {
        email: $email
        password: $password
        stack: { data: { name: "" } }
      }
    ) {
      returning {
        email
        password
        id
        stack {
          id
        }
      }
    }
  }
`;
