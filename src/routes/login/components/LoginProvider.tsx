import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import LoginLayout from './LoginLayout';

const LoginProvider = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <LoginLayout />
    </GoogleReCaptchaProvider>
  )
};

export default LoginProvider;
