
import React from "react";
import { useSignup } from '../hooks/useSignup';
import CheckYourEmailModal from './CheckYourEmailModal';
import { PreSignUpForm } from './PreSingUpForm';

const PreSignUp = () => {
  const {
    email,
    isValidEmail,
    setEmail,
    openCheckYourEmailModal,
    setOpenCheckYourEmailModal
  } = useSignup();
  return (
    <>
      {
        !openCheckYourEmailModal ? 
        <PreSignUpForm
          {...{email, isValidEmail, setEmail}}
          sucessCallback={() => setOpenCheckYourEmailModal(true)}
          errorCallback={() => setOpenCheckYourEmailModal(false)}
        /> : 
        <CheckYourEmailModal
          email={email}
        />
      }
    </>
  )
}

export default PreSignUp;
