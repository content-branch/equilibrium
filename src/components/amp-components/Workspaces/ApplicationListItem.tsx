import React from "react";
import { NavLink } from "react-router-dom";
import { ClockCircleOutlined } from '@ant-design/icons';
import { format } from "date-fns";

import { BuildStatusIcons } from "@amp-components/VersionControl/BuildStatusIcons";
import useApplicationListItem, { Props } from "@hooks/useApplicationListItem";
import { Card, Tag, Tooltip, Row } from "antd";
import "./ApplicationListItem.scss";


const DATE_FORMAT = "P p";
const CLASS_NAME = "application-list-item";


function ApplicationListItem({ app }: Props) {
  const { id, name, description, color } = app;

  const {
    lastBuildDate,
    handleClick
  } = useApplicationListItem({app});

  return (
    <NavLink to={`/${id}`}>
      <Card hoverable title={`${name}`} bordered={true} size='default'>
        <div className={`${CLASS_NAME}__row`}>
          <span className={`${CLASS_NAME}__description`}>{description}</span>
        </div>
        <Row className={`${CLASS_NAME}__row`}>
            <Row className={`${CLASS_NAME}__row`} >
              <BuildStatusIcons build={app.builds[0]} />
            </Row>

            {lastBuildDate && (
                <div className={`${CLASS_NAME}__recently-used`}>
                  <Tag color="blue">
                  <ClockCircleOutlined />
                      <Tooltip title={`Last build: ${format(lastBuildDate, DATE_FORMAT)}`}> 
                        <span> Last build </span>  {format(lastBuildDate, "PP")}
                      </Tooltip>
                  </Tag>
                </div>
              )}
           
        </Row>
      </Card>
    </NavLink>
  );
}

export default ApplicationListItem;
