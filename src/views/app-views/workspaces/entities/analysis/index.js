import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch';
import { Row, message } from 'antd';
import { IntrospectionQuery } from 'util/introspection';
import birdseyeTheme from 'util/analysisTheme';
import { asyncComponent } from "react-async-component";
import { Spin, Result } from 'antd';
import './Analysis.scss';


const GraphqlBirdseye = asyncComponent({
	resolve: () => require("graphql-birdseye"),
	LoadingComponent: () => <Spin /> ,
	ErrorComponent: () => <Result
								status="error"
								title="Error while loading the schema"
							/>,
});

const Analysis = () => {

	const [schema, setSchema] = useState();
	const [schemaError, setSchemaError] = useState("");
	const [loading, setLoading] = useState(true);
	const DEFAULT_URL = 'http://localhost:3000/graphql';

	const fetchSchema = async (url) => {
		try {
			if (!url) 
				return setSchemaError("URL for Schema not valid");
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					accept: "*/*",
				},
				body: JSON.stringify({ query: IntrospectionQuery }),
			})
				.then((res) => res.json())
				.then((res) => {
					setSchema(res.data);
					setLoading(false);
				})
				.catch((error) =>{ 
					console.log(error);
					setSchemaError("Error while getting schema")
				});
		} catch {
			console.log("whoops");
		}
	};

	useEffect(()=>{
		fetchSchema(DEFAULT_URL);
	}, []);

	useEffect(() => {
		if(schemaError){
		  message.error(schemaError);
		}
	  }, [schemaError]);

	return (
		<Row className="main-content">
			{loading ?  <Spin /> : 
				<GraphqlBirdseye
					introspectionQuery={schema}
					style={{ width: "100%", height: "70vh" }}
					theme={birdseyeTheme}
				/>
			}
		</Row>
	)
}

export default Analysis
