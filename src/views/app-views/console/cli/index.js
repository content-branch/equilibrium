import React from 'react';
import { Link } from "react-router-dom";
import { Typography, PageHeader } from 'antd';
import { CodeOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import Terminal from 'terminal-in-react';
import PseudoFileSystem from 'terminal-in-react-pseudo-file-system-plugin'

const {Text} =  Typography ;


const ConsoleCli = () => {
	const showMsg = () => 'Welcome to Equilibrium CLI';

	return (
		<>
			<PageHeader
				className="site-page-header"
				footer={[
						<Text color="geekblue" ><sup>*</sup>API Tokens are used to authenticate requests to Equilibrium API. Connect to your CLI by using API Tokens generated from 
						<Link to={`${APP_PREFIX_PATH}/settings/api-tokens`}> Settings/API Tokens.</Link></Text>
				]}
				title={<h3 className=""><CodeOutlined /> Command Line Interface </h3>}
			/>
			<div className="main-content mx-4 my-3">
			<Terminal
				color='#FCFCFC'
				backgroundColor='#283142'
				barColor='#FCFCFC'
				outputColor='#FCFCFC'
				prompt='#FCFCFC'
				startState='maximised'
				hideTopBar
				allowTabs={false}
				plugins={[
					new PseudoFileSystem(),
				  ]}
				style={{ fontWeight: "bold", fontSize: "1em", height:"72vh" }}
				commands={{
					showmsg: showMsg,
				}}
				descriptions={{
					showmsg: 'shows a message',
					alert: 'alert', popup: 'alert'
				}}
				
				msg='Equilibrium Console CLI - Use your best command line terminal. Check avalaible commands by using --help'
			/>
			</div>
		</>
	)
}

export default ConsoleCli
