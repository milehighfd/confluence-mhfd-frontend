import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const DetailInformationProject = () => {
  const {detailed,} = useDetailedState();
  // const date = new Date(detailed?.start_date ? detailed?.start_date : '');
  // console.log( date, 'YEAR', detailed?.start_date)
  return (
    <>
      <h3 style={{marginBottom:'15px'}} id="project-basics">PROJECT BASICS</h3>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.streamname ? detailed?.streamname : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Start Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          {/* <p>{detailed && date.getFullYear()? date.getFullYear() : 'N/A'}</p> */}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p> 2025 (Projected)</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Managar</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>Jon Nelson</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>MHFD Managar</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p> Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>{detailed?.description ? detailed?.description : 'N/A'}</p>
        </Col>
      </Row>


      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="problem">PROBLEM</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Name</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>Improvements at Big Dry Creek (ARAPCO) and S University Blvd</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>High Priority</p>
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="vendors">VENDORS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Contractor</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{ detailed?.contractors && detailed?.contractors.length ? detailed?.contractors[0].business_associate.business_associate_name : 'N/A' }</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Consultant</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.consultants && detailed?.consultants.length ? detailed?.consultants[0].business_associate.business_associate_name : 'N/A' }</p>
        </Col>
      </Row>
    </>
  )
}

export default DetailInformationProject;