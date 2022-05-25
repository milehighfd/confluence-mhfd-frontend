import React from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import SignUpForm from './SignUpForm';

const SignUpLayout = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <CarouselAutoPlayView />
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <SignUpForm />
          </div>
        </Col>
      </Row>
    </Layout>
  )
};

export default SignUpLayout;
