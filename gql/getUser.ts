export const GET_USER = `
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
