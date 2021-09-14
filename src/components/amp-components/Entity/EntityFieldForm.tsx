import React, { useMemo } from "react";
import { Formik, FormikErrors, FormikProps } from "formik";
import omit from "lodash.omit";
import { isEmpty } from "lodash";
import { getSchemaForDataType } from "@content-branch/equilibrium-data";
import * as models from "models";
import { Form, Checkbox, Switch, Input} from "formik-antd";
import FormikAutoSave from "util/formikAutoSave";
import { validate } from "util/formikValidateJsonSchema";
import { SYSTEM_DATA_TYPES } from "./constants";
import { SchemaFields } from "@amp-components/Entity/SchemaFields";
import { Tag, Row, Col } from "antd";
import DataTypeSelectField from "@amp-components/Entity/DataTypeSelectField";
import "./EntityFieldForm.scss";

export type Values = {
  id: string; //the id field is required in the form context to be used in "DataTypeSelectField"
  name: string;
  displayName: string;
  dataType: models.EnumDataType;
  required: boolean;
  searchable: boolean;
  description: string | null;
  properties: Object;
};

type Props = {
  onSubmit: (values: Values) => void;
  isDisabled?: boolean;
  defaultValues?: Partial<models.EntityField>;
  applicationId: string;
  entityDisplayName: string;
};

const FORM_SCHEMA = {
  required: ["name", "displayName"],
  properties: {
    displayName: {
      type: "string",
      minLength: 1,
    },
    name: {
      type: "string",
      minLength: 1,
    },
  },
};

const NON_INPUT_GRAPHQL_PROPERTIES = ["createdAt", "updatedAt", "__typename"];

export const INITIAL_VALUES: Values = {
  id: "",
  name: "",
  displayName: "",
  dataType: models.EnumDataType.SingleLineText,
  required: false,
  searchable: false,
  description: "",
  properties: {},
};


export const getTags = (tags:Array<string>, disable=false) => {
  return (
      <span>
          {tags.map((tag:any) => {
          
          let color = disable? 'default':(tag === 'required' ? 'magenta' : 'geekblue');
          
          return (
              <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
              </Tag>
          );
          })}
      </span>
  );
}

const EntityFieldForm = ({
  onSubmit,
  defaultValues = {},
  isDisabled,
  applicationId,
  entityDisplayName,
}: Props) => {
  const initialValues = useMemo(() => {
    const sanitizedDefaultValues = omit(
      defaultValues,
      NON_INPUT_GRAPHQL_PROPERTIES
    );
    return {
      ...INITIAL_VALUES,
      ...sanitizedDefaultValues,
    };
  }, [defaultValues]);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values: Values) => {
        const errors: FormikErrors<Values> = validate<Values>(
          values,
          FORM_SCHEMA
        );
        //validate the field dynamic properties
        const schema = getSchemaForDataType(values.dataType);
        const propertiesError = validate<Object>(values.properties, schema);

        // Ignore related field ID error
        if ("relatedFieldId" in propertiesError) {
          // @ts-ignore
          delete propertiesError.relatedFieldId;
        }

        if (!isEmpty(propertiesError)) {
          errors.properties = propertiesError;
        }

        return errors;
      }}
      enableReinitialize
      onSubmit={onSubmit}
      render={(props:FormikProps<Values>) => {
            const schema = getSchemaForDataType(props.values.dataType);
            return (
              <Form layout="vertical" size="small">
                {!isDisabled && <FormikAutoSave debounceMS={1000} />}
    
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Display Name"
                      name="displayName" 
                  >
                    <Input name="displayName" disabled={isDisabled} autoComplete="off" bordered={false} required/>
                  </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="name" 
                  >
                    <Input name="name" disabled={isDisabled} autoComplete="off" bordered={false}  required minLength={1}/>
                  </Form.Item>
                  </Col>
                </Row>

                
                {!SYSTEM_DATA_TYPES.has(props.values.dataType) && (
                      <Form.Item name="dataType" label="Data Type">
                         <DataTypeSelectField disabled={isDisabled} style={{width:'100%'}} />
                      </Form.Item>
                )}
                <Row>
                  <SchemaFields
                    schema={schema}
                    isDisabled={isDisabled}
                    applicationId={applicationId}
                    entityDisplayName={entityDisplayName}
                  />
                </Row>
                <Row>
                  <Form.Item name={'name'} label="Description" style={{ width: '90%' }} >
                      <Input.TextArea name={'description'} placeholder="Insert a description here..."  autoComplete="off" rows={5} disabled={isDisabled}/>
                  </Form.Item>
                </Row>
                <Row>
                    <Checkbox.Group style={{ width: '100%' }}  name="tags" className="inline">
                      <Form.Item name="searchable" colon={false} label={getTags(["searchable"], isDisabled)} labelAlign="right">
                          <Switch name="searchable" disabled={isDisabled} defaultChecked={props.values.searchable} />
                      </Form.Item>
                      <Form.Item name="required" colon={false} label={getTags(["required"], isDisabled)} labelAlign="left">
                          <Switch name="required" disabled={isDisabled} defaultChecked={props.values.required} />
                      </Form.Item>
                    </Checkbox.Group>
                  </Row>
              </Form>
            )
          }
        }
      />
  );
};

export default EntityFieldForm;
