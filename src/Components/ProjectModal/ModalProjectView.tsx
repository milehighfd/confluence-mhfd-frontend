import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover } from 'antd';
import { useMapDispatch, useMapState } from "../../hook/mapHook";
import { ModalCapital } from "../Project/Capital/ModalCapital";
import { ModalAcquisition } from "../Project/Acquisition/ModalAcquisition";
import { ModalMaintenance } from "../Project/Maintenance/ModalMaintenance";
import { ModalSpecial } from "../Project/Special/ModalSpecial";
import { ModalStudy } from "../Project/Study/ModalStudy";

const stateValue = {
  visible: false
}
const content00 = (<div className="popver-info">Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>);
const content01 = (<div className="popver-info">Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>);
const content02 = (<div className="popver-info">Removal of accumulated sediment to maintain capacity in the system.</div>);
const content03 = (<div className="popver-info">Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>);
const content04 = (<div className="popver-info">Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>);


export const ModalProjectView = () => {
  const [state, setState] = useState(stateValue);
  const [visible, setVisible] = useState(false);
  const [visibleCapital, setVisibleCapital] = useState(false);
  const [visibleAcquisition, setVisibleAcquisition] = useState(false);
  const [visibleMaintenance, setVisibleMaintenance] = useState(false);
  const [visibleSpecial, setVisibleSpecial] = useState(false);
  const [visibleStudy, setVisibleStudy] = useState(false);
  const [typeProject, setTypeProyect] = useState("");
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
    if(typeProject === "Capital" ){
      setVisibleCapital(true);
      console.log("capitalModal");
    }
    if(typeProject === "Acquisition" ){
      setVisibleAcquisition(true);
      console.log("capitalModal");
    }
    if(typeProject === "Maintenance" ){
      setVisibleMaintenance(true);
      console.log("MaintenanceModal");
    }
    if(typeProject === "Special" ){
      setVisibleSpecial(true);
      console.log("capitalModal");
    }
    if(typeProject === "Study" ){
      setVisibleStudy(true);
      console.log("capitalModal");
    }
  };
  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };
  const chooseSubtypes = (e: any) => {
    setTypeProyect(e);
    if(e === "Capital"){
      console.log("capital");
      setVisible(false);
    }
    if(e === "Maintenance"){
      console.log("Maintenance");
      setVisible(true);
    }
    if(e === "Study"){
      console.log("Study");
      setVisible(false);
    }
    if(e === "Acquisition"){
      console.log("Acquisition");
      setVisible(false);
    }
    if(e === "Special"){
      console.log("Special");
      setVisible(false);
    }
  };
  return (
    <>
     {visibleCapital && <ModalCapital
      visibleCapital = {visibleCapital} 
      setVisibleCapital = {setVisibleCapital}
     />}
     {visibleAcquisition && <ModalAcquisition
      visibleAcquisition = {visibleAcquisition} 
      setVisibleAcquisition = {setVisibleAcquisition}
     />}
     {visibleMaintenance && <ModalMaintenance
      visibleMaintenance = {visibleMaintenance} 
      setVisibleMaintenance = {setVisibleMaintenance}
     />}
     {visibleSpecial && <ModalSpecial
      visibleSpecial = {visibleSpecial} 
      setVisibleSpecial = {setVisibleSpecial}
     />}
     {visibleStudy && <ModalStudy
      visibleStudy = {visibleStudy} 
      setVisibleStudy = {setVisibleStudy}
     />}
     
    <Button type="primary" onClick={showModal}>
       Open Modal
     </Button>
    
     <Modal
       title="Create Project"
       centered
       visible={state.visible}
       onOk={handleOk}
       onCancel={handleCancel}
       className="new-project"
       width="800px"
       footer={[
         <Button key="back" className="btn-borde" onClick={handleCancel}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" onClick={handleOk}>
           Next
         </Button>,
       ]}
     >
     {/*Name*/}
      <h4>Name</h4>
      <Input placeholder="Name your project" />
      <br/><br/>

      {/*Buttons*/}
      <h4>Choose a Project Type</h4>
      <Row gutter={[16, 16]} >
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes("Capital") }>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/capital.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Capital</h5>
              <p>Master planned improvements that increase conveyance or reduce flow.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes("Maintenance") }>
        <Button className="button-project">
          <div className="project-img">
            <img src="/Icons/project/maintenance.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Maintenance</h5>
            <p>Restore existing infrastructure eligible for MHFD participation.</p>
          </div>
        </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes("Study") }>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/study.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Study</h5>
              <p>Master plans that identify problems and recommend improvements.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes("Acquisition") }>
        <Button className="button-project">
          <div className="project-img">
            <img src="/Icons/project/acquisition.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Acquisition</h5>
            <p>Property with high flood risk or needed for improvements.</p>
          </div>
        </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes("Special") }>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/special.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Special</h5>
              <p>Any other effort for which MHFD funds or staff time is requested.</p>
            </div>
          </Button>
        </Col>
      </Row>
      <br/>

      {/*Buttons*/}
      {visible && <> <h4>Choose a Subtype</h4>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content00}><Button className="btn-opacity">Debris Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content01}><Button className="btn-opacity">Vegetation Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content02}><Button className="btn-opacity">Sediment Removal</Button></Popover>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content03}><Button className="btn-opacity">Minor Repairs</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content04}><Button className="btn-opacity">Restoration</Button></Popover>
        </Col>
      </Row></>}
      
     </Modal>
    </>
  );
}
