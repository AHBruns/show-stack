export const WATCHED_SHOW = `
    mutation WATCHED_SHOW($id: bigint!, $watched_timestamp: bigint!) {
        update_show(
            where: {
                id: {
                    _eq: $id
                }
            }, _set: {
                watched: true,
                watched_timestamp: $watched_timestamp
            }
        ) {
            returning {
                watched
            }
        }
    }
`;
