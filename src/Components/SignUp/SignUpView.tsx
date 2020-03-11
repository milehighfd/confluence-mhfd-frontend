import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, Menu, Dropdown } from 'antd';
import { Carousel } from 'antd';
import { CITIES } from "../../constants/constants";
import { Redirect } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets"

const signUp = {
  designation: '',
  firstName: '',
  lastName: '',
  email: '',
  city: 'Jurisdiction',
  password: ''
}

const roles = [
  { value: 'MHFD Staff', style: '80px'},
  { value: 'Consultant / Contractor', style: '115px'},
  { value: 'Local Government', style: '117px'},
  { value: 'Other', style: '80px'}
]


export default () => {

  const [sign, setSign] = useState(Object.assign(signUp));
  const [redirect, setRedirect] = useState(false);
  const menu = (
    <Menu className="js-mm sign-menu">
      <label>CITY</label>
      {CITIES.map((city: string, index: number) => {
        return <Menu.Item key={index} onClick={() => {
          const auxSignUp = {...sign};
          auxSignUp.city = city;
          setSign(auxSignUp);
        }}>
          <a target="_blank" rel="noopener noreferrer">
            {city}
          </a>
        </Menu.Item>
      })}
    </Menu>);
  
  const submit = () => {
    const result = datasets.postData(SERVER.USER, sign).then(res => {
      if(res?.token) {
        localStorage.setItem('mfx-token', res.token);
        setRedirect(true);
      }
    })
  }
  if (redirect) {
    return <Redirect to="/login" />
  }

  return <Layout style={{ background: '#fff' }}>
    <Row>
      <Col span={13}>
          <div className="logo-white"
              style={{backgroundImage: 'url(Icons/logo-white.svg)'}}>
              <p>Protecting People, Property, and our Environment.</p>
          </div>
          <div className="contact01">
              <div className="icons-list">
                <a href=""><img className="anticon" src="/Icons/twitter.svg" alt="" height="14px" /></a>
                <a href=""><img className="anticon" src="/Icons/facebook.svg" alt="" height="14px" /></a>
                <a href=""><img className="anticon" src="/Icons/link.svg" alt="" height="14px" /></a>
              </div>
              <div className="social01">
                <ul>
                  <li><a href="">Contact</a></li>
                  <span>|</span>
                  <li><a href="">©2020 Mile High Flood District</a></li>
                  <span>|</span>
                  <li><a href="">Privacy Policy</a></li>
                </ul>
              </div>
          </div>
      <Carousel autoplay>
            <div>
              <img src="/icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/icons/banner.png" alt=""/>
             <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
      </Carousel>
      </Col>
      <Col span={11} className="login-hh">
      <div className="login-step01">
        <div>
        <Form style={{ width: '420px' }}  className="login-form">
      <h1>
        Sign Up!
      </h1>
        <Row style={{ marginTop: '20px' }}>
        <span className="loginLabels">Define your user role:</span>
          <Col className="signup">
            {roles.map((role: {value: string, style: string}, index: number) => {
              return <Button key={index} style={{ width: role.style }} onClick={() => {
                const auxSignUp = {...sign};
                auxSignUp.designation = role.value;
                setSign(auxSignUp);
              }}>{role.value}</Button>
            })}
          </Col>
        </Row>
      <div className="group">
        <input value={sign.firstName} type="text" required onChange={(event) => {
          const auxSignUp = {...sign};
          auxSignUp.firstName = event.target.value;
          setSign(auxSignUp);
        }} style={sign.firstName ? {background: 'red'}: undefined}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>First Name</label>
      </div>
      <div className="group">
        <input value={sign.lastName} type="text" required onChange={(event) => {
          const auxSignUp = {...sign};
          auxSignUp.lastName = event.target.value;
          setSign(auxSignUp);
        }} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Last Name</label>
      </div>
      <div className="group">
        <input value={sign.email} type="email" required onChange={(event) => {
          const auxSignUp = {...sign};
          auxSignUp.email = event.target.value;
          setSign(auxSignUp);
        }} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>
      <div className="group btn-up">
        <Dropdown overlay={menu}>
          <Button>
            {sign.city} <img src="/Icons/icon-12.svg" alt=""/>
          </Button>
        </Dropdown>
      </div>
      <div className="group">
        <input value={sign.password} type="password" required onChange={(event) => {
          const auxSignUp = {...sign};
          auxSignUp.password = event.target.value;
          setSign(auxSignUp);
        }} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Password</label>
      </div>
      <Form.Item>
        <Button className="buttonLogin" block htmlType="submit" onClick={() => {
          if (sign.city !== 'Jurisdiction') {
            submit();
          }
          return;
        }}>
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
