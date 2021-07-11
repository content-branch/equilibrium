import React, {useState} from 'react'
import { Steps, Tabs, Card } from 'antd';
import PendingChanges from '@amp-components/VersionControl/PendingChanges';
import { Radio, Row} from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getLSCurrentApplication } from "@hooks/useApplicationSelector";

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const { Step } = Steps;
const { TabPane } = Tabs;

const Stage = () => {
	const [view, setView] = useState(VIEW_GRID);
	const applicationId = getLSCurrentApplication();

	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	return (
		<div>
			<div className="container">
			<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
				<TabPane tab="Pending changes" key="1">
					<Card
						actions={
							[
								<div className='my-4 container container-fluid'>
									<Steps progressDot current={0}>
										<Step title="Stage" 	description="recent changes" />
										<Step title="Compare" description="previous version"  />
										<Step title="Verify" 	description="latest updates" />
									</Steps>
								</div>
								
							]
						}
					>
						<div className='my-4 container container-fluid'>
							<PendingChanges applicationId={applicationId} />
						</div>
					</Card>
					
				</TabPane>
				<TabPane tab="Compare changes" key="2">
					<Card
							title={
								<div>
									<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
										<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
										<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
									</Radio.Group>
								</div>
							}
							actions={
								[
									<div className='my-4 container-fluid'>
										<Steps progressDot current={1}>
											<Step title="Stage" 	description="recent changes" />
											<Step title="Compare" description="previous version"  />
											<Step title="Verify" 	description="latest updates" />
										</Steps>
									</div>
								]
							}
						>
							<div className='my-4 container-fluid'>
							{
								view === VIEW_LIST ?
								(
									<Row>
										List view
									</Row>
								):
								<Row>
									Grid view
								</Row>
							}
							</div>
					</Card>
						
				</TabPane>
				<TabPane tab="Commit history" key="3">
					<Card
						actions={
							[
								<div className='my-4 container container-fluid'>
									<Steps progressDot current={2}>
										<Step title="Stage" 	description="recent changes" />
										<Step title="Compare" description="previous version" />
										<Step title="Verify" 	description="latest updates" />
									</Steps>
								</div>
							]
						}
					>
						<div className='my-4 container container-fluid'>
							This is a content
						</div>
					</Card>
				</TabPane>
			</Tabs>
			</div>
		</div>
	)
}

export default Stage
