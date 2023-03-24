import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Menu, Dropdown, MenuProps } from 'antd';
import { ROLES, GOVERNMENT_STAFF, CONSULTANT, OTHER, STAFF, ADMIN } from "../../../constants/constants";
import { Redirect, Link } from "react-router-dom";
import { SERVER } from "../../../Config/Server.config";
import * as datasets from "../../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../../constants/validation";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAppUserDispatch } from "../../../hook/useAppUser";
import { MILE_HIGH_FLOOD_DISTRICT, STAFF_CONSTANT, COLOR } from "./constantsSignUp";
import TextArea from "antd/lib/input/TextArea";

const SignUpForm = () => {
  const {
    replaceAppUser,
    getUserInformation
  } = useAppUserDispatch();
  const roles = ROLES;
  const validationSchema = VALIDATION_SIGN_UP;
  const [message, setMessage] = useState({ message: '', color: COLOR });
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [targetButton, setTargetButton] = useState(STAFF_CONSTANT);
  const [other, setOther] = useState({ value: '', visible: false });

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      designation: STAFF_CONSTANT,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organization: MILE_HIGH_FLOOD_DISTRICT,
      recaptcha: '',
      zoomarea: ''
    },
    validationSchema,
    onSubmit(values: { firstName: string, lastName: string, email: string, password: string, designation: string, organization: string, recaptcha: string, zoomarea: string }) {
      if (values.designation === CONSULTANT && values.organization === 'Other') {
        if (!other.value) {
          return;
        }
        values.organization = other.value;
      }
      setTitle(title);
      values.zoomarea = values.designation === GOVERNMENT_STAFF ? values.organization : MILE_HIGH_FLOOD_DISTRICT;
      datasets.postData(SERVER.SIGN_UP, values).then(res => {
        if (res?.token) {
          const auxMessage = { ...message };
          auxMessage.message = 'Successful Registration';
          setMessage(auxMessage);
          localStorage.setItem('mfx-token', res.token);
          replaceAppUser(res.user);
          getUserInformation();
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
    return <Redirect to="/map" />
  }

  return (
    <Form className="login-form" onFinish={handleSubmit} autoComplete="off">
      <h1>
        Sign Up!
      </h1>
      <Row style={{ marginTop: '15px', marginRight: '-20px' }}>
        <span className="loginLabels">Define your user role:</span>
        <Col className="signup">
          {roles.map((role: { value: string, style: string, title: string, options: Array<string> }, index: number) => {
            return <Button key={index} style={{ width: role.style, marginRight: '10px' }} className={targetButton === role.value ? 'button-dropdown' : 'btn-responsive'} onClick={() => {
              values.designation = role.value;
              values.organization = role.value === STAFF ? MILE_HIGH_FLOOD_DISTRICT : '';
              const auxTitle = role.value;
              setTargetButton(role.value);
              setTitle(auxTitle);
              const auxOther = { ...other };
              auxOther.value = '';
              auxOther.visible = false;
              setOther(auxOther);
            }}>{role.title}</Button>
          })}
        </Col>
      </Row>
      <div className="group">
        <input placeholder="First Name" type="text" name="firstName" onChange={handleChange}
          style={(errors.firstName && touched.firstName) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div className="group">
        <input placeholder="Last Name" type="text" name="lastName" onChange={handleChange}
          style={(errors.lastName && touched.lastName) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <div className="group">
        <input placeholder="Email" type="email" name="email" onChange={handleChange}
          style={(errors.email && touched.email) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      {(values.designation !== STAFF && values.designation !== OTHER) && 
        <div className="group btn-up">
          <div id="sign-up-organization">
            <input placeholder={"Enter Organization"} type="text" name="organization"
              onChange={handleChange}
              style={{ paddingLeft: '10px' }} />
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
        </div>
      }
      <div className="group">
        <input type="password" placeholder="Password" name="password" onChange={handleChange}
          style={(errors.password && touched.password) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
      <GoogleReCaptcha onVerify={(token: string) => {
        values.recaptcha = '' + (token !== 'null' ? token : '');
      }} />
      <div>
        <span style={{ color: message.color }}>&nbsp;&nbsp; {message.message}</span>
      </div>
      <Form.Item style={{ marginBottom: '15px' }}>
        <Button className="btn-purple" block htmlType="submit" >
          Sign Up
        </Button>
      </Form.Item>
      <div style={{ textAlign: "center" }}>
        <span className="respo-tt"> I have an account</span>
        <Link to={'/login'} className="login-form-forgot">
          Login
        </Link>
      </div>
    </Form>
  );
};

export default SignUpForm;
