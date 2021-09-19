import React, { useEffect } from "react";
import { EntityPermissionField } from "@amp-components/Permissions/EntityPermissionField";
import useEntityPermissionFields, { Props } from "@hooks/useEntityPermissionFields";
import { Button, Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';


const CLASS_NAME = "entity-permission-fields";
export const EntityPermissionFields = ({
  actionName,
  actionDisplayName,
  entityId,
  permission,
}: Props) => {

  const {
    data,
    selectedFieldIds,
    handleFieldSelected,
    handleDeleteField
  } = useEntityPermissionFields({
      actionName,
      actionDisplayName,
      entityId,
      permission
    }
  );

const OPTIONS = data?.entity?.fields;
const filteredOptions = OPTIONS?.filter(o => !selectedFieldIds.has(o.id));
const fields = [...permission.permissionFields];
const sortedFields = fields.sort((a,b) => {
  if(a.field.displayName.toLowerCase() < b.field.displayName.toLowerCase())
    return -1;
  else if(a.field.displayName.toLowerCase() > b.field.displayName.toLowerCase())
    return 1;
  return 0;

}) || [];

useEffect(()=>{

}, [filteredOptions]);

  
const menu = (
  <Menu>
    {filteredOptions?.map((field) => (
      <Menu.Item
        key={field.id}
        onClick={ () =>
          handleFieldSelected({fieldName:field.name})
        }
      >
        {field.displayName}
      </Menu.Item>
    ))}
  </Menu>
);

  return (
    
    <div className={CLASS_NAME}>
      <Dropdown 
        overlay={menu}  
        placement="bottomCenter"
        >
        <Button
          type="dashed"
          size="small"
          className="mt-5"
        >
          Add Field for {actionDisplayName} <DownOutlined />
        </Button>
    </Dropdown>
      
    {
      sortedFields?.map((field) => (
          <EntityPermissionField
            key={field.id}
            entityId={entityId}
            permission={permission}
            actionDisplayName={actionDisplayName}
            permissionField={field}
            onDeleteField={handleDeleteField}
          />
      ))
    }
    </div>
  );
};