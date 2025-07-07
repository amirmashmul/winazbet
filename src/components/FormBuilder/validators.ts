// components/FormBuilder/validators.ts
import { FieldRules } from './types';

export function validateField(value: any, rules?: FieldRules): string | undefined {
  if (!rules) return undefined;

  if (rules.required && (value === undefined || value === null || value === '')) {
    return 'این فیلد الزامی است';
  }

  if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
    return `حداقل تعداد کاراکترها ${rules.minLength} است`;
  }

  if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
    return `حداکثر تعداد کاراکترها ${rules.maxLength} است`;
  }

  if (rules.pattern) {
    const regex = new RegExp(rules.pattern.regexp);
    if (!regex.test(value)) {
      return rules.pattern.message?.message || 'فرمت مقدار اشتباه است';
    }
  }

  return undefined;
}
