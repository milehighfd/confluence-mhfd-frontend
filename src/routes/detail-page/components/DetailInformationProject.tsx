import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { useDetailedState } from "hook/detailedHook";
import { getStreams } from '../../../utils/parsers';

const DetailInformationProject = () => {
  const {detailed,} = useDetailedState();
  const capitalizeWords = (str:any) =>{
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  } 
  const mhfdManager = detailed?.project_staffs ? detailed?.project_staffs?.find((obj:any) => obj.code_project_staff_role_type_id === 1)?.business_associate_contact?.user?.name : null
  const lgManager = detailed?.project_staffs ? detailed?.project_staffs.find((obj:any) => obj.code_project_staff_role_type_id === 10)?.business_associate_contact?.user?.name : null
  const date = detailed?.start_date ? new Date(detailed?.start_date) : new Date();
  const dateComplete = detailed?.end_date ? new Date(detailed?.end_date) : new Date();  
  const streamList = getStreams(detailed?.project_streams || []).join(' , ');
  return (
    <>
      <h3 style={{marginBottom:'15px'}} id="project-basics">PROJECT BASICS</h3>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Stream</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{streamList || 'N/A'}</p>
        </Col>
      </Row>
      {/* <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>Start Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{detailed?.start_date ? (date.getFullYear() ? date.getFullYear() : 'N/A') : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}}>
          <label><i>Completed Year</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}}>
          <p>{detailed?.end_date ? (dateComplete.getFullYear() ? `${dateComplete.getFullYear()} (Projected)` : 'N/A') : 'N/A'}</p>
        </Col>
      </Row> */}
      <Row>
      <Col xs={{ span: 24 }} lg={{ span: 4 }} >
          <label><i>Project Number</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} >
          <p>{detailed?.project_id ? detailed?.project_id : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <label><i>OnBase Project Number</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <p>{detailed?.onbase_project_number ? detailed?.onbase_project_number : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <label><i>LG Lead</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>{lgManager ? lgManager : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <label><i>MHFD Lead</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          <p>{mhfdManager ? mhfdManager : 'N/A'}</p>
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


      {/* <Row>
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
          <p>{detailed?.problems?.length > 0  && detailed?.problems[0]?.problemname ? detailed?.problems[0]?.problemname : 'N/A'}</p>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}}>
          <label><i>Priority</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}}>
          <p>{detailed?.problems?.length > 0 && detailed?.problems[0]?.problempriority ? detailed?.problems[0]?.problempriority : 'N/A'}</p>
        </Col>
      </Row> */}

      {/* <Row>
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
        <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{paddingLeft:'10px'}}>
          <label><i>Consultant</i></label>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'10px'}}>
          <p>{detailed?.consultants && detailed?.consultants.length ? capitalizeWords(detailed?.consultants[0].business_associate.business_associate_name) : 'N/A' }</p>
        </Col>
      </Row> */}
    </>
  )
}

export default DetailInformationProject;