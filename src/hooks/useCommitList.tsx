import { useState, useEffect, useCallback } from "react";
import { match } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { formatError } from "util/error";
import * as models from "models";

type TData = {
  commits: models.Commit[];
};

export type Props = {
  match: match<{ application: string }>;
};

const CREATED_AT_FIELD = "createdAt";

const POLL_INTERVAL = 10000;

const useCommitList = ({ match }: Props) => {
  const { application } = match.params;

  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const handleSearchChange = useCallback(
    (value) => {
      setSearchPhrase(value);
    },
    [setSearchPhrase]
  );

  const { data, loading, error, refetch, stopPolling, startPolling } = useQuery<
    TData
  >(GET_COMMITS, {
    variables: {
      appId: application,
      orderBy: {
        [CREATED_AT_FIELD]: models.SortOrder.Desc,
      },
      whereMessage:
        searchPhrase !== ""
          ? { contains: searchPhrase, mode: models.QueryMode.Insensitive }
          : undefined,
    },
  });

  //start polling with cleanup
  useEffect(() => {
    refetch().catch(console.error);
    startPolling(POLL_INTERVAL);
    return () => {
      stopPolling();
    };
  }, [refetch, stopPolling, startPolling]);

  const errorMessage = formatError(error);

  const result = {
    data,
    loading,
    application,
    error,
    errorMessage,
    handleSearchChange
  };

  return result;
};

export default useCommitList;

/**@todo: expand search on other field  */
export const GET_COMMITS = gql`
  query commits(
    $appId: String!
    $orderBy: CommitOrderByInput
    $whereMessage: StringFilter
  ) {
    commits(
      where: { app: { id: $appId }, message: $whereMessage }
      orderBy: $orderBy
    ) {
      id
      message
      createdAt
      user {
        id
        account {
          firstName
          lastName
        }
      }
      builds(orderBy: { createdAt: Desc }, take: 1) {
        id
        createdAt
        appId
        version
        message
        createdAt
        commitId
        actionId
        action {
          id
          createdAt
          steps {
            id
            name
            createdAt
            message
            status
            completedAt
            logs {
              id
              createdAt
              message
              meta
              level
            }
          }
        }
        createdBy {
          id
          account {
            firstName
            lastName
          }
        }
        status
        archiveURI
      }
    }
  }
`;
