import { useCallback, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation, Reference } from "@apollo/client";
import { pascalCase } from "pascal-case";
import { formatError } from "util/error";
import * as models from "models";
import PendingChangesContext from "@amp-components/VersionControl/PendingChangesContext";
import {getLSCurrentApplication} from "@hooks/useApplicationSelector";
import pluralize from "pluralize";

export type CreateEntityType = Omit<models.EntityCreateInput, "app">;

export function generatePluralDisplayName(displayName: string): string {
  return pluralize(displayName);
}

export function generateSingularDisplayName(displayName: string): string {
  return pluralize.singular(displayName);
}

type DType = {
  createOneEntity: models.Entity;
};

const useNewEntity = () => {
  const pendingChangesContext = useContext(PendingChangesContext);
  const applicationId = getLSCurrentApplication();

  const [createEntity, { error, data, loading }] = useMutation<DType>(
    CREATE_ENTITY,
    {
      onCompleted: (data) => {
        pendingChangesContext.addEntity(data.createOneEntity.id);
      },
      update(cache, { data }) {
        if (!data) return;

        const newEntity = data.createOneEntity;

        cache.modify({
          fields: {
            entities(existingEntityRefs = [], { readField }) {
              const newEntityRef = cache.writeFragment({
                data: newEntity,
                fragment: NEW_ENTITY_FRAGMENT,
              });

              if (
                existingEntityRefs.some(
                  (EntityRef: Reference) =>
                    readField("id", EntityRef) === newEntity.id
                )
              ) {
                return existingEntityRefs;
              }

              return [...existingEntityRefs, newEntityRef];
            },
          },
        });
      },
    }
  );
  const history = useHistory();

  const handleSubmit = useCallback(
    (data: CreateEntityType) => {
      const displayName = data.displayName.trim();
      const pluralDisplayName = generatePluralDisplayName(displayName);
      const singularDisplayName = generateSingularDisplayName(displayName);
      const name = pascalCase(singularDisplayName);

      createEntity({
        variables: {
          data: {
            ...data,
            displayName,
            name,
            pluralDisplayName,
            app: { connect: { id: applicationId } },
          },
        },
      }).catch(console.error);
    },
    [createEntity, applicationId]
  );

  useEffect(() => {
    if (data) {
      //history.push(`/${applicationId}/entities/${data.createOneEntity.id}`);
    }
  }, [history, data, applicationId]);

  const errorMessage = formatError(error);

  const result = {
    loading,
    error,
    errorMessage,
    handleSubmit
  };

  return result; 
};

export default useNewEntity;

const CREATE_ENTITY = gql`
  mutation createEntity($data: EntityCreateInput!) {
    createOneEntity(data: $data) {
      id
      name
      fields {
        id
        name
        dataType
      }
    }
  }
`;

const NEW_ENTITY_FRAGMENT = gql`
  fragment NewEntity on Entity {
    id
    name
    fields {
      id
      name
      dataType
    }
  }
`;
