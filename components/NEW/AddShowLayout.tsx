import React from "react";
import { AddShowButton } from "./AddShowButton";
import { AddShowModal } from "./AddShowModal";

const ModalAndBackground = ({
    stackID,
    setModalIsOpen,
    invalidateOnShowsMutation,
}) => (
    <>
        <div
            onClick={() => setModalIsOpen(false)}
            className="absolute inset-0 bg-gray-900 opacity-50 pointer-events-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
            <AddShowModal
                stackID={stackID}
                onClose={() => setModalIsOpen(false)}
                invalidateOnShowsMutation={invalidateOnShowsMutation}
            />
        </div>
    </>
);

export const AddShowLayout = ({ stackID, invalidateOnShowsMutation }) => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute left-4 bottom-4">
                <AddShowButton onClick={() => setModalIsOpen(true)} />
            </div>
            {modalIsOpen && (
                <ModalAndBackground
                    stackID={stackID}
                    setModalIsOpen={setModalIsOpen}
                    invalidateOnShowsMutation={invalidateOnShowsMutation}
                />
            )}
        </div>
    );
};
