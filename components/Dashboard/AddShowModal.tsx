import React from "react";
import { Input } from "../Reuseables/Input";
import { TextField } from "../Reuseables/TextField";
import { Button } from "../Reuseables/Button";
import useSWR, { mutate } from "swr";
import { EType } from "../../utils/fetcher";
import { Badge } from "./Badge";
import { ADD_SHOW } from "../../gql/addShow";
import { TMDBContext } from "../../contexts/TMDB.context";
import { ConfirmationModalContext } from "../../contexts/ConfirmationModal.context";

export const AddShowModal = ({
    stackID,
    onClose,
    invalidateOnShowsMutation,
}) => {
    const setConfirmationModalState = React.useContext(
        ConfirmationModalContext
    );

    const { genres } = React.useContext(TMDBContext);

    const [attemptToAddShow, setAttemptToAddShow] = React.useState(false);

    const [TMDBShowSelected, setTMDBShowSelected] = React.useState();

    const [formValues, setFormValues] = React.useState({
        title: "",
        description: "",
        tags: "",
    });

    const { data } = useSWR([EType.TMDB_SEARCH, formValues.title]);

    const swrArgs = React.useMemo(() => {
        return [
            EType.HASURA_GRAPHQL,
            ADD_SHOW,
            [
                "img",
                "description",
                "title",
                "tags",
                "stack_id",
                "genres",
                "tmdb_id",
                "tmdb_media_type",
            ],
            TMDBShowSelected
                ? `https://image.tmdb.org/t/p/w780${
                      (TMDBShowSelected as { poster_path: string }).poster_path
                  }`
                : null,
            formValues.description,
            formValues.title,
            formValues.tags,
            stackID,
            TMDBShowSelected
                ? (TMDBShowSelected as { genre_ids: number[] })?.genre_ids
                      .map((id) => {
                          return (genres as any)?.filter(
                              (pair) => pair.id === id
                          )?.[0]?.name;
                      })
                      .filter((genre) => genre)
                      .join(", ")
                : null,
            TMDBShowSelected ? (TMDBShowSelected as { id: number }).id : null,
            TMDBShowSelected
                ? (TMDBShowSelected as { media_type: string }).media_type
                : null,
        ];
    }, [formValues, stackID, TMDBShowSelected, genres]);
    const { isValidating } = useSWR(attemptToAddShow ? swrArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToAddShow(false);
            onClose();
        },
    });

    return (
        <div className="w-full max-w-lg max-h-full p-6 overflow-y-scroll bg-white rounded-lg pointer-events-auto">
            <h1 className="text-4xl font-bold tracking-wider text-gray-900">
                Add A Show
            </h1>
            <div className="mt-4">
                <Input
                    autoComplete="off"
                    label="Title"
                    id="title"
                    placeholder="Battlestar Galactica"
                    onChange={(e) =>
                        setFormValues({ ...formValues, title: e.target.value })
                    }
                    value={formValues.title}
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                    Is This It?
                </label>
                <div className="relative w-full h-64 overflow-x-auto border border-gray-300 rounded-md shadow-sm">
                    <div className="absolute inset-0 flex items-center">
                        {data && data.length > 0 ? (
                            <>
                                {data
                                    ?.filter((result) =>
                                        ["tv", "movie"].includes(
                                            result.media_type
                                        )
                                    )
                                    .filter((result) => result.poster_path)
                                    .map((result) => (
                                        <img
                                            key={Math.random() * Date.now()}
                                            onClick={() => {
                                                setFormValues({
                                                    ...formValues,
                                                    title:
                                                        result.name ??
                                                        result.original_name ??
                                                        result.title ??
                                                        result.original_title,
                                                    description:
                                                        result.overview,
                                                });
                                                setTMDBShowSelected(result);
                                            }}
                                            className="h-56 ml-4 transition-all duration-300 ease-in-out transform rounded-lg shadow-md cursor-pointer sm:hover:scale-105"
                                            src={`https://image.tmdb.org/t/p/w780${result.poster_path}`}
                                        />
                                    ))}
                                <div className="w-full h-full px-2 max-w-4" />
                            </>
                        ) : (
                            <h1 className="p-4 mx-auto font-normal tracking-wider text-gray-300">
                                Type a title to search...
                            </h1>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <TextField
                    rows={5}
                    autoComplete="off"
                    label="Description"
                    id="description"
                    placeholder="The greatest Sci-Fi series ever..."
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            description: e.target.value,
                        })
                    }
                    value={formValues.description}
                />
            </div>
            <div className="mt-4">
                <Input
                    autoComplete="off"
                    label="Tags"
                    id="tags"
                    placeholder="tag 1, tag 2, etc..."
                    onChange={(e) =>
                        setFormValues({ ...formValues, tags: e.target.value })
                    }
                    value={formValues.tags}
                />
            </div>
            <div className="flex flex-wrap">
                {formValues.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                    .map((tag, index) => (
                        <div className="mt-2 mr-2">
                            <Badge
                                key={tag + "___" + index.toString()}
                                text={tag}
                            />
                        </div>
                    ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-2">
                    <Button
                        onClick={() => {
                            if (TMDBShowSelected) {
                                setAttemptToAddShow(true);
                            } else {
                                setConfirmationModalState({
                                    prompt:
                                        "Do you still want to create this custom show?",
                                    postPrompt:
                                        "You're trying to create a custom show (rather than selecting a search result). Unfortunately, custom shows don't have a lot of the cool built-in features that regular shows do.",
                                    yea: {
                                        onClick: () =>
                                            setAttemptToAddShow(true),
                                        buttonText: "Make it!",
                                    },
                                    nay: {
                                        buttonText: "Cancel",
                                    },
                                });
                            }
                        }}
                        disabled={isValidating}
                    >
                        Make it!
                    </Button>
                </div>
                <div className="flex">
                    <Button onClick={onClose} disabled={isValidating}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};
