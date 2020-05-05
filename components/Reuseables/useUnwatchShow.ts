import { useState, useMemo } from "react";
import { EType } from "../../utils/fetcher";
import useSWR, { mutate } from "swr";
import { UNWATCH_SHOW } from "../../gql/unwatchShow";

export const useUnwatchShow = (show, invalidateOnShowsMutation, onClose) => {
    const [attemptToSetAsUnwatched, setAttemptToSetAsUnwatched] = useState(
        false
    );

    const watchedShowArgs = useMemo(
        () => [EType.HASURA_GRAPHQL, UNWATCH_SHOW, ["id"], show?.id],
        [show?.id]
    );

    useSWR(attemptToSetAsUnwatched ? watchedShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToSetAsUnwatched(false);
            onClose();
        },
    });

    return () => setAttemptToSetAsUnwatched(true);
};
