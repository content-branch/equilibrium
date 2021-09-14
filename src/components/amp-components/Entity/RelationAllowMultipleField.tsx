import React from "react";
import useRelationAllowMultiple from "@hooks/useRelationAllowMultipleField";
import { Radio, Form } from "formik-antd";

type Props = {
  fieldName: string;
  isDisabled?: boolean;
  entityDisplayName: string;
};

const RelationAllowMultiple = ({fieldName, isDisabled, entityDisplayName}: Props) => {

  const {
    formik,
    handleChange
  } = useRelationAllowMultiple({
    fieldName
  });

  return (
    <>
      <Form.Item  name={fieldName}>
        <Radio.Group name={fieldName} buttonStyle="solid"  defaultValue={formik.values.properties.allowMultipleSelection} >
            <Radio.Button name="relationAllowMultiple-field" 
                          disabled={isDisabled} 
                          value={true}
                          checked={formik.values.properties.allowMultipleSelection} 
                          onChange={handleChange}
                          
                        >{`One '${entityDisplayName}' to many '${formik.values.displayName}'`}
            </Radio.Button>
        
          <Radio.Button name="relationAllowMultiple-field" 
                        disabled={isDisabled} 
                        value={false}
                        checked={!formik.values.properties.allowMultipleSelection} 
                        onChange={handleChange} 
                    >
                    {`One '${entityDisplayName}' to one '${formik.values.displayName}'`}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default RelationAllowMultiple;
