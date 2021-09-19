import React, { useEffect } from 'react';
import { List, PageHeader, Row, Col, Divider, message, Spin, Typography} from 'antd';
import { 
	ClusterOutlined,
	AimOutlined
} from '@ant-design/icons';
import { ENTITY_ACTIONS } from "@amp-components/Entity/constants";
import usePermissionsForm from "@hooks/usePermissionsForm";
import { ActionRoleListContainer } from "@amp-components/Permissions/ActionRoleListContainer";
import { PermissionTypeContainer } from "@amp-components/Permissions/PermissionTypeContainer";
import { EntityPermissionAction  } from "@amp-components/Permissions/EntityPermissionAction";
import { PermissionFieldContainer } from "@amp-components/Permissions/PermissionFieldContainer";
import './AdvancedPermission.scss';

const { Text } = Typography;

const AdvancedPermission = ({entityId, isSource}:any) => {	
	const {
		loading,
		error,
		errorMessage,
		permissionsByAction
	  } = usePermissionsForm({
		availableActions:ENTITY_ACTIONS,
		entityId,
	});

	useEffect(() => {
		if(error){
		  message.error(errorMessage);
		}
	}, [error, errorMessage]);
		
	return (
		<>
			<PageHeader
				className="site-page-header"
				title={<h2 className="mb-4"><ClusterOutlined twoToneColor="#52c41a"/> Group Permissions</h2>}
			/>
			<Row>
				<Col span={7}>
					<List
						itemLayout="vertical"
						size="large"
						header={<Text type="secondary">Actions</Text>}
					>
							{loading
							? <Spin />
							: ENTITY_ACTIONS.map((action) => (
								<EntityPermissionAction 
									key={action.action}
									entityId={entityId}
									permission={permissionsByAction[action.action]}
									permissionAction={action}
								/>
							))}
					</List>
				</Col>
				<Col span={7} offset={1}>
					<List
						itemLayout="vertical"
						size="large"
						header={<Text type="secondary">Permission Type</Text>}
					>
							{loading
							? <Spin />
							: ENTITY_ACTIONS.map((action) => (
								<PermissionTypeContainer 
									key={action.action}
									entityId={entityId}
									permission={permissionsByAction[action.action]}
									permissionAction={action}
								/>
							))}
						</List>
				</Col>
				<Col span={7} offset={1}>
					<List
						itemLayout="vertical"
						size="large"
						header={<Text type="secondary">Selected Roles</Text>}
					>
							{loading
							? <Spin />
							: ENTITY_ACTIONS.map((action) => (
								<ActionRoleListContainer 
									key={action.action}
									entityId={entityId}
									permission={permissionsByAction[action.action]}
									permissionAction={action}
								/>
							))}
					</List>
				</Col>
			</Row>
			<Divider />
			<PageHeader
				className="site-page-header"
				title={<h2 className="mb-4"><AimOutlined /> Field Target Permissions</h2>}
			/>
				{loading
				? <Spin />
				: ENTITY_ACTIONS.map((action) => (
					<Row>
						<PermissionFieldContainer 
							key={action.action}
							entityId={entityId}
							permission={permissionsByAction[action.action]}
							permissionAction={action}
						/>
					</Row>
				))}
		</>
	);
}

export default AdvancedPermission
