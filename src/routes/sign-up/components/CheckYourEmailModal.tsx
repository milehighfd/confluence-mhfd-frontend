import { Button } from "antd";
import React from "react";
import { onGenerateSignupLink } from '../utils';

type Props = {
  email: string;
};
const CheckYourEmailModal = ({ email }: Props) => {
  return <div className="main-conf">
    <div className="login-form" style={{textAlign: 'center', marginTop: '-20%'}}>
      <div className="letter-conf">
        <img src="Icons/letter.svg" alt="" />
      </div>
        <h1>Confirm Your Email Address</h1>
      <div className="resetText">
        <p style={{marginLeft: '-13%', marginRight: '-13%'}}>Thank you for signing up. We have sent a confirmation email to <strong>{email}.</strong>  Check your email and click on the confirmation link to start using Confluence.</p>
        <p style={{marginLeft: '-13%', marginRight: '-13%'}}>Haven't received your email after one minute? Please check your spam or junk folder. Click the button below to resend it.</p>
      </div>
      <Button
        className="btn-purple"
        block
        htmlType="submit"
        onClick={() => onGenerateSignupLink(email, () => console.log('success'), () => console.log('error'))}
      >
        RESEND EMAIL
      </Button>
    </div>

  </div>
}

export default CheckYourEmailModal;