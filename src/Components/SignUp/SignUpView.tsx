import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, Menu, Dropdown } from 'antd';
import { Carousel } from 'antd';
import { ROLES } from "../../constants/constants";
import { Redirect } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../constants/validation";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";

const roles = ROLES;
const validationSchema = VALIDATION_SIGN_UP;
export default () => {

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
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      designation: 'staff',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organization: ''
    },
    validationSchema,
    onSubmit(values: {firstName: string, lastName: string, email: string, password: string, designation: string, organization: string}) {
      const result = datasets.postData(SERVER.SIGN_UP, values).then(res => {
        if(res?.token) {
          localStorage.setItem('mfx-token', res.token);
          setRedirect(true);
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
        <Form style={{ width: '420px' }}  className="login-form" onSubmit={handleSubmit}>
      <h1>
        Sign Up!
      </h1>
        <Row style={{ marginTop: '20px' }}>
        <span className="loginLabels">Define your user role:</span>
          <Col className="signup">
            {roles.map((role: {value: string, style: string, title: string, options: Array<string>}, index: number) => {
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
        <input type="text" required name="firstName" onChange={handleChange}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>First Name</label>
      </div>
      <div className="group">
        <input type="text" required name="lastName" onChange={handleChange} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Last Name</label>
      </div>
      <div className="group">
        <input type="email" required name="email" onChange={handleChange}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>
      <div className="group btn-up">
        {values.designation !== 'other' ? <Dropdown overlay={menu}>
          <Button className={values.organization ? 'text-button-dropdown' : ''}>
            {values.organization ? values.organization : targetButton === 'staff' ? 'Organization' : targetButton === 'government_staff' ? 'Jurisdiction' : 'Consultant/Contractor'} 
            <img src="/Icons/icon-12.svg" alt=""/>
          </Button>
        </Dropdown> : (
          <><input type="text" required name="organization" onChange={handleChange}/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Organization</label></>
        )}
      </div>
      <div className="group">
        <input type="password" required name="password" onChange={handleChange} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Password</label>
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
