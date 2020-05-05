import React from "react";
import { useRouter } from "next/router";
import { Button } from "./Reuseables/Button";
import { OrBreakline } from "./Reuseables/OrBreakline";
import { useRegister } from "./Register/useRegister";
import { FormHeader } from "./Reuseables/FormHeader";
import { InputWithError } from "./Reuseables/InputWithError";

export const Register = () => {
    const router = useRouter();

    const [values, setValues] = React.useState({ email: "", password: "" });

    const [execute, _, errors] = useRegister(
        values.email,
        values.password,
        () => {
            alert("You're in! You will now be redirected to the login page.");
            router.push("/");
        }
    );

    return (
        <div className="relative w-full max-w-sm p-4 m-4 border-gray-300 rounded-lg shadow-lg bg-gray-50 space-y-4">
            <FormHeader>Register</FormHeader>
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
                        path: "$.selectionSet.insert_user.args.objects[0]",
                        code: "constraint-violation",
                        errorMessage:
                            "That email has already been taken. Please try another.",
                    },
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
            />
            <Button onClick={execute}>Register</Button>
            <OrBreakline />
            <Button type="button" onClick={() => router.push("/")}>
                Login
            </Button>
        </div>
    );
};
