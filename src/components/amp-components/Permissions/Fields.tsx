import React from "react";
import * as models from "models";
import { List, Col , Tag} from "antd";
import Flex from 'components/shared-components/Flex';
import { ActionRoleList } from "@amp-components/Permissions/ActionRoleList";
// import { EntityPermissionFields } from "./EntityPermissionFields";
import useEntityPermissionAction, { Props } from "@hooks/useEntityPermissionAction";

const CLASS_NAME = "entity-permissions-action";

const OPTIONS = [
  { value: models.EnumEntityPermissionType.AllRoles, label: "All Roles" },
  { value: models.EnumEntityPermissionType.Granular, label: "Granular" },
];

export const EntityPermissionAction = ({
  entityId,
  permission,
  permissionAction: { action: actionName, actionDisplayName, canSetFields },
}: Props) => {
  
  const { 
    isOpen,
    data,
    models,
    selectedRoleIds,
    handleChangeType,
    handleDisableChange,
    handleRoleSelectionChange
  } = useEntityPermissionAction({
    entityId,
    permission,
    permissionAction: { action: actionName, actionDisplayName, canSetFields },
  });

  return (
    <>
      <Col span={7} offset={1}>
				<List
					itemLayout="vertical"
					dataSource={data?.appRoles}
					size="large"
					header='Selected Roles'
					renderItem={item => (
						<List.Item className="taglist-item p-3">
							<Flex justifyContent="start" alignItems="center" className="w-100 mb-1 mt-2 ">
								<Tag >Employee</Tag>
								<Tag color='blue'>User</Tag>
								<Tag>Reception</Tag>
								<Tag >Admin</Tag>
							</Flex>
						</List.Item>
					)}
					bordered={false}
				/>
			</Col>
      {/* <ul className="panel-list">
        <li>
          <ActionRoleList
            availableRoles={data?.appRoles || []}
            selectedRoleIds={selectedRoleIds}
            debounceMS={1000}
            onChange={handleRoleSelectionChange}
          />
        </li>
      </ul> */}
      {/* <li>
          {canSetFields &&
            permission.type !== models.EnumEntityPermissionType.Disabled && (
              <EntityPermissionFields
                actionName={actionName}
                actionDisplayName={actionDisplayName}
                entityId={entityId}
                permission={permission}
              />
            )}
        </li> */}
    </>
  );
};