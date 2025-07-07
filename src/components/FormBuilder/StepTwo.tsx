// components/FormBuilder/StepTwo.tsx
import React, { useState } from 'react';
import { Field } from './types';
import { validateField } from './validators';
import { FieldRenderer } from './FieldRenderer';

interface Props {
  fields: Field[];
  prevStep: () => void;
  onSubmit: (data: Record<string, any>) => void;
}

export const StepTwo: React.FC<Props> = ({ fields, prevStep, onSubmit }) => {
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
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields
        .filter(field => {
          if (!field.showOn) return true;
          // ساده‌ترین شرط: همه شرط‌ها برقرار باشند
          return Object.entries(field.showOn).every(([key, vals]) => vals.includes(data[key]));
        })
        .map(field =>
          field.type !== 'submit' ? (
            <FieldRenderer
              key={field.name}
              field={field}
              value={data[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
            />
          ) : (
            <button key={field.name} type="submit" className="btn btn-success">
              {field.value?.message || 'ثبت نام'}
            </button>
          )
        )}

      <button type="button" onClick={prevStep} className="btn btn-secondary me-2">
        بازگشت
      </button>
    </form>
  );
};
