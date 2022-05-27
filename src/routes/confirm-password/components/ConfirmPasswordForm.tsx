import React, { useState } from "react";
import { Row, Form, Button } from 'antd';
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password confirm is required')
});

const ConfirmPasswordForm = () => {
  const [redirect, setRedirect] = useState(false);
  const messagePasswordNoEquals = 'Passwords are not similar';
  const message = 'Password confirm is required';
  const history = useHistory();
  let params = new URLSearchParams(history.location.search);
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      id: params.get('id') || '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit(values: { id: string, password: string, passwordConfirm: string }) {
      datasets.postData(SERVER.RESET_PASSWORD, values).then(res => {
        if (res) {
          setRedirect(true);
        }
      })
    }
  });

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <Form style={{ width: '420px' }} className="login-form" onFinish={handleSubmit} >
      <h1>
        Reset your password
      </h1>
      <Row className="resetText">
        <p>Enter a new password to reset the password for your account
        </p>
      </Row>
      <div className="group">
        <input placeholder="New Password" type="password" name="password" onChange={handleChange}
          style={(errors.password && touched.password) ? { borderBottom: "solid red 1px", paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div className="group">
        <input placeholder="Confirm New Password" type="password" name="passwordConfirm" onChange={handleChange}
          style={(errors.passwordConfirm && touched.passwordConfirm) ? { border: "solid red 1px", paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div><br />
        <span style={{ color: 'red' }}>&nbsp;&nbsp; {errors.passwordConfirm === message ? message : errors.passwordConfirm ? messagePasswordNoEquals : errors.password}</span>
      </div>
      <div>
        <Button className="btn-purple" block htmlType="submit">
          Set New Password
        </Button>
      </div>
    </Form>
  );
};

export default ConfirmPasswordForm;
