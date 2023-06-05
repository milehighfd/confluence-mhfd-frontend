
import React from "react";
import { useSignup } from '../hooks/useSignup';
import CheckYourEmailModal from './CheckYourEmailModal';
import { PreSignUpForm } from './PreSingUpForm';



const PreSignUp = () => {
  const {
    openCheckYourEmailModal,
    setOpenCheckYourEmailModal
  } = useSignup();
  return (
    <>
      {
        !openCheckYourEmailModal ? 
        <PreSignUpForm
          sucessCallback={() => setOpenCheckYourEmailModal(true)}
          errorCallback={() => setOpenCheckYourEmailModal(false)}
        /> : 
        <CheckYourEmailModal />
      }
    </>
  )
}

export default PreSignUp;
