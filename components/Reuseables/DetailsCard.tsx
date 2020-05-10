import React from "react";
import { useDeleteShow } from "./useDeleteShow";
import { useEditShow } from "./useEditShow";
import { useWatchedShow } from "./useWatchedShow";
import { useUnwatchShow } from "./useUnwatchShow";

// todo : reduce the code duplication here SM & MD can be combined & a lot of the other sizes can be shared

const DetailsCardBG = () => (
    <div className="fixed inset-0 overflow-hidden opacity-75">
        <div className="w-full h-full bg-gray-500" />
    </div>
);

const XLDetailsCard = ({ buttons, show, onClose }) => {
    if (!show) return null;
    return (
        <>
            <DetailsCardBG />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative flex w-2/3 rounded-md shadow-2xl h-2/3 bg-gray-50">
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
                    {show.tmdb_media_type && (
                        <div className="absolute top-0 left-0 px-2 py-1 font-bold tracking-wider text-gray-800 transform -translate-x-8 -translate-y-8 rounded-lg shadow-lg bg-gray-50">
                            {show.tmdb_media_type?.toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 my-10 mr-10 space-y-4">
                        <h1 className="text-4xl font-bold tracking-wider text-gray-900">
                            {show.title}
                        </h1>
                        <hr className="border-gray-200" />
                        <div className="space-y-2">
                            {(show.genres || show.tmdb_run_time) && (
                                <p className="text-sm font-light text-gray-700">
                                    <span className="font-semibold">
                                        {show.tmdb_run_time && (
                                            <>
                                                {show.tmdb_run_time}{" "}
                                                mins.&nbsp;&nbsp;
                                            </>
                                        )}
                                    </span>
                                    {show.genres
                                        .split(",")
                                        .map((genre) => genre.trim())
                                        .join(" | ")}
                                </p>
                            )}
                            {show.tags && (
                                <div className="flex space-x-2">
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
                            )}
                        </div>
                        <hr className="border-gray-200" />
                        <p className="text-sm tracking-wide text-gray-700">
                            {show.description}
                        </p>
                    </div>
                    <div className="flex flex-col w-16 h-full overflow-hidden rounded-r-md">
                        <div className="flex flex-col justify-end flex-1 pt-2 bg-gray-200">
                            {buttons.reduce(
                                (acc, elem) => [<hr />, elem, ...acc],
                                []
                            )}
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

const LGDetailsCard = ({ buttons, show, onClose }) => {
    if (!show) return null;
    return (
        <>
            <DetailsCardBG />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full p-12 overflow-hidden">
                    <div className="relative flex items-stretch w-full h-full overflow-hidden rounded-lg shadow-2xl">
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
                        {show.tmdb_media_type && (
                            <div className="absolute px-2 py-1 font-bold tracking-wider text-gray-800 rounded-lg shadow-lg top-4 left-4 bg-gray-50">
                                {show.tmdb_media_type?.toUpperCase()}
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
                                    {(show.genres || show.tmdb_run_time) && (
                                        <p className="text-sm font-light text-gray-700">
                                            <span className="font-semibold">
                                                {show.tmdb_run_time && (
                                                    <>
                                                        {show.tmdb_run_time}{" "}
                                                        mins.&nbsp;&nbsp;
                                                    </>
                                                )}
                                            </span>
                                            {show.genres
                                                .split(",")
                                                .map((genre) => genre.trim())
                                                .join(" | ")}
                                        </p>
                                    )}
                                    {show.tags && (
                                        <div className="flex mt-2">
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
                                    )}
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
                                {buttons.reduce(
                                    (acc, elem) => [
                                        <hr className="w-px h-full bg-gray-900 border-transparent" />,
                                        elem,
                                        ...acc,
                                    ],
                                    []
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-8 rounded-full shadow-lg cursor-pointer bg-gray-50"
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

const MDDetailsCard = ({ buttons, show, onClose }) => {
    if (!show) return null;
    return (
        <>
            <DetailsCardBG />
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
                                    {show.tmdb_media_type && (
                                        <div className="absolute px-2 py-1 mx-auto font-bold tracking-wider text-gray-800 rounded-lg shadow-lg top-2 bg-gray-50">
                                            {show.tmdb_media_type?.toUpperCase()}
                                        </div>
                                    )}
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
                                    {(show.genres || show.tmdb_run_time) && (
                                        <p className="text-sm font-light text-gray-700">
                                            <span className="font-semibold">
                                                {show.tmdb_run_time && (
                                                    <>
                                                        {show.tmdb_run_time}{" "}
                                                        mins.&nbsp;&nbsp;
                                                    </>
                                                )}
                                            </span>
                                            {show.genres
                                                .split(",")
                                                .map((genre) => genre.trim())
                                                .join(" | ")}
                                        </p>
                                    )}
                                    {show.tags && (
                                        <div className="flex mt-2">
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
                                    )}
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
                            {buttons.reduce(
                                (acc, elem) => [
                                    elem,
                                    <hr className="w-px h-full bg-gray-900 border-transparent" />,
                                    ...acc,
                                ],
                                []
                            )}
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-8 rounded-full shadow-lg cursor-pointer bg-gray-50"
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

const SMDetailsCard = ({ buttons, show, onClose }) => {
    if (!show) return null;
    return (
        <>
            <DetailsCardBG />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="w-full h-full p-4 sm:p-6">
                    <div className="flex flex-col w-full h-full overflow-hidden bg-white rounded-lg">
                        <div className="relative flex-1 h-full overflow-hidden">
                            {show.img ? (
                                <img
                                    src={show.img}
                                    className="absolute w-full transform shadow-inner scale-200"
                                    style={{ filter: "blur(4vw)" }}
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
                            <div className="absolute inset-0 p-3">
                                <div className="flex items-center justify-center h-full">
                                    <img
                                        src={show.img}
                                        className="object-contain h-full shadow-2xl"
                                    />
                                </div>
                                {show.tmdb_media_type && (
                                    <div className="absolute top-0 right-0 h-8 px-2 py-1 mx-auto font-bold tracking-wider text-gray-800 rounded-bl-lg shadow-lg bg-gray-50">
                                        {show.tmdb_media_type?.toUpperCase()}
                                    </div>
                                )}
                            </div>
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
                                    {(show.genres || show.tmdb_run_time) && (
                                        <p className="text-sm font-light text-gray-700">
                                            <span className="font-semibold">
                                                {show.tmdb_run_time && (
                                                    <>
                                                        {show.tmdb_run_time}{" "}
                                                        mins.&nbsp;&nbsp;
                                                    </>
                                                )}
                                            </span>
                                            {show.genres
                                                .split(",")
                                                .map((genre) => genre.trim())
                                                .join(" | ")}
                                        </p>
                                    )}
                                    {show.tags && (
                                        <div className="flex mt-2">
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
                                    )}
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
                            {buttons.reduce(
                                (acc, elem) => [
                                    elem,
                                    <hr className="w-px h-full bg-gray-900 border-transparent" />,
                                    ...acc,
                                ],
                                []
                            )}
                        </div>
                    </div>
                </div>
                <div
                    onClick={onClose}
                    className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 m-4 rounded-tl-lg rounded-br-lg shadow-lg cursor-pointer sm:rounded-full sm:m-2 bg-gray-50"
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

export const DetailsCard = ({
    isShown,
    show,
    onClose,
    invalidateOnShowsMutation,
    buttonSVGs,
}) => {
    const deleteThisShow = useDeleteShow(
        show,
        invalidateOnShowsMutation,
        onClose
    );
    const editThisShow = useEditShow();
    const watchedThisShow = useWatchedShow(
        show,
        invalidateOnShowsMutation,
        onClose
    );
    const unwatchThisShow = useUnwatchShow(
        show,
        invalidateOnShowsMutation,
        onClose
    );

    const buttonOnClicks = {
        deleteThisShow,
        editThisShow,
        watchedThisShow,
        unwatchThisShow,
    };

    return (
        <div
            className={`z-50 transition-all ease-in-out duration-1000 ${
                isShown
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="hidden xl:block">
                <XLDetailsCard
                    show={show}
                    onClose={onClose}
                    buttons={Object.entries(buttonSVGs).map(
                        ([onClickName, SVG]) => {
                            return (
                                <button
                                    onClick={buttonOnClicks[onClickName]}
                                    className="flex items-center justify-center w-full h-16 text-gray-400 hover:bg-gray-300 hover:shadow-inset focus:outline-none focus:bg-gray-300"
                                >
                                    {SVG}
                                </button>
                            );
                        }
                    )}
                />
            </div>
            <div className="hidden lg:block xl:hidden">
                <LGDetailsCard
                    show={show}
                    onClose={onClose}
                    buttons={Object.entries(buttonSVGs).map(
                        ([onClickName, SVG]) => {
                            return (
                                <button
                                    onClick={buttonOnClicks[onClickName]}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-900 hover:shadow-inset"
                                >
                                    {SVG}
                                </button>
                            );
                        }
                    )}
                />
            </div>
            <div className="hidden md:block lg:hidden">
                <MDDetailsCard
                    show={show}
                    onClose={onClose}
                    buttons={Object.entries(buttonSVGs).map(
                        ([onClickName, SVG]) => {
                            return (
                                <button
                                    onClick={buttonOnClicks[onClickName]}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-900 hover:shadow-inset"
                                >
                                    {SVG}
                                </button>
                            );
                        }
                    )}
                />
            </div>
            <div className="block md:hidden">
                <SMDetailsCard
                    show={show}
                    onClose={onClose}
                    buttons={Object.entries(buttonSVGs).map(
                        ([onClickName, SVG]) => {
                            return (
                                <button
                                    onClick={buttonOnClicks[onClickName]}
                                    className="flex items-center justify-center w-16 h-full text-gray-400 hover:bg-gray-900 hover:shadow-inset"
                                >
                                    {SVG}
                                </button>
                            );
                        }
                    )}
                />
            </div>
        </div>
    );
};
