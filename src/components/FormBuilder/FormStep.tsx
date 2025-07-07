// components/FormBuilder/FormStep.tsx

import React from 'react';
import { Step, Field } from './types';
import { FieldRenderer } from './FieldRenderer';

interface Props {
  step: Step;
  formData: Record<string, any>;
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
  isFieldVisible: (field: Field) => boolean;
}

const FormStep: React.FC<Props> = ({ step, formData, errors, onChange, isFieldVisible }) => {
  return (
    <div>
      {step.fields.map(field =>
        isFieldVisible(field) ? (
          <FieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={errors[field.name]}
            onChange={onChange}
          />
        ) : null
      )}
    </div>
  );
};

export default FormStep;
