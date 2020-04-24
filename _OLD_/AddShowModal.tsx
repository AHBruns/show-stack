import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Formik, Field } from "formik";
import { multiSearch } from "./moviesAPI";
import { triggerAsyncId } from "async_hooks";

export const AddShowModal = ({ onClose, stack, setStack }) => {
  const [searchString, setSearchString] = useState("");
  const [suggestions, setSuggestions] = useState(undefined);

  useEffect(() => {
    if (searchString.length === 0) return;
    let cancel = false;
    (async () => {
      const res = await multiSearch(searchString);
      if (cancel) return;
      setSuggestions(
        res.results.filter(
          (result) => result.original_name ?? result.original_title
        )
      );
    })();
    return () => {
      cancel = true;
    };
  }, [searchString]);
  // cSpell:words Formik

  return (
    <Modal isOpen onClose={onClose}>
      <div className="w-full max-w-2xl p-4 mt-6 rounded-lg shadow-lg bg-gray-50">
        <h1 className="text-3xl font-semibold tracking-wider text-gray-900 ">
          Add A Show
        </h1>
        <Formik
          initialValues={{
            showName: "",
            tags: "",
            description: undefined,
            img: undefined,
          }}
          onSubmit={(values, actions) => {
            setStack([
              {
                title: values.showName,
                description: values.description,
                img: values.img,
                tags: values.tags.split(",").map((tag) => tag.trim()),
              },
              ...stack,
            ]);
            onClose();
          }}
        >
          {({ handleChange, handleBlur, values, handleSubmit }) => (
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="relative">
                <label
                  htmlFor="showName"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Show Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="showName"
                    name="showName"
                    onChange={(e) => {
                      handleChange(e);
                      setSearchString(e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.showName}
                    className="block w-full form-input sm:text-sm sm:leading-5 focus:shadow-outline-red focus:border-red-300"
                    placeholder="The Wire"
                  />
                </div>
                <Field
                  render={({ form }) => (
                    <div className="flex flex-wrap items-center justify-center mx-auto mt-2 transition-all duration-300 ease-in-out transform bg-white border border-gray-300 rounded-lg">
                      <div className={`w-0 ${suggestions ? "" : "h-24"}`} />
                      {suggestions?.slice(0, 8).map((suggestion) =>
                        suggestion.poster_path ? (
                          <div
                            onClick={(e) => {
                              form.setFieldValue(
                                "showName",
                                suggestion.title ??
                                  suggestion.original_title ??
                                  suggestion.name ??
                                  suggestion.original_name
                              );
                              form.setFieldValue(
                                "img",
                                `https://image.tmdb.org/t/p/original${suggestion.poster_path}`
                              );
                              form.setFieldValue(
                                "description",
                                suggestion.overview
                              );
                            }}
                            className="h-20 m-2 rounded-lg w-14 hover:z-50"
                          >
                            <img
                              className="object-cover min-w-full min-h-full transition-transform duration-300 ease-in-out transform rounded-lg shadow-md cursor-pointer hover:scale-200 "
                              src={`https://image.tmdb.org/t/p/original${suggestion.poster_path}`}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Add Tags
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="tags"
                    name="tags"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tags}
                    className="block w-full form-input sm:text-sm sm:leading-5 focus:shadow-outline-red focus:border-red-300"
                  />
                </div>
                <p className="mb-2 text-center">
                  {values.tags
                    .split(",")
                    .map((tag) =>
                      tag.trim() === "" ? null : (
                        <span className="mr-2 mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-red-800">
                          {tag.trim()}
                        </span>
                      )
                    )}
                </p>
              </div>
              <div className="mt-4 rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
