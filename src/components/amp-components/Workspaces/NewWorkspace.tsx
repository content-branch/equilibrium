import React, { useCallback, useEffect } from "react";
import { gql, Reference, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Input, Form } from "formik-antd";
import { GlobalHotKeys } from "react-hotkeys";
import { useTracking } from "util/analytics";
import { formatError } from "util/error";
import { validate } from "util/formikValidateJsonSchema";
import { CROSS_OS_CTRL_ENTER } from "util/hotkeys";
import { Button, message, Typography } from "antd";
import * as models from "models";

const { Text } = Typography;

type CreateWorkspaceType = models.WorkspaceCreateInput;

type DType = {
  createWorkspace: models.Workspace;
};

const INITIAL_VALUES: CreateWorkspaceType = {
  name: "",
};

const FORM_SCHEMA = {
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
    },
  },
};
const CLASS_NAME = "new-workspace";

const keyMap = {
  SUBMIT: CROSS_OS_CTRL_ENTER,
};

type Props = {
  onWorkspaceCreated: (workspace: models.Workspace) => void;
};

const NewWorkspace = ({ onWorkspaceCreated }: Props) => {
  const { trackEvent } = useTracking();

  const [createWorkspace, { error, loading }] = useMutation<DType>(
    CREATE_WORKSPACE,
    {
      onCompleted: (data) => {
        trackEvent({
          eventName: "createWorkspace",
          workspaceName: data.createWorkspace.name,
        });
        onWorkspaceCreated && onWorkspaceCreated(data.createWorkspace);
      },
      update(cache, { data }) {
        if (!data) return;

        const newWorkspace = data.createWorkspace;

        cache.modify({
          fields: {
            workspaces(existingWorkspaceRefs = [], { readField }) {
              const newWorkspaceRef = cache.writeFragment({
                data: newWorkspace,
                fragment: NEW_WORKSPACE_FRAGMENT,
              });

              if (
                existingWorkspaceRefs.some(
                  (WorkspaceRef: Reference) =>
                    readField("id", WorkspaceRef) === newWorkspace.id
                )
              ) {
                return existingWorkspaceRefs;
              }

              return [...existingWorkspaceRefs, newWorkspaceRef];
            },
          },
        });
      },
    }
  );

  const handleSubmit = useCallback(
    (data: CreateWorkspaceType) => {
      console.log('Submitting handler')
      createWorkspace({
        variables: {
          data,
        },
      }).catch(console.error);
    },
    [createWorkspace]
  );

  const errorMessage = formatError(error);


  useEffect(() => {
    if(error){
      message.error(errorMessage);
    }
  }, [error, errorMessage]);
  

  return (
    <div className={CLASS_NAME}>
      <Text type="secondary">
        Give your new workspace a descriptive name.
      </Text>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={(values: CreateWorkspaceType) =>
          validate(values, FORM_SCHEMA)
        }
        onSubmit={handleSubmit}
        validateOnMount
      >
        {(formik) => {
          const handlers = {
            SUBMIT: formik.submitForm,
          };
          return (
            <Form layout="vertical" className="mt-2">
              <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
              <Form.Item 
                name="name"
                label="New Workspace Name"
              >
                <Input
                  name="name"
                  disabled={loading}
                  autoFocus
                  placeholder="Type New Workspace Name"
                  autoComplete="off"
                  bordered={true}
                  size="large"
                  className="mb-2"
                />
                
              </Form.Item>
              <Form.Item 
                name="newworkspace"
              >
              <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!formik.isValid || loading}
                  className="mt-3"
                  loading={loading}
                  onClick={()=>{formik.submitForm()}}
                  key="submit"
                >
                  Create Workspace
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewWorkspace;

const CREATE_WORKSPACE = gql`
  mutation createWorkspace($data: WorkspaceCreateInput!) {
    createWorkspace(data: $data) {
      id
      name
    }
  }
`;

const NEW_WORKSPACE_FRAGMENT = gql`
  fragment NewWorkspace on Workspace {
    id
    name
  }
`;
