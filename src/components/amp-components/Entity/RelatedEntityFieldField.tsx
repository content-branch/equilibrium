import React from "react";
import { EntityRelationFieldsChart } from "@amp-components/Entity/EntityRelationFieldsChart";
// import "./RelatedEntityFieldField.scss";
import useRelatedEntityFieldField from "@hooks/useRelatedEntityFieldField";

const CLASS_NAME = "related-entity-field-field";

type Props = {
  entityDisplayName: string;
};

const RelatedEntityFieldField = ({ entityDisplayName }: Props) => {
  
  const {
    data,
    relatedField,
    formik
  } = useRelatedEntityFieldField();

  return (
    <div className={CLASS_NAME}>
      {data && relatedField && (
        <EntityRelationFieldsChart
          fixInPlace={false}
          applicationId={data.entity.appId}
          entityId={data.entity.id}
          field={formik.values}
          entityName={entityDisplayName}
          relatedField={relatedField}
          relatedEntityName={data.entity.displayName}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};

export default RelatedEntityFieldField;