import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-unfetch";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    fetch,
    uri: "https://show-stack.herokuapp.com/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "show-stack-admin-secret", //cspell:ignore hasura
    },
  }),
});
