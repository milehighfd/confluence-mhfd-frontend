import React, { useState } from 'react';
import { Button, Col, Input, Row } from "antd";
import { CloseCircleFilled } from '@ant-design/icons';

const EditAmountCreateProject = ({
  index,
  type,
}:{
  index: number,
  type: string,
}) => {
  console.log(type, 'TYPE')
  return (
    <div>
    <div className="sub-title-project">
      <h5 className="requestor-information">{index}. Edit Amount </h5>
    </div>
    <p>How much funding from MHFD is being requested for the following years:</p>
      <b>Total Requested Funding: $0</b>
      <br/>
      <b>Estimated Project Cost: $0</b>
    <Row className="cost-project">
      <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 12 }}>
      <label className="sub-title">2021 </label>
      <Input className='input-amount' value='$' allowClear/> 
      </Col>
    </Row>
    <Row className="cost-project">
      <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 12 }}>
      <label className="sub-title">2022 </label>
      <Input className='input-amount' value='$' allowClear /> 
      </Col>
    </Row>
    <Row className="cost-project">
      <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 12 }}>
      <label className="sub-title">2023 </label>
      <Input className='input-amount' value='$' allowClear/> 
      </Col>
    </Row>
    {type !== 'maintenance' && <>
      <Row className="cost-project">
        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 12 }}>
        <label className="sub-title">2024 </label>
        <Input className='input-amount' value='$' allowClear/> 
        </Col>
      </Row>
      <Row className="cost-project">
        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 12 }}>
        <label className="sub-title">2025 </label>
        <Input className='input-amount' value='$' allowClear/> 
        </Col>
      </Row>
    </>}
  </div>
  )
};

export default EditAmountCreateProject;