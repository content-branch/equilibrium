import React, { useEffect} from 'react';
import useRoleList from '@hooks/useRoleList';
import { Spin, Row, Col, message, Card, Typography, Skeleton } from "antd";
import SearchInput from "@amp-components/Workspaces/SearchInput";
import { UserOutlined, BarcodeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import NewRole from "@amp-components/Roles/NewRole";

const { Text } 	 = Typography;
const CLASS_NAME = "role-list";

const RolePage = () => {
	const {
		loading,
		data,
		error,
		errorMessage,
		handleSearchChange,
		handleRoleChange
	  } = useRoleList({selectFirst:false});

	  useEffect(() => {
		if(error){
		  message.error(errorMessage);
		}
	  }, [error, errorMessage]);
	  
	return (
		<>
			{loading && <Spin />}
			<Row className={`${CLASS_NAME}__header`}>
				<Col span={5}>
					<SearchInput onSearchResult={handleSearchChange}/>
				</Col>
				
			</Row>
			<Row className="my-3">
				<NewRole onRoleAdd={handleRoleChange}/>
			</Row>
			<Row>
			{data?.appRoles?.map((role) => (
				<div key={role.id}>
					<Card 
						title={role.displayName} 
						className="m-4 p-1" 
						bordered={false} 
						hoverable 
						size="small" 
						style={{ width: 300 }}
						actions={[
							<EditOutlined />,
							<DeleteOutlined key="ellipsis" />
						]}
					>
						<Skeleton loading={loading} avatar active>
						<Card.Meta avatar={<UserOutlined />} className="mb-4  p-1"  title="About" description={(
							<Text type="secondary">{role.description || 'No description avalaible for this role'}</Text>
						)}></Card.Meta>
						</Skeleton>
						<Skeleton loading={loading} avatar active>
						<Card.Meta avatar={<BarcodeOutlined />} className="mb-2  p-1" title="Codename" description={(
							<Text type="secondary">{role.name}</Text>
						)}></Card.Meta>
						</Skeleton>

					</Card>
				</div>
			))}
			</Row>
		</>
	)
}

export default RolePage
