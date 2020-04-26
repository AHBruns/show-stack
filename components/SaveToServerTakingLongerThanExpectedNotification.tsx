import React from "react";
import { NotificationContext, actions } from "../contexts/NotificationsContext";
import { NotificationLayout } from "./shared/NotificationLayout";

export const SaveToSeverTakingLongerThanExpectedNotification = ({
  name,
  autoClearTime,
}) => {
  const [state, dispatch] = React.useContext(NotificationContext);

  // todo : make custom hook
  React.useEffect(() => {
    if (autoClearTime)
      setTimeout(() => {
        for (const index in state) {
          if (state[index] === name)
            dispatch(actions.REMOVE(Number.parseInt(index)));
        }
      }, autoClearTime);
  }, []);

  return (
    <NotificationLayout name={name}>
      <div className="overflow-hidden rounded-lg shadow-xs">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-red-400"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium leading-5 text-gray-900">
                Your changes are taking a while to save!
              </p>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                We'll keep trying and let you know when you're good to go.
              </p>
            </div>
            <div className="flex flex-shrink-0 ml-4">
              <button
                onClick={() => {
                  for (const index in state) {
                    if (state[index] === name)
                      dispatch(actions.REMOVE(Number.parseInt(index)));
                  }
                }}
                className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </NotificationLayout>
  );
};
