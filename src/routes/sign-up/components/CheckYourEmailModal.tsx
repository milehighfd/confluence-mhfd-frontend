import { Button } from "antd";
import React from "react";
import { onGenerateSignupLink, onGenerateResetAndConfirm } from '../utils';
import ModalNotificationSignUp from "./ModalNotificationSignUp";
import { set } from "react-ga";

const confirmEmail = (email: string) => ({
  title: 'Confirm Your Email Address',
  text: <>Thank you for signing up. We have sent a confirmation email to <strong>{email}.</strong>  Check your email and click on the confirmation link to start using Confluence.</>,
  buttonText: 'RESEND EMAIL',
  onClickButton: (email: string, cbError: Function) => onGenerateSignupLink(email, () => console.log('success'), cbError)
});

const resetPasswordEmail = (email: string) => ({
  title: 'Please reset your password',
  text: <>We have sent a password reset email to <strong>{email}.</strong> with next steps to reset your password.</>,
  buttonText: 'Send password reset email',
  onClickButton: (email: string, cbError: Function) => onGenerateResetAndConfirm(email, () => console.log('success'), cbError)
});

type Props = {
  email: string;
  isResetPassword?: boolean;
};
const CheckYourEmailModal = ({ email, isResetPassword }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const { title, text, buttonText, onClickButton } = isResetPassword ? resetPasswordEmail(email) : confirmEmail(email);
  return <div className="main-conf">
     <ModalNotificationSignUp visible={visible} setVisible={setVisible} message='The email was unable to be sent. Please try again.'/>
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
        onClick={() => onClickButton(email, () => setVisible(true))}
      >
        {buttonText}
      </Button>
    </div>

  </div>
}

export default CheckYourEmailModal;