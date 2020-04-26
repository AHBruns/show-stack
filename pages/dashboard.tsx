import React from "react";
import { PrimaryOperationsMenu } from "../components/PrimaryOperationsMenu";
import { ShowsLayout } from "../components/ShowsLayout";
import { Router, useRouter } from "next/router";
import { log } from "../utils/log";
import UserContext from "../contexts/User.context";
import {
  StackContext,
  actions as stackActions,
} from "../contexts/StackContext";

export default () => {
  const router = useRouter();

  const [userState, userDispatch, userOperations] = React.useContext(
    UserContext
  );
  const [_, stackDispatch] = React.useContext(StackContext);

  React.useEffect(() => {
    userOperations.attemptLoggingInFromLocalStorage(
      (user) => {
        stackDispatch(stackActions.SET_ID(user.stack.id));
      },
      () => {
        log(
          "login",
          "No user found in localStorage. " +
            "The user will have to manually enter their credentials."
        );
        router.push("/");
      }
    );
  }, []);

  return (
    <div className="relative flex-1 w-full max-h-full">
      <div className="absolute inset-0 flex flex-col items-center overflow-scroll bg-gray-900">
        <div className="w-full max-w-7xl">
          <ShowsLayout />
        </div>
      </div>
      <PrimaryOperationsMenu />
    </div>
  );
};
