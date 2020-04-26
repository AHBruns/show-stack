import React from "react";
import { ModalLayout } from "./shared/ModalLayout";
// cspell:words Formik
import { Formik, Form, Field } from "formik";
import { DefaultTextField } from "./shared/DefaultTextField";
import { Badge } from "./AddAShowModal/Badge";
import { ModalDuoButton } from "./shared/ModalDuoButton";
import { ModalsStackContext, actions } from "../contexts/ModalsStackContext";
// cspell:words TMDB
import { search } from "../utils/tmdb";
import { Spinner } from "./AddAShowModal/Spinner";
import { DefaultTextArea } from "./AddAShowModal/DefaultTextArea";
import {
  StackContext,
  actions as stackActions,
} from "../contexts/StackContext";

// todo : hook up TMDB
// todo : context for for stack state that we can mutate here

export const AddAShowModal = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  const [
    isLoadingNewSearchResults,
    setIsLoadingNewSearchResults,
  ] = React.useState(false);
  const [_, dispatch] = React.useContext(ModalsStackContext);
  const [stackState, stackDispatch] = React.useContext(StackContext);
  const [searchString, setSearchString] = React.useState("");

  React.useEffect(() => {
    let canceled = false;

    (async () => {
      if (canceled) return;
      let isLoading = true;
      setTimeout(() => {
        if (isLoading) setIsLoadingNewSearchResults(true);
      }, 1000); // only show loading indicator if we've been loading for > 1000ms
      if (canceled) return;
      const results = await search(searchString);
      isLoading = false;
      if (canceled) return;
      setSearchResults(
        results.filter(
          (result) =>
            result.hasOwnProperty("poster_path") ||
            result.hasOwnProperty("backdrop_path")
        )
      );
      if (canceled) return;
      setIsLoadingNewSearchResults(false);
    })();

    return () => {
      canceled = true;
    };
  }, [searchString]);

  return (
    <ModalLayout>
      <>
        <h1 className="text-4xl font-bold tracking-wider text-gray-900">
          Add A Show
        </h1>
        <div className="mt-4">
          <Formik
            initialValues={{ title: "", description: "", tags: "", img: null }}
            onSubmit={(values) => {
              stackDispatch(
                stackActions.ADD(values, stackState, stackDispatch)
              );
              dispatch(actions.POP());
            }}
          >
            {({ values, handleBlur, handleChange, setFieldValue }) => (
              <Form>
                <DefaultTextField
                  id="title"
                  label="Show Title"
                  name="title"
                  onChange={(e) => {
                    setSearchString(e.target.value);
                    setFieldValue("img", null);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="Search for a show here..."
                  value={values.title}
                />
                <div className="mt-4">
                  <DefaultTextArea
                    id="description"
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    value={values.description}
                  />
                </div>
                <Field>
                  {({ form }) => (
                    <div
                      className={`z-40 flex items-start w-full transition-all duration-1000 ease-in-out overflow-y-hidden transform border border-gray-300 rounded-lg shadow-sm space-x-4 ${
                        isLoadingNewSearchResults
                          ? "overflow-x-hidden"
                          : "overflow-x-scroll"
                      } ${
                        searchResults.length > 0
                          ? "mt-4 p-4 h-64 opacity-100"
                          : "h-0 p-0 mt-0 opacity-0"
                      }`}
                    >
                      {searchResults
                        .filter(
                          (result) => result.poster_path ?? result.backdrop_path
                        )
                        .map((result) => (
                          <div
                            key={JSON.stringify(result)}
                            className={`relative flex-shrink-0 w-40 h-56 overflow-hidden transition-all duration-300 ease-in-out transform rounded-lg shadow-md shadow-lg hover:shadow-lg ${
                              isLoadingNewSearchResults ? "opacity-0" : ""
                            }`}
                          >
                            <img
                              className="object-cover min-w-full min-h-full"
                              src={`https://image.tmdb.org/t/p/original${
                                result.poster_path ?? result.backdrop_path
                              }`}
                            />
                            <div
                              className="opacity-0 hover:opacity-100"
                              onClick={() => {
                                console.log("filling");
                                form.setFieldValue(
                                  "img",
                                  `https://image.tmdb.org/t/p/original${
                                    result.poster_path ?? result.backdrop_path
                                  }`
                                );
                                form.setFieldValue(
                                  "title",
                                  result.original_name ??
                                    result.name ??
                                    result.original_title ??
                                    result.title ??
                                    ""
                                );
                                form.setFieldValue(
                                  "description",
                                  result.overview ?? ""
                                );
                              }}
                            >
                              <div className="absolute inset-0 bg-gray-900 opacity-50" />
                              <div className="absolute inset-0 flex items-center justify-center p-2 cursor-pointer">
                                <h1 className="text-2xl font-medium tracking-wider text-center text-white">
                                  +
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      {
                        <div
                          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 delay-300 ease-in-out ${
                            isLoadingNewSearchResults
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <Spinner />
                        </div>
                      }
                      <div className="h-64 pr-px -mr-px" />
                    </div>
                  )}
                </Field>
                <DefaultTextField
                  mt
                  noAutoComplete
                  id="tags-input"
                  label="Add Tags"
                  name="tags"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="HBO"
                  value={values.tags}
                />
                <div className="flex flex-wrap">
                  {values.tags
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
                <div className="mt-4">
                  <ModalDuoButton
                    left={{
                      name: "Make it!",
                    }}
                    right={{
                      onClick() {
                        dispatch(actions.POP());
                      },
                      name: "Cancel",
                    }}
                  />
                </div>
                {/* <div
                  className={`transition-all duration-1000 ease-in-out ${
                    stackState.callsOut > 0
                      ? "h-65 opacity-100"
                      : "h-0 opacity-0"
                  }`}
                >
                  <Spinner />
                </div> */}
              </Form>
            )}
          </Formik>
        </div>
      </>
    </ModalLayout>
  );
};
