const gql = String.raw;

export const ADD_MISSING_FIELD = gql`
    mutation ADD_MISSING_FIELDS(
        $id: bigint!
        $tmdb_media_type: String
        $tmdb_run_time: bigint
    ) {
        update_show(
            where: { id: { _eq: $id } }
            _set: {
                tmdb_media_type: $tmdb_media_type
                tmdb_run_time: $tmdb_run_time
            }
        ) {
            returning {
                tmdb_media_type
                tmdb_run_time
            }
        }
    }
`;
