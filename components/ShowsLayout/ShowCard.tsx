import React, { useState } from "react";
import { ShowCardOperationsBar } from "./shared/ShowCardOperationsBar";
import { ShowCardInformation } from "./ShowCard/ShowCardInformation";

export const ShowCard = ({}) => {
  const [cardIsHovered, setCardIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setCardIsHovered(true)}
      onMouseLeave={() => setCardIsHovered(false)}
      className="w-full p-6 transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:shadow-2xl hover:scale-105 hover:z-10 hover:border-gray-200"
    >
      <div className="flex items-end lg:flex-col md: xl:flex-row min-h-96 sm:min-h-80 md:min-h-72 lg:min-h-80">
        <div
          className={`mx-auto w-full h-full overflow-hidden transition-all hover:scale-105 duration-300 ease-in-out transform rounded-lg sm:w-56 sm:w-48 ${
            cardIsHovered ? "shadow-lg" : "shadow-inner"
          }`}
        >
          <img
            className="z-20 object-cover min-w-full min-h-full"
            src="https://image.tmdb.org/t/p/original/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
          />
        </div>
        <ShowCardInformation />
      </div>
      <div className="mt-6 md:hidden lg:block">
        <ShowCardOperationsBar />
      </div>
    </div>
  );
};
