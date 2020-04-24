import React from "react";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";
import { IAction } from "../types/IAction";

export const StackContext = React.createContext([]);

const { Provider } = StackContext;

const actionTypes = {
  SET: "SET",
  ADD: "ADDING",
  REMOVE: "REMOVING",
  REPLACE: "REPLACING",
  READY: "READY",
};

export interface IState {
  stack: object[]; // should have a tighter type here
  isStable: boolean;
  callsOut: number;
}

export const actions = {
  SET: (stack: object[]) => ({ type: actionTypes.SET, payload: stack }),
  ADD: (show: object) => ({ type: actionTypes.ADD, payload: show }),
  REMOVE: (index: number) => ({ type: actionTypes.REMOVE, payload: index }),
  REPLACE: (index: number, show: object) => ({
    type: actionTypes.REPLACE,
    payload: { index, show },
  }),
  READY: () => ({
    type: actionTypes.READY,
  }),
};

export const StackProvider = ({ children }) => {
  const [state, dispatch]: [
    IState,
    React.Dispatch<IAction>
  ] = useReducerWithSideEffects(
    (state: IState, action: IAction) => {
      switch (action.type) {
        case actionTypes.SET: {
          Update({
            ...state,
            callsOut: state.callsOut - 1,
            isStable: state.callsOut <= 1,
            stack: [...action.payload],
          });
        }
        case actionTypes.ADD: {
          UpdateWithSideEffect(
            {
              ...state,
              callsOut: state.callsOut + 1,
              isStable: false,
              stack: [...state.stack, action.payload],
            },
            (_, dispatch) => {
              alert(
                "FETCH: ADD, " +
                  JSON.stringify(state, null, 2) +
                  ", " +
                  JSON.stringify(action.payload, null, 2)
              );
              dispatch(actions.READY());
            }
          );
        }
        case actionTypes.REMOVE: {
          const newStack = [...state.stack];
          newStack.splice(action.payload, 1);
          UpdateWithSideEffect(
            {
              ...state,
              callsOut: state.callsOut + 1,
              isStable: false,
              stack: newStack,
            },
            (_, dispatch) => {
              alert(
                "FETCH: REMOVE, " +
                  JSON.stringify(state, null, 2) +
                  ", " +
                  JSON.stringify(action.payload, null, 2)
              );
              dispatch(actions.READY());
            }
          );
        }
        case actionTypes.REPLACE: {
          const newStack = [...state.stack];
          newStack[action.payload.index] = action.payload.show;
          UpdateWithSideEffect(
            {
              ...state,
              callsOut: state.callsOut + 1,
              isStable: false,
              stack: newStack,
            },
            (_, dispatch) => {
              alert(
                "FETCH: REPLACE, " +
                  JSON.stringify(state, null, 2) +
                  ", " +
                  JSON.stringify(action.payload, null, 2)
              );
              dispatch(actions.READY());
            }
          );
        }
        case actionTypes.READY: {
          Update({
            ...state,
            callsOut: state.callsOut - 1,
            isStable: state.callsOut <= 1, // <= 1 because we are subtracting one in the same operation.
          });
        }
        default:
          throw new Error("unknown modals stack action");
      }
    },
    { stack: [], callsOut: 1, isStable: false }
  );

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
