import React, { useCallback } from "react";
import { camelCase } from "camel-case";
import { Formik, useFormikContext } from "formik";
import { Form, Input } from "formik-antd";
import { Button, Modal, Spin, Typography} from 'antd';
import useRelatedFieldDialog, {Props, Values} from "@hooks/useRelatedFieldDialog";

const CLASS_NAME = "related-field-dialog";
const {Text} = Typography;

export const RelatedFieldDialog = ({
  isOpen,
  onDismiss,
  onSubmit,
  entity,
  relatedEntityId,
  allowMultipleSelection,
}: Props): React.ReactElement => {
  
  const {
    initialValues,
    loading,
    data
  } = useRelatedFieldDialog({
    isOpen,
    onDismiss,
    onSubmit,
    entity,
    relatedEntityId,
    allowMultipleSelection
  });

  return (
    <div>
        <Modal
          visible={isOpen}
          title={`Name the relation field on ${data?.entity?.name}`}
          onCancel={onDismiss}
          footer={[
            <Text type="warning" >
              Please select a name for the new field on <Text strong>{data?.entity?.name}</Text>
            </Text>
          ]}
        >
          <div className={CLASS_NAME}>
            <Text type="secondary">
              To create the relation to <Text strong>{data?.entity?.name}</Text>, we also need to
              create an opposite related field on <Text strong>{data?.entity?.name}</Text> back
              to <Text strong>{entity.name}</Text>.
            </Text>
            
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              enableReinitialize
            >
              <Form layout="vertical" size="small">
                {loading && <Spin />}
                <RelatedFieldDisplayNameField disabled={loading} />
                <Form.Item name={'relatedFieldName'} label="Name" >
                  <Input 
                    name={'relatedFieldName'} 
                    autoComplete="off" 
                    required
                    disabled={loading}
                  />
                </Form.Item>
                <Form.Item name="relation">
                  <Button key="submit" htmlType="submit" type="primary" loading={loading} >
                    Create field
                  </Button>
                </Form.Item>
              </Form>
            </Formik>
          </div>
        </Modal>
    </div>
  );
};

const RelatedFieldDisplayNameField = ({
  disabled,
}: {
  disabled: boolean;
}): React.ReactElement => {
  const formik = useFormikContext<Values>();

  const handleLabelChange = useCallback(
    (event) => {
      const newValue = camelCase(event.target.value);
      formik.values.relatedFieldName = newValue;
    },
    [formik.values]
  );

  return (
    <Form.Item name={'relatedFieldDisplayName'} label="Display Name" >
      <Input 
        name={'relatedFieldDisplayName'} 
        autoComplete="off" 
        required
        disabled={disabled}
        onChange={handleLabelChange}
      />
    </Form.Item>
  );
};