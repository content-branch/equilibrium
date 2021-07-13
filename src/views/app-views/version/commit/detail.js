import React, {useState} from 'react'
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { Card, Radio, Row} from 'antd';

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const Detail = () => {

	const [view, setView] = useState(VIEW_GRID);

	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	return (
		<Card
				title={
					<div>
						<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
							<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
							<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
						</Radio.Group>
					</div>
				}
			>
				<div className='container-fluid'>
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
	)
}

export default Detail
