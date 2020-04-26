import React from "react";
import { useRouter } from "next/router";
import { DefaultTextField } from "../components/newFiles/DefaultTextField";
import { DefaultButton } from "../components/DefaultButton";

export default () => {
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center w-full h-full bg-gray-700">
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
      </div>
    </div>
  );
};
