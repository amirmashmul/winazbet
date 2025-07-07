// hooks/useFormBuilder.ts
import { useState } from 'react';
import { Step, Field } from '../components/FormBuilder/types';
import { validateField } from '../components/FormBuilder/validators';

interface UseFormBuilderParams {
  steps: Step[];
  fixedValues?: Record<string, any>;
}

export const useFormBuilder = ({ steps, fixedValues = {} }: UseFormBuilderParams) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({ ...fixedValues });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const isFieldVisible = (field: Field) => {
    if (!field.showOn) return true;

    return Object.entries(field.showOn).every(([key, values]) =>
      values.includes(String(formData[key]))
    );
  };

  const validateStep = (): boolean => {
    if (!step) return false;
    const stepErrors: Record<string, string> = {};

    step.fields.forEach(field => {
      if (!isFieldVisible(field)) return; // اگر فیلد مخفی است، اعتبارسنجی نمی‌کنیم

      const error = validateField(formData[field.name], field.rules);
      if (error) stepErrors[field.name] = error;
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // پاک کردن خطای مربوط به فیلد تغییر یافته
  };

  const nextStep = (): boolean => {
    if (!validateStep()) return false;
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    return true;
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const submitForm = (): Record<string, any> | null => {
    if (!validateStep()) return null;
    return formData;
  };

  return {
    currentStep,
    step,
    formData,
    errors,
    handleChange,
    nextStep,
    prevStep,
    submitForm,
    isFieldVisible,
    totalSteps,
  };
};
