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
        <div>
        <Form style={{ width: '533px' }}  className="login-form">
      <h1>
          Reset your password
      </h1>
        <Row>
          <p>Enter a new password to reset the password for your account,<span> Shea Thomas</span></p>
        </Row>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>New Password</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Confirm New Password</label>
      </div>
      <Form.Item>
        <Button className="buttonLogin" block htmlType="submit">
            Set New Password
        </Button>
      </Form.Item>
      </Form>
        </div>

      </div>  
      </Col>
    </Row>    
        </Layout>
}