import React from "react";
import { ShowCardOperationsBar } from "../shared/ShowCardOperationsBar";
import { ShowCardTagsBar } from "./ShowCardInformation/ShowCardTagsBar";

const description =
  "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.";

export const ShowCardInformation = ({ show }) => {
  return (
    <div className="flex flex-col self-stretch flex-1 max-h-full pl-6 lg:pl-0 xl:pl-6 lg:mt-6 xl:mt-0">
      <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-900">
        {show.title || "Untitled"}
      </h1>
      {show.tags && (
        <div className="mt-2">
          <ShowCardTagsBar show={show} />
        </div>
      )}
      <p className="flex-1 mt-2 text-sm tracking-wider text-gray-700">
        {show.description.length > 322
          ? show.description.slice(0, 319).trim() + "..."
          : show.description}
      </p>
      <div className="hidden block mt-6 md:block lg:hidden">
        <ShowCardOperationsBar />
      </div>
    </div>
  );
};
