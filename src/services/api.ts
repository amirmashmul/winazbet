
import axios from 'axios';
import { FormConfig, Step } from '../components/FormBuilder/types';

export const fetchFormConfig = async (): Promise<FormConfig> => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://api.winazbet.com/v3/default/config';
  const res = await axios.get(apiUrl);
  const rawSteps = res.data.form?.register || [];

  const steps: Step[] = rawSteps.map((step: any) => ({
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

export const submitFormData = async (url: string, method: string, data: any) => {
  if (method.toUpperCase() === 'POST') {
    return axios.post(url, data);
  }
  return axios.get(url, { params: data });
};
