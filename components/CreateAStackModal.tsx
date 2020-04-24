import React from "react";
import { ModalLayout } from "./shared/ModalLayout";
import { Formik, Form } from "formik"; // cspell:words Formik
import { DefaultTextField } from "./newFiles/DefaultTextField";
import { ModalsStackContext, actions } from "../contexts/ModalsStackContext";
import { ModalDuoButton } from "./newFiles/ModalDuoButton";

export const CreateAStackModal = () => {
  const [_, dispatch] = React.useContext(ModalsStackContext);

  return (
    <ModalLayout>
      <>
        <h1 className="text-4xl font-bold tracking-wider text-gray-900">
          Create A Stack
        </h1>
        <div className="mt-4">
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ values, handleBlur, handleChange }) => (
              <Form>
                <DefaultTextField
                  id="stack-name"
                  label="Stack Name"
                  name="stackName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="My Awesome Stack" // cspell:words galactica
                />
                <div className="mt-4">
                  <ModalDuoButton
                    left={{
                      onClick() {
                        dispatch(actions.POP());
                      },
                      name: "Make it!",
                    }}
                    right={{
                      onClick() {
                        dispatch(actions.POP());
                      },
                      name: "Cancel",
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    </ModalLayout>
  );
};
