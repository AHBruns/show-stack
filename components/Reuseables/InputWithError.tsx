import React from "react";
import { Input } from "./Input";
import { FormError } from "./FormError";

export const InputWithError = ({
    errors,
    possibleErrors,
    id,
    label,
    children,
    ...props
}: any) => (
    <div>
        <Input id={id} label={label} {...props} />
        <FormError id={id} errors={errors} possibleErrors={possibleErrors} />
        {children}
    </div>
);
