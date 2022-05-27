import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';

import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { useAppUserDispatch } from '../../../hook/useAppUser';
import { Redirect } from 'react-router-dom';

const ContinueAsGuest = () => {
  const {
    replaceAppUser,
    saveUserInformation
  } = useAppUserDispatch();
  const [redirect, setRedirect] = useState(false);

  const redirectGuest = () => {
    datasets.getData(SERVER.GUEST).then(async res => {
      if (res?.token) {
        localStorage.setItem('mfx-token', res.token);
        await datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
          replaceAppUser(result);
          saveUserInformation(result)
        });
        setRedirect(true);
      }
    })
  };

  if (redirect) {
    return <Redirect to="/map" />
  }

  return (
    <div>
      <Row className="returnText">
        <Col span={12}>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
          <Button onClick={() => redirectGuest()}>
            <label className="text-l">Continue as Guest</label> <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ContinueAsGuest;
