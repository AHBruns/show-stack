import React from "react";
import { DefaultTextField } from "./shared/DefaultTextField";
import { DefaultButton } from "./Login/DefaultButton";
import { useRouter } from "next/router";

export const Login = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm px-4 py-6 m-4 bg-white border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-gray-900">Login</h1>
      <DefaultTextField
        mt
        noAutoComplete
        id="email"
        label="Email"
        name="email"
        onChange={undefined}
        onBlur={undefined}
        placeholder="john.doe@email.com"
        value={undefined}
      />
      <DefaultTextField
        mt
        noAutoComplete
        id="password"
        label="Password"
        name="password"
        onChange={undefined}
        onBlur={undefined}
        placeholder="password"
        value={undefined}
      />
      <DefaultButton
        mt
        text="Submit"
        onClick={() => router.push("/dashboard")}
        isSubmit={false}
        wideBoi
      />
    </div>
  );
};
