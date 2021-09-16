import React, { useEffect } from "react";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import {  Row, message } from "antd";
import useNewEntityField, { Props } from "@hooks/useNewEntityField";
const INITIAL_VALUES = {
  displayName: "",
};

const CLASS_NAME = "new-entity-field";

const NewEntityField = ({ entity, onFieldAdd }: Props) => {
  
  const { 
    loading,
    inputRef,
    autoFocus,
    error,
    errorMessage,
    handleSubmit
  } = useNewEntityField({
    entity, onFieldAdd
  });

  useEffect(() => {
		if(error){
			message.error(errorMessage);
		}
  }, [error, errorMessage]);
  
  return (
    <Row className={CLASS_NAME} justify="end">
      <Formik
        initialValues={INITIAL_VALUES}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className={`${CLASS_NAME}__add-field`} layout="inline">
            <Row>
                <Form.Item name="displayName">
                  <Input
                    required
                    size="large"
                    name="displayName"
                    disabled={loading}
                    placeholder="Add field"
                    autoComplete="off"
                    autoFocus={autoFocus}
                    ref={inputRef}
                    bordered={false}
                  />
                </Form.Item>
              </Row>
            
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default NewEntityField;
