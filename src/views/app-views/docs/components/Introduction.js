import React from 'react'

const techList = [
	{ name: 'GitHub' },
	{ name: 'ReactJS' },
	{ name: 'Docker' },
	{ name: 'PostgreSQL' },
	{ name: 'GraphQL' },
	{ name: 'Axios' },
	{ name: 'Apollo' },
	{ name: 'Prisma' },
	{ name: 'NodeJS' },
	{ name: 'NestJS' },
	{ name: 'Ant Design' },
	{ name: 'Passport' },
	{ name: 'Material UI' },
	{ name: 'Swagger UI' },
	{ name: 'Formik' },
	{ name: 'Jest' },
	{ name: 'Terraform' },
	{ name: 'Google Cloud Platform' },
]

const Introduction = () => {
	return (
		<div>
			<h2>Introduction</h2>
			<p style={{textAlign:'justify'}}>
				<strong>Equilibrium</strong> - 
				helps professional Node.js developers to develop quality Node.js applications without spending time on repetitive coding tasks.
				It auto-generates fully functional apps based on TypeScript and Node.js.
				<br />Every app generated using Equilibrium platform contains popular, documented, secured, and supported production-ready components & packages. 
			</p>
			<p style={{textAlign:'justify'}}>
			Build business applications with:
				<ul>
				<li> Manage data models visually or through CLI</li>
				<li> Auto-generated human-editable source code</li>
				<li> Node.js server built with Nest.js and Passport with REST API and GraphQL</li>
				<li> Custom code generated app</li>
				<li> Admin UI built with React</li>
				<li> Role-based access control</li>
				<li> Docker and docker-compose integration</li>
				<li> Automatic push of the generated code to your GitHub repo</li>
				</ul>
			</p>
			<p>
				<strong>NOTE: </strong>
				<span>
					Equilibrium is currently in beta. However your generated apps are production-ready. 
				</span>
			</p>
			<div className="mt-5">
				<h2>Core technologies we used</h2>
				{techList.map((elm, index) => (
					<div className="mb-2" key={elm.name + index}>- {elm.name}</div>
				))}
			</div>
		</div>
	)
}

export default Introduction
