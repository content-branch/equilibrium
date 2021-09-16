import React, { useEffect } from "react";
import {  Link } from "react-router-dom";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import { GlobalHotKeys } from "react-hotkeys";
import { validate } from "util/formikValidateJsonSchema";
import { CROSS_OS_CTRL_ENTER } from "util/hotkeys";
import { Button, message, PageHeader, Divider, Row, Col } from "antd";
import { AppstoreAddOutlined, GiftTwoTone, ContainerTwoTone} from "@ant-design/icons";
import useNewApplication from "@hooks/useNewApplication";
import useCreateAppFromExcel from "@hooks/useCreateAppFromExcel";

type Values = {
  name: string;
  description: string;
};

const INITIAL_VALUES = {
  name: "",
  description: "",
};

const FORM_SCHEMA = {
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
    },
    description: {
      type: "string",
    },
  },
};
const CLASS_NAME = "new-application";

const keyMap = {
  SUBMIT: CROSS_OS_CTRL_ENTER,
};


const NewApplication = () => {
  
  const {
    loading,
    error,
    errorMessage,
    handleSubmit,
  } = useNewApplication();

  const {
    loading:sampleLoading,
    error:sampleError,
    errorMessage:sampleErrorMessage,
    handleStartFromSample,
  } = useCreateAppFromExcel();


  useEffect(() => {
    if(error){
      message.error(errorMessage);
    }
  }, [error, errorMessage]);
  
  useEffect(() => {
    if(sampleError){
      message.error(sampleErrorMessage);
    }
  }, [sampleError, sampleErrorMessage]);

  return (
    <>
      <PageHeader
				className="site-page-header"
				title={<h2 className=""><AppstoreAddOutlined /> Create New Application </h2>}
			/>
       
			<PageHeader
        className="site-section-header"
        title={<h4 className="mb-1"> Create app from scratch</h4>}
      />
      <Row className="px-5 py-4">

        <Formik
          initialValues={INITIAL_VALUES}
          validate={(values: Values) => validate(values, FORM_SCHEMA)}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {(formik) => {
            const handlers = {
              SUBMIT: formik.submitForm,
            };
            return (
              <Form layout="horizontal">
                <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
                <Form.Item name="name" label="Give your new app a descriptive name">
                  <Input
                    name="name"
                    autoComplete="off"
                    disabled={loading || sampleLoading}
                    size="small"
                    placeholder="App name"
                    className="mb-4"
                    bordered={false}
                  />
                  <Button
                  className={`${CLASS_NAME}__add-button`}
                  type="primary"
                  icon={<AppstoreAddOutlined />}
                  disabled={!formik.isValid || loading}
                  htmlType="submit"
                  loading={loading}
                >
                  Generate My app
                </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      </Row>
      <Divider />
      <Row className="p-4">
        <Col span={12}>
          <PageHeader
            className="site-section-header"
            title={<h4 className="mb-2"> Start from a sample app</h4>}
          />
          <Button
            className={`m-4`}
            type="default"
            icon={<GiftTwoTone twoToneColor="#f50" />}
            onClick={handleStartFromSample}
            disabled={loading || sampleLoading}
            loading={sampleLoading}
          >
            Generate E-Commerce App
          </Button>

        </Col>
        <Col span={12}>
          <PageHeader
            className="site-section-header"
            title={<h4 className="mb-2"> Choose a script template</h4>}
          />
          <Link to={`/`}>
            <Button
              className={`m-4`}
              type="default"
              icon={<ContainerTwoTone twoToneColor="#f50"/>}
              disabled={loading || sampleLoading}
            >
              Explore Templates
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default NewApplication;
