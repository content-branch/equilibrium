import React, { useEffect } from "react";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { message, Spin } from "antd";
import { GlobalHotKeys } from "react-hotkeys";
import { validate } from "util/formikValidateJsonSchema";
import { CROSS_OS_CTRL_ENTER } from "util/hotkeys";
import useNewEntity, {CreateEntityType} from "@hooks/useNewEntity";
import {PlusSquareTwoTone} from '@ant-design/icons';

const INITIAL_VALUES: CreateEntityType = {
  name: "",
  displayName: "",
  pluralDisplayName: "",
  description: "",
};

const FORM_SCHEMA = {
  required: ["displayName"],
  properties: {
    displayName: {
      type: "string",
      minLength: 2,
    },
  },
};

const keyMap = {
  SUBMIT: CROSS_OS_CTRL_ENTER,
};


const NewEntity = () => {
  
  const {
    loading,
    error,
    errorMessage,
    handleSubmit
  } = useNewEntity();

  useEffect(() => {
    if(error){
      message.error(errorMessage);
    }
  }, [error, errorMessage]);

  return (
      <Formik
        initialValues={INITIAL_VALUES}
        validate={(values: CreateEntityType) => validate(values, FORM_SCHEMA)}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {(formik) => {
          const handlers = {
            SUBMIT: formik.submitForm,
          };
          return (
            <Form>
              <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
              <Input name={'displayName'} bordered={false} disabled={loading} placeholder='Add entity' prefix={loading ?<Spin /> : <PlusSquareTwoTone twoToneColor='magenta'/>} autoFocus autoComplete="off"/>
            </Form>
          );
        }}
      </Formik>
  );
};

export default NewEntity;
