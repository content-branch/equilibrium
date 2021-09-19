import React, { useEffect } from "react";
import * as models from "models";
import { ActionRole } from "@amp-components/Permissions/ActionRole";
import useActionRoleList from "@hooks/useActionRoleList";
import { Badge } from "antd";
import { Tag } from 'antd';

type Props = {
  availableRoles: models.AppRole[];
  selectedRoleIds: Set<string>;
  onChange: (selectedRoleIds: Set<string>) => void;
  debounceMS: number;
  disabled?:boolean;
};

export const ActionRoleList = ({
  availableRoles,
  selectedRoleIds,
  debounceMS,
  onChange,
  disabled,
}: Props) => {
  
  const {
    handleRoleSelect,
    selectedRoleList
  } = useActionRoleList({
    selectedRoleIds,
    debounceMS,
    onChange
  });

  useEffect(()=>{

  }, [selectedRoleList]);

  return (
    <>
      {disabled?
        <>
          {availableRoles.map((role) => (
            <Tag color="default">{role.displayName}</Tag>
          ))}
        </>
      :
      <>
        {availableRoles.map((role) => (
          <ActionRole
            key={role.id}
            role={role}
            onClick={handleRoleSelect}
            selected={selectedRoleList.has(role.id)}
          />
        ))}
        <Badge count={selectedRoleList.size} /> 
      </>
        
      }
      
    </>
  );
};
