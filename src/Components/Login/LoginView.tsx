import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, } from 'antd';
import { Carousel } from 'antd';
import { useFormik } from "formik";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";
import { Redirect, Link } from "react-router-dom";

const url2 = process.env.REACT_APP_API_URI;

export default ({replaceAppUser}: {replaceAppUser: Function}) => {
  const [redirect, setRedirect] = useState(false);
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit(values: {email: string, password: string}) {
      const result = datasets.postData(SERVER.LOGIN, values).then(res => {
        if(res?.token) {
          localStorage.setItem('mfx-token', res.token);
          setRedirect(true);
          replaceAppUser({
            name: res.userResult.name,
            email: res.userResult.email,
            designation: res.userResult.designation
          })
        }
      })
    }
  })

  if(redirect) {
    return <Redirect to="/profile-view" />
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
              <img src="/Icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/Icons/banner.png" alt=""/>
             <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
            <div>
            <img src="/Icons/banner.png" alt=""/>
              <div className="textContent">
                <h2>What can I do with Confluence?</h2>
                <h5>Check Project Status, Submit Work Request, Explore your Streams.</h5>
              </div>
            </div>
      </Carousel>
      </Col>
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
        <input name="email" type="email" required onChange={handleChange} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email Address</label>
      </div>
      <div className="group">
        <input name="password" type="password" required  onChange={handleChange}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Enter Password</label>
      </div>
      <div className="marbot-4">
        <span>Don’t have an account?</span>
        <Link to={'/sign-up'}>
          <a className="login-form-forgot">
          Sign-Up
          </a>
        </Link>
          <a href="" style={{ float: 'right', color: '#11093C'}}>Forgot Password?</a>
      </div>
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
