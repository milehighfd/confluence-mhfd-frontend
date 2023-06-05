import { useState, useEffect } from 'react';
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';

export const useSignup = () => {
  const [email, setEmail] = useState('');
  const [emailOnBlur, setEmailOnBlur] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [openCheckYourEmailModal, setOpenCheckYourEmailModal] = useState(false);
  
  useEffect(() => {
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setIsValidEmail(!!isValid);
  }, [email]);

  return {
    email,
    isValidEmail,
    emailOnBlur,
    openCheckYourEmailModal,
    setOpenCheckYourEmailModal,
    setEmail,
    setEmailOnBlur,
  };
};