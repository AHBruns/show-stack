import { useMemo, useState } from "react";
import useSWR from "swr";
import { EType } from "../../utils/fetcher";
import { ADD_USER } from "../../gql/addUser";

export const useRegister = (
    email: string,
    password: string,
    _onSuccess: any
) => {
    const [isReady, setIsReady] = useState(false);

    const [onSuccess] = useState(() => _onSuccess);

    const swrArgs = useMemo(
        () => [
            EType.HASURA_GRAPHQL,
            ADD_USER,
            ["email", "password"],
            email ? email : null,
            password ? password : null,
        ],
        [email, password]
    );

    const { data, error } = useSWR(isReady && swrArgs, {
        onSuccess: onSuccess,
        onError: () => setIsReady(false),
    });

    return [() => setIsReady(true), data, error];
};
