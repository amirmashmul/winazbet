import axios from 'axios';
import { FormConfig, Step } from '../components/FormBuilder/types';

// این تابع config کامل فرم را از API می‌گیرد و برای راحتی استفاده، title و placeholderهای رشته‌ای JSON را پارس می‌کند
export const fetchFormConfig = async (): Promise<FormConfig> => {
  const res = await axios.get('https://api.winazbet.com/v3/default/config');
  const formData = res.data.form;

  // فرض می‌کنیم فرم ثبت‌نام با کلید 'register' است
  const rawSteps: any[] = formData.register || [];

  // تبدیل رشته‌های JSON به آبجکت در title و placeholder
  const steps: Step[] = rawSteps.map((step) => ({
    ...step,
    title: step.title ? JSON.parse(step.title) : undefined,
    fields: (step.fields || []).map((field: any) => ({
      ...field,
      placeholder: field.placeholder ? JSON.parse(field.placeholder) : undefined,
      rules: field.rules || {},
    })),
  }));

  return { steps };
};

// ارسال داده فرم به آدرس مشخص و متد مشخص (POST یا GET)
export const submitFormData = async (url: string, method: string, data: any) => {
  if (method.toUpperCase() === 'POST') {
    return axios.post(url, data);
  } else {
    return axios.get(url, { params: data });
  }
};
