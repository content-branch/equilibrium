import React, { useEffect, useMemo, useState } from 'react';
import { Table, PageHeader, message , Drawer} from 'antd';
import { TagTwoTone } from '@ant-design/icons';
import useEntityFieldList from "@hooks/useEntityFieldList";
import { DATA_TYPE_TO_LABEL_AND_ICON } from "@amp-components/Entity/constants";
import EntityField from "@amp-components/Entity/EntityField";
import { getTags } from "@amp-components/Entity/EntityFieldForm";
import './Fields.scss';
import {getIcon} from "@amp-components/Entity/DataTypeSelectField";

const Fields = ({entityId}:any) => {

    const [visible, setVisible] = useState(false);
    const [currentField, setCurrentField] = useState("");
    // const pendingChangesContext = useContext(PendingChangesContext);

    const {
        data,
        loading,
        error,
        errorMessage,
        // entityIdToName,
        // setError,
    } = useEntityFieldList({ entityId });

    

    const columns = [
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon:any) => getIcon(icon),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type:any) => <b>{type.label}</b>
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags:any) => getTags(tags),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: ({action}:any) => (
        //     <span>
        //         {/* <EditTwoTone  onClick={()=>{
        //             setCurrentField(action);
        //             setVisible(true)}
        //         }/> */}
        //     </span>
        //     ),
        // },
        ];

    const getSimpleTags = (field:any) => {
        const result = [];
        if(field.required)
          result.push('required');
        if(field.searchable)
          result.push('searchable');
        return result;
    }

    const mappingEntityFields = useMemo (() => {
        
        if (!data?.entity.fields) 
            return [];

        return data?.entity.fields.map((field) => {
            return{
                'key':            field.id,
                'icon':           DATA_TYPE_TO_LABEL_AND_ICON[field.dataType],
                'type':           DATA_TYPE_TO_LABEL_AND_ICON[field.dataType],
                'name':           field.displayName,
                'description':    field.description,
                'tags':           getSimpleTags(field),
                'action':         field.id
            }
        });

    }, [data]);

    let dynamicData:any[] = [];

    if(mappingEntityFields){
        dynamicData = mappingEntityFields;
    }

    useEffect(() => {
        if(error){
            message.error(errorMessage);
        }
    }, [error, errorMessage]);  
    
    useEffect(() => {
        setVisible(false);
    }, []); 

    const onClose = () => {
        //pendingChangesContext.addEntity(entityId);
        setVisible(false);
    };

    useEffect(() => { 
        if(!visible){
            setCurrentField("");
        }
    }, [visible, setCurrentField])

	return (
        <>
            <PageHeader
                className="site-section-header"
                title={<h3 className="mb-4"><TagTwoTone  twoToneColor="#52c41a"/> Fields {dynamicData.length} </h3>}
            />
            <Table  
                size="large" 
                loading={loading && !!mappingEntityFields} 
                pagination={false} 
                bordered={false} 
                showHeader={false} 
                columns={columns}
                tableLayout="auto"
                dataSource={dynamicData}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setCurrentField(record.action);
                            setVisible(true);
                          //console.log("Record contains", record);
                        }, // click row
                        onDoubleClick: event => {}, // double click row
                        onContextMenu: event => {}, // right button click row
                        onMouseEnter: event => {

                        }, // mouse enter row
                        onMouseLeave: event => {}, // mouse leave row
                    };
                }}
                style={{
                    cursor:"pointer"
                }}
                rowClassName={(record, index) => record.action === currentField ? "row-active":""}
            />
           
            <Drawer
                width={640}
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
                title={<h3 className=""><TagTwoTone twoToneColor="magenta"/> Field Settings </h3>}
            >
                <>
                    <EntityField applicationId={data?.entity.appId} entityId={data?.entity.id} fieldId={currentField} />
                </>
            </Drawer>

            
        </>
	)
}

export default Fields
