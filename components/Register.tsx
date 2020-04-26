import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import { Input } from "./Input";
import { Button } from "./Button";
import { useMutation } from "@apollo/client";
import { Spinner } from "./AddAShowModal/Spinner";
import { ADD_USER } from "../gql/addUser";
import { OrBreakline } from "./OrBreakline";

export const Register = () => {
  const router = useRouter();
  const [addUser, { loading, data }] = useMutation(ADD_USER);

  React.useEffect(() => {
    if (!data) return;
    alert("You're in! You'll now be redirected to the login screen.");
    router.push("/");
  }, [data]);

  return (
    <div className="relative w-full max-w-sm px-4 py-6 m-4 bg-white border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-900">
        Register
      </h1>
      <div className="mt-6">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setFieldError }) => {
            try {
              await addUser({ variables: { ...values } });
            } catch (err) {
              setFieldError(
                "email",
                "It looks like that email is already in use. Please try another a different one."
              );
            }
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
              <ErrorMessage name="email">
                {(errorMessage) => (
                  <div className="px-4 py-2 mt-4 text-sm text-red-700 bg-red-300 border border-red-500 rounded-lg shadow-md font-sm">
                    {errorMessage}
                  </div>
                )}
              </ErrorMessage>
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
              <div className="w-full mt-4">
                <Button type="submit" disabled={loading}>
                  Register
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
              router.push("/");
            }}
          >
            Login
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
