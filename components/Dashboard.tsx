import React from "react";
import useSWR, { mutate } from "swr";
import UserContext from "../contexts/User.context";
import { EType as EFetchType } from "../utils/fetcher";
import { GET_USER_STACK } from "../gql/getUserStack";
import { useRestoreUserOrRedirect } from "../hooks/useRestorUserOrRedirect";
import { AddShow } from "./Dashboard/AddShow";
import { Filters } from "./Dashboard/Filters";
import { Shows } from "./Reuseables/Shows";
import { Spinner } from "./Reuseables/Spinner";
import { byID } from "../utils/fetcher/tmdb";
import { hasuraClient } from "../utils/fetcher";
import { ADD_MISSING_FIELD } from "../gql/addMissingFields";

export const Dashboard = () => {
    const [userState] = React.useContext(UserContext);

    const [genresToShow, setGenresToShow] = React.useState(undefined);

    const [runtimeRange, setRuntimeRange] = React.useState([0, 500]);

    const [hideRuntimelessShows, setHideRuntimelessShows] = React.useState(
        false
    );

    const [spinnerIsVisible, setSpinnerIsVisible] = React.useState(false);

    useRestoreUserOrRedirect();

    React.useEffect(() => {
        // if we aren't loaded after a second show a spinner
        setTimeout(() => setSpinnerIsVisible(true), 1000);
    }, []);

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

    React.useEffect(() => {
        const shows = data?.user_by_pk?.stack?.shows;
        if (!shows) return;

        // we'd like all our shows to have this info, but some old shows don't
        // we then try to upgrade these old shows when we see them
        const idealFields = ["tmdb_media_type", "tmdb_run_time"];

        shows.forEach(async (show) => {
            if (!show.tmdb_id) return;
            const shouldAttemptToUpdate = idealFields.reduce((acc, elem) => {
                return acc || show[elem] === null;
            }, false);
            console.log(shouldAttemptToUpdate);
            if (shouldAttemptToUpdate) {
                const respBody = await byID({
                    tmdb_id: show.tmdb_id,
                    title: show.title,
                });
                await hasuraClient.request(ADD_MISSING_FIELD, {
                    id: show.id,
                    tmdb_media_type: respBody.media_type ?? null,
                    tmdb_run_time:
                        respBody.runtime ??
                        respBody.episode_run_time[0] ??
                        null,
                });
                mutate(swrArgs);
            }
        });
    }, [data]);

    if (error)
        return (
            <div className="flex items-center justify-center w-full h-full p-4">
                <p className="max-w-md p-8 text-2xl font-medium tracking-widest text-center text-gray-900 bg-white border border-gray-200 rounded-lg shadow-2xl">
                    Oops! Looks like something went wrong.
                </p>
            </div>
        );
    if (!data && spinnerIsVisible)
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner />
            </div>
        );
    if (!data) return null;

    return (
        <>
            {data.user_by_pk.stack.shows.length > 0 ? (
                <Shows
                    hideRuntimelessShows={hideRuntimelessShows}
                    genresToShow={genresToShow}
                    runtimeRange={runtimeRange}
                    showsData={data.user_by_pk.stack.shows.filter(
                        (show) => !show.watched
                    )}
                    invalidateOnShowsMutation={swrArgs}
                    buttonSVGs={{
                        watchedThisShow: (
                            <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        ),
                        editThisShow: (
                            <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
            ) : (
                <div className="flex items-center justify-center w-full h-full p-4">
                    <p className="max-w-md p-8 text-2xl font-medium tracking-widest text-center text-gray-900 bg-white border border-gray-200 rounded-lg shadow-2xl">
                        Click the plus button in the bottom left of the screen
                        to add your first show.
                    </p>
                </div>
            )}
            {data.user_by_pk.stack.shows.length > 0 && (
                <Filters
                    hideRuntimelessShows={hideRuntimelessShows}
                    setHideRuntimelessShows={setHideRuntimelessShows}
                    runtimeRange={runtimeRange}
                    setRuntimeRange={setRuntimeRange}
                    genresToShow={genresToShow}
                    setGenresToShow={setGenresToShow}
                    showsData={data.user_by_pk.stack.shows}
                />
            )}
            <AddShow
                stackID={data.user_by_pk.stack.id}
                invalidateOnShowsMutation={swrArgs}
            />
        </>
    );
};
