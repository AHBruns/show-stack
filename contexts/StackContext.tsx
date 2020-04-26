import React from "react";
import { IAction } from "../types/IAction";
import { client } from "../gql/client";
import { ADD_SHOW } from "../gql/addShow";
import { REMOVE_SHOW } from "../gql/removeShow";

export const StackContext = React.createContext([]);

const { Provider } = StackContext;

// todo : refactor into wrapper
const sideEffects = {
  ADD: async (payload, state, dispatch) => {
    dispatch(actions.INC_CALLS());
    client
      .mutate({
        mutation: ADD_SHOW,
        variables: {
          ...payload,
          stack_id: state.id,
        },
      })
      .then((result) => {
        dispatch(
          actions.LOCAL_UPDATE({
            index: state.stack.length,
            show: result.data.insert_show.returning[0],
          })
        );
      })
      .then(() => dispatch(actions.DEC_CALLS()));
  },
  REMOVE: async (payload, state, dispatch) => {
    dispatch(actions.INC_CALLS());
    client
      .mutate({
        mutation: REMOVE_SHOW,
        variables: {
          id: state.stack[payload].id,
        },
      })
      .then(() => dispatch(actions.DEC_CALLS()));
  },
  UPDATE: async (payload, state, dispatch) => {
    dispatch(actions.INC_CALLS());
    setTimeout(() => dispatch(actions.DEC_CALLS()), 1000);
  },
};

const actionTypes = {
  SET: "SET",
  SET_ID: "SET_ID",
  ADD: "ADDING",
  REMOVE: "REMOVING",
  UPDATE: "UPDATE",
  INC_CALLS: "INC_CALLS",
  DEC_CALLS: "DEC_CALLS",
};

export const actions = {
  // we have data that we are replacing the entire stack with
  // used on initialization
  SET: (payload: any) => {
    return { type: actionTypes.SET, payload };
  },
  // we are setting the stacks database ID for use in later calls
  SET_ID: (payload: any) => {
    return { type: actionTypes.SET_ID, payload };
  },
  // pushing a show onto the stack
  ADD: (payload: any, state: IState, dispatch: React.Dispatch<IAction>) => {
    sideEffects.ADD(payload, state, dispatch);
    return { type: actionTypes.ADD, payload };
  },
  LOCAL_ADD: (payload: any) => {
    return { type: actionTypes.ADD, payload };
  },
  // remove a show by index from the stack
  REMOVE: (payload: any, state: IState, dispatch: React.Dispatch<IAction>) => {
    sideEffects.REMOVE(payload, state, dispatch);
    return {
      type: actionTypes.REMOVE,
      payload,
    };
  },
  // replace a show at a given index with a different show (update)
  UPDATE: (payload: any, state: IState, dispatch: React.Dispatch<IAction>) => {
    sideEffects.UPDATE(payload, state, dispatch);
    return {
      type: actionTypes.UPDATE,
      payload,
    };
  },
  LOCAL_UPDATE: (payload: any) => {
    return {
      type: actionTypes.UPDATE,
      payload,
    };
  },
  INC_CALLS: () => {
    return { type: actionTypes.INC_CALLS };
  },
  DEC_CALLS: () => {
    return { type: actionTypes.DEC_CALLS };
  },
};

export interface IState {
  stack?: object[]; // should have a tighter type here
  callsOut: number;
  id?: number;
}

export const StackProvider = ({ children }) => {
  const [state, dispatch]: [IState, React.Dispatch<IAction>] = React.useReducer(
    (state: IState, action: IAction) => {
      switch (action.type) {
        case actionTypes.SET:
          return {
            ...state,
            stack: [...action.payload],
          };
        case actionTypes.SET_ID:
          return {
            ...state,
            id: action.payload,
          };
        case actionTypes.ADD: {
          return {
            ...state,
            stack: [...state.stack, action.payload],
          };
        }
        case actionTypes.REMOVE: {
          const stack = [...state.stack];
          stack.splice(action.payload, 1);
          return {
            ...state,
            stack,
          };
        }
        case actionTypes.UPDATE: {
          const stack = [...state.stack];
          if (action.payload.index < stack.length)
            stack[action.payload.index] = action.payload.show;
          else if (action.payload.index === stack.length) {
            stack.push(action.payload.show); // little help so UPDATE can also be used for append
          }
          return {
            ...state,
            stack,
          };
        }
        case actionTypes.INC_CALLS: {
          return {
            ...state,
            callsOut: state.callsOut + 1,
          };
        }
        case actionTypes.DEC_CALLS: {
          return {
            ...state,
            callsOut: state.callsOut - 1,
          };
        }
        default:
          throw new Error("unknown stack action type");
      }
    },
    { stack: undefined, callsOut: 0 }
  );

  const derivedState = {
    ...state,
    bigLoad: state.stack === undefined,
    littleLoad: state.callsOut > 0,
  };

  return <Provider value={[derivedState, dispatch]}>{children}</Provider>;
};
