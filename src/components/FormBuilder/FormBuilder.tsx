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

  if (!step)
    return (
      <p className="text-green-600 text-center font-semibold mt-10">
        ✅ فرم با موفقیت تکمیل شد.
      </p>
    );

  const handleNextClick = () => {
    const ok = nextStep();
    if (!ok) alert('لطفا خطاهای فرم را اصلاح کنید.');
  };

  const handleSubmitClick = () => {
    const data = submitForm();
    if (!data) {
      alert('لطفا خطاهای فرم را اصلاح کنید.');
      return;
    }
    if (onSubmit) onSubmit(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-300 pb-3">
        {step.title?.message || `مرحله ${currentStep + 1}`}
      </h2>

      <form>
        <div className="space-y-6">
          {step.fields.map((field) =>
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
        </div>

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              ⬅ مرحله قبل
            </button>
          )}

          {currentStep < totalSteps - 1 && (
            <button
              type="button"
              onClick={handleNextClick}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              مرحله بعد ➡
            </button>
          )}

          {currentStep === totalSteps - 1 && (
            <button
              type="button"
              onClick={handleSubmitClick}
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              ✅ ثبت نهایی
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
