import React from "react";
import useEntityPermissionAction, { Props } from "@hooks/useEntityPermissionAction";
import {EntityPermissionFields} from "@amp-components/Permissions/EntityPermissionFields"
import { 
	EyeOutlined, 
	AppstoreAddOutlined, 
	DeleteOutlined,
	EditOutlined,
	FileSearchOutlined,
} from '@ant-design/icons';

export const getIcon =  (action:string) => {
  switch (action) {
    case 'View':
      return EyeOutlined;
    case 'Create':
      return AppstoreAddOutlined;
    case 'Update':
      return EditOutlined;
    case 'Delete':
      return DeleteOutlined;
    case 'Search':
      return FileSearchOutlined;
    default:
      return DeleteOutlined;
  }
}

export const PermissionFieldContainer = ({
  entityId,
  permission,
  permissionAction: { action: actionName, actionDisplayName, canSetFields },
}: Props) => {
  
  const { 
    models,
  } = useEntityPermissionAction({
    entityId,
    permission,
    permissionAction: { action: actionName, actionDisplayName, canSetFields },
  });

  return (
    <>
     {canSetFields &&
        permission.type !== models.EnumEntityPermissionType.Disabled && (
          <EntityPermissionFields
            actionName={actionName}
            actionDisplayName={actionDisplayName}
            entityId={entityId}
            permission={permission}
          />
      )}
    </>
  );
};