import * as React from "react";
import { Layout, Row, Col, Form, Icon, Input, Button, Menu, Dropdown } from 'antd';
import { Carousel } from 'antd';

const menu = (
  <Menu className="js-mm">
    <label>CITY</label>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Adams
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Araphoe
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Aurora
      </a>
    </Menu.Item>
  </Menu>
);

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
      <Col span={11} className="login-hh">
      <div className="login-step01">
        <div>
        <Form style={{ width: '420px' }}  className="login-form">
      <h1>
        Sign Up!
      </h1>
        <Row style={{ marginTop: '20px' }}>
        <span className="loginLabels">Define your user role:</span>
          <Col className="signup">
          <Button style={{ width: '80px' }}>MHFD Staff</Button>
          <Button style={{ width: '115px' }}>Consultant / Contractor</Button>
          <Button style={{ width: '117px' }}>Local Government</Button>
          <Button style={{ width: '80px' }}>Other</Button>
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
      <div className="group btn-up">
        <Dropdown overlay={menu}>
          <Button>
            Jurisdiction <img src="/Icons/icon-12.svg" alt=""/>
          </Button>
        </Dropdown>
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
