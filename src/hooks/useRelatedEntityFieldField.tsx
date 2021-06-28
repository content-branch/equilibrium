import { gql, useQuery } from "@apollo/client";
import { useFormikContext } from "formik";
import * as models from "models";

const useRelatedEntityFieldField = () => {
  const formik = useFormikContext<models.EntityField>();

  const { data } = useQuery<{ entity: models.Entity }>(
    GET_ENTITY_FIELD_BY_PERMANENT_ID,
    {
      variables: {
        entityId: formik.values.properties.relatedEntityId,
        fieldPermanentId: formik.values.properties.relatedFieldId,
      },
    }
  );

  const relatedField =
    data &&
    data.entity &&
    data.entity.fields &&
    data.entity.fields.length &&
    data.entity.fields[0];

  const result = {
    data,
    relatedField,
    formik
  };

  return result;

};

export default useRelatedEntityFieldField;

export const GET_ENTITY_FIELD_BY_PERMANENT_ID = gql`
  query GetEntityFieldByPermanentId(
    $entityId: String!
    $fieldPermanentId: String
  ) {
    entity(where: { id: $entityId }) {
      id
      displayName
      appId
      fields(where: { permanentId: { equals: $fieldPermanentId } }) {
        id
        permanentId
        displayName
        name
        properties
      }
    }
  }
`;
