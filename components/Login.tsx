import React from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Input } from "./Input";
import { Button } from "./Button";
import { UserContext, EActionType, EStage } from "../contexts/User.context";
import { log } from "../utils/log";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../gql/getUser";
import { Spinner } from "./AddAShowModal/Spinner";
import { OrBreakline } from "./OrBreakline";
import {
  StackContext,
  actions as stackActions,
} from "../contexts/StackContext";

export const Login = () => {
  const router = useRouter();
  const [userState, userDispatch, userOperations] = React.useContext(
    UserContext
  );
  const [_, stackDispatch] = React.useContext(StackContext);
  const [getUser, { loading, data, called, refetch }] = useLazyQuery(GET_USER);

  React.useEffect(() => {
    userOperations.attemptLoggingInFromLocalStorage(
      () => router.push("/dashboard"),
      () =>
        log(
          "login",
          "No user found in localStorage. " +
            "The user will have to manually enter their credentials."
        )
    );
  }, []);

  React.useEffect(() => {
    if (loading) {
      userDispatch({ type: EActionType.LOGGING_IN });
      log("login", "Attempting to login with user provided credentials.");
    } else if (data?.user?.length !== 1 && data) {
      userDispatch({ type: EActionType.LOGIN_FAILED });
      log("login", "Login attempt failed.");
    } else if (data) {
      log("login", "Login attempt succeeded.");
      const user = data.user[0];
      userDispatch({ type: EActionType.LOGIN_SUCCESS, user });
      log("login", "Saving the user to local storage.");
      userOperations.attemptToPersistUser(user);
      stackDispatch(stackActions.SET_ID(user.stack.id));
      log("login", "Going to /dashboard. Bye.");
      router.push("/dashboard");
    }
  }, [loading, data]);

  return (
    <div className="relative w-full max-w-sm px-4 py-6 m-4 bg-white border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-900">
        Login
      </h1>
      <div className="mt-6">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            log("login", "Making a GET_USER query.");
            if (called) refetch({ ...values });
            else
              getUser({
                variables: { ...values },
              });
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="mt-4">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              {data?.user?.length === 0 && (
                <div
                  className={`px-4 py-2 mt-4 text-sm text-red-700 bg-red-300 border border-red-500 rounded-lg shadow-md font-sm transition-all ease-in-out duration-300 ${
                    loading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  An incorrect email and/or password was provided.
                </div>
              )}
              <div className="w-full mt-4">
                <Button type="submit" disabled={loading}>
                  Log In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-4">
          <OrBreakline />
        </div>
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
      <div
        className={`transition-all duration-1000 ease-in-out delay-1000 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 transition-all duration-300 ease-in-out bg-white opacity-50 delay-1000" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  );
};
