import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const DetailInformationProblem = () => {
  const {detailed,} = useDetailedState();
  return (
    <>
      {/* <h3 style={{marginBottom:'15px'}} id="project-basics">PROBLEM BASICS</h3> */}
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.streamname ? detailed?.streamname : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}}>
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}}>
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
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}}>
          <label><i>Source</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}}>
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