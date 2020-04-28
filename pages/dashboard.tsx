import React from "react";
// import {
//   ShowStackContext,
//   EStage as EShowStackStage,
// } from "../contexts/ShowStack.context";
// import { useRestoreUserOrRedirect } from "../hooks/useRestorUserOrRedirect";
// import { useLoadStack } from "../hooks/useLoadStack";
// import { PrimaryOperationsMenu } from "../components/PrimaryOperationsMenu";
// import { ShowsLayout } from "../components/ShowsLayout";
// import { Spinner } from "../components/AddAShowModal/Spinner";
import { Dashboard } from "../components/NEW/Dashboard";

export default () => {
  // const [showStackState] = React.useContext(ShowStackContext);

  // useRestoreUserOrRedirect();

  // useLoadStack();

  return (
    // <div className="relative flex-1 w-full max-h-full">
    //   <div className="absolute inset-0 flex flex-col items-center overflow-scroll bg-gray-900">
    //     <div className="w-full max-w-7xl">
    //       {showStackState.stage === EShowStackStage.LOADING && (
    //         <div className="absolute inset-0 flex items-center justify-center">
    //           <Spinner />
    //         </div>
    //       )}
    //       {showStackState.stage === EShowStackStage.LOADED && <ShowsLayout />}
    //     </div>
    //   </div>
    //   {showStackState.stage === EShowStackStage.LOADED && (
    //     <PrimaryOperationsMenu />
    //   )}
    // </div>
    <Dashboard />
  );
};
