import React from "react";
import UserContext from "../contexts/User.context";
import { useRestoreUserOrRedirect } from "../hooks/useRestorUserOrRedirect";
import { GET_USER_STACK } from "../gql/getUserStack";
import { EType as EFetchType } from "../utils/fetcher";
import useSWR from "swr";
import { Shows } from "./Reuseables/Shows";

export const Watched = () => {
    const [userState] = React.useContext(UserContext);

    const [genresToShow, setGenresToShow] = React.useState(undefined);

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

    let { data, error } = useSWR(userState.user?.id ? swrArgs : null);

    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!data) return null;

    return (
        <>
            <Shows
                genresToShow={genresToShow}
                showsData={data.user_by_pk.stack.shows.filter(
                    (show) => show.watched
                )}
                invalidateOnShowsMutation={swrArgs}
                showTimestamps
                buttonSVGs={{
                    unwatchThisShow: (
                        <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" />
                        </svg>
                    ),
                    deleteThisShow: (
                        <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    ),
                }}
            />
        </>
    );
};
