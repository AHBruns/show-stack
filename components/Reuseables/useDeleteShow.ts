import { useState, useMemo } from "react";
import { EType } from "../../utils/fetcher";
import { REMOVE_SHOW } from "../../gql/removeShow";
import useSWR, { mutate } from "swr";

export const useDeleteShow = (show, invalidateOnShowsMutation, onClose) => {
    const [attemptToRemove, setAttemptToRemove] = useState(false);

    const removeShowArgs = useMemo(
        () => [EType.HASURA_GRAPHQL, REMOVE_SHOW, ["id"], show?.id],
        [show?.id]
    );

    useSWR(attemptToRemove ? removeShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToRemove(false);
            onClose();
        },
    });

    return () => setAttemptToRemove(true);
};
