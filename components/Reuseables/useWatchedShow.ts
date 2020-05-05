import { useState, useMemo } from "react";
import { EType } from "../../utils/fetcher";
import { WATCHED_SHOW } from "../../gql/watchedShow";
import useSWR, { mutate } from "swr";

export const useWatchedShow = (show, invalidateOnShowsMutation, onClose) => {
    const [attemptToSetAsWatched, setAttemptToSetAsWatched] = useState(false);

    const watchedShowArgs = useMemo(
        () => [
            EType.HASURA_GRAPHQL,
            WATCHED_SHOW,
            ["id", "watched_timestamp"],
            show?.id,
            Date.now(),
        ],
        [show?.id]
    );

    useSWR(attemptToSetAsWatched ? watchedShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToSetAsWatched(false);
            onClose();
        },
    });

    return () => setAttemptToSetAsWatched(true);
};
