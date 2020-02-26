import * as React from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import { Carousel } from 'antd';

export default () => {
  return <Layout style={{ background: '#fff' }}>
    <Row>
      <Col span={13}>
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
      <Col span={11}>
      <div className="login-step01">
        <div>
        <Row className="returnText">
          <Col span={12}>
          <Button shape="circle" icon="arrow-left" /><span>Back</span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
          <span>Continue as Guest</span><Button shape="circle" icon="arrow-right" />
          </Col>
        </Row>
        </div>
        <Form style={{ width: '533px' }}  className="login-form">
      <h1>
        Welcome to MHFD's Confluence
      </h1>
      <div style={{ marginTop: '50px' }}>
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
      <div className="marbot-4">
        <span>Don’t have an account?</span>
          <a className="login-form-forgot" href="">
          Sign-Up
          </a>
          <a href="" style={{ float: 'right', color: '#11093C'}}>Forgot Password?</a>
      </div>
        <Button className="buttonLogin" block htmlType="submit">
            Login
        </Button>
      </div>
      </Form>
      </div>  
      </Col>
    </Row>    
        </Layout>
}