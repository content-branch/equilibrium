import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const steps = {
	prisma : `npm run prisma:generate`,
	dependencies: {
		server:`npm run build -- --scope @equilibrium/server --include-dependencies`,
		client:`npm run build -- --scope @equilibrium/client --include-dependencies`,
	},
	generated: `npm run generate`,
	cd: `cd packages/equilibrium-server`,
	docker: `npm run docker`,
	database: `npm run start:db`,
	start: `npm run start:watch`,
}

const Installation = () => {
	return (
		<div>
			<h2>Installation</h2>
			<div className="mt-4">
				<h4>Environment Setup</h4>
				<p className="font-size-sm">Equilibrium required some prerequisite, you many need to install the following tools before starting the app.</p>
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
				<h4>Installing Packages</h4>
				<p className="font-size-sm">Navigate to project root directory and execute <code>npm install</code> then <code>npm run bootstrap</code> to install all necessary dependencies. </p>

			</div>
			<div className="mt-4">
				<h4>First Setup</h4>
				<p className="font-size-sm">Update code generated by Prisma</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.prisma}
				</SyntaxHighlighter>
				<p className="font-size-sm">Build dependencies of the server:</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.dependencies.server}
				</SyntaxHighlighter>
				<p className="font-size-sm">Update other generated code</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.generated}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h4>Preparing the server</h4>
				<p className="font-size-sm">Make sure Docker is running</p>
				<p className="font-size-sm">Move to server directory <code>packages/equilibrium-server</code></p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.cd}
				</SyntaxHighlighter>
				<p className="font-size-sm">Get external services up</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.docker}
				</SyntaxHighlighter>
				<p className="font-size-sm">Update application database</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.database}
				</SyntaxHighlighter>
				<p className="font-size-sm">Start the development server and watch for changes</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.start}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h4>Running the application client</h4>
				<p>Before starting the client you need to setup the server and database. </p>
				<p>After that you have to build dependencies of the client:</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{steps.dependencies.client}
				</SyntaxHighlighter>
				In the project directory, after you setup the server and client dependencies, you can run:
				<code> npm start </code>
				<code> npm test </code>
				<code> npm run build </code>
				<code> npm run eject </code>
			</div>

		</div>
	)
}

export default Installation