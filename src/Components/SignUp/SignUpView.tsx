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
        <Form style={{ width: '533px' }}  className="login-form">
      <h1>
        Sign Up!
      </h1>
        <Row style={{ marginTop: '20px' }}>
        <span className="loginLabels">Define your user role:</span>
          <Col className="signup">
          <Button style={{ width: '104px' }}>MHFD Staff</Button>
          <Button style={{ width: '140px' }}>Consultant / Contractor</Button>
          <Button style={{ width: '149px' }}>Local Government</Button>
          <Button style={{ width: '100px' }}>Other</Button>
          </Col>
        </Row>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>First Name</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Last Name</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Jurisdiction</label>
      </div>
      <div className="group">      
        <input type="text" required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Password</label>
      </div>
      <Form.Item>
        <Button className="buttonLogin" block htmlType="submit">
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