import React from 'react';
import { Field } from './types';

interface Props {
  field: Field;
  value: any;
  error?: string;
  onChange: (name: string, value: any) => void;
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

const InputField: React.FC<Props> = ({ field, value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    let val: any;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      val = target.checked;
    } else {
      val = target.value;
    }
    onChange(field.name, val);
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <div className="form-group mb-3">
          <label>{getPlaceholder(field)}</label>
          <input
            type={field.type}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={getPlaceholder(field)}
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      );

    case 'checkbox':
      return (
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className={`form-check-input ${error ? 'is-invalid' : ''}`}
            id={field.name}
            checked={!!value}
            onChange={handleChange}
          />
          <label htmlFor={field.name} className="form-check-label">
            {getPlaceholder(field)}
          </label>
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
      );

    // می‌تونی select، radio و ... هم اضافه کنی

    default:
      return null;
  }
};

export default InputField;
