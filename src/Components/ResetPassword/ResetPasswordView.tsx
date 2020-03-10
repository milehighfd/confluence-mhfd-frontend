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
        <Form style={{ width: '420px' }}  className="login-form">
      <h1>
          Reset your password
      </h1>
        <Row className="resetText">
          <p>Enter your email address below and we’ll send you a link to reset your password.</p>
        </Row>
      <div className="group">
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>
      <Form.Item>
        <Button className="buttonLogin" block htmlType="submit">
            Send Password Reset Email
        </Button>
      </Form.Item>
      </Form>
      </div>
      </Col>
    </Row>
        </Layout>
}
