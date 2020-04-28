import React from "react";
import useSWR from "swr";
import UserContext from "../../contexts/User.context";
import { EType as EFetchType } from "../../utils/fetcher";
import { GET_USER_STACK } from "../../gql/getUserStack";
import { useRestoreUserOrRedirect } from "../../hooks/useRestorUserOrRedirect";
import { ShowsLayout } from "./ShowsLayout";
import { AddShowLayout } from "./AddShowLayout";

export const Dashboard = () => {
    const [userState] = React.useContext(UserContext);

    useRestoreUserOrRedirect();

    const swrArgs = React.useMemo(
        () => [
            EFetchType.HASURA_GRAPHQL,
            GET_USER_STACK,
            ["id"],
            userState.user?.id,
        ],
        [userState.user?.id]
    );

    const { data, error } = useSWR(userState.user?.id ? swrArgs : null);

    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!data) return null;
    else {
        return (
            <>
                <ShowsLayout
                    showsData={data.user_by_pk.stack.shows}
                    invalidateOnShowsMutation={swrArgs}
                />
                <AddShowLayout
                    stackID={data.user_by_pk.stack.id}
                    invalidateOnShowsMutation={swrArgs}
                />
            </>
        );
    }
};
