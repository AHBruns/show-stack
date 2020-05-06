import React from "react";
import { UserContext, EStage as EUserStage } from "../contexts/User.context";
import { useRouter } from "next/router";

export const useRestoreUserOrRedirect = () => {
    const router = useRouter();

    const [userState, _, userOperations] = React.useContext(UserContext);

    React.useEffect(() => {
        if (userState.stage === EUserStage.LOGGED_IN) return;

        userOperations.attemptLoggingInFromLocalStorage(undefined, () =>
            router.push("/login")
        );
    }, [userState]);
};
