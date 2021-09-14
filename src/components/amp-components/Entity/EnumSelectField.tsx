import React, { useMemo } from "react";
import { capitalCase } from "capital-case";
import { Select } from "formik-antd";

const EnumSelectField = ({ options, ...props }: any) => {
  const listOptions = useMemo(
    () =>
      options.map((item:any) => ({
        value: item,
        label: capitalCase(item),
      })),
    [options]
  );

  return <Select {...props} options={listOptions} />;
};

export default EnumSelectField;
