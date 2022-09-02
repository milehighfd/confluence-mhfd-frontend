import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const LoginProvider = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>

    </GoogleReCaptchaProvider>
  )
};

export default LoginProvider;
