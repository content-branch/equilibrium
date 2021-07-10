import React from 'react'
import { Row } from 'antd';
import useEntityList from "@hooks/useEntityList";

const CLASS_NAME = "entity-detail";

const Detail = ({ match }) => {
	const { application } = useEntityList({ match });

	return (
		<div>
            <Row>
				<div className={`${CLASS_NAME}__title`}>
					Current Application: {application}
				</div>
			</Row>
			
		</div>
	)
}

export default Detail
