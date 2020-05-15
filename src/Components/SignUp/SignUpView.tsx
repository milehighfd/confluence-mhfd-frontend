import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, Menu, Dropdown, Input } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { ROLES } from "../../constants/constants";
import { Redirect, Link } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../constants/validation";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import FloatLabel from "../Login/FloatLabel";
import "../Login/Login.scss"


export default ({ replaceAppUser }: { replaceAppUser: Function }) => {
  const roles = ROLES;
  const validationSchema = VALIDATION_SIGN_UP;
  const keyCaptcha = SERVER.CAPTCHA;
  const [message, setMessage] = useState({message: '', color: '#28C499'});
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [targetButton, setTargetButton] = useState('staff');
  const [organization, setOrganization] = useState(ROLES[0].options);
  const menu = (
    <Menu className="js-mm sign-menu">
      <label className="label-sg">{targetButton === 'staff' ? 'City' : targetButton === 'government_staff' ? 'Local Government' : 'Consultant/Contractor'}</label>
      {organization.map((organization: string, index: number) => {
        return <Menu.Item key={index} className="organization-items" onClick={() => {
          values.organization = organization;
          const auxTitle = organization;
          setTitle(auxTitle);
        }}>
          <span className="organization-items-text">
            {organization}
          </span>
        </Menu.Item>
      })}
    </Menu>);
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      designation: 'staff',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organization: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: { firstName: string, lastName: string, email: string, password: string, designation: string, organization: string, recaptcha: string }) {
      setTitle(title);
      datasets.postData(SERVER.SIGN_UP, values).then(res => {
        if (res?.token) {
          const auxMessage = {...message};
          auxMessage.message = 'Successful Registration';
          setMessage(auxMessage);
          localStorage.setItem('mfx-token', res.token);
          replaceAppUser(res.user);
          setRedirect(true);
        } else {
          const auxMessage = {...message};
          auxMessage.message = res.error;
          auxMessage.color = 'red';
          setMessage(auxMessage);
        }
      })
    }
  });
  if (redirect) {
    return <Redirect to="/profile-view" />
  }

  return <Layout style={{ background: '#fff' }}>
    <Row>
      <CarouselAutoPlayView />
      <Col span={11} className="login-hh">
        <div className="login-step01">
          <div>
            <Form style={{ width: '420px' }} className="login-form" onSubmit={handleSubmit} autoComplete="off">
              <h1>
                Sign Up!
              </h1>
              <Row style={{ marginTop: '20px' }}>
                <span className="loginLabels">Define your user role:</span>
                <Col className="signup">
                  {roles.map((role: { value: string, style: string, title: string, options: Array<string> }, index: number) => {
                    return <Button key={index} style={{ width: role.style }} className={targetButton === role.value ? 'button-dropdown' : ''} onClick={() => {
                      values.designation = role.value;
                      values.organization = '';
                      const auxTitle = role.value;
                      setTargetButton(role.value);
                      setOrganization(role.options);
                      setTitle(auxTitle);
                    }}>{role.title}</Button>
                  })}
                </Col>
              </Row>
                <FloatLabel label="First Name" name="firstname-label" value={values.firstName.length}>
                  <input type="password" style={{display: 'none'}}/>
                  <Input name="firstName" onChange={handleChange} 
                    style={(errors.firstName && touched.firstName) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} />
                </FloatLabel>
                <FloatLabel label="Last Name" name="lastname-label" value={values.lastName.length}>
                  <Input name="lastName" onChange={handleChange} 
                    style={(errors.lastName && touched.lastName) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} />
                </FloatLabel>
                <FloatLabel label="Email" name="email-label" value={values.email.length}>
                  <Input name="email" onChange={handleChange} 
                    style={(errors.email && touched.email) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                </FloatLabel>
                <div className="group btn-up" style={{margin: '10px 0px'}}>
                  {values.designation !== 'other' ? <div id="sign-up-organization">
                    <Dropdown overlay={menu} getPopupContainer={() => document.getElementById("sign-up-organization" ) as HTMLElement}>
                      <Button className={values.organization ? 'text-button-dropdown' : ''} style={(errors.organization && touched.organization) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} >
                        {values.organization ? values.organization : targetButton === 'staff' ? 'Organization' : targetButton === 'government_staff' ? 'Jurisdiction' : 'Consultant/Contractor'}
                        <img src="/Icons/icon-12.svg" alt="" />
                      </Button>
                  </Dropdown>
                  </div>
                   : (
                      <><input type="text"  name="organization" onChange={handleChange}
                        style={(errors.organization && touched.organization) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label  className={values.organization ? "login-field-top":"login-field-botton"}>Organization</label></>
                    )}
                </div>
                <div style={{marginBottom: '20px'}}>
                  <FloatLabel label="Password" name="password-label" value={values.password.length}>
                    <Input autoComplete="new-password" type="password" name="password" onChange={handleChange} 
                      style={(errors.password && touched.password) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                  </FloatLabel>
                </div>
                {/* <div className="group">
                  <input type="password" style={{display: 'none'}}/>
                  <input name="firstName" onChange={handleChange}
                    style={(errors.firstName && touched.firstName) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label className={values.firstName ? "login-field-top":"login-field-botton"}>First Name</label>
                </div>
                <div className="group">
                  <input name="lastName" onChange={handleChange}
                    style={(errors.lastName && touched.lastName) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}} />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label  className={values.lastName ? "login-field-top":"login-field-botton"} >Last Name</label>
                </div>
                <div className="group">
                  <input name="email" onChange={handleChange}
                    style={(errors.email && touched.email) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label  className={values.email ? "login-field-top":"login-field-botton"} >Email</label>
                </div>
                <div className="group">
                  <input type="password"  name="password" onChange={handleChange}
                    style={(errors.password && touched.password) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label  className={values.password ? "login-field-top":"login-field-botton"}>Password</label>
                </div>
                */}
              <ReCAPTCHA
                sitekey={"" + keyCaptcha}
                onChange={(event) => {
                  values.recaptcha = '' + (event !== 'null' ? event : '');
                }}
              />
              <div><br/>
                <span style={{color: message.color}}>&nbsp;&nbsp; {message.message}</span>
              </div>
              <Form.Item>
                <Button className="buttonLogin" block htmlType="submit" >
                  Sign Up
                </Button>
              </Form.Item>
              <div className="marbot-4" style={{textAlign: "center"}}>
                <span> I have an account</span>
                <Link to={'/login'} className="login-form-forgot">
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  </Layout>
}
