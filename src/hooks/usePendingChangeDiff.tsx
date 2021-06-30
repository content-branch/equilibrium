import { useMemo } from "react";
import YAML from "yaml";
import { gql, useQuery } from "@apollo/client";
import omitDeep from "deepdash-es/omitDeep";
import * as models from "models";

const CURRENT_VERSION_NUMBER = 0;

export enum EnumCompareType {
  Pending = "Pending",
  Previous = "Previous",
}

const NON_COMPARABLE_PROPERTIES = [
  "createdAt",
  "updatedAt",
  "versionNumber",
  "__typename",
];
type TData = {
  entity: models.Entity;
};

export type Props = {
  change: models.PendingChange;
  compareType?: EnumCompareType;
  splitView: boolean;
};

const usePendingChangeDiff = ({
  change,
  compareType = EnumCompareType.Pending,
  splitView,
}: Props) => {
  const { data: dataOtherVersion, loading: loadingOtherVersion } = useQuery<
    TData
  >(GET_ENTITY_VERSION, {
    variables: {
      id: change.resourceId,
      whereVersion:
        compareType === EnumCompareType.Pending
          ? {
              not: CURRENT_VERSION_NUMBER,
            }
          : {
              equals: change.versionNumber > 1 ? change.versionNumber - 1 : -1,
            },
    },
    fetchPolicy: "no-cache",
  });

  const { data: dataCurrentVersion, loading: loadingCurrentVersion } = useQuery<
    TData
  >(GET_ENTITY_VERSION, {
    variables: {
      id: change.resourceId,
      whereVersion:
        compareType === EnumCompareType.Pending
          ? {
              equals: CURRENT_VERSION_NUMBER,
            }
          : {
              equals: change.versionNumber,
            },
    },
    fetchPolicy: "no-cache",
  });

  const newValue = useMemo(() => {
    return getEntityVersionYAML(dataCurrentVersion);
  }, [dataCurrentVersion]);

  const otherValue = useMemo(() => {
    return getEntityVersionYAML(dataOtherVersion);
  }, [dataOtherVersion]);

  const result = {
    otherValue,
    newValue,
    loadingOtherVersion,
    loadingCurrentVersion,
  };

  return result;
};

function getEntityVersionYAML(data: TData | undefined): string {
  const entityVersions = data?.entity?.versions;
  if (!entityVersions || entityVersions.length === 0) return "";

  return YAML.stringify(omitDeep(entityVersions[0], NON_COMPARABLE_PROPERTIES));
}

export default usePendingChangeDiff;

export const GET_ENTITY_VERSION = gql`
  query getEntityVersionForCompare($id: String!, $whereVersion: IntFilter) {
    entity(where: { id: $id }) {
      id
      versions(
        take: 1
        orderBy: { versionNumber: Desc }
        where: { versionNumber: $whereVersion }
      ) {
        versionNumber
        name
        displayName
        pluralDisplayName
        description
        permissions {
          action
          type
          permissionRoles {
            appRole {
              displayName
            }
          }
          permissionFields {
            field {
              displayName
            }
            permissionRoles {
              appRole {
                displayName
              }
            }
          }
        }
        fields(orderBy: { permanentId: Asc }) {
          permanentId
          name
          description
          displayName
          dataType
          properties
          required
          searchable
        }
      }
    }
  }
`;