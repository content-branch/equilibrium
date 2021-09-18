import React, { useState, useEffect } from 'react';
import { List, Switch, PageHeader, Row, Col, Tag, Divider} from 'antd';
import { 
	EyeOutlined, 
	AppstoreAddOutlined, 
	DeleteOutlined,
	EditOutlined,
	FileSearchOutlined,
	ClusterOutlined,
	AimOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import Flex from 'components/shared-components/Flex';
// import { Radio, Form } from "formik-antd";
import { Radio } from "antd"; 
import { Form } from "formik";
import './AdvancedPermission.scss';

const AdvancedPermission = ({entityId, isSource}:any) => {
	const [config, setConfig] = useState([
		{
			key:'',
			title:'',
			icon:EyeOutlined,
			desc:'',
			allow:false
		}
	]);

	useEffect(()=>{
		setConfig([
			{
				key: 'key-mentions',
				title: 'View',
				icon: EyeOutlined ,
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: false
			},
			{
				key: 'key-follows',
				title: 'Create',
				icon: AppstoreAddOutlined ,
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: true
			},
			{
				key: 'key-comment',
				title: 'Update',
				icon: EditOutlined ,
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: true
			},
			{
				key: 'key-email',
				title: 'Delete',
				icon: DeleteOutlined,
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: false
			},
			{
				key: 'key-product',
				title: 'Search',
				icon: FileSearchOutlined,
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: true
			}
		]);
	}, []);
	
		
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
					dataSource={config}
					size="large"
					header="Operation"
					bordered={false}
					renderItem={item => (
						<List.Item className="operation-item">
							<Flex justifyContent="between" alignItems="center" className="w-100 operation-child">
								<span className="d-flex align-items-center">
									<Icon className="h2 mb-0 text-primary" type={item.icon} />
									<span className="ml-3 ">
										<h5 className="mb-0">{item.title}</h5>
									</span>
								</span>
								<span className="ml-3">
									<Switch defaultChecked={item.allow} onChange={
										checked => {
											const checkedItem = config.map( elm => {
												if(elm.key === item.key) {
													elm.allow = checked
												}
												return elm
											})
											setConfig([
													...checkedItem
												]
											)
										}
									} />
								</span>
							</Flex>
						</List.Item>
					)}
				/>

				</Col>
				<Col span={7} offset={1}>
				{/* <Form > */}
				<List
					itemLayout="vertical"
					dataSource={config}
					size="large"
					header="Authorization type"
					bordered={false}
					renderItem={item => (
						<List.Item className="granular-item">
							{/* <Form.Item  name={`${item.key}-granular`}> */}
								<Flex justifyContent="between" alignItems="center" className="w-100">
									<Radio.Group name={`${item.key}-granular`} defaultValue="a" buttonStyle="solid">
										<Radio.Button name={`${item.key}-granular`} value="a">All Roles</Radio.Button>
										<Radio.Button name={`${item.key}-granular`} value="b">Granular</Radio.Button>
									</Radio.Group>
								</Flex>
							{/* </Form.Item> */}
						</List.Item>
					)}
				/>
				{/* </Form> */}
			</Col>
			<Col span={7} offset={1}>
				<List
					itemLayout="vertical"
					dataSource={config}
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
			</Row>
			<Divider />
			<PageHeader
				className="site-page-header"
				title={<h2 className="mb-4"><AimOutlined /> Target Permissions</h2>}
			/>
			<Row>

			</Row>
			
		</>
	);
}

export default AdvancedPermission
