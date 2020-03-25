import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, } from 'antd';
import { Carousel } from 'antd';
import { useFormik } from "formik";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";
import { Redirect, Link } from "react-router-dom";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";

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
          datasets.getData(SERVER.ME, datasets.getToken()).then(result => {
            replaceAppUser(result);
          });
        }
      })
    }
  })

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
        <Link to={'/reset-password'}>
          <a href="" style={{ float: 'right', color: '#11093C'}}>Forgot Password?</a>
        </Link> 
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
