import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const config = `GITHUB_SECRET_SECRET_NAME=use_local_settings
GITHUB_CLIENT_SECRET=[client_secret_here]
GITHUB_CLIENT_ID=[client_id_here]
GITHUB_APP_AUTH_SCOPE=user:email,repo,read:org
GITHUB_APP_AUTH_REDIRECT_URI=http://localhost:3001/github-auth-app/callback/{appId}`;

const GitHubSync = () => {
	return (
		<div>
			<h2>GitHub Sync</h2>
			<p>Equilibrium can push the code of your app to a GitHub repository. It will provide you with full control on your app, and will also allow you to easily track the changes and the code generated by Equilibrium.</p>
			<div className="mt-4">
				<h4 className="font-weight-bold">General</h4>
				<ul>
					<li>For every commit you create in Equilibrium, it will push a new Pull Request to your GitHub repository with the updated code.</li>
					<li>You will always have the choice to decide how and if to merge the changes to your branch.</li>
					<li>The pull request will be created in a new branch, with the default branch of your repository (usually master or main) as a base.</li>
					<li>The code from Equilibrium will be created relatively to the root of the selected repository.</li>
					<li>The selected repository must not be empty, so please create at least one file in the root folder.</li>
				</ul>
				<p>If you want to create a new repository in GitHub, please select Initialize this repository with a <code>README</code> file to make sure the new repository is not empty.</p>
			</div>
			<div className="mt-4">
				<h4 className="font-weight-bold">Create a new GitHub App</h4>
				<ul>
					<li>Go to https://github.com/settings/developers.</li>
					<li>Click on OAuth Apps.</li>
					<li>Click on Register a new application.</li>
					<li>Give the application any name.</li>
					<li>Set the Authorization callback URL URL to http://localhost:3001</li>
					<li>Copy and save the client secret and client ID of your new GitHub application.</li>
				</ul>
				<p>In case you are hosting the Equilibrium server on any other address, use the specific address instead of http://localhost:3001</p>
			</div>
			<div className="mt-4">
				<h4 className="font-weight-bold">Configure Equilibrium server to work with the new GitHub app</h4>
				<p>Go the <code>../packages/equilibrium-server/.env.local</code> or create it otherwise</p>
				<p>Add the following content to the file</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{config}
				</SyntaxHighlighter>
				<p>Replace <code>[client_secret_here]</code> with the client secret of the new GitHub application.</p>
				<p>Replace <code>[client_id_here]</code> with the client ID of the new GitHub application.</p>
				<p>Restart the server</p>
			</div>
		</div>
	)
}

export default GitHubSync
