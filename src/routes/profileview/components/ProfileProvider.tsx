import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ProfileView from './ProfileView';

const ProfileProvider = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA}>
      <ProfileView />
    </GoogleReCaptchaProvider>
  )
};

export default ProfileProvider;
