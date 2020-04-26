import { gql } from "@apollo/client";

// todo
export const GET_USER = gql`
  query GET_USER($email: String!, $password: String!) {
    user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      email
      id
      password
      stack {
        id
      }
    }
  }
`;
