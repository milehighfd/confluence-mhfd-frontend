import * as React from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import { Carousel } from 'antd';

export default () => {
  return <Layout style={{ background: '#fff' }}>
    <Row>
      <Col span={13}>
      <Carousel autoplay>
            <div>
              <img src="icons/banner.png" alt=""/>
              <h3>1</h3>
            </div>
            <div>
            <img src="icons/banner.png" alt=""/>
              <h3>2</h3>
            </div>
            <div>
            <img src="icons/banner.png" alt=""/>
              <h3>3</h3>
            </div>
      </Carousel>        
      </Col>
      <Col span={11}>
      <div className="login-step01">
      <Row className="returnText">
          <Col span={12}>
          <Button shape="circle" icon="arrow-left" /><span>Back</span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
          <span>Continue as Guest</span><Button shape="circle" icon="arrow-right" />
          </Col>
      </Row>
      <Form style={{ width: '533px' }}  className="login-form">
      <h1>
        Welcome to MHFD's Confluence
      </h1>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email Address</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Enter Password</label>
      </div>
      <Form.Item>
        <span>Don’t have an account?</span>
          <a className="login-form-forgot" href="">
          Sign-Up
          </a>
          <a href="">Forgot Password?</a>
        <Button className="buttonLogin" block htmlType="submit">
            Login
        </Button>
      </Form.Item>
      </Form>
      </div>  
      </Col>
    </Row>    
        </Layout>
}