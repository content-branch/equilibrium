import { useMemo, useCallback, useState } from "react";
import { match } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import * as models from "models";
import { formatError } from "../util/error";
import useNavigationTabs from "@hooks/useNavigationTabs";
import { truncateId } from "../util/truncatedId";

export type Props = {
  match: match<{ application: string; commitId: string }>;
};

const NAVIGATION_KEY = "COMMITS";

const SPLIT = "Split";

const useCommitPage = ({ match }: Props) => {
  const { application, commitId } = match.params;
  const [splitView, setSplitView] = useState<boolean>(false);

  const handleChangeType = useCallback(
    (type: string) => {
      setSplitView(type === SPLIT);
    },
    [setSplitView]
  );

  const truncatedId = useMemo(() => {
    return truncateId(commitId);
  }, [commitId]);

  useNavigationTabs(
    application,
    `${NAVIGATION_KEY}_${commitId}`,
    match.url,
    `Commit ${truncatedId}`
  );

  const { data, error } = useQuery<{
    commit: models.Commit;
  }>(GET_COMMIT, {
    variables: {
      commitId: commitId,
    },
  });
  const build =
    (data?.commit?.builds &&
      data?.commit?.builds.length &&
      data.commit.builds[0]) ||
    null;

  const errorMessage = formatError(error);

  const result = {
    data,
    build,
    application,
    splitView,
    error,
    errorMessage,
    handleChangeType
  };

  return result;
};

export default useCommitPage;

export const GET_COMMIT = gql`
  query Commit($commitId: String!) {
    commit(where: { id: $commitId }) {
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
      changes {
        resourceId
        action
        resourceType
        versionNumber
        resource {
          __typename
          ... on Entity {
            id
            displayName
            updatedAt
          }
          ... on Block {
            id
            displayName
            updatedAt
          }
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
