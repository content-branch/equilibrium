import React from 'react'
import { FolderOutlined, FileOutlined } from '@ant-design/icons';

const FolderTitle = props => (
	<h4>
		{props.type === 'file' ? <FileOutlined className="text-success" /> :  <FolderOutlined className="text-primary"/>}
		<span className="ml-2">{props.title}</span>
	</h4>
)

const FolderDescribe = props => (
	<div className={`mb-4 ${props.level === 2 && 'ml-4 mt-4'}`}>
		{props.children}
	</div>
)

const FolderStructure = () => {
	return (
		<div>
			<h2>Folder Structure</h2>
			<p>The generated app is built from two projects, each in a separate folder</p>
			<FolderDescribe>
				<FolderTitle title="server" />
				<p> For all the server components including REST API, GraphQL, Services and more.</p>
			</FolderDescribe>
				<FolderDescribe level={2}>
					<FolderTitle title="prisma" />
					<p>Folder containing generated prisma scemas for database.</p>
				</FolderDescribe>
				<FolderDescribe level={2}>
					<FolderTitle title="scripts" />
					<p>Scripts for initializing the database with seeds.</p>
				</FolderDescribe>
				<FolderDescribe level={2}>
					<FolderTitle title="src" />
					<p>All server resources including: authentication, base folder, services, ...</p>
				</FolderDescribe>
				
			<FolderDescribe>
				<FolderTitle title="admin" />
				<p>
					For the Admin UI including forms for CRUD operations on all data models.
				</p>
				<FolderDescribe level={2}>
					<FolderTitle title="public" />
					<p>This folder stores web resouce that require to processed by webpack.</p>
				</FolderDescribe>
			</FolderDescribe>
			<FolderDescribe>
				<FolderTitle title="App.js" type="file"/>
				<p>Main app component.</p>
			</FolderDescribe>
			<FolderDescribe>
				<FolderTitle title="Dockerfile" type="file"/>
				<p>File for running directly using docker.</p>
			</FolderDescribe>
			<FolderDescribe>
				<FolderTitle title=".env" type="file"/>
				<p>Environment variables configurations</p>
			</FolderDescribe>
		</div>
	)
}

export default FolderStructure
