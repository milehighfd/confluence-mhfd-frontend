import React from 'react';
import { Col, Row } from 'antd';
import { useDetailedState } from 'hook/detailedHook';

const DetailInformationProblem = () => {
  const {detailed,} = useDetailedState();
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.streamname ? detailed?.streamname : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}} className="mobile-padding">
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}} className="mobile-padding">
          <p>N/A</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Source Name</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.sourcename ? detailed?.sourcename : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}} className="mobile-padding">
          <label><i>Source</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}} className="mobile-padding">
          <p>{detailed?.source ? detailed?.source : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>{detailed?.problemdescription ? detailed?.problemdescription : 'N/A'}</p>
        </Col>
      </Row>
    </>
  )
}

export default DetailInformationProblem;
