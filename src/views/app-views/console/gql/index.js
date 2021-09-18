import React, { useEffect, useState} from 'react'
import Iframe from '@amp-components/Application/Iframe';
import fetch from 'isomorphic-fetch';
import { Spin } from 'antd';
import './Gql.scss'

const ConsoleGql = () => {

	const DEFAULT_GRAPHQL_URL = 'http://localhost:3000/graphql';

	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const style = document.createElement("style");
		style.href =
		  "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700";
		document.body.append(style);
		fetch(DEFAULT_GRAPHQL_URL, {
			methood: 'get',
			headers: { 'Content-Type': 'text/html' },
		}).then(()=>{
			console.log('Success');
			setTimeout(
				()=>{
					setLoading(false);
				},
				200
			)
		}).catch(()=>{
			console.log('Error');
		});
	}, []);

	const props = {
		url: DEFAULT_GRAPHQL_URL,
		title: 'GraphQL Console',
		width: `100%`,
		height: `100vh`,
		sandbox: 'allow-same-origin allow-scripts allow-popups'
	};

	return (
		<div className="main-content">
			{loading && <Spin />}
			{!loading && 
				<Iframe {...props} />
			}
		</div>
	)
}

export default ConsoleGql
