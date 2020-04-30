export const WATCHED_SHOW = `
    mutation WATCHED_SHOW($id: bigint!) {
        update_show(where: {id: {_eq: $id}}, _set: {watched: true}) {
            returning {
                watched
            }
        }
    }
`;
