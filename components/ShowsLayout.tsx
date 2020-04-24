import React from "react";
import { ShowCard } from "./ShowsLayout/ShowCard";
import { StackContext } from "../contexts/StackContext";

export const ShowsLayout = () => {
  const [state, dispatch] = React.useContext(StackContext);

  return (
    <div className="grid grid-cols-1 gap-12 p-12 lg:grid-cols-2">
      {state.stack.map((_, index) => (
        <ShowCard key={index} />
      ))}
    </div>
  );
};
