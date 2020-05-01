import React from "react";
import useSWR, { mutate } from "swr";
import { EType } from "../../utils/fetcher";
import { REMOVE_SHOW } from "../../gql/removeShow";
import { WATCHED_SHOW } from "../../gql/watchedShow";

const useDeleteShow = (show, invalidateOnShowsMutation) => {
    const [attemptToRemove, setAttemptToRemove] = React.useState(false);

    const removeShowArgs = React.useMemo(
        () => [EType.HASURA_GRAPHQL, REMOVE_SHOW, ["id"], show?.id],
        [show?.id]
    );

    useSWR(attemptToRemove ? removeShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToRemove(false);
        },
    });

    return () => setAttemptToRemove(true);
};

const useEditShow = () => {
    return () => alert("This feature is coming soon.");
};

const useWatchedShow = (show, invalidateOnShowsMutation) => {
    const [attemptToSetAsWatched, setAttemptToSetAsWatched] = React.useState(
        false
    );

    const watchedShowArgs = React.useMemo(
        () => [EType.HASURA_GRAPHQL, WATCHED_SHOW, ["id"], show?.id],
        [show?.id]
    );

    useSWR(attemptToSetAsWatched ? watchedShowArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToSetAsWatched(false);
        },
    });

    return () => setAttemptToSetAsWatched(true);
};

const DetailsCardBG = ({ show }) => (
    <div className="fixed inset-0 overflow-hidden opacity-75">
        {show.img ? (
            <div className="w-full h-full transform scale-125">
                <img
                    src={show.img}
                    className="w-full h-full"
                    style={{ filter: "blur(150px) grayscale(1) invert(1)" }}
                />
            </div>
        ) : (
            <div className="w-full h-full bg-gray-500" />
        )}
    </div>
);

const XLDetailsCard = ({ show, onClose, invalidateOnShowsMutation }) => {
    const deleteThisShow = useDeleteShow(show, invalidateOnShowsMutation);
    const editThisShow = useEditShow();
    const watchedThisShow = useWatchedShow(show, invalidateOnShowsMutation);
    if (!show) return null;
    return (
        <>
            <DetailsCardBG show={show} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex w-2/3 rounded-md shadow-2xl h-2/3 bg-gray-50">
                    {show.img ? (
                        <img
                            src={show.img}
                            className="h-full transform -translate-x-10 -translate-y-10 rounded-md shadow-2xl"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full transform -translate-x-10 -translate-y-10 bg-gray-800 rounded-md shadow-2xl w-96">
                            <h1 className="text-4xl font-semibold text-center text-gray-50">
                                {show.title}
                            </h1>
                        </div>
                    )}
                    <div className="flex-1 my-10 mr-10">
                        <h1 className="text-4xl font-bold tracking-wider text-gray-900">
                            {show.title}
                        </h1>
                        <div className="mt-4">
                            <hr className="border-gray-200" />
                        </div>
                        <div className="mt-4">
                            <div className="flex">
                                {show.tags
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter((tag) => tag)
                                    .map((tag) => (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-200 text-gray-800">
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <hr className="border-gray-200" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm tracking-wide text-gray-700">
                                {show.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-16 h-full overflow-hidden rounded-r-md">
                        <div className="flex flex-col justify-end flex-1 pt-2 bg-gray-200">
                            <button
                                onClick={() => {
                                    watchedThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-full h-16 text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr />
                            <button
                                onClick={() => {
                                    editThisShow();
                                }}
                                className="flex items-center justify-center w-full h-16 text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr />
                            <button
                                onClick={() => {
                                    deleteThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-full h-16 text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                        </div>
                        <div
                            onClick={onClose}
                            className="flex items-center justify-center w-full h-16 text-gray-600 bg-gray-800 shadow-inner cursor-pointer hover:text-white"
                        >
                            <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const LGDetailsCard = ({ show, onClose, invalidateOnShowsMutation }) => {
    const deleteThisShow = useDeleteShow(show, invalidateOnShowsMutation);
    const editThisShow = useEditShow();
    const watchedThisShow = useWatchedShow(show, invalidateOnShowsMutation);
    if (!show) return null;
    return (
        <>
            <DetailsCardBG show={show} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full p-12 overflow-hidden">
                    <div className="flex items-stretch w-full h-full rounded-lg shadow-2xl">
                        {show.img ? (
                            <img src={show.img} className="h-full" />
                        ) : (
                            <div className="flex items-center justify-center w-1/2 h-full text-white bg-gray-600 shadow-inner">
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-64 h-64 transform -rotate-45 opacity-50"
                                >
                                    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                        )}
                        <div className="flex flex-col flex-1">
                            <div className="flex-1 p-8 bg-white">
                                <h1 className="text-4xl font-bold tracking-wider text-gray-900">
                                    {show.title}
                                </h1>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <div className="flex">
                                        {show.tags
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter((tag) => tag)
                                            .map((tag) => (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-200 text-gray-800">
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm tracking-wide text-gray-700">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end w-full h-16 bg-gray-800 border-t border-gray-900">
                                <button
                                    onClick={() => {
                                        watchedThisShow();
                                        onClose();
                                    }}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                                >
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
                                </button>
                                <hr className="w-px h-full bg-gray-900 border-transparent" />
                                <button
                                    onClick={() => {
                                        editThisShow();
                                    }}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                                >
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
                                </button>
                                <hr className="w-px h-full bg-gray-900 border-transparent" />
                                <button
                                    onClick={() => {
                                        deleteThisShow();
                                        onClose();
                                    }}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                                >
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
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-8 rounded-full shadow-lg bg-gray-50"
                >
                    <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </>
    );
};

const MDDetailsCard = ({ show, onClose, invalidateOnShowsMutation }) => {
    const deleteThisShow = useDeleteShow(show, invalidateOnShowsMutation);
    const editThisShow = useEditShow();
    const watchedThisShow = useWatchedShow(show, invalidateOnShowsMutation);
    if (!show) return null;
    return (
        <>
            <DetailsCardBG show={show} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full p-12 overflow-hidden">
                    <div className="flex flex-col w-full h-full overflow-auto rounded-lg">
                        <div className="relative flex-1 h-full overflow-hidden bg-gray-500">
                            {show.img ? (
                                <img
                                    src={show.img}
                                    className="absolute w-full transform shadow-inner scale-200"
                                    style={{ filter: "blur(20px)" }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-600 shadow-inner">
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        className="w-64 h-64 transform -rotate-45 opacity-50"
                                    >
                                        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute inset-0 p-6">
                                <div className="flex items-center justify-center h-full">
                                    <img
                                        src={show.img}
                                        className="h-full shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white">
                            <div className="flex-1 m-8">
                                <h1 className="text-4xl font-bold tracking-wider text-gray-900">
                                    {show.title}
                                </h1>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <div className="flex">
                                        {show.tags
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter((tag) => tag)
                                            .map((tag) => (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-200 text-gray-800">
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm tracking-wide text-gray-700">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-16 bg-gray-800 border-t border-gray-900">
                            <button
                                onClick={() => {
                                    watchedThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr className="w-px h-full bg-gray-900 border-transparent" />
                            <button
                                onClick={() => {
                                    editThisShow();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr className="w-px h-full bg-gray-900 border-transparent" />
                            <button
                                onClick={() => {
                                    deleteThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-8 rounded-full shadow-lg bg-gray-50"
                >
                    <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </>
    );
};

const SMDetailsCard = ({ show, onClose, invalidateOnShowsMutation }) => {
    const deleteThisShow = useDeleteShow(show, invalidateOnShowsMutation);
    const editThisShow = useEditShow();
    const watchedThisShow = useWatchedShow(show, invalidateOnShowsMutation);
    if (!show) return null;
    return (
        <>
            <DetailsCardBG show={show} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full p-4 sm:p-6">
                    <div className="flex flex-col w-full h-full overflow-hidden bg-white rounded-lg">
                        <div className="relative flex-1 h-full overflow-hidden">
                            {show.img ? (
                                <img src={show.img} className="w-full" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-600 shadow-inner">
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        className="w-64 h-64 transform -rotate-45 opacity-50"
                                    >
                                        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col bg-white">
                            <div className="flex-1 m-4 sm:m-8">
                                <h1 className="text-4xl font-bold leading-tight tracking-wider text-gray-900">
                                    {show.title}
                                </h1>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <div className="flex">
                                        {show.tags
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter((tag) => tag)
                                            .map((tag) => (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-200 text-gray-800">
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <hr className="border-gray-200" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm tracking-wide text-gray-700">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-16 bg-gray-800 border-t border-gray-900">
                            <button
                                onClick={() => {
                                    watchedThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr className="w-px h-full bg-gray-900 border-transparent" />
                            <button
                                onClick={() => {
                                    editThisShow();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                            <hr className="w-px h-full bg-gray-900 border-transparent" />
                            <button
                                onClick={() => {
                                    deleteThisShow();
                                    onClose();
                                }}
                                className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-300 hover:shadow-inset"
                            >
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
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-4 rounded-tl-lg rounded-br-lg shadow-lg sm:rounded-full sm:m-2 bg-gray-50"
                >
                    <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </>
    );
};

export const NewShowLayout = ({
    imgError,
    setImgError,
    genresToShow,
    showsData,
    invalidateOnShowsMutation,
}) => {
    const [showSelectedShow, setShowSelectedShow] = React.useState(false);
    const [selectedShow, setSelectedShow] = React.useState(null);

    return (
        <>
            <div className="relative w-full h-full overflow-y-scroll bg-gray-50">
                <div className="absolute top-0 left-0 right-0 flex flex-wrap justify-center m-4">
                    {showsData.map((showData) => {
                        return showData.img ? (
                            <div
                                onClick={() => {
                                    setSelectedShow(showData);
                                    setShowSelectedShow(true);
                                }}
                                className="m-4 transition-all duration-300 ease-in-out transform cursor-pointer md:hover:scale-105"
                            >
                                <img
                                    className="w-full sm:w-36 md:w-48 lg:w-56 xl:w-64"
                                    src={showData.img}
                                />
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    setSelectedShow(showData);
                                    setShowSelectedShow(true);
                                }}
                                className="flex items-center justify-center w-full p-4 m-4 transition-all duration-300 ease-in-out transform bg-gray-800 cursor-pointer md:hover:scale-105 sm:w-36 md:w-48 lg:w-56 xl:w-64"
                            >
                                <h1 className="text-2xl font-semibold text-center text-gray-50">
                                    {showData.title}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={`z-50 transition-all ease-in-out duration-1000 ${
                    showSelectedShow
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="hidden xl:block">
                    <XLDetailsCard
                        invalidateOnShowsMutation={invalidateOnShowsMutation}
                        show={selectedShow}
                        onClose={() => setShowSelectedShow(false)}
                    />
                </div>
                <div className="hidden lg:block xl:hidden">
                    <LGDetailsCard
                        invalidateOnShowsMutation={invalidateOnShowsMutation}
                        show={selectedShow}
                        onClose={() => setShowSelectedShow(false)}
                    />
                </div>
                <div className="hidden md:block lg:hidden">
                    <MDDetailsCard
                        invalidateOnShowsMutation={invalidateOnShowsMutation}
                        show={selectedShow}
                        onClose={() => setShowSelectedShow(false)}
                    />
                </div>
                <div className="block md:hidden">
                    <SMDetailsCard
                        invalidateOnShowsMutation={invalidateOnShowsMutation}
                        show={selectedShow}
                        onClose={() => setShowSelectedShow(false)}
                    />
                </div>
            </div>
        </>
    );
};
