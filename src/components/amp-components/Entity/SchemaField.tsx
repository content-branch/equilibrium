import React from "react";
import { capitalCase } from "capital-case";
import EntitySelectField from "@amp-components/Entity/EntitySelectField";
import EnumSelectField from "@amp-components/Entity/EnumSelectField";
import RelatedEntityFieldField from "@amp-components/Entity/RelatedEntityFieldField";
import RelationAllowMultipleField from "@amp-components/Entity/RelationAllowMultipleField";
import { Schema } from "@content-branch/equilibrium-data";
import OptionSet from "@amp-components/Entity/OptionSet";
import { Input, InputNumber, Form, Switch} from "formik-antd";

const { Item } = Form;

export const SchemaField = ({
  propertyName,
  propertySchema,
  isDisabled,
  applicationId,
  entityDisplayName,
}: {
  propertyName: string;
  propertySchema: Schema;
  isDisabled?: boolean;
  applicationId: string;
  entityDisplayName: string;
}) => {
  const fieldName = `properties.${propertyName}`;
  const label = propertySchema.title || capitalCase(propertyName);

  if (propertySchema.enum) {
    if (propertySchema.enum.every((item) => typeof item === "string")) {
      return (
        <EnumSelectField
          label={label}
          name={fieldName}
          disabled={isDisabled}
          options={propertySchema.enum as string[]}
        />
      );
    } else {
      throw new Error(
        `Enum members of unexpected type ${JSON.stringify(propertySchema.enum)}`
      );
    }
  }

  switch (propertySchema.type) {
    case "string": {
      return (
        <Item name={fieldName} label={label}>
          <Input name={fieldName} disabled={isDisabled} />
        </Item>
      );
    }
    case "integer":
    case "number": {
      return (
        <Item name={fieldName} label={label}>
          <InputNumber name={fieldName} disabled={isDisabled} />
        </Item>
      );
    }
    case "boolean": {
      return (
        <Item name={fieldName} label={label}>
          <Switch name="searchable" disabled={isDisabled} />
        </Item>
      );
    }
    case "array": {
      if (!propertySchema.items) {
        throw new Error("Array schema must define items");
      }

      switch (propertySchema.items.type) {
        case "object": {
          return (
            <OptionSet label={label} name={fieldName} isDisabled={isDisabled} />
          );
        }
        default: {
          throw new Error(
            `Unexpected propertySchema.items.type: ${propertySchema.type}`
          );
        }
      }
    }
    default: {
      switch (propertySchema?.$ref) {
        case "#/definitions/EntityId": {
          return (
            <Item name={fieldName}>
              <EntitySelectField
                label={label}
                name={fieldName}
                disabled={isDisabled}
                applicationId={applicationId}
              />
            </Item>
          );
        }
        case "#/definitions/EntityFieldId": {
          return (
            <RelatedEntityFieldField entityDisplayName={entityDisplayName} />
          );
        }
        case "#/definitions/RelationAllowMultiple": {
          return (
            <RelationAllowMultipleField
              fieldName={fieldName}
              isDisabled={isDisabled}
              entityDisplayName={entityDisplayName}
            />
          );
        }
      }

      throw new Error(`Unexpected propertySchema.type: ${propertySchema.type}`);
    }
  }
};
