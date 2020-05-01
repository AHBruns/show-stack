import React from "react";
import { AddShowButton } from "./AddShowLayout/AddShowButton";
import { AddShowModal } from "./AddShowLayout/AddShowModal";

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
        <div className="absolute inset-0 flex items-start justify-center overflow-scroll">
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
        <div className="fixed inset-0 z-40 pointer-events-none">
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
