import React, { useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";

const Roadmap = () => {
  const [timeOpen, setTimeOpen] = useState(true);
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="project-roadmap">PROJECT ROADMAP</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="roadmap-detail-modal">
          <img src="/picture/calendar.png" width='100%'/>
          </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="graphical-view">GRAPHICAL VIEW</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="roadmap-detail-modal">
          <div style={{color: '#11093C'}}>
            <span className={timeOpen ? "span-roadmap-active" :"span-roadmap"} onClick={()=>{setTimeOpen(true)}}>
              By Time</span> | <span className={!timeOpen ? "span-roadmap-active" :"span-roadmap"} onClick={()=>{setTimeOpen(false)}}>By Phase</span>
          </div>
          {timeOpen ? (
            <>
              <img src="/picture/time-graft.png" width='100%'/>
            </>
            
          ): (<img src="/picture/phase.png" width='100%'/>)}
        </Col>
      </Row>
    </>
  )
}

export default Roadmap;