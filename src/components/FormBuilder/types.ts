// components/FormBuilder/types.ts

export interface FieldRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: { regexp: string; message?: { message: string } };
}

export interface Field {
  name: string;
  type: string;
  value?: any;
  rules?: FieldRules;
   placeholder?: string | { message: string };  // اینجا تغییر دادیم
  showOn?: Record<string, any[]>; // شرط نمایش فیلد
  options?: Record<string, string>; // برای select و ...
  dir?: string; // جهت متن
}

export interface Step {
  name: string;
  title?: { message: string };
  fields: Field[];
}

export interface FormConfig {
  steps: Step[];
  submitUrl?: string;
  method?: string;
  fixedValues?: Record<string, any>;
}
