import React, {useEffect} from 'react'
import { Row, Col, Empty, Divider, PageHeader, Tag, message,notification, Spin, Button, Modal } from 'antd';
import useEntityList from "@hooks/useEntityList";
import useEntity from "@hooks/useEntity";
import LockStatusIcon from "@amp-components/VersionControl/LockStatusIcon";
import EntityForm from "@amp-components/Entity/EntityForm";
import Permission from '@amp-components/Permissions/Permission';
import { SettingTwoTone , DeleteFilled} from '@ant-design/icons';
import NewEntityField from "@amp-components/Entity/NewEntityField";
import Flex from "@components/shared-components/Flex";
import useEntityListItem from "@hooks/useEntityListItem";
import Fields from './fields';
import './Fields.scss';

const { confirm } = Modal;

const Detail = ({ match }: any) => {
	const { entityId } = match.params;
	const { application  } = useEntityList({ match });
	
	const onError = (error:Error) => {
		message.error(error.message);
	}

	const onDelete = () => {
		notification.open({
			message: 'Entity Removed',
			description:
			  'This change can still be discarded',
			onClick: () => {
			  console.log('Notification Clicked!');
			},
		  });
	}

	const {
		loading,
		data,
		error,
		errorMessage,
		updateError,
		handleSubmit
	} = useEntity({match, entityId, application});

	const entity = data?.entity;

	const {
		deleteLoading,
		handleConfirmDelete,
		handleDismissDelete,
	  } = useEntityListItem({
		entity,
		onError,
		onDelete
	  });

	const confirmDeleteField = (): void => {
		confirm({
		  title: `Delete "${entity?.displayName}"`,
		  content: 'Are you sure you want to delete this entity?',
		  onOk() {
			return new Promise((resolve, reject) => {
			  setTimeout(() =>{
				  handleConfirmDelete();
				  return resolve();
			  }, 500);
			}).catch(() => message.error('Error while deleting the entity'));
		  },
		  onCancel() {
			handleDismissDelete();
		  },
		  okText: 'Yes',
		  okType: 'danger',
		  cancelText: 'No',
		});
	}

	useEffect(() => {
		if(error || updateError){
			message.error(errorMessage);
		}
	}, [error, errorMessage, updateError]);


	return (
		<div>
			{loading && <Spin />}
			<PageHeader
				className="site-page-header"
				title={<h1>{entity?.displayName}</h1>}
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
				extra={(
					<Flex 
						alignItems="end"
						justifyContent="end"
						className="fluid-container"
					>
						{entity && (
							<Button type="primary"  disabled={deleteLoading} onClick={confirmDeleteField} danger shape="circle" icon={<DeleteFilled />} size="middle" />
						)}
					</Flex>
				)}
			/>
            {
				entity ?
				(
					<>
						 <Row justify="start">
							 <Col className="new">
								{data?.entity && (
									<NewEntityField entity={entity} />
								)}
							</Col>
						</Row>

						<Row className={`fields-section`}>
							<Fields entityId={ entity?.id }/>
						</Row>
						<Permission entityId={ entity?.id } />
						<Divider />
						<PageHeader
							className="site-section-header"
							title={<h3><SettingTwoTone  twoToneColor="#52c41a"/> General settings</h3>}
						/>
						<Row>
							<EntityForm
								entity={entity}
								applicationId={application}
								onSubmit={handleSubmit}
							/>
						</Row>
						
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
