import React from "react";
import Icon from 'components/util-components/Icon';
import Flex from 'components/shared-components/Flex';
import { List, Switch } from "antd";
import useEntityPermissionAction, { Props } from "@hooks/useEntityPermissionAction";
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

export const EntityPermissionAction = ({
  entityId,
  permission,
  permissionAction: { action: actionName, actionDisplayName, canSetFields },
  isSource,
}: Props) => {
  
  const { 
    models,
    handleDisableChange,
  } = useEntityPermissionAction({
    entityId,
    permission,
    permissionAction: { action: actionName, actionDisplayName, canSetFields },
  });

  return (
    <List.Item className="operation-item">
      <Flex justifyContent="between" alignItems="center" className="w-100 operation-child">
        <span className="d-flex align-items-center">
          <Icon className="h2 mb-0 text-primary" type={getIcon(actionDisplayName)} />
          <span className="ml-3 ">
            <h5 className="mb-0">{actionDisplayName}</h5>
            {isSource && <p> Set specific permissions to special fields role by role <a href={`/app/settings/permissions/${entityId}`}>here</a></p>}
          </span>
        </span>
        <span className="ml-3">
          <Switch 
              onChange={handleDisableChange}
              checked={
                permission.type !== models.EnumEntityPermissionType.Disabled
              }
          />
        </span>
      </Flex>
    </List.Item>
  );
};