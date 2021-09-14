import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FieldArray, FieldArrayRenderProps, getIn } from "formik";
import { pascalCase } from "pascal-case";
import { get } from "lodash";
import { Form , Input} from "formik-antd";
import { Button } from "antd";
import { SubnodeOutlined, DeleteTwoTone } from "@ant-design/icons";
import "./OptionSet.scss";

type OptionItem = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  name: string;
  isDisabled?: boolean;
};

const CLASS_NAME = "option-set";

const OptionSet = ({ name, label }: Props) => {
  return (
    <div className={CLASS_NAME}>
      <FieldArray
        name={name}
        validateOnChange
        render={(props) => <OptionSetOptions {...props} label={label} />}
      />
    </div>
  );
};

export default OptionSet;

const OptionSetOptions = ({
  form,
  name,
  remove,
  replace,
  label,
}: {
  label: string;
} & FieldArrayRenderProps) => {
  const value = get(form.values, name) || [];
  const [push, hasNew] = useVirtualPush(value);

  const errors = useMemo(() => {
    const error = getIn(form.errors, name);
    if (typeof error === "string") return error;
    return null;
  }, [form.errors, name]);

  const options = hasNew ? [...value, {}] : value;

  return (
    <div>
      <h3>{label}</h3>
      {errors && <div className="option-set__error-message">{errors}</div>}
      {options.map((option: OptionItem, index: number) => (
        <OptionSetOption
          key={index}
          index={index}
          onChange={replace}
          onRemove={remove}
          name={name}
        />
      ))}
      <Button onClick={push} type="default" size="small" icon={<SubnodeOutlined />}>
        Add option
      </Button>
    </div>
  );
};

/**
 * Replaces ArrayField's push behavior to indicate when to display an item
 * before pushing to the array so the new item won't trigger validation and won't be submitted
 * @param value the array value from the form
 */
function useVirtualPush(value: unknown[]): [() => void, boolean] {
  const [indexOfNew, setIndexOfNew] = useState<number | null>(0);

  const add = useCallback(() => {
    setIndexOfNew(value.length);
  }, [setIndexOfNew, value]);

  useEffect(() => {
    if (indexOfNew !== null && value.length > indexOfNew) {
      setIndexOfNew(null);
    }
  }, [value, indexOfNew, setIndexOfNew]);

  const hasNew = indexOfNew !== null;

  return [add, hasNew];
}

type OptionSetOptionType = {
  name: string;
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, option: OptionItem) => void;
};

const OptionSetOption = ({
  name,
  index,
  onRemove,
  onChange,
}: OptionSetOptionType) => {
  const handleRemoveOption = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const handleLabelChange = useCallback(
    (event) => {
      const label = event.target.value;
      const newValue = pascalCase(event.target.value);
      const option = { label: label, value: newValue };
      onChange(index, option);
    },
    [index, onChange]
  );

  return (
    <div className="option-set__option">
      <Form.Item name={`${name}.${index}.label`} label="Label">
        <Input name={`${name}.${index}.label`} onChange={handleLabelChange} autoComplete="off" />
      </Form.Item>

      <Form.Item name={`${name}.${index}.value`} label="Value">
        <Input name={`${name}.${index}.value`} autoComplete="off" />
      </Form.Item>
      <div className="option-set__option__action">
        <Button
            type="default"
            icon={
                <>
                  <DeleteTwoTone twoToneColor="red"/>
                </>
            }
            size={"small"} 
            onClick={handleRemoveOption}
        />
      </div>
    </div>
  );
};
