import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, } from 'antd';
import { useFormik } from "formik";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";
import { Redirect, Link } from "react-router-dom";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";


const keyCaptcha = SERVER.CAPTCHA;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .min(2)
    .required('Required'),
  recaptcha: Yup.string()
    .min(5)
    .required()
});
export default ({replaceAppUser}: {replaceAppUser: Function}) => {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState({message: '', color: '#28C499'});
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: {email: string, password: string, recaptcha: string}) {
      datasets.postData(SERVER.LOGIN, values).then(res => {
        if(res?.token) {
          const auxMessage = {...message};
          auxMessage.message = 'Successful Connection';
          setMessage(auxMessage);
          localStorage.setItem('mfx-token', res.token);
          setRedirect(true);
          datasets.getData(SERVER.ME, datasets.getToken()).then(result => {
            replaceAppUser(result);
          });
        } else {
          const auxMessage = {...message};
          auxMessage.message = 'Could not connect, check your email and password';
          auxMessage.color = 'red';
          setMessage(auxMessage);
        }
      })
    }
  });

  if(redirect) {
    return <Redirect to="/profile-view" />
  }

  return <Layout style={{ background: '#fff' }}>
    <Row>
      <CarouselAutoPlayView />
      <Col span={11} className="login-hh">
      <div className="login-step01">
        {/*<div>
        <Row className="returnText">
          <Col span={12}>
          <Button shape="circle" icon="arrow-left" /><span>Back</span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
          <span>Continue as Guest</span><Button shape="circle" icon="arrow-right" />
          </Col>
        </Row>
        </div>*/}
        <Form style={{ width: '420px' }}  className="login-form" onSubmit={handleSubmit}>
      <h1>
        Welcome to MHFD's Confluence
      </h1>
      <div style={{ marginTop: '30px' }}>
      <div className="group">
        <input name="email" type="email" onChange={handleChange}
          style={(errors.email && touched.email) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className={values.email ? "login-field-top":"login-field-botton"}>Email Address</label>
      </div>
      <div className="group">
        <input name="password" type="password"  onChange={handleChange}
          style={(errors.password && touched.password) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className={values.password ? "login-field-top":"login-field-botton"}>Enter Password</label>
      </div>
      <div className="marbot-4">
        <span>Don’t have an account?</span>
        <Link to={'/sign-up'} className="login-form-forgot">
          Sign-Up
        </Link>
        <Link to={'/reset-password'} className="login-forgot">
            Forgot Password?
        </Link>
        <br/><br/>
        <ReCAPTCHA
          sitekey={"" + keyCaptcha}
          onChange={(event) => {
            values.recaptcha = '' + (event !== 'null' ? event : '');
          }}
        />
      </div>
          <span style={{color: message.color}}>&nbsp;&nbsp; {message.message}</span>
        <Button className="buttonLogin" block htmlType="submit">
            Login
        </Button>
      </div>
      {/*
      <div className="line-social">
        <h2>
          <span>or</span>
        </h2>
      </div>

      <div className="social-login">
        <Button className="button-social" block htmlType="submit">
        <img className="anticon" src="/Icons/google.svg" alt="" width="32px" /><div className="divider-vertical"></div> Login with Google
        </Button>
        <Button className="button-social" block htmlType="submit">
        <img className="anticon" src="/Icons/windows.svg" alt="" width="32px" /><div className="divider-vertical"></div> Login with Microsoft
        </Button>
      </div>*/}
      </Form>
      </div>
      </Col>
    </Row>
        </Layout>
}
