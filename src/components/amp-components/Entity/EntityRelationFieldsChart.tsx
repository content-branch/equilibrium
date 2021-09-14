import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import * as models from "models";
import { Button } from "antd";
import { DatabaseOutlined, InfoCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "formik-antd";
import "./EntityRelationFieldsChart.scss";


export type FormValues = {
  fieldId: string;
  relatedFieldDisplayName: string;
};

type Props = {
  applicationId: string;
  entityId: string;
  field: models.EntityField;
  entityName: string;
  relatedEntityName: string;
  relatedField: models.EntityField;
  fixInPlace: boolean;
  onSubmit: (data: FormValues) => void;
};

const CLASS_NAME = "entity-relation-fields-chart";

export const EntityRelationFieldsChart = ({
  applicationId,
  entityId,
  field,
  entityName,
  relatedEntityName,
  relatedField,
  fixInPlace,
  onSubmit,
}: Props) => {
  const initialValues: FormValues = {
    relatedFieldDisplayName: "",
    fieldId: field.id,
  };

  const relatedFieldIsMissing = isEmpty(field.properties.relatedFieldId);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      enableReinitialize
    >
      <Form>
        <div
          className={classNames(`${CLASS_NAME}`, {
            [`${CLASS_NAME}--missing`]: relatedFieldIsMissing,
          })}
          key={field.id}
        >
          <div className={`${CLASS_NAME}__entity`}>
            <Link to={`${entityId}`}>
              <DatabaseOutlined />
              {entityName}
            </Link>
          </div>
          <div className={`${CLASS_NAME}__field`}>
              {field.displayName}
          </div>
          <div className={`${CLASS_NAME}__status`}>
            <span
              className={`${CLASS_NAME}__status__cardinality--source ${CLASS_NAME}__status__cardinality--${
                relatedField?.properties?.allowMultipleSelection
                  ? "many"
                  : "one"
              }`}
            />
            {relatedFieldIsMissing ? (
              <InfoCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            )}
            <span
              className={`${CLASS_NAME}__status__cardinality--target ${CLASS_NAME}__status__cardinality--${
                field.properties.allowMultipleSelection ? "many" : "one"
              }`}
            />
          </div>
          <div className={`${CLASS_NAME}__entity`}>
            <Link
              to={`${field.properties.relatedEntityId}`}
            >
              <DatabaseOutlined />
              {relatedEntityName}
            </Link>
          </div>
          <div className={`${CLASS_NAME}__field ${CLASS_NAME}__field--target`}>
            {relatedFieldIsMissing ? (
              fixInPlace ? (
                <Form.Item name={'relatedFieldDisplayName'} label="Display Name" >
                  <Input 
                    name={'relatedFieldDisplayName'} 
                    autoComplete="off" 
                    placeholder="Display name for the new field"
                    required
                  />
                </Form.Item>
              ) : (
                <Link
                  className={`${CLASS_NAME}__field__textbox`}
                  to={`/${applicationId}/fix-related-entities`}
                >
                  Fix it
                </Link>
              )
            ) : (
              <>
                {relatedField?.displayName}
              </>
            )}
          </div>
          {fixInPlace && (
            <Button
              className={`${CLASS_NAME}__fix`}
              type="dashed"
              danger
            >
              Fix Relation
            </Button>
          )}
        </div>
      </Form>
    </Formik>
  );
};
