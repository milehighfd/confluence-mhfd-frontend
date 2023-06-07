import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Row } from "antd";
import { useSignup } from '../hooks/useSignup';
import { onGenerateSignupLink } from '../utils';
import ModalNotificationSignUp from './ModalNotificationSignUp';


type PreSignUpFormProps = {
  email: string;
  isValidEmail: boolean;
  errorCallback: () => void;
  sucessCallback: () => void;
  setEmail: (email: string) => void;
};
export const PreSignUpForm = ({ email, isValidEmail, sucessCallback, errorCallback, setEmail }: PreSignUpFormProps) => {
  const {
    emailOnBlur,
    setEmailOnBlur
  } = useSignup();
  
  const [visible, setVisible] = useState(false);

  return (
    <>
    <ModalNotificationSignUp visible={visible} setVisible={setVisible} message='The email was unable to be sent. Please try again.'/>
    <Form style={{ width: '420px' }} className="login-step01" id='login-form'>
      <h1>
        Welcome to MHFD's Confluence
      </h1>
      <Row className="resetText" style={{paddingLeft: '0px'}}>
        <p>Let's begin the adventure</p>
      </Row>
      <div className="group">
        <input placeholder="Email Address" type="email" name="email" onBlur={() => setEmailOnBlur(false)}
          onClick={() => setEmailOnBlur(true)}
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
            
        <Button  disabled={!isValidEmail}
        className="btn-purple"
        block
        htmlType="submit"
        onClick={() => onGenerateSignupLink(email, sucessCallback, errorCallback )}>
          Register by Email
        </Button>
      
    </Form>
    </>
    
  )
}