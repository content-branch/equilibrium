import React from "react";
import { SchemaField } from "@amp-components/Entity/SchemaField";
import { Schema } from "@content-branch/equilibrium-data";

type Props = {
  schema: Schema;
  isDisabled?: boolean;
  applicationId: string;
  entityDisplayName: string;
};

export const SchemaFields = ({
  schema,
  isDisabled,
  applicationId,
  entityDisplayName,
}: Props) => {
  if (schema === null) {
    return null;
  }

  if (schema.type !== "object") {
    throw new Error(`Unexpected type ${schema.type}`);
  }

  return (
    <div>
      {Object.entries(schema.properties).map(([name, property]) => {
        if (!property) {
          throw new Error(`Missing property: ${name}`);
        }
        return (
          <div key={name}>
            <SchemaField
              propertyName={name}
              propertySchema={property as Schema}
              isDisabled={isDisabled}
              applicationId={applicationId}
              entityDisplayName={entityDisplayName}
            />
          </div>
        );
      })}
    </div>
  );
};
