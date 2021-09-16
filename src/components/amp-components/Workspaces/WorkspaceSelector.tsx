import React from "react";
import classNames from "classnames";
import WorkspaceSelectorList from "@amp-components/Workspaces/WorkspaceSelectorList";
import NewWorkspace from "@amp-components/Workspaces/NewWorkspace";
import useWorkspaceSelector from "@hooks/useWorkspaceSelector";
import { Spin, Button, Modal } from "antd";
import { SwitcherOutlined } from '@ant-design/icons';
import "./WorkspaceSelector.scss";

export const COLOR = "#A787FF";
const CLASS_NAME = "workspaces-selector";

function WorkspaceSelector() {
  
 const {
    loading,
    isOpen,
    data,
    newWorkspace,
    handleNewWorkspaceClick,
    handleSetCurrentWorkspace,
    handleOpen
  } = useWorkspaceSelector();

  return (
    <div className={CLASS_NAME}>
      <div>
        <Modal
          title="New Workspace"
          visible={newWorkspace}
          footer={<></>}
          width={600}
          onCancel={handleNewWorkspaceClick}
        >
          <NewWorkspace onWorkspaceCreated={handleSetCurrentWorkspace} />
        </Modal>
      </div>
      <div
        className={classNames(`${CLASS_NAME}__current`, {
          [`${CLASS_NAME}__current--active`]: isOpen,
        })}
        onClick={handleOpen}
      >
        {loading ? (
          <Spin />
        ) : (
          <>
            <span className={`${CLASS_NAME}__current__name`}>
              {data?.currentWorkspace.name}
            </span>
            <Button
              className={`${CLASS_NAME}__add-button`}
              type="link"
              disabled={loading}
              icon={<SwitcherOutlined />}
            >
            </Button>
          </>
        )}
      </div>
      {isOpen && data && (
        <WorkspaceSelectorList
          onNewWorkspaceClick={handleNewWorkspaceClick}
          selectedWorkspace={data.currentWorkspace}
          onWorkspaceSelected={handleSetCurrentWorkspace}
        />
      )}
    </div>
  );
}

export default WorkspaceSelector;
