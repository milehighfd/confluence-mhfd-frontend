import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import SignUpLayout from './SignUpLayout';

const SignUpProvider = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <SignUpLayout />
    </GoogleReCaptchaProvider>
  )
};

export default SignUpProvider;
