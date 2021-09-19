import React, {Component} from 'react'
import { SearchOutlined, ProfileTwoTone } from '@ant-design/icons';
import { Menu, Col, Spin, Row, Tag, Input } from 'antd';
import { Redirect, Route, Switch, Link} from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import Detail from './detail';
import Entities from './entities';
import useEntityList from "@hooks/useEntityList";
import LockStatusIcon from "@amp-components/VersionControl/LockStatusIcon";


const CLASS_NAME = "entity-list";

const PermissionsOption = ({ match, location}) => {

	const {loading, data, handleSearchChange } = useEntityList({ match });

	const searchOnChange = e => {
		const query = e.target.value;
		handleSearchChange(query);
	}

	return (
		<>
			<Row>
				<Menu
					style={{ width: 450 }}
					mode="inline"
					selectedKeys={[location.pathname]}
				>
					<Menu.ItemGroup key="filter-group" title={(
						<Row className={`${CLASS_NAME}__group-title`} align="middle">
							<Col span={19}>Filter by Content-Types</Col>
							<Col span={4}><SearchOutlined /></Col>
						</Row>
					)} >
						<Row className={`${CLASS_NAME}__group-title`} align="middle">
							<Col span={20} offset={1}>
								<Input 
									placeholder="Search" 
									bordered={false}
									onChange={searchOnChange}
								/>
							</Col>
						</Row>
						
					</Menu.ItemGroup>
					<Menu.ItemGroup key="content-group" title={(
						<Row className={`${CLASS_NAME}__group-title`} align="middle">
							<Col span={18}>Content-Types Permissions</Col>
							<Col span={5}><Tag color="blue">{data?.entities?.length}</Tag></Col>
						</Row>
					)} >
						{loading && <Spin />}
						{data?.entities.map((entity) => (
							<Menu.Item key={`${match.url}/${entity.id}`} title={entity.displayName}>
								<Row className={`${CLASS_NAME}__group-title`} align="middle">
									<Col span={18}>
										<ProfileTwoTone  twoToneColor='#108ee9' />
										Permissions for {entity.displayName}
									</Col>
									<Col span={5}>
										{Boolean(entity.lockedByUser) && (
											<LockStatusIcon lockedByUser={entity.lockedByUser} />
										)}
									</Col>
								</Row>
								<Link to={entity.id} />
							</Menu.Item>
						))}
					</Menu.ItemGroup>
				</Menu>
			</Row>
			
		</>
	  );
};

const PermissionsContent = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/permissions`} />
			<Redirect exact from={`${match.url}/permissions/:entityId`} to={`${match.url}/:entityId`} />
			<Route path={`${match.url}/permissions`} component={Entities} />
			<Route path={`${match.url}/:entityId`} component={Detail} />
		</Switch>
	)
}
export class Permissions extends Component {
	
	render() {
		return (
			<InnerAppLayout 
				pageHeader={true}
				sideContentWidth={500}
				sideContent={<PermissionsOption {...this.props}/>}
				mainContent={<PermissionsContent {...this.props}/>}
			/>
		);
	}
}

export default Permissions