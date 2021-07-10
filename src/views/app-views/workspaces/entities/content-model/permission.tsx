import React, { Component } from 'react';
import { List, Switch, PageHeader} from 'antd';
import { 
	TagsOutlined, 
	UserAddOutlined, 
	MailOutlined,
	CommentOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import Flex from 'components/shared-components/Flex';


export class Permission extends Component {

	state ={
		config: [
			{
				key: 'key-mentions',
				title: 'View',
				icon: TagsOutlined,
				desc: 'You will receive an alert when someone was mentioned you in any post.',
				allow: false
			},
			{
				key: 'key-follows',
				title: 'Create',
				icon: UserAddOutlined,
				desc: 'You will receive an alert when someone is follwing you.',
				allow: true
			},
			{
				key: 'key-comment',
				title: 'Update',
				icon: CommentOutlined,
				desc: 'You will receive an permissions when someone is comment on your post.',
				allow: true
			},
			{
				key: 'key-email',
				title: 'Delete',
				icon: MailOutlined,
				desc: 'You will receive daily email permissions.',
				allow: false
			},
			{
				key: 'key-product',
				title: 'Search',
				icon: ShoppingOutlined,
				desc: 'You will receive an permissions when a new product arrived.',
				allow: true
			}
		]
	}

	render() {
		const { config } = this.state;
		return (
			<>
				<PageHeader
					className="site-page-header"
					title={<h3 className="mb-4">Permission</h3>}
				/>
				<List
					itemLayout="horizontal"
					dataSource={config}
					size="small"
					renderItem={item => (
						<List.Item>
							<Flex justifyContent="between" alignItems="center" className="w-100">
								<div className="d-flex align-items-center">
									<Icon className="h1 mb-0 text-primary" type={item.icon} />
									<div className="ml-3">
										<h4 className="mb-0">{item.title}</h4>
										<p>{item.desc}</p>
									</div>
								</div>
								<div className="ml-3">
									<Switch defaultChecked={item.allow} onChange={
										checked => {
											const checkedItem = config.map( elm => {
												if(elm.key === item.key) {
													elm.allow = checked
												}
												return elm
											})
											this.setState({
												config:[
													...checkedItem
												]
											})
										}
									} />
								</div>
							</Flex>
						</List.Item>
					)}
				/>
			</>
		)
	}
}

export default Permission
