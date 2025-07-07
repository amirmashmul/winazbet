// pages/RegisterPage.tsx
import React from 'react';
import  FormBuilder  from '../components/FormBuilder/FormBuilder';
import { Step } from '../components/FormBuilder/types';

const steps: Step[] = [
  {
    name: 'step1',
    title: { message: 'مرحله اول' },
    fields: [
      { name: 'firstName', type: 'text', value: '', rules: { required: true }, placeholder: { message: 'نام' } },
      { name: 'lastName', type: 'text', value: '', rules: { required: true }, placeholder: { message: 'نام خانوادگی' } },
      { name: 'next', type: 'submit', value: { message: 'بعدی' } }
    ],
  },
  {
    name: 'step2',
    title: { message: 'مرحله دوم' },
    fields: [
      { name: 'email', type: 'text', rules: { required: true }, placeholder: { message: 'ایمیل' } },
      { name: 'password', type: 'password', rules: { required: true, minLength: 6 }, placeholder: { message: 'رمز عبور' } },
      { name: 'register', type: 'submit', value: { message: 'ثبت نام' } }
    ],
  },
];

const RegisterPage: React.FC = () => {
  const handleSubmit = (data: Record<string, any>) => {
    alert('ثبت نام با موفقیت انجام شد!');
    console.log('Form data:', data);
  };

  return <FormBuilder steps={steps} onSubmit={handleSubmit} />;
};

export default RegisterPage;
