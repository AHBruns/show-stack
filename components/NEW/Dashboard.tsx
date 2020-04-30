import React from "react";
import useSWR from "swr";
import UserContext from "../../contexts/User.context";
import { EType as EFetchType } from "../../utils/fetcher";
import { GET_USER_STACK } from "../../gql/getUserStack";
import { useRestoreUserOrRedirect } from "../../hooks/useRestorUserOrRedirect";
import { ShowsLayout } from "./Dashboard/ShowsLayout";
import { AddShowLayout } from "./Dashboard/AddShowLayout";
import { FilterLayout } from "./Dashboard/FilterLayout";

const ImgErrorBanner = () => {
    const [useHidBanner, setUserHidBanner] = React.useState(false);
    if (useHidBanner) return null;
    return (
        <div className="z-50 flex flex-col items-start justify-between w-full p-2 bg-red-300 shadow-2xl sm:items-center sm:flex-row space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
            <h1 className="flex items-center justify-start flex-1 text-sm text-red-700">
                ShowStack's images service is currently experiencing a large
                outage. Until this outage is resolved some show posters may not
                be available. Sorry for the inconvienence.
            </h1>
            <button
                onClick={() => setUserHidBanner(true)}
                className="px-2 py-1 text-white bg-gray-900 rounded-lg shadow-md"
            >
                Close
            </button>
        </div>
    );
};

export const Dashboard = () => {
    const [imgError, setImgError] = React.useState(false);

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
            {imgError && <ImgErrorBanner />}
            <ShowsLayout
                imgError={imgError}
                setImgError={setImgError}
                genresToShow={genresToShow}
                showsData={data.user_by_pk.stack.shows.filter(
                    (show) => !show.watched
                )}
                invalidateOnShowsMutation={swrArgs}
            />
            <FilterLayout
                genresToShow={genresToShow}
                setGenresToShow={setGenresToShow}
                showsData={data.user_by_pk.stack.shows}
            />
            <AddShowLayout
                stackID={data.user_by_pk.stack.id}
                invalidateOnShowsMutation={swrArgs}
            />
        </>
    );
};
