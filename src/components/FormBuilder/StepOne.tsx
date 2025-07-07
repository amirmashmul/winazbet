// components/FormBuilder/StepOne.tsx
import React, { useState } from 'react';
import { Field } from './types';
import { validateField } from './validators';
import { FieldRenderer } from './FieldRenderer';

interface Props {
  fields: Field[];
  onNext: (data: Record<string, any>) => void;
}

export const StepOne: React.FC<Props> = ({ fields, onNext }) => {
  const [data, setData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || '';
      return acc;
    }, {} as Record<string, any>)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.type === 'submit') return;
      const error = validateField(data[field.name], field.rules);
      if (error) newErrors[field.name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onNext(data);
  };

  const getFieldValue = (field: Field) => {
    if (typeof field.value === 'object' && field.value?.message) return field.value.message;
    return field.value || '';
  };

  const getFieldLabel = (field: Field) => {
    if (typeof field.value === 'object' && field.value?.message) return field.value.message;
    return field.value || 'ارسال';
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(field =>
        field.type !== 'submit' ? (
          <FieldRenderer
            key={field.name}
            field={field}
            value={data[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ) : (
          <button key={field.name} type="submit" className="btn btn-primary">
            {field.value?.message || 'بعدی'}
          </button>
        )
      )}
    </form>
  );
};
