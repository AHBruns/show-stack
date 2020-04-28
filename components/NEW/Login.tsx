import React from "react";
import { useRouter } from "next/router";
import { Input } from "./shared/Input";
import { Button } from "./shared/Button";
import {
    UserContext,
    EActionType as EUserActionType,
} from "../../contexts/User.context";
import { GET_USER } from "../../gql/getUser";
import { OrBreakline } from "./shared/OrBreakline";
import useSWR from "swr";
import { EType } from "../../utils/fetcher";

export const Login = () => {
    const router = useRouter();

    const [_, userDispatch, userOperations] = React.useContext(UserContext);

    const [isReady, setIsReady] = React.useState(false);

    const [values, setValues] = React.useState({ email: "", password: "" });

    // using this instead of the swr error value because this error state isn't actually a graphql error
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const swrArgs = React.useMemo(
        () => [
            EType.HASURA_GRAPHQL,
            GET_USER,
            ["email", "password"],
            values?.email,
            values?.password,
        ],
        [values]
    );

    useSWR(isReady && swrArgs, {
        onSuccess(data) {
            setIsReady(false);
            if (data.user.length === 0) {
                setShowErrorMessage(true);
            } else {
                setShowErrorMessage(false);
                userDispatch({
                    type: EUserActionType.LOGIN_SUCCESS,
                    payload: data.user[0],
                });
                userOperations.attemptToPersistUser(data.user[0]);
                router.push("/dashboard");
            }
        },
    });

    return (
        <div className="relative w-full max-w-sm px-4 py-6 m-4 overflow-hidden bg-white border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-center text-gray-900">
                Login
            </h1>
            <div className="mt-6">
                <Input
                    key="email"
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                    }
                    value={values.email}
                />
                <div className="mt-4">
                    <Input
                        key="password"
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                        }
                        value={values.password}
                    />
                </div>
                {showErrorMessage && (
                    <div className="px-4 py-2 mt-4 text-sm text-red-700 transition-all duration-300 ease-in-out bg-red-300 border border-red-500 rounded-md shadow-md font-sm">
                        An incorrect email and/or password was provided.
                    </div>
                )}
                <div className="w-full mt-4">
                    <Button onClick={() => setIsReady(true)}>Log In</Button>
                </div>
                <div className="mt-4">
                    <OrBreakline />
                </div>
                <div className="mt-4">
                    <Button
                        type="button"
                        onClick={() => router.push("/register")}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
};
