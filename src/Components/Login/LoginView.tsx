import * as React from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import { Carousel } from 'antd';

export default () => {
  return <Layout style={{ background: '#fff' }}>
    <Row>
      <Col span={13}>
          <div className="logo-white" 
              style={{backgroundImage: 'url(Icons/logo-white.svg)'}}>
              <p>Protecting People, Property, and our Environment.</p>
          </div>
          <div className="contact01">
              <div className="icons-list">
                <Icon type="twitter"/>
                <Icon type="facebook" />
                <Icon type="linkedin" />
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
      <div className="line-social">
        <h2>
          <span>or</span>
        </h2>
      </div>
      <div className="social-login">
        <Button className="button-social" block htmlType="submit">
        <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="18px" /><span></span> Login with Google
        </Button>
        <Button className="button-social" block htmlType="submit">
            <span></span> Login with Microsoft
        </Button>
      </div>
      </Form>
      </div>
      </Col>
    </Row>
        </Layout>
}
