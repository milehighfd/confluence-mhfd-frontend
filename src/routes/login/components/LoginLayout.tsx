import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import LoginForm from './LoginForm';
import VersionNumber from './VersionNumber';

const LoginLayout = () => {
  const [visible, setVisible] = useState(false);
  const pageWidth  = document.documentElement.scrollWidth;
  console.log(pageWidth);
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        {pageWidth < 700 && <CarouselAutoPlayView />}
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <LoginForm />
          </div>
          <span className='hover-version' style={{ position: 'absolute', bottom: '15px', marginLeft: '10px', right: '10px' }} onClick={() => (setVisible(true))}>Release Notes</span>
          {visible && <VersionNumber visible={visible} setVisible={setVisible}/> }
        </Col>
        {pageWidth > 700 && <CarouselAutoPlayView />}
      </Row>
    </Layout>
  )
};

export default LoginLayout;
