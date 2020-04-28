import React from "react";
import { ShowCard } from "./ShowsLayout/ShowCard";

const MemoizedShowCard = React.memo(ShowCard);

export const ShowsLayout = ({ showsData, invalidateOnShowsMutation }) => (
    <div className="relative w-full h-full overflow-scroll">
        <div className="absolute inset-0">
            <div className="grid grid-cols-1 gap-12 p-6 sm:p-12 lg:grid-cols-2">
                {showsData
                    .map((show, index) => (
                        <MemoizedShowCard
                            key={index}
                            invalidateOnShowsMutation={
                                invalidateOnShowsMutation
                            }
                            show={show}
                        />
                    ))
                    .reverse()}
            </div>
        </div>
    </div>
);
