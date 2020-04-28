// cspell:words bigint
export const REMOVE_SHOW = `
  mutation REMOVE_SHOW($id: bigint!) {
    delete_show(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
