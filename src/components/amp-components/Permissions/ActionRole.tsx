import React, {useState} from "react";
import * as models from "models";
import useActionRole from "@hooks/useActionRole";
import { Tag } from 'antd';
import './ActionRole.scss';

type Props = {
  role: models.AppRole;
  onClick: (role: models.AppRole, checked: boolean) => void;
  selected: boolean;
};

export const ActionRole = ({ role, onClick, selected }: Props) => {
  const [isSelected, setIsSelected] = useState(selected);

  const { handleClick } = useActionRole({role, onClick});

  return (
    <Tag color={isSelected?'magenta':'geekblue'} 
      onClick={()=>{
       handleClick(!selected)
      }}
      className="action-role">{role.displayName}</Tag>
  );
};
