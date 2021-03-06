import { useMemo, useState } from "react";
import useSWR from "swr";
import { EType } from "../../utils/fetcher";
import { GET_USER } from "../../gql/getUser";

export const useLogin = (email: string, password: string, _onSuccess: any) => {
    const [isReady, setIsReady] = useState(false);
    const [isLoadingSlowly, setIsLoadingSlowly] = useState(false);

    const [onSuccess] = useState(() => _onSuccess);

    const swrArgs = useMemo(
        () => [
            EType.HASURA_GRAPHQL,
            GET_USER,
            ["email", "password"],
            email ? email : null,
            password ? password : null,
        ],
        [email, password]
    );

    const { data, error } = useSWR(isReady && swrArgs, {
        onSuccess: (data) => {
            setIsLoadingSlowly(false);
            onSuccess(data);
        },
        onError: () => {
            setIsReady(false);
            setIsLoadingSlowly(false);
        },
        onLoadingSlow: () => setIsLoadingSlowly(true),
    });

    return [() => setIsReady(true), data, error, isLoadingSlowly];
};
