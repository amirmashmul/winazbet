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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    let val: any;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      val = target.checked;
    } else {
      val = target.value;
    }
    onChange(field.name, val);
  };

  const baseInputStyle =
    'w-full px-3 py-2 border rounded-md outline-none transition focus:ring-2 duration-150';

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <div>
          <label
            htmlFor={field.name}
            className="block mb-1 text-sm font-semibold text-gray-700"
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
            className={`${baseInputStyle} ${
              error
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p
              id={`${field.name}-error`}
              className="text-red-600 text-sm mt-1 select-none"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <input
            id={field.name}
            type="checkbox"
            checked={!!value}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          <label
            htmlFor={field.name}
            className="text-gray-700 select-none cursor-pointer"
          >
            {getPlaceholder(field)}
          </label>
          {error && (
            <p
              id={`${field.name}-error`}
              className="text-red-600 text-sm mt-1 select-none"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );

    // You can add select, radio inputs similarly here...

    default:
      return null;
  }
};

export default InputField;
