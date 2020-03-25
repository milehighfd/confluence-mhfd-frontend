import React, { useState } from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, } from 'antd';
import { Carousel } from 'antd';
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import { Redirect } from "react-router-dom";

export default () => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/login" />
  }
  return <Layout style={{ background: '#fff' }}>
    <Row>
    <CarouselAutoPlayView />
      <Col span={11} className="login-hh">
      <div className="login-step01">
        <div>
        <Row className="returnText">
          <Col span={12}>
          <Button shape="circle" icon="arrow-left" onClick={ () => setRedirect(true)} /><span>Back</span>
          </Col>
          {/* <Col span={12} style={{ textAlign: 'right' }}>
          <span>Continue as Guest</span><Button shape="circle" icon="arrow-right" />
          </Col> */}
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
