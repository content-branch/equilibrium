import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const gql = `{
	"Authorization": "Basic YWRtaW46YWRtaW4="
}`;
const Apis = () => {
	return (
		<div>
			<h2>Use your APIs</h2>
			<p>Every application created with Equilibrium is generated with two types of APIs: REST, and GraphQL. In this article you will learn how to connect, authenticate, and consume these APIs.</p>
			<div className="mt-4">
				<h4>Authentication</h4>
				<p>Currently your server is secured with Basic HTTP Authentication.</p>
				<p>To send a request to the API you must provide a Basic HTTP authentication header in the form of <code>Authorization: Basic [credentials]</code>, where credentials is the Base64 encoding of a string "username:password".</p>
				<p>By default, your app comes with one user with the username "admin" and password "admin". You can use the following header to authenticate with the default user.</p>
			</div>
			<div className="mt-4">
				<h4>REST API</h4>
				<p>
				The REST API is available at /api at the root of your application. When you navigate directly to /api you will see the swagger documentation of you API with a list of all resources and actions.
				</p>
				<p>For development and testing purposes, you can use the swagger UI to execute requests against the API. First, click on the "Authorize" button and enter the username and password, it will add the authorization header automatically.
				</p>
			</div>
			<div className="mt-4">
				<h4>GraphQL API</h4>
				<p>The GraphQL API is available at /graphql at the root of your application. When you navigate directly to /graphql you will see the GraphQL Playground provided by Apollo Server.</p>
				<p>For development and testing purposes, you can use the GraphQL Playground to execute queries and mutations against the API.</p>
				<p>The GraphQL API provide queries and mutations on all your data model. For each model, you can find 2 queries and 3 mutations. </p>
				<p>First, click on the "HTTP HEADERS" tab at the bottom of the screen and add the authorization header in the following format:</p>
				<SyntaxHighlighter className="hl-code" language="json" style={atomDark}>
					{gql}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}

export default Apis
