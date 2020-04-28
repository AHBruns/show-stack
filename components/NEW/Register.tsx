import React from "react";
import { useRouter } from "next/router";
import { Input } from "./Input";
import { Button } from "./Button";
import { ADD_USER } from "../../gql/addUser";
import { OrBreakline } from "./OrBreakline";
import useSWR from "swr";
import { EType } from "../../utils/fetcher";

export const Register = () => {
    const router = useRouter();

    const [isReady, setIsReady] = React.useState(false);

    const [values, setValues] = React.useState({ email: "", password: "" });

    const swrArgs = React.useMemo(
        () => [
            EType.HASURA_GRAPHQL,
            ADD_USER,
            ["email", "password"],
            values?.email,
            values?.password,
        ],
        [values]
    );

    const { data, error } = useSWR(isReady && swrArgs, {
        onSuccess(data) {
            setIsReady(false);
            alert("You're in! You'll be sent to the login page now.");
            router.push("/");
        },
        onError(error) {
            setIsReady(false);
        },
    });

    return (
        <div className="relative w-full max-w-sm px-4 py-6 m-4 bg-white border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-center text-gray-900">
                Register
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
                {error && (
                    <div className="px-4 py-2 mt-4 text-sm text-red-700 bg-red-300 border border-red-500 rounded-md shadow-md font-sm">
                        It looks like that email is already in use. Please try
                        another a different one.
                    </div>
                )}
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
                <div className="w-full mt-4">
                    <Button onClick={() => setIsReady(true)}>Register</Button>
                </div>
                <div className="mt-4">
                    <OrBreakline />
                </div>
                <div className="mt-4">
                    <Button type="button" onClick={() => router.push("/")}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};
