import React from "react";
import { Button } from "../components/Reuseables/Button";

export const ConfirmationModalContext = React.createContext(undefined);

export const ConfirmationModalProvider = ({ children }) => {
    const initialValue: any = { isShowing: false };
    const [
        confirmationModalDetails,
        _setConfirmationModalDetails,
    ] = React.useState(initialValue);

    const setConfirmationModalDetails = (newValue) => {
        _setConfirmationModalDetails({ isShowing: true, ...newValue });
    };

    return (
        <ConfirmationModalContext.Provider value={setConfirmationModalDetails}>
            {children}
            <div
                className={`transition-all ease-in-out duration-300 fixed inset-0 z-50 flex items-center justify-center bg-black shadow-2xl bg-opacity-25 ${
                    confirmationModalDetails.isShowing
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="w-full max-w-sm m-8 overflow-hidden rounded-lg bg-gray-50">
                    <div className="p-4 bg-gray-50 space-y-2">
                        <p className="text-sm tracking-wide text-justify text-gray-700">
                            {confirmationModalDetails?.prePrompt}
                        </p>
                        <h1 className="text-xl font-semibold leading-tight tracking-wider text-center text-gray-900">
                            {confirmationModalDetails?.prompt}
                        </h1>
                        <p className="text-sm tracking-wide text-justify text-gray-700">
                            {confirmationModalDetails?.postPrompt}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-200 border-t border-gray-300">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <Button
                                    onClick={() => {
                                        confirmationModalDetails?.yea?.onClick?.();
                                        _setConfirmationModalDetails({
                                            ...confirmationModalDetails,
                                            isShowing: false,
                                        });
                                    }}
                                >
                                    {confirmationModalDetails?.yea?.buttonText}
                                </Button>
                            </div>
                            <div className="flex">
                                <Button
                                    onClick={() => {
                                        confirmationModalDetails?.nay?.onClick?.();
                                        _setConfirmationModalDetails({
                                            ...confirmationModalDetails,
                                            isShowing: false,
                                        });
                                    }}
                                >
                                    {confirmationModalDetails?.nay?.buttonText}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfirmationModalContext.Provider>
    );
};
