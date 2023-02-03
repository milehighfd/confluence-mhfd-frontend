import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";

const DetailInformationProject = () => {
  const {detailed,} = useDetailedState();
  const capitalizeWords = (str:any) =>{
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
  const date = detailed?.start_date ? new Date(detailed?.start_date) : new Date();
  const dateComplete = detailed?.end_date ? new Date(detailed?.end_date) : new Date();  
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
          <p>{detailed?.start_date ? (date.getFullYear() ? date.getFullYear() : 'N/A') : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.end_date ? (dateComplete.getFullYear() ? `${dateComplete.getFullYear()} (Projected)` : 'N/A') : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Manager</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.lgmanager ? detailed.lgmanager : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>MHFD Manager</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.mhfdmanager ? detailed.mhfdmanager : 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Description</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
          <p>lgmanager</p>
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
          <p>{detailed?.problems?.name ? detailed?.problems.name : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.problems?.priority ? detailed?.problems.priorit : 'N/A'}</p>
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
          <p>{detailed?.consultants && detailed?.consultants.length ? capitalizeWords(detailed?.consultants[0].business_associate.business_associate_name) : 'N/A' }</p>
        </Col>
      </Row>
    </>
  )
}

export default DetailInformationProject;