import React, { useEffect } from "react";
import { SYSTEM_DATA_TYPES } from "./constants";
import { message, Button, Modal } from "antd";
import EntityFieldForm from "@amp-components/Entity/EntityFieldForm";
import {
  RelatedFieldDialog
} from "@amp-components/Entity/RelatedFieldDialog";
import useEntityField, { Props } from "@hooks/useEntityField";
import useDeleteEntityField from "@hooks/useDeleteEntityField";
import { DeleteFilled } from "@ant-design/icons";
import Flex from "@components/shared-components/Flex";


const CLASS_NAME = "entity-field";
const { confirm } = Modal;

const EntityField = ({applicationId, entityId, fieldId}: Props) => {
  
  const {
    data,
    loading,
    entity,
    entityDisplayName,
    entityField,
    defaultValues,
    application,
    lookupPendingData,
    hasError,
    errorMessage,
    setError,
    handleSubmit,
    hideRelatedFieldDialog,
    handleRelatedFieldFormSubmit,
    handleDeleteField
  } = useEntityField({applicationId, entityId, fieldId});
  
  const {
    handleConfirmDelete,
    handleDismissDelete,
  } = useDeleteEntityField({
    entityField,
    entityId,
    showLabel:true,
    onDelete:handleDeleteField,
    onError:setError
  });
  
  useEffect(() => {
    if(hasError){
      message.error(errorMessage);
    }
  }, [hasError, errorMessage]);

  const confirmDeleteField = (): void => {
    confirm({
      title: `Delete "${entityField?.displayName}"`,
      content: 'Are you sure you want to delete this entity field?',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() =>{
              handleConfirmDelete();
              return resolve();
          }, 500);
        }).catch(() => setError);
      },
      onCancel() {
        handleDismissDelete();
      },
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
    });
  }

  return (
    <div className={CLASS_NAME}>
      <Flex 
            alignItems="end"
            justifyContent="end"
            className="fluid-container"
          >
              {entity && entityField && (
                <Button type="primary" onClick={confirmDeleteField} danger shape="circle" icon={<DeleteFilled />} size="middle" />
              )}
          </Flex>
      {!loading && (
        <>
         
          <EntityFieldForm
            isDisabled={
              defaultValues && SYSTEM_DATA_TYPES.has(defaultValues.dataType)
            }
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            applicationId={application}
            entityDisplayName={entityDisplayName || ""}
          />
        </>
      )}
      {data && (
        <RelatedFieldDialog
          isOpen={lookupPendingData !== null}
          onDismiss={hideRelatedFieldDialog}
          onSubmit={handleRelatedFieldFormSubmit}
          relatedEntityId={lookupPendingData?.properties?.relatedEntityId}
          allowMultipleSelection={
            !lookupPendingData?.properties?.allowMultipleSelection
          }
          entity={data.entity}
        />
        
      )}
       
         
    </div>
  );
};

export default EntityField;