import React, { lazy, Suspense } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const menuList = [
	{ 
		name:'Introduction', 
		key: 'introduction',
		sub: []
	},
	{ 
		name: 'Folder Structure', 
		key: 'folder-structure',
		sub: []
	},
	{ 
		name: 'Installation', 
		key: 'installation',
		sub: []
	},
	{ 
		name: 'Developper Docs', 
		key: 'development',
		sub: [
			{
				name: 'Use your APIs', 
				key: 'apis',
				sub: [] 
			},
			{
				name: 'Run in dev environment', 
				key: 'dev-env',
				sub: [] 
			},
			{
				name: 'Add a custom code', 
				key: 'custom-code',
				sub: [] 
			},
		] 
	},
	{ 
		name: 'Using the CLI Tools', 
		key: 'cli-tools',
		sub: [] 
	},
	{ 
		name: 'GitHub Sync', 
		key: 'github-sync',
		sub: [] 
	},
	{ 
		name: 'Changelog', 
		key: 'changelog',
		sub: [] 
	}
]

const prefix = 'documentation/'

const DocsMenu = (props) => {
	const { match, location } = props
	return (
		<div className="w-100">
			<Menu
				defaultSelectedKeys={`${match.url}/${prefix}introduction`}
				mode="inline"
				selectedKeys={[location.pathname]}
			>
				{menuList.map(elm => {
					if (elm.sub.length === 0) {
						return (
							<Menu.Item key={`${match.url}/${prefix}${elm.key}`}>
								<span>{elm.name}</span>
								<Link to={`${match.url}/${prefix}${elm.key}`}/>
							</Menu.Item>
						)
					} else {
					 	return (
							<Menu.SubMenu key={`${match.url}/${prefix}${elm.key}`} title={elm.name}>
								{elm.sub.map(item =>(
									<Menu.Item key={`${match.url}/${prefix}${item.key}`}>
										<span>{item.name}</span>
										<Link to={`${match.url}/${prefix}${item.key}`}/>
									</Menu.Item>
								))}
							</Menu.SubMenu>
						)
					}
				})}
			</Menu>
		</div>
	)
}

const Docs = props => {
	const { match } = props
	return (
		<InnerAppLayout 
			sideContent={<DocsMenu {...props}/>}
			mainContent={
				<div className="p-4">
					<div className="container-fluid">
						<Suspense fallback={<Loading />}>
							<Switch>
								{menuList.map(elm => (
									elm.sub.length === 0 ?
									<Route 
										key={elm.key}
										path={`${match.url}/${prefix}${elm.key}`} 
										component={lazy(() => import(`./components/${elm.name.replace(/\s/g, '')}`))}
									/>
									:
									elm.sub.map(item => (
										<Route 
											key={item.key}
											path={`${match.url}/${prefix}${item.key}`} 
											component={lazy(() => import(`./components/${item.name.replace(/\s/g, '')}`))}
										/>
									))
								))}
								<Redirect from={`${match.url}`} to={`${match.url}/${prefix}introduction`} />
							</Switch>
						</Suspense>
					</div>
				</div>
			}
			sideContentWidth={300}
			sideContentGutter={false}
			border
		/>
	)
}

export default Docs
