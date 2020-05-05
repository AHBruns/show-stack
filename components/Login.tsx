import React from "react";
import { useRouter } from "next/router";
import { Button } from "./Reuseables/Button";
import {
    UserContext,
    EActionType as EUserActionType,
} from "../contexts/User.context";
import { OrBreakline } from "./Reuseables/OrBreakline";
import { useLogin } from "./Login/useLogin";
import { Error } from "./Reuseables/Error";
import { FormHeader } from "./Reuseables/FormHeader";
import { InputWithError } from "./Reuseables/InputWithError";
import { useAttemptRestore } from "./Login/useAttemptRestore";

export const Login = () => {
    // using this instead of the swr error value because this error state isn't actually a graphql error
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [values, setValues] = React.useState({ email: "", password: "" });

    const [_, userDispatch, userOperations] = React.useContext(UserContext);

    const router = useRouter();

    const [execute, __, errors] = useLogin(
        values.email,
        values.password,
        (data) => {
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
        }
    );

    useAttemptRestore();

    return (
        <div className="relative w-full max-w-sm p-4 m-4 overflow-hidden bg-white border-gray-300 rounded-lg shadow-lg space-y-4">
            <FormHeader>Login</FormHeader>
            <InputWithError
                key="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="off"
                onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                }
                value={values.email}
                id="email"
                errors={errors}
                possibleErrors={[
                    {
                        path: "$.variableValues.email",
                        code: "validation-failed",
                        errorMessage:
                            "We couldn't validate this field. Maybe you forgot to fill it in?",
                    },
                ]}
            />
            <InputWithError
                key="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                }
                value={values.password}
                id="password"
                errors={errors}
                possibleErrors={[
                    {
                        path: "$.variableValues.password",
                        code: "validation-failed",
                        errorMessage:
                            "We couldn't validate this field. Maybe you forgot to fill it in?",
                    },
                ]}
            >
                {showErrorMessage && (
                    <Error id="password" key="password-error">
                        An incorrect email and/or password was provided.
                    </Error>
                )}
            </InputWithError>
            <Button
                onClick={() => {
                    setShowErrorMessage(false);
                    execute();
                }}
            >
                Log In
            </Button>
            <OrBreakline />
            <Button type="button" onClick={() => router.push("/register")}>
                Register
            </Button>
        </div>
    );
};
