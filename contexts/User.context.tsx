import React from "react";

const localStorageKey = "USER_CREDENTIALS";

export const UserContext = React.createContext(undefined);
UserContext.displayName = "User";

export enum EStage {
    LOGGED_OUT,
    LOADING_ON_LOGIN,
    LOGGED_IN,
}

interface IUser {
    email: string;
    password: string;
    id: number;
}

export enum EActionType {
    LOGGING_IN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
}

export interface IState {
    stage: EStage;
    user?: IUser;
}

export interface IAction {
    type: EActionType;
    payload?: IUser;
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state: IState, action: IAction): IState => {
            switch (action.type) {
                case EActionType.LOGGING_IN:
                    return { ...state, stage: EStage.LOADING_ON_LOGIN };
                case EActionType.LOGIN_FAILED:
                    return { ...state, stage: EStage.LOGGED_OUT };
                case EActionType.LOGIN_SUCCESS:
                    return {
                        ...state,
                        stage: EStage.LOGGED_IN,
                        user: { ...action.payload },
                    };
                case EActionType.LOGOUT:
                    return { ...state, stage: EStage.LOGGED_OUT };
                default:
                    return state;
            }
        },
        {
            stage: EStage.LOGGED_OUT,
        }
    );
    React.useEffect(() => {}, []);

    const operations = {
        async attemptLoggingInFromLocalStorage(
            onLogin?: (user: IUser) => any,
            onFailure?: () => any
        ) {
            const optStringifiedUser = localStorage.getItem(localStorageKey);
            if (optStringifiedUser) {
                const user = JSON.parse(optStringifiedUser);
                dispatch({
                    type: EActionType.LOGIN_SUCCESS,
                    payload: user,
                });
                onLogin?.(user);
                return true;
            } else {
                onFailure?.();
                return false;
            }
        },
        async attemptToPersistUser(user: IUser) {
            localStorage.setItem(localStorageKey, JSON.stringify(user));
        },
        async clearLocalStorage() {
            localStorage.removeItem(localStorageKey);
        },
    };

    return (
        <UserContext.Provider
            value={[state, dispatch, operations] as [IState, any, object]}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
