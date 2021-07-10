import React, {Component} from 'react'
import { SearchOutlined, DatabaseTwoTone } from '@ant-design/icons';
import { Menu, Col, Spin, Row, Tag, Input } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import Detail from './detail';
import useEntityList from "@hooks/useEntityList";

const CLASS_NAME = "entity-list";

const ContentModelOption = ({ match }) => {

	const {loading, data, handleSearchChange } = useEntityList({ match });

	const searchOnChange = e => {
		const query = e.target.value;
		handleSearchChange(query);
	}

	return (
		<>
			<Row>
				<Menu
					style={{ width: 300 }}
					mode="inline"
				>
					<Menu.ItemGroup key="filter-group" title={(
						<Row className={`${CLASS_NAME}__group-title`} align="middle">
							<Col span={19}>Filter Content-Types</Col>
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
							<Col span={18}>Custom Content-Types</Col>
							<Col span={5}><Tag color="blue">{data?.entities?.length}</Tag></Col>
						</Row>
					)} >
						{loading && <Spin />}
						{data?.entities.map((entity) => (
							<Menu.Item key={entity.id} title={entity.displayName}>
								<DatabaseTwoTone />
								{entity.displayName}
							</Menu.Item>
						))}
					</Menu.ItemGroup>
				</Menu>
			</Row>
			
		</>
	  );
};

const ContentModelContent = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/content-model`} />
			<Route path={`${match.url}/content-model`} component={Detail} />
		</Switch>
	)
}
export class ContentModel extends Component {
	
	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={320}
				sideContent={<ContentModelOption {...this.props}/>}
				mainContent={<ContentModelContent {...this.props}/>}
			/>
		);
	}
}

export default ContentModel