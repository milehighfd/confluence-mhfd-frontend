import React from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import PreSignUp from './PreSignUp';

const PreSignUpLayout = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <PreSignUp />
          </div>
        </Col>
        <CarouselAutoPlayView />
      </Row>
    </Layout>
  )
};

export default PreSignUpLayout;
