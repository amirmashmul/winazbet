import React from 'react';
import DynamicForm from './components/FormBuilder/DynamicForm';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-center mt-4">فرم داینامیک چندمرحله‌ای</h1>
      <DynamicForm
        onSubmit={(data) => {
          console.log('فرم ارسال شد:', data);
          alert('ثبت‌نام با موفقیت انجام شد!');
        }}
      />
    </div>
  );
};

export default App;
