import React from 'react';
import { Button } from "antd";
import { useSignup } from '../hooks/useSignup';
import { onGenerateSignupLink } from '../utils';

type PreSignUpFormProps = {
  sucessCallback: () => void;
  errorCallback: () => void;
};
export const PreSignUpForm = ({ sucessCallback, errorCallback }: PreSignUpFormProps) => {
  const {
    isValidEmail,
    email,
    setEmail,
    emailOnBlur,
    setEmailOnBlur
  } = useSignup();
  return (
    <div>
      <span style={{fontSize:'30px', color:'#251863', paddingBottom:'20px'}}>Welcome to MHFD's Confluence</span><br/><br/> 
      <span style={{fontSize:'22px', marginBottom:'10px', color:'#251863'}}>Let's begin the adventure</span><br/>
      <div className="group login-form" style={{marginTop:'30px'}}> 
        {
          (emailOnBlur) && <label style={{color:'#88849D'}}> Email Address</label>
        }
        <input
          placeholder="Email Address"
          type="email"
          name="email"            
          onBlur={() => setEmailOnBlur(false)}
          onClick={() => setEmailOnBlur(true)}
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={isValidEmail ? {paddingLeft:'10px'}:{paddingLeft:'10px', borderBottom: '1px solid rgb(255 0 0)'}}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <Button
        disabled={!isValidEmail}
        className="btn-purple"
        block
        htmlType="submit"
        onClick={() => onGenerateSignupLink(email, sucessCallback, errorCallback )}
      >
        Register by Email
      </Button>
    </div>
  )
}