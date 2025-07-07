import React from 'react';
import { Field } from './types';

interface Props {
  field: Field;
  value: any;
  error?: string;
  onChange: (name: string, value: any) => void;
}

const getPlaceholder = (field: Field): string => {
  if (typeof field.placeholder === 'object' && 'message' in field.placeholder) {
    return field.placeholder.message;
  }
  if (typeof field.placeholder === 'string') {
    return field.placeholder;
  }
  return field.name;
};

const InputField: React.FC<Props> = ({ field, value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val: any;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      val = e.target.checked;
    } else {
      val = e.target.value;
    }
    onChange(field.name, val);
  };

  const baseInputStyle = `
    w-full px-4 py-2 border rounded-md
    outline-none transition
    focus:ring-2 focus:ring-blue-500
    ${error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}
  `;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <div className="mb-5">
          <label
            htmlFor={field.name}
            className="block mb-2 font-semibold text-gray-700"
          >
            {getPlaceholder(field)}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={getPlaceholder(field)}
            className={baseInputStyle}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p
              id={`${field.name}-error`}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center mb-5 space-x-3">
          <input
            id={field.name}
            type="checkbox"
            checked={!!value}
            onChange={handleChange}
            className={`h-5 w-5 rounded border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          <label
            htmlFor={field.name}
            className="select-none text-gray-700 font-medium cursor-pointer"
          >
            {getPlaceholder(field)}
          </label>
          {error && (
            <p
              id={`${field.name}-error`}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default InputField;
