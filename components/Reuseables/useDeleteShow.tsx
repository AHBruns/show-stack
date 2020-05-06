import { useState, useMemo, useContext } from "react";
import { EType } from "../../utils/fetcher";
import { REMOVE_SHOW } from "../../gql/removeShow";
import useSWR, { mutate } from "swr";
import { ConfirmationModalContext } from "../../contexts/ConfirmationModal.context";

export const useDeleteShow = (show, invalidateOnShowsMutation, onClose) => {
    const setConfirmationModalState = useContext(ConfirmationModalContext);

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

    return () =>
        setConfirmationModalState({
            prompt: "Are you sure you want to delete this show?",
            postPrompt: (
                <>
                    Deleted shows are <strong>gone</strong>, if you've just
                    finished watching this show you'll probably want to check
                    the show off as watched instead so it gets archived to your
                    watched list rather than deleted entirely (look for the
                    button with this icon{" "}
                    <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                    ).
                </>
            ),
            yea: {
                onClick: () => setAttemptToRemove(true),
                buttonText: "Delete it!",
            },
            nay: {
                buttonText: "Cancel",
            },
        });
};
