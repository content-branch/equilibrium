import React from "react";
import { List } from "antd";
import Flex from 'components/shared-components/Flex';
import { ActionRoleList } from "@amp-components/Permissions/ActionRoleList";
import useEntityPermissionAction, { Props } from "@hooks/useEntityPermissionAction";

export const ActionRoleListContainer = ({
  entityId,
  permission,
  permissionAction: { action: actionName, actionDisplayName, canSetFields },
}: Props) => {
  
  const { 
    data,
    models,
    selectedRoleIds,
    handleRoleSelectionChange
  } = useEntityPermissionAction({
    entityId,
    permission,
    permissionAction: { action: actionName, actionDisplayName, canSetFields },
  });

  return (
    <List.Item className="taglist-item p-3">
        <Flex justifyContent="start" alignItems="center" className="w-100 mb-1 mt-2 ">
          <ActionRoleList
            availableRoles={data?.appRoles || []}
            selectedRoleIds={selectedRoleIds}
            debounceMS={0}
            onChange={handleRoleSelectionChange}
            disabled={permission.type !== models.EnumEntityPermissionType.Granular}
          />
        </Flex>
    </List.Item>
  );
};