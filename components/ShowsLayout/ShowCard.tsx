import React, { useState } from "react";
import { ShowCardOperationsBar } from "./shared/ShowCardOperationsBar";
import { ShowCardInformation } from "./ShowCard/ShowCardInformation";

export const ShowCard = ({ index, show }) => {
  const [cardIsHovered, setCardIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setCardIsHovered(true)}
      onMouseLeave={() => setCardIsHovered(false)}
      className="w-full p-6 transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg hover:shadow-2xl hover:scale-105 hover:z-10 hover:border-gray-200"
    >
      <div className="flex items-start justify-center lg:items-center xl:items-start lg:flex-col md: xl:flex-row min-h-96 sm:min-h-80 md:min-h-72 lg:min-h-80">
        <img
          className="z-20 transition-all duration-300 ease-in-out transform rounded-lg max-h-80 hover:scale-105"
          src={
            show.img ??
            "https://i.pinimg.com/originals/76/92/79/76927939ad6134c1b5b0fa472803ca4b.png"
          }
        />
        <div className="hidden sm:block">
          <ShowCardInformation index={index} show={show} />
        </div>
      </div>
      <div className="mt-6 md:hidden lg:block">
        <ShowCardOperationsBar index={index} />
      </div>
    </div>
  );
};
