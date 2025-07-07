// pages/RegisterPage.tsx
import React, { useEffect, useState } from 'react';
import FormBuilder from '../components/FormBuilder/FormBuilder';
import { fetchFormConfig } from '../services/api';
import { FormConfig } from '../components/FormBuilder/types';

const RegisterPage: React.FC = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormConfig()
      .then((data) => setConfig(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بارگذاری فرم...</p>;
  if (!config) return <p>فرم یافت نشد.</p>;

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Submit:', data);
    alert('ثبت‌نام با موفقیت انجام شد!');
  };

  return <FormBuilder steps={config.steps} onSubmit={handleSubmit} />;
};

export default RegisterPage;
