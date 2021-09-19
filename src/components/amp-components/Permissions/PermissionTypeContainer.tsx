import React from "react";
import { List, Radio} from "antd";
import Flex from 'components/shared-components/Flex';
import useEntityPermissionAction, { Props } from "@hooks/useEntityPermissionAction";

export const PermissionTypeContainer = ({
  entityId,
  permission,
  permissionAction: { action: actionName, actionDisplayName, canSetFields },
}: Props) => {
  
  const { 
    models,
    handleChangeType,
  } = useEntityPermissionAction({
    entityId,
    permission,
    permissionAction: { action: actionName, actionDisplayName, canSetFields },
  });

  return (
    <List.Item className="granular-item">
      <Flex justifyContent="between" alignItems="center" className="w-100">
        <Radio.Group name={`action_${permission.id}`} defaultValue={permission.type} disabled={permission.type === models.EnumEntityPermissionType.Disabled} buttonStyle="solid" onChange={handleChangeType}>
          <Radio.Button name={`action_${permission.id}`} disabled={permission.type === models.EnumEntityPermissionType.Disabled} value={models.EnumEntityPermissionType.AllRoles}>All Roles</Radio.Button>
          <Radio.Button name={`action_${permission.id}`} disabled={permission.type === models.EnumEntityPermissionType.Disabled} value={models.EnumEntityPermissionType.Granular}>Granular</Radio.Button>
        </Radio.Group>
      </Flex>
    </List.Item>
  );
};