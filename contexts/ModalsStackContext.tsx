import React from "react";
import { CreateAStackModal } from "../components/CreateAStackModal";
import { AddAShowModal } from "../components/AddAShowModal";
import { IAction } from "../types/IAction";

export const ModalsStackContext = React.createContext(undefined);

const { Provider } = ModalsStackContext;

const actionTypes = {
  POP: "POP",
  PUSH: "PUSH",
};

export const modalNames = {
  CREATE_A_STACK: "ADD_A_STACK",
  ADD_A_SHOW: "ADD_A_SHOW",
};

const modalRegistry = {
  [modalNames.CREATE_A_STACK]: <CreateAStackModal />, // replace with actual modal
  [modalNames.ADD_A_SHOW]: <AddAShowModal />, // replace with actual modal
};

export const actions = {
  POP: () => ({ type: actionTypes.POP }),
  PUSH: (modalName) => ({ type: actionTypes.PUSH, payload: modalName }),
};

export const ModalsStackProvider = ({ children }) => {
  const [state, dispatch]: [
    string[],
    React.Dispatch<IAction>
  ] = React.useReducer((state: string[], action: IAction) => {
    switch (action.type) {
      case actionTypes.POP:
        const stateCopy = [...state];
        stateCopy.pop();
        return stateCopy;
      case actionTypes.PUSH:
        return [...state, action.payload];
      default:
        throw new Error("unknown modals stack action");
    }
  }, []);

  return (
    <Provider value={[state, dispatch]}>
      {children}
      {state.map((modalName) => modalRegistry[modalName])}
    </Provider>
  );
};
