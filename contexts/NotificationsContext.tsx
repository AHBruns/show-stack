import React from "react";
import { IAction } from "../types/IAction";
import { SaveToSeverTakingLongerThanExpectedNotification } from "../components/SaveToServerTakingLongerThanExpectedNotification";
import { SaveToServerCompleteAfterDelay } from "../components/SaveToServerCompleteAfterDelay";

export const NotificationContext = React.createContext(undefined);

const { Provider } = NotificationContext;

const actionTypes = {
  REMOVE: "REMOVE",
  PUSH: "PUSH",
};

export const notificationNames = {
  SaveToSeverTakingLongerThanExpectedNotification:
    "SaveToSeverTakingLongerThanExpectedNotification",
  SaveToServerCompleteAfterDelay: "SaveToServerCompleteAfterDelay",
};

const notificationRegistry = {
  SaveToSeverTakingLongerThanExpectedNotification: (name, autoClearTime) => (
    <SaveToSeverTakingLongerThanExpectedNotification
      key={name}
      name={name}
      autoClearTime={autoClearTime}
    />
  ),
  SaveToServerCompleteAfterDelay: (name, autoClearTime) => (
    <SaveToServerCompleteAfterDelay
      key={name}
      name={name}
      autoClearTime={autoClearTime}
    />
  ),
};

export const actions = {
  REMOVE: (index: number) => ({
    type: actionTypes.REMOVE,
    payload: index,
  }),
  PUSH: (notificationName, notificationID, autoClearTime?: number) => ({
    type: actionTypes.PUSH,
    payload: { notificationName, notificationID, autoClearTime },
  }),
};

// todo : add support for multiple notifications of the same type

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch]: [any, React.Dispatch<IAction>] = React.useReducer(
    (state: any, action: IAction) => {
      switch (action.type) {
        case actionTypes.REMOVE:
          const stateCopy = [...state];
          stateCopy.splice(action.payload, 1);
          return stateCopy;
        case actionTypes.PUSH:
          if (
            state.some(
              (elem) => elem.notificationID === action.payload.notificationID
            )
          )
            return [...state];
          else return [...state, action.payload];
        default:
          throw new Error("unknown notifications stack action");
      }
    },
    []
  );

  const notifications = state.map((item) =>
    notificationRegistry[item.notificationName](
      item.notificationName,
      item.autoClearTime
    )
  );
  const simpleState = state.map((item) => item.notificationName);

  return (
    <Provider value={[simpleState, dispatch, notifications]}>
      {children}
    </Provider>
  );
};
