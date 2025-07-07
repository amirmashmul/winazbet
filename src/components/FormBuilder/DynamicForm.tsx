import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormConfig, Step, Field } from './types';
import FormStep from './FormStep';
import { useFormBuilder } from '../../hooks/useFormBuilder';

interface Props {
  onSubmit?: (data: Record<string, any>) => void;
}

function tryParseJSON(input: any) {
  if (typeof input !== 'string') return input; // اگر شی هست مستقیم برگردون
  try {
    return JSON.parse(input);
  } catch {
    return input;
  }
}


const DynamicForm: React.FC<Props> = ({ onSubmit }) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const configUrl = process.env.REACT_APP_FORM_CONFIG_URL || 'https://api.winazbet.com/v3/default/config';

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(configUrl);
        const data = response.data;

        // می‌گیریم مراحل فرم ثبت نام از زیر آبجکت form.register
        const rawSteps: any[] = data.form?.register || [];

        // پردازش پارس کردن رشته‌های JSON در title و placeholder
        const steps: Step[] = rawSteps.map((step) => ({
          ...step,
          title: step.title ? tryParseJSON(step.title) : undefined,
          fields: (step.fields || []).map((field: Field) => ({
            ...field,
            placeholder: field.placeholder ? tryParseJSON(field.placeholder) : undefined,
            rules: field.rules || {},
          })),
        }));

        setConfig({
          steps,
          submitUrl: '', // اگر API ارائه داد بذار اینجا
          method: 'POST', // یا از خود step بخون، یا اینجا بذار
          fixedValues: {},
        });
      } catch (err) {
        setError('خطا در دریافت فرم');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [configUrl]);

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
  } = useFormBuilder({ steps: config?.steps || [] });

  if (loading) return <div>در حال بارگذاری فرم...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!config) return null;

  const handleNextClick = () => {
    const valid = nextStep();
    if (!valid) {
      alert('لطفا خطاهای فرم را اصلاح کنید');
    }
  };

  const handleSubmitClick = async () => {
    const data = submitForm();
    if (!data) {
      alert('لطفا خطاهای فرم را اصلاح کنید');
      return;
    }
    try {
      if (config.submitUrl && config.method) {
        // ارسال دیتا به سرور
        // await axios({ method: config.method, url: config.submitUrl, data });
      }
      if (onSubmit) onSubmit(data);
      alert('ثبت‌نام موفقیت‌آمیز بود');
    } catch (err) {
      alert('خطا در ارسال فرم');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      {step && step.title && <h3>{step.title.message}</h3>}
      {step && (
        <FormStep
          step={step}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          isFieldVisible={isFieldVisible}
        />
      )}

      <div className="d-flex justify-content-between mt-3">
        {currentStep > 0 && (
          <button className="btn btn-secondary" onClick={prevStep}>
            مرحله قبل
          </button>
        )}

        {currentStep < totalSteps - 1 && (
          <button className="btn btn-primary" onClick={handleNextClick}>
            مرحله بعد
          </button>
        )}

        {currentStep === totalSteps - 1 && (
          <button className="btn btn-success" onClick={handleSubmitClick}>
            ثبت نهایی
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
