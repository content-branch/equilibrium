import { useMemo, useState } from "react";
import { match } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import * as models from "models";

import { formatError } from "util/error";

import useNavigationTabs from "@hooks/useNavigationTabs";
import { GET_BUILD } from "@hooks/useBuildWatchStatus";
import { GET_COMMIT } from "@hooks/useCommitPage";
import { truncateId } from "util/truncatedId";

type LogData = {
  action: models.Action;
  title: string;
  versionNumber: string;
};

export type Props = {
  match: match<{ application: string; buildId: string }>;
};
const NAVIGATION_KEY = "BUILDS";

const useBuildPage = ({ match }: Props) => {
  const { application, buildId } = match.params;

  const truncatedId = useMemo(() => {
    return truncateId(buildId);
  }, [buildId]);

  useNavigationTabs(
    application,
    `${NAVIGATION_KEY}_${buildId}`,
    match.url,
    `Build ${truncatedId}`
  );

  const [error, setError] = useState<Error>();

  const [getCommit, { data: commitData }] = useLazyQuery<{
    commit: models.Commit;
  }>(GET_COMMIT);

  const { data, error: errorLoading } = useQuery<{
    build: models.Build;
  }>(GET_BUILD, {
    variables: {
      buildId: buildId,
    },
    onCompleted: (data) => {
      getCommit({ variables: { commitId: data.build.commitId } });
    },
  });

  const actionLog = useMemo<LogData | null>(() => {
    if (!data?.build) return null;

    if (!data.build.action) return null;

    return {
      action: data.build.action,
      title: "Build log",
      versionNumber: data.build.version,
    };
  }, [data]);

  const errorMessage =
    formatError(errorLoading) || (error && formatError(error));

  const result = {
    application,
    data,
    commitData,
    actionLog,
    error,
    errorLoading,
    errorMessage,
    setError,
  };

  return result;
};

export default useBuildPage;
