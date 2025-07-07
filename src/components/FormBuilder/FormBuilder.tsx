import React from 'react';
import { Step } from './types';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import InputField from './InputField';

interface Props {
  steps: Step[];
  onSubmit?: (data: Record<string, any>) => void;
}

const FormBuilder: React.FC<Props> = ({ steps, onSubmit }) => {
  const {
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
  } = useFormBuilder({ steps });

  if (!step) return <p>فرم تمام شد ✅</p>;

  const handleNextClick = () => {
    const ok = nextStep();
    if (!ok) alert('لطفا خطاهای فرم را اصلاح کنید');
  };

  const handleSubmitClick = () => {
    const data = submitForm();
    if (!data) {
      alert('لطفا خطاهای فرم را اصلاح کنید');
      return;
    }
    if (onSubmit) onSubmit(data);
  };

  return (
    <div>
      <h2>{step.title?.message}</h2>
      {step.fields.map(field =>
        isFieldVisible(field) ? (
          <InputField
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ) : null
      )}

      <div style={{ marginTop: 20 }}>
        {currentStep > 0 && (
          <button type="button" onClick={prevStep}>
            قبلی
          </button>
        )}
        {currentStep < totalSteps - 1 && (
          <button type="button" onClick={handleNextClick}>
            بعدی
          </button>
        )}
        {currentStep === totalSteps - 1 && (
          <button type="button" onClick={handleSubmitClick}>
            ثبت
          </button>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
