import { Button } from "antd";
import React from "react";
import { onGenerateSignupLink, onGenerateResetAndConfirm } from '../utils';

const confirmEmail = (email: string) => ({
  title: 'Confirm Your Email Address',
  text: <>Thank you for signing up. We have sent a confirmation email to <strong>{email}.</strong>  Check your email and click on the confirmation link to start using Confluence.</>,
  buttonText: 'RESEND EMAIL',
  onClickButton: () => onGenerateSignupLink(email, () => console.log('success'), () => console.log('error'))
});

const resetPasswordEmail = (email: string) => ({
  title: 'Please reset your password',
  text: <>We have sent a password reset email to <strong>{email}.</strong> with next steps to reset your password.</>,
  buttonText: 'Send password reset email',
  onClickButton: () => onGenerateResetAndConfirm(email, () => console.log('success'), () => console.log('error'))
});

type Props = {
  email: string;
  isResetPassword?: boolean;
};
const CheckYourEmailModal = ({ email, isResetPassword }: Props) => {
  const { title, text, buttonText } = isResetPassword ? resetPasswordEmail(email) : confirmEmail(email);
  return <div className="main-conf">
    <div className="login-form" style={{textAlign: 'center', marginTop: '-20%'}}>
      <div className="letter-conf">
        <img src="Icons/letter.svg" alt="" />
      </div>
      <h1>
        {title}
      </h1>
      <div className="resetText pre-signup">
       <p style={{marginLeft: '-13%', marginRight: '-13%'}}>{text}</p>
       <p style={{marginLeft: '-13%', marginRight: '-13%'}}>Haven't received your email after one minute? Please check your spam or junk folder. Click the button below to resend it.</p>
      </div>
      <Button
        className="btn-purple"
        block
        htmlType="submit"
        onClick={() => onGenerateSignupLink(email, () => console.log('success'), () => console.log('error'))}
      >
        {buttonText}
      </Button>
    </div>

  </div>
}

export default CheckYourEmailModal;