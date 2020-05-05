import React from "react";
import { Error } from "./Error";

export const FormError = ({ id, errors, possibleErrors }) => (
    <>
        {errors?.response?.errors.map((specificError) => (
            <React.Fragment key={JSON.stringify(specificError)}>
                {possibleErrors.map((possibleError) =>
                    specificError.extensions.path === possibleError.path &&
                    specificError.extensions.code === possibleError.code ? (
                        <Error id={id} key={JSON.stringify(possibleError)}>
                            {possibleError.errorMessage}
                        </Error>
                    ) : null
                )}
            </React.Fragment>
        ))}
    </>
);
