import React from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import LoginForm from './LoginForm';
import VersionNumber from './VersionNumber';
import ContinueAsGuest from './ContinueAsGuest';

const LoginLayout = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <CarouselAutoPlayView />
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <ContinueAsGuest />
            <LoginForm />
          </div>
          <VersionNumber />
        </Col>
      </Row>
    </Layout>
  )
};

export default LoginLayout;
