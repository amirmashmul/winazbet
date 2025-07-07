import React from 'react';
import { Field } from './types';

interface Props {
  field: Field;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
}

const getPlaceholder = (field: Field): string => {
  if (field.placeholder && typeof field.placeholder === 'object' && 'message' in field.placeholder) {
    return field.placeholder.message;
  }
  if (typeof field.placeholder === 'string') {
    return field.placeholder;
  }
  return field.name;
};

export const FieldRenderer: React.FC<Props> = ({ field, value, onChange, error }) => {
  const commonProps = {
    name: field.name,
    value: value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.target.type === 'checkbox') {
        onChange(field.name, (e.target as HTMLInputElement).checked);
      } else {
        onChange(field.name, e.target.value);
      }
    },
    className: `border p-2 rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`,
    dir: field.dir || 'auto',
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <div className="mb-4">
          <label htmlFor={field.name} className="block mb-1">{getPlaceholder(field)}</label>
          <input type={field.type} id={field.name} {...commonProps} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case 'checkbox':
      return (
        <div className="mb-4 flex items-center">
          <input type="checkbox" id={field.name} checked={!!value} {...commonProps} />
          <label htmlFor={field.name} className="mr-2">{getPlaceholder(field)}</label>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case 'select':
      return (
        <div className="mb-4">
          <label htmlFor={field.name} className="block mb-1">{getPlaceholder(field)}</label>
          <select id={field.name} {...commonProps}>
            <option value="">انتخاب کنید</option>
            {field.options &&
              Object.entries(field.options).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    default:
      return null;
  }
};
