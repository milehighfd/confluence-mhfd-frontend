import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { Redirect } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackButton = () => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Row className="returnText">
        <Col span={12}>
          <Button onClick={() => setRedirect(true)}>
            <ArrowLeftOutlined />
            <span className="respo-tt">Back</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BackButton;
