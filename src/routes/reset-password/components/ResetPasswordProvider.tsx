import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ResetPasswordLayout from './ResetPasswordLayout';

const ResetPasswordProvider = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <ResetPasswordLayout />
    </GoogleReCaptchaProvider>
  )
};

export default ResetPasswordProvider;
