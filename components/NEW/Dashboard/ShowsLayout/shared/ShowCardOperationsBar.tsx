import React from "react";
import { OperationButton } from "../../shared/OperationButton";
import useSWR, { mutate } from "swr";
import { REMOVE_SHOW } from "../../../../../gql/removeShow";
import { EType } from "../../../../../utils/fetcher";

export const ShowCardOperationsBar = ({ invalidateOnShowsMutation, show }) => {
    const [attemptToRemove, setAttemptToRemove] = React.useState(false);

    const removeShowArgs = React.useMemo(
        () => [EType.HASURA_GRAPHQL, REMOVE_SHOW, ["id"], show.id],
        [show.id]
    );

    useSWR(attemptToRemove ? removeShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToRemove(false);
        },
    });

    return (
        <div className="flex flex-wrap justify-center p-0 transition-all duration-1000 ease-in-out transform bg-gray-100 border border-gray-300 rounded-lg sm:bg-white sm:border-gray-100 sm:p-2 sm:hover:scale-105 sm:hover:shadow-2xl sm:hover:border-gray-200">
            <OperationButton
                onClick={() =>
                    alert(
                        "This operation isn't ready quite yet. Check back soon."
                    )
                }
                name="Update"
            />
            <OperationButton
                onClick={() => setAttemptToRemove(true)}
                name="Delete"
            />
        </div>
    );
};
