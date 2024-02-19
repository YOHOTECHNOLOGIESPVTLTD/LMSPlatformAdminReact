// ToastProvider.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProvider;
