import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, Menu, Dropdown } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { ROLES } from "../../constants/constants";
import { Redirect } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../constants/validation";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";

const roles = ROLES;
const validationSchema = VALIDATION_SIGN_UP;
const keyCaptcha = SERVER.CAPTCHA;
export default ({ replaceAppUser }: { replaceAppUser: Function }) => {
  const [message, setMessage] = useState({message: '', color: '#28C499'});
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [targetButton, setTargetButton] = useState('staff');
  const [organization, setOrganization] = useState(ROLES[0].options);
  const menu = (
    <Menu className="js-mm sign-menu">
      <label>CITY</label>
      {organization.map((organization: string, index: number) => {
        return <Menu.Item key={index} onClick={() => {
          values.organization = organization;
          const auxTitle = organization;
          setTitle(auxTitle);
        }}>
          <a target="_blank" rel="noopener noreferrer">
            {organization}
          </a>
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
      const result = datasets.postData(SERVER.SIGN_UP, values).then(res => {
        if (res?.token) {
          const auxMessage = {...message};
          auxMessage.message = 'Successful Registration';
          setMessage(auxMessage);
          localStorage.setItem('mfx-token', res.token);
          replaceAppUser(res.user);
          setRedirect(true);
        } else {
          const auxMessage = {...message};
          auxMessage.message = res.message;
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
            <Form style={{ width: '420px' }} className="login-form" onSubmit={handleSubmit}>
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
              <div className="group">
                <input type="text" name="firstName" onChange={handleChange}
                  style={(errors.firstName && touched.firstName) ? {border: "solid red 1px"}:{}}  />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label style={(values.firstName) ? {top: "-20px"}:{top: "10px"}}>First Name</label>
              </div>
              <div className="group">
                <input type="text"  name="lastName" onChange={handleChange}
                  style={(errors.lastName && touched.lastName) ? {border: "solid red 1px"}:{}} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label style={(values.lastName) ? {top: "-20px"}:{top: "10px"}}>Last Name</label>
              </div>
              <div className="group">
                <input type="email"  name="email" onChange={handleChange} 
                  style={(errors.email && touched.email) ? {border: "solid red 1px"}:{}}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label style={(values.email) ? {top: "-20px"}:{top: "10px"}}>Email</label>
              </div>
              <div className="group btn-up">
                {values.designation !== 'other' ? <Dropdown overlay={menu}>
                  <Button className={values.organization ? 'text-button-dropdown' : ''} style={(errors.organization && touched.organization) ? {border: "solid red 1px"}:{}} >
                    {values.organization ? values.organization : targetButton === 'staff' ? 'Organization' : targetButton === 'government_staff' ? 'Jurisdiction' : 'Consultant/Contractor'}
                    <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown> : (
                    <><input type="text"  name="organization" onChange={handleChange} 
                      style={(errors.organization && touched.organization) ? {border: "solid red 1px"}:{}}/>
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label style={(values.organization) ? {top: "-20px"}:{top: "10px"}}>Organization</label></>
                  )}
              </div>
              <div className="group">
                <input type="password"  name="password" onChange={handleChange} 
                  style={(errors.password && touched.password) ? {border: "solid red 1px"}:{}}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label style={(values.password) ? {top: "-20px"}:{top: "10px"}}>Password</label>
              </div>
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
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  </Layout>
}
