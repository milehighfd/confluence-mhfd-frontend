import React from 'react';
import { Layout, Row, Col } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import ResetPasswordForm from './ResetPasswordForm';
import BackButton from './BackButton';

const ResetPasswordLayout = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 11 }} className="login-hh">
          <div className="login-step01" id="login-form">
            <BackButton />
            <ResetPasswordForm />
          </div>
        </Col>
        <CarouselAutoPlayView />
      </Row>
    </Layout>
  )
};

export default ResetPasswordLayout;
