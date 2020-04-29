import React from "react";
import { Input } from "../../shared/Input";
import { TextField } from "./AddShowModal/TextField";
import { Button } from "../../shared/Button";
import useSWR, { mutate } from "swr";
import { EType } from "../../../../utils/fetcher";
import { Badge } from "./AddShowModal/Badge";
import { ADD_SHOW } from "../../../../gql/addShow";
import { TMDBContext } from "../../../../contexts/TMDB.context";

export const AddShowModal = ({
    stackID,
    onClose,
    invalidateOnShowsMutation,
}) => {
    const { televisionGenres, movieGenres } = React.useContext(TMDBContext);

    const [attemptToAddShow, setAttemptToAddShow] = React.useState(false);

    const [imgSelected, setImgSelected] = React.useState();

    const [formValues, setFormValues] = React.useState({
        title: "",
        description: "",
        tags: "",
    });

    const { data } = useSWR([EType.TMDB_SEARCH, formValues.title]);

    const swrArgs = React.useMemo(() => {
        console.log(imgSelected, televisionGenres, movieGenres);
        return [
            EType.HASURA_GRAPHQL,
            ADD_SHOW,
            ["img", "description", "title", "tags", "stack_id", "genres"],
            imgSelected
                ? `https://image.tmdb.org/t/p/w780${
                      (imgSelected as { poster_path: string }).poster_path
                  }`
                : undefined,
            formValues.description,
            formValues.title,
            formValues.tags,
            stackID,
            (imgSelected as { media_type: string })?.media_type === "tv"
                ? (imgSelected as { genre_ids: number[] })?.genre_ids
                      .map(
                          (id) =>
                              (televisionGenres as any)?.filter(
                                  (pair) => pair.id === id
                              )?.[0]?.name
                      )
                      .join(", ")
                : (imgSelected as { media_type: string })?.media_type ===
                  "movie"
                ? (imgSelected as { genre_ids: number[] })?.genre_ids
                      .map(
                          (id) =>
                              (movieGenres as any)?.filter(
                                  (pair) => pair.id === id
                              )?.[0]?.name
                      )
                      .join(", ")
                : undefined,
        ];
    }, [formValues, stackID, imgSelected, televisionGenres, movieGenres]);
    const { isValidating } = useSWR(attemptToAddShow ? swrArgs : null, {
        onSuccess() {
            mutate(invalidateOnShowsMutation);
            setAttemptToAddShow(false);
            onClose();
        },
    });

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg pointer-events-auto">
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
                <div className="relative w-full h-64 overflow-scroll border border-gray-300 rounded-md shadow-sm">
                    <div className="absolute inset-0 flex items-center">
                        {data
                            ?.filter((result) =>
                                ["tv", "movie"].includes(result.media_type)
                            )
                            .filter((result) => result.poster_path)
                            .map((result) => (
                                <img
                                    key={result.poster_path}
                                    onClick={() => {
                                        setFormValues({
                                            ...formValues,
                                            title:
                                                result.name ??
                                                result.original_name ??
                                                result.title ??
                                                result.original_title,
                                            description: result.overview,
                                        });
                                        setImgSelected(result);
                                        //     `https://image.tmdb.org/t/p/w780${result.poster_path}`
                                        // );
                                    }}
                                    className="h-56 ml-4"
                                    src={`https://image.tmdb.org/t/p/w780${result.poster_path}`}
                                />
                            ))}
                        <div className="w-full h-full px-2 max-w-4" />
                    </div>
                </div>
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
                        onClick={() => setAttemptToAddShow(true)}
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
