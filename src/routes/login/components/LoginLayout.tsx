import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import LoginForm from './LoginForm';
import VersionNumber from './VersionNumber';
import ContinueAsGuest from './ContinueAsGuest';

const LoginLayout = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <CarouselAutoPlayView />
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <ContinueAsGuest />
            <LoginForm />
          </div>
          <span className='hover-version' style={{ position: 'absolute', bottom: '5px', marginLeft: '10px' }} onClick={() => (setVisible(true))}>Release Notes</span>
          {visible && <VersionNumber visible={visible} setVisible={setVisible}/> }
        </Col>
      </Row>
    </Layout>
  )
};

export default LoginLayout;
