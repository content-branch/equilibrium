import React, {useEffect} from 'react'
import { Row, Col, Empty, Divider, PageHeader, Tag, message, Spin } from 'antd';
import useEntityList from "@hooks/useEntityList";
import useEntity from "@hooks/useEntity";
import LockStatusIcon from "@amp-components/VersionControl/LockStatusIcon";
import AdvancedPermission from '@amp-components/Permissions/AdvancedPermission';
import { SafetyCertificateTwoTone } from '@ant-design/icons'

const Detail = ({ match }: any) => {
	const { entityId } = match.params;
	const { application  } = useEntityList({ match });
	const {
		loading,
		data,
		error,
		errorMessage,
		updateError,
		handleSubmit
	} = useEntity({match, entityId, application});

	useEffect(() => {
		if(error || updateError){
			message.error(errorMessage);
		}
	}, [error, errorMessage, updateError]);

	const entity = data?.entity;

	return (
		<div>
			{loading && <Spin />}
			<PageHeader
				className="site-page-header"
				title={<h1> <SafetyCertificateTwoTone twoToneColor='#52c41a' /> Permissions for {entity?.displayName}</h1>}
				subTitle={(
					<Row align="middle" justify="end">
						<Col span={24} >
							{ entity && Boolean(entity.lockedByUser) && 
								(
									<LockStatusIcon lockedByUser={entity.lockedByUser} longVersion={true} />
								)
							}
						</Col>
					</Row>
				)}
			/>
            {
				entity ?
				(
					<>
						<AdvancedPermission />
						<Divider />
					</>
				):
				(
					<Empty 
						description={
							<span>
								Entity of id <Tag><b>{entityId}</b></Tag>is not a valid entity for this application. Please verify your workspace!
							</span>
						}
					/>
				)
			}
		</div>
	)
}

export default Detail
