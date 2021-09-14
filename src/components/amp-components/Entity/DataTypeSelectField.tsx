import React, { useRef, useEffect } from "react";
import { useFormikContext } from "formik";
import { DATA_TYPE_TO_LABEL_AND_ICON, SYSTEM_DATA_TYPES } from "./constants";
import { getSchemaForDataType } from "@content-branch/equilibrium-data";
import * as models from "models";
import { Avatar, Typography } from "antd";
import { Select } from "formik-antd";
import Icon from '@components/util-components/Icon';
import {
  TeamOutlined,
  UserOutlined,
  UnlockOutlined,
  ClockCircleOutlined,
  FontSizeOutlined,
  AlignLeftOutlined,
  CalendarOutlined,
  FieldBinaryOutlined,
  NumberOutlined,
  LinkOutlined,
  MailOutlined,
  BarcodeOutlined,
  EnvironmentOutlined,
  CheckSquareOutlined,
  HistoryOutlined,
  TableOutlined,
  TagOutlined,
  TagsOutlined,
  FlagOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

export const createTypeIcon = (field:any) => {
  switch(field.icon){
      case "type": return (
          FontSizeOutlined
      );
      case "multiline_text": return (
          AlignLeftOutlined 
      );
      case "at_sign": return (
          MailOutlined
      );
      case "bookmark": return (
          FieldBinaryOutlined
      );
      case "decimal_number": return (
          NumberOutlined 
      );
      case "calendar": return (
          CalendarOutlined
      );
      case "lookup": return (
          LinkOutlined 
      );
      case "check_square": return (
          CheckSquareOutlined
      );
      case "code1": return (
          FlagOutlined
      );
      case "option_set": return (
          TagOutlined
      );
      case "multi_select_option_set": return (
          TagsOutlined
      );
      case "map_pin": return (
          EnvironmentOutlined
      );
      case "created_at": return (
          ClockCircleOutlined
      );
      case "updated_at": return (
          HistoryOutlined
      );
      case "id": return (
          BarcodeOutlined
      );
      case "user": return (
          UserOutlined
      );
      case "lock": return (
          UnlockOutlined
      );
      case "users": return (
          TeamOutlined 
      );
      default: return (
          TableOutlined               
      );
  }
}

export const getIcon = (field:any, isSmall=false) => {
  return (
      <>
          <Avatar shape={isSmall?"square":"square"} size={isSmall?"small":"default"} style={{
              background: `${field.color}`
          }} icon={ <Icon className="h4 text-white" type={createTypeIcon(field)} />} />
      </>
  );
}


export const getSimpleIcon = (field:any, isSmall=false) => {
  return (
      <>
          <Avatar shape={isSmall?"circle":"square"} size={isSmall?"small":"default"} style={{
              background: `${field.color}`
          }} icon={ <Icon className="text-white" type={createTypeIcon(field)} />} />
      </>
  );
}


export const DATA_TYPE_OPTIONS = Object.entries(DATA_TYPE_TO_LABEL_AND_ICON)
  .filter(
    ([value, content]) => !SYSTEM_DATA_TYPES.has(value as models.EnumDataType)
  )
  .map(([value, content]) => ({
    value,
    label: content.label,
    icon: content.icon,
    color: content.color,
  }));

const DataTypeSelectField = (props: any) => {
  const formik = useFormikContext<{
    dataType: models.EnumDataType;
    id: models.EnumDataType;
  }>();
  const previousDataTypeValue = useRef<models.EnumDataType>();
  const previousFieldId = useRef<string>();

  //Reset the properties list and the properties default values when data type is changed
  /**@todo: keep values of previous data type when properties are equal */
  /**@todo: keep values of previous data type to be restored if the previous data type is re-selected */
  useEffect(() => {
    const nextDataTypeValue = formik.values.dataType;
    const nextFieldId = formik.values.id;

    //only reset to default if the field ID did not change, and the Data Type was changed
    if (
      previousDataTypeValue.current &&
      previousDataTypeValue.current !== nextDataTypeValue &&
      previousFieldId.current === nextFieldId
    ) {
      const schema = getSchemaForDataType(formik.values.dataType);
      const defaultValues = Object.fromEntries(
        Object.entries(schema.properties).map(([name, property]) => [
          name,
          property.default,
        ])
      );

      formik.setFieldValue("properties", defaultValues);
    }
    previousFieldId.current = nextFieldId;
    previousDataTypeValue.current = nextDataTypeValue;
  }, [formik]);

  return (
      <Select {...props}  name="dataType" size="small" bordered={false}>
        {DATA_TYPE_OPTIONS.map((item, index)=>{
          return(
          <Option key={index} value={item.value}>{getSimpleIcon(item, true)}&nbsp;&nbsp;<Text strong>{item.label}</Text></Option>
          )
        })}
      </Select>
      
  );
};

export default DataTypeSelectField;
