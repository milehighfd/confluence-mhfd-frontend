import { Button } from "antd";
import React, { useState } from "react";
import { useSignup } from '../hooks/useSignup';



const PreSignUp = ()=>{
  const {
    isValidEmail,
    email,
    setEmail,
    emailOnBlur,
    setEmailOnBlur,
    openCheckYourEmailModal,
    onGenerateSignupLink
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
        />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <Button
        disabled={!isValidEmail}
        className="btn-purple"
        block
        htmlType="submit"
        onClick={() => onGenerateSignupLink()}
      >
        Register by Email
      </Button>
    </div>
  )
}

export default PreSignUp;
