import { Button } from "antd";
import React from "react";
import { onGenerateSignupLink } from '../utils';

type Props = {
  email: string;
};
const CheckYourEmailModal = ({ email }: Props) => {
  return <div className="main-conf">
    <div className="login-form group">
      <div className="letter-conf">
        <img src="Icons/letter.svg" alt="" />
      </div>
      {/* <div className="title-conf"> */}
        <h1>Confirm Your Email Address</h1>
        {/* <br /><br /> */}
      {/* </div> */}
      <div className="resetText">
        <p>Thank you for signing up. We have sent a confirmation email to <strong>{email}.</strong>  Check your email and click on the confirmation link to start using Confluence.</p>
        <p>Haven't received your email after one minute? Please check your spam or junk folder. Click the button below to resend it.</p>
      </div>
      {/* <div className="all-text-conf">
        <span className="text-conf" >Thank you for signing up. We have sent a confirmation email to <strong>{email}.</strong>  Check your email and click on the confirmation link to start using Confluence.</span><br /><br />
        <span style={{ fontSize: '18px', marginBottom: '10px', color: '#251863' }}>Haven't received your email after one minute? Please check your spam or junk folder. Click the button below to resend it.</span>
      </div> */}
      <Button
        className="btn-purple"
        block
        htmlType="submit"
        style={{ width: '400px', marginTop: '30px', height:'50px' }}
        onClick={() => onGenerateSignupLink(email, () => console.log('success'), () => console.log('error'))}
      >
        RESEND EMAIL
      </Button>
    </div>

  </div>
}

export default CheckYourEmailModal;