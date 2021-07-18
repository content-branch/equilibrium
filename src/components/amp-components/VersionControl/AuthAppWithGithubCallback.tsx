import React, { useEffect } from "react";
import { match } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useTracking } from "util/analytics";
import Loading from "@components/shared-components/Loading";

type Props = {
  match: match<{ application: string }>;
};

const AuthAppWithGithubCallback = ({ match }: Props) => {
  const { application } = match.params;
  const { trackEvent } = useTracking();


  

  const [completeAuthWithGithub] = useMutation<Boolean>(
    COMPLETE_AUTH_APP_WITH_GITHUB,
    {
      onCompleted: (data) => {
        window.opener.postMessage({ completed: true });
        // close the popup
        window.close();
      },
    }
  );

  useEffect(()=>{
    console.log("Tafiditra ato");
  }, [])

  useEffect(() => {
    // get the URL parameters with the code and state values
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    if (window.opener) {
      trackEvent({
        eventName: "completeAuthAppWithGitHub",
      });
      completeAuthWithGithub({
        variables: {
          appId: application,
          code,
          state,
        },
      }).catch(console.error);
    }
  }, [completeAuthWithGithub, trackEvent, application]);

  return <Loading />;
};

export default AuthAppWithGithubCallback;

const COMPLETE_AUTH_APP_WITH_GITHUB = gql`
  mutation completeAuthorizeAppWithGithub(
    $appId: String!
    $code: String!
    $state: String!
  ) {
    completeAuthorizeAppWithGithub(
      data: { code: $code, state: $state }
      where: { id: $appId }
    ) {
      id
      createdAt
      updatedAt
      name
      description
      color
      githubTokenCreatedDate
      githubSyncEnabled
      githubRepo
      githubLastSync
      githubLastMessage
    }
  }
`;
