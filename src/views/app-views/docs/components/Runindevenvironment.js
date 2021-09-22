import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const steps = {
	install:`cd server
npm install`,
	docker:`npm run docker:db`,
	generate:`npm run prisma:generate`,
	init:`npm run db:init`,
	start:`npm run start`,
	admin:`cd ../admin-ui`,
	admin_install:`npm install`,
	admin_start:`npm run start`,
};
const RunInDev = () => {
	return (
		<div>
			<h2>Run in development environment</h2>
			<div className="mt-4">
				<h4>Environment Setup</h4>
				<p>To build and run your generated application in a local development environment follow this tutorial. </p>
				
			</div>
			<div className="mt-4">
				<h4>Environment Setup</h4>
				<p className="font-size-sm">Equilibrium generated app required some prerequisite, you many need to install the following tools before starting the app.</p>
				<div className="d-flex mt-4">
					<div> - </div>
					<div className=" ml-3">
						<h5 className="font-weight-bold">
							<a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js v14 or above</a>
						</h5>
					</div>
				</div>
				<div className="d-flex mt-2">
					<div> - </div>
					<div className=" ml-3">
						<h5 className="font-weight-bold">
							<a href="https://npmjs.com/" target="_blank" rel="noopener noreferrer">npm v7 or above</a>
						</h5>
					</div>
				</div>
				<div className="d-flex mt-2">
					<div> - </div>
					<div className=" ml-3">
						<h5 className="font-weight-bold">
							<a href="https://docker.com/" target="_blank" rel="noopener noreferrer">Docker</a>
						</h5>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<h4>Summary</h4>
				<p className="font-size-sm">In this article you will go through the following steps:</p>
				<ul>
					<li>Install packages from npm for the server</li>
					<li>Start docker container for your database</li>
					<li>Initialize your database</li>
					<li>Run your server</li>
					<li>Install packages from npm for the Admin UI</li>
					<li>Run the Admin UI</li>
				</ul>
			</div>
			<div className="mt-4">
				<h4>Install packages from npm for the server</h4>
				<p className="font-size-sm">Your application is using npm for package management. To install all the necessary package follow these steps:</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.install}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h4>Start docker container for your database</h4>
				<p className="font-size-sm">Your application is shipped with a built-in connection to PostgreSQL DB. To start the database you need to run a docker container using the following command:</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.docker}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h4>Initialize your database</h4>
				<p className="font-size-sm">Now you need to create your application schema on the database. To do so Equilibrium uses Prisma and the Prisma migrate command.
				</p>
				<p>First, execute the following command in the command-line tool to generate the Prisma client</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.generate}
				</SyntaxHighlighter>
				<p>Now, execute the following command in the command-line tool to generate the schema on the database</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.init}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h4>Run your server</h4>
				<p className="font-size-sm">That's it, your server is ready! Execute the following command to start your server</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.start}
				</SyntaxHighlighter>
				<p>By default, your server is now available at <code>http://localhost:3000</code></p>
				<p>You can start accessing GraphQL Console from <code>http://localhost:3000/graphql</code> and REST API from <code>http://localhost:3000/api</code></p>
			</div>
			<div className="mt-4">
				<h4>Install packages from npm for the Admin UI</h4>
				<p className="font-size-sm">Now that your server is ready, you can build and run the Admin UI - a React client with ready-made forms for creating and editing all the data models of your application.</p>
				<p>To install all the packages needed for the client, follow these steps:</p>
			</div>
			<div className="mt-4">
				<h4>Run the Admin UI</h4>
				<p className="font-size-sm">In this article you will go through the following steps:</p>
				<p>In the terminal, move to the Admin folder. In case you are still in the Server folder, execute this command</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.admin}
				</SyntaxHighlighter>
				<p>Execute npm install or npm i to download and install all the packages</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.admin_install}
				</SyntaxHighlighter>
				<p>To run the React application with the Admin UI execute the following command</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.admin_start}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}

export default RunInDev
