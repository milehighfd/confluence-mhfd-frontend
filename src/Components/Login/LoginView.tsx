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
      <Form style={{ width: '533px' }}  className="login-form">
      <h1>
        Welcome to MHFD's Confluence
      </h1>
      <Form.Item>
        <Input placeholder="Email Adress"/>
      </Form.Item>
      <Form.Item>
        <Input placeholder="Password"/>
      </Form.Item>
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