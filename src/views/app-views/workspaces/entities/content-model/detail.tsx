import React from 'react'
import { Row, Col, Empty, Divider, PageHeader, Tag } from 'antd';
import useEntityList from "@hooks/useEntityList";
import LockStatusIcon from "@amp-components/VersionControl/LockStatusIcon";
import Permission from './permission';

const Detail = ({ match }: any) => {
	const {entityId} = match.params;
	const { data} = useEntityList({ match });
	const entity = data?.entities?.find(element =>  element.id === entityId);

	return (
		<div>
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
			/>
            {
				entity ?
				(
					<>
						<PageHeader
							className="site-page-header"
							title={<h3>General settings</h3>}
						/>
						
						<Row>
							
						</Row>
						<Divider />
						<PageHeader
							className="site-page-header"
							title={<h3 className="mb-4">Fields</h3>}
						/>
						<Row>
							
						</Row>
						<Divider />
						<Permission />
					</>
				):
				(
					<Empty 
						description={
							<span>
								Entity of id <Tag><b>{entityId}</b></Tag>is not a valid entity for this application. Please verify!
							</span>
						}
					/>
				)
			}
		</div>
	)
}

export default Detail
