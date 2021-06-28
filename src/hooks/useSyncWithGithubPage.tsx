import { match } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { formatError } from "../util/error";
import * as models from "models";
import { GET_APPLICATION } from "@hooks/useApplicationHome";

export type Props = {
  match: match<{ application: string }>;
};

function useSyncWithGithubPage({ match }: Props) {
  const { application } = match.params;

  const { data, error, refetch } = useQuery<{
    app: models.App;
  }>(GET_APPLICATION, {
    variables: {
      id: application,
    },
  });

  const errorMessage = formatError(error);

  const result = {
    data,
    error,
    errorMessage,
    refetch
  };

  return result;
}

export default useSyncWithGithubPage;
