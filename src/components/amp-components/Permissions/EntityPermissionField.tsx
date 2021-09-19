import React from "react";
import { ActionRoleList } from "@amp-components/Permissions/ActionRoleList";
import useEntityPermissionField, { Props } from "@hooks/useEntityPermissionField";
import { Button , Table} from 'antd';
import { DeleteTwoTone } from "@ant-design/icons";

export const EntityPermissionField = ({
  entityId,
  actionDisplayName,
  permissionField,
  permission,
  onDeleteField
}: Props) => {
  
  const {
    availableRoles,
    selectedRoleIds,
    handleRoleSelectionChange,
    handleDeleteField
  } = useEntityPermissionField({
    entityId,
    actionDisplayName,
    permissionField,
    permission,
    onDeleteField
  });

  const dataSource = [
    {
      key: permissionField.id,
      permission: actionDisplayName,
      field: permissionField.field.name,
      role: ( 
        <ActionRoleList
          availableRoles={availableRoles}
          selectedRoleIds={selectedRoleIds}
          debounceMS={0}
          onChange={handleRoleSelectionChange}
        />
      ),
      delete: (
        <Button
          type="default"
          icon={
              <>
                <DeleteTwoTone twoToneColor="red"/>
              </>
          }
          size={"small"} 
          onClick={handleDeleteField}
        />),
    },
  ];
  
  const columns = [
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
    },
  ];

  return (
      <Table  
        pagination={false} 
        columns={columns}
        dataSource={dataSource} 
        bordered={false}
        size="small"
        showHeader={false}
        tableLayout="fixed"
      />
  );
};