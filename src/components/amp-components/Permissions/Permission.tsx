import React, { useEffect } from 'react';
import { List, Typography, PageHeader, Spin, message } from 'antd';
import { 
	SafetyCertificateTwoTone
} from '@ant-design/icons';
import usePermissionsForm from "@hooks/usePermissionsForm";
import { ENTITY_ACTIONS } from "@amp-components/Entity/constants";
import { EntityPermissionAction  } from "@amp-components/Permissions/EntityPermissionAction";

const { Text } = Typography;

const Permission = ({entityId}:any) => {
	
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
				title={<h3 className="mb-4"><SafetyCertificateTwoTone twoToneColor="#52c41a"/> Permissions</h3>}
			/>
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
							isSource
						/>
					))}
			</List>
		</>
	);
}

export default Permission
