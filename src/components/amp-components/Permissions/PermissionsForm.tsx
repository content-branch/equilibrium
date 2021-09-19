import React, { useState, useEffect } from "react";
import { message, Spin, Row, Col, List, Switch, Tag } from 'antd';
import { EntityPermissionAction } from "@amp-components/Permissions/EntityPermissionAction";
import usePermissionsForm, { Props } from "@hooks/usePermissionsForm";
import { 
	EyeOutlined, 
	AppstoreAddOutlined, 
	DeleteOutlined,
	EditOutlined,
	FileSearchOutlined,
} from '@ant-design/icons';

import { Radio } from "antd"; 
import { Form } from "formik";
import Icon from 'components/util-components/Icon';
import Flex from 'components/shared-components/Flex';
// import { Radio, Form } from "formik-antd";

const PermissionsForm = ({
  availableActions,
  entityId,
}: Props) => {
  
  const {
    loading,
    error,
    errorMessage,
    permissionsByAction
  } = usePermissionsForm({
    availableActions,
    entityId,
  });

  useEffect(() => {
    if(error){
      message.error(errorMessage);
    }
  }, [error, errorMessage]);

  const [config, setConfig] = useState([
		{
			key:'',
			title:'',
			icon:EyeOutlined,
			desc:'',
			allow:false
		}
  ]);

  const getIcon =  (action:string) => {
    switch (action) {
      case 'View':
        return EyeOutlined;
      case 'Create':
        return AppstoreAddOutlined;
      case 'Update':
        return EditOutlined;
      case 'Delete':
        return DeleteOutlined;
      case 'Search':
        return FileSearchOutlined;
      default:
        return DeleteOutlined;
    }
  }

	useEffect(()=>{
    const init = availableActions.map((action) => {
      return {
				key: `key-${action.actionDisplayName}`,
				title: action.actionDisplayName,
				icon: getIcon(action.actionDisplayName),
				desc: 'All roles selected. Set specific permissions to special fields',
				allow: false
			}
    });

    setConfig(init);
	}, []);

  return (
    <div className="permissions-form">
      
      {loading
        ? <Spin />
        : availableActions.map((action) => (
            <EntityPermissionAction
              key={action.action}
              entityId={entityId}
              permission={permissionsByAction[action.action]}
              permissionAction={action}
            />
          ))}
    </div>
  );
};

export default PermissionsForm;