export const UNWATCH_SHOW = `
    mutation UNWATCH_SHOW($id: bigint!) {
        update_show(
            where: {
                id: {
                    _eq: $id
                }
            }, _set: {
                watched: false,
            }
        ) {
            returning {
                watched
            }
        }
    }
`;
