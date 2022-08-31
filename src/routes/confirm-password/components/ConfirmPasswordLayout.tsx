import React from 'react';
import { Col, Layout, Row } from 'antd';
import CarouselAutoPlayView from '../../../Components/Shared/CarouselAutoPlay/CarouselAutoPlayView';
import ConfirmPasswordForm from './ConfirmPasswordForm';

const ConfirmPasswordLayout = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Row>
        <CarouselAutoPlayView />
        <Col span={11} className="login-hh">
          <div className="login-step01" id="login-form">
            <ConfirmPasswordForm />
          </div>
        </Col>
      </Row>
    </Layout>
  )
};

export default ConfirmPasswordLayout;
