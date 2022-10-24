import React, { useState } from "react";
import { Row, Form, Button, } from 'antd';
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { REQUIRED } from "./constantsResetPassword";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(REQUIRED),
  recaptcha: Yup.string()
    .min(5)
    .required()
});

const ResetPasswordForm = () => {
  const [message, setMessage] = useState({ message: '', color: '#28C499' });
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const handleChange = (e: any) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  const onSubmit = () => {
    setMessage({
      message: 'The request was sent to reset your email password, this may take a few minutes',
      color: '#28C499'
    });
    datasets.postData(SERVER.RECOVERY_PASSWORD, {email: email }).then(res => {
      if (!res.error) {
        setRedirect(true);
      } else {
        const auxMessage = { ...message };
        auxMessage.message = res?.error || 'An error has occurred.';
        auxMessage.color = 'red';
        setMessage(auxMessage);
      }
    });
  }
  const { values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: { email: string, recaptcha: string }) {
      setMessage({
        message: 'The request was sent to reset your email password, this may take a few minutes',
        color: '#28C499'
      });
      datasets.postData(SERVER.RECOVERY_PASSWORD, values).then(res => {
        if (!res.error) {
          setRedirect(true);
        } else {
          const auxMessage = { ...message };
          auxMessage.message = res?.error || 'An error has occurred.';
          auxMessage.color = 'red';
          setMessage(auxMessage);
        }
      })
    }
  });

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <Form style={{ width: '420px' }} className="login-form">
      <h1>
        Reset your password
      </h1>
      <Row className="resetText">
        <p>Enter your email address below and we’ll send you a link to reset your password.</p>
      </Row>
      <div className="group">
        <input placeholder="Email" type="email" name="email" onChange={handleChange}
          style={(errors.email && touched.email) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div style={{ height: '35px' }}>
        <span style={{ color: message.color }}>{message.message}</span>
      </div>
      <Form.Item>
        <GoogleReCaptcha onVerify={(token: string) => {
          values.recaptcha = '' + (token !== 'null' ? token : '');
        }} />
        <Button className="btn-purple" block htmlType="submit" onClick={() => onSubmit() }>
          Send Password Reset Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
