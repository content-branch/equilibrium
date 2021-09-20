import React, { useEffect } from "react";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { message, Spin } from "antd";
import * as models from "models";
import { validate } from "util/formikValidateJsonSchema";
import useNewRole, { Props } from "@hooks/useNewRole";
import {PlusSquareTwoTone} from '@ant-design/icons';

const INITIAL_VALUES: Partial<models.AppRole> = {
  name: "",
  displayName: "",
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
const CLASS_NAME = "new-role";

const NewRole = ({ onRoleAdd }: Props) => {
  
  const {
    loading,
    error,
    errorMessage,
    handleSubmit
  } = useNewRole({onRoleAdd});


  useEffect(() => {
    if(error){
      message.error(errorMessage);
    }
  }, [error, errorMessage]);

  return (
    <div className={CLASS_NAME}>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={(values: Partial<models.AppRole>) =>
          validate(values, FORM_SCHEMA)
        }
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={`${CLASS_NAME}__add-field`}>
            <Input name={'displayName'} bordered={false} disabled={loading} placeholder='Add Role' prefix={loading ?<Spin /> : <PlusSquareTwoTone/>} autoFocus autoComplete="off"/>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewRole;