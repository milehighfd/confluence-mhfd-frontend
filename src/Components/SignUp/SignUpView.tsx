import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, Menu, Dropdown } from 'antd';
import { Carousel } from 'antd';
import { CITIES } from "../../constants/constants";
import { Redirect } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../constants/validation";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";

const roles = [
  { title: 'MHFD Staff', style: '80px', value: 'staff'},
  { title: 'Consultant / Contractor', style: '115px', value: 'consultant'},
  { title: 'Local Government', style: '117px', value: 'government_staff'},
  { title: 'Other', style: '80px', value: 'other'}
]

const validationSchema = VALIDATION_SIGN_UP;
export default () => {

  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const menu = (
    <Menu className="js-mm sign-menu">
      <label>CITY</label>
      {CITIES.map((city: string, index: number) => {
        return <Menu.Item key={index} onClick={() => {
          values.city = city;
          const auxTitle = city;
          setTitle(auxTitle);
        }}>
          <a target="_blank" rel="noopener noreferrer">
            {city}
          </a>
        </Menu.Item>
      })}
    </Menu>);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      designation: '',
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      password: ''
    },
    validationSchema,
    onSubmit(values: {firstName: string, lastName: string, email: string, city: string, password: string, designation: string, }) {
      const result = datasets.postData(SERVER.USER, values).then(res => {
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
            {roles.map((role: {value: string, style: string, title: string}, index: number) => {
              return <Button key={index} style={{ width: role.style }} onClick={() => {
                values.designation = role.value;
                const auxTitle = role.value;
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
        <Dropdown overlay={menu}>
          <Button>
            {values.city ? values.city : 'Jurisdiction'} <img src="/Icons/icon-12.svg" alt=""/>
          </Button>
        </Dropdown>
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
