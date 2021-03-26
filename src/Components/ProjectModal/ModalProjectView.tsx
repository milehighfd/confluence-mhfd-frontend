import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover } from 'antd';
import { useMapDispatch, useMapState } from "../../hook/mapHook";
import { ModalCapital } from "../Project/Capital/ModalCapital";
import { ModalAcquisition } from "../Project/Acquisition/ModalAcquisition";
import { ModalMaintenance } from "../Project/Maintenance/ModalMaintenance";
import { ModalSpecial } from "../Project/Special/ModalSpecial";
import { ModalStudy } from "../Project/Study/ModalStudy";
import { buttonsNewProject, FILTER_TYPES, NEW_PROJECT_TYPES } from "../../constants/constants";
import { createJsxAttribute } from "typescript";
import { AlertViewSave } from "../Alerts/AlertViewSave";
import { setSave } from "../../store/actions/ProjectActions";
import { useProjectDispatch } from "../../hook/projectHook";


const content00 = (<div className="popver-info">Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>);
const content01 = (<div className="popver-info">Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>);
const content02 = (<div className="popver-info">Removal of accumulated sediment to maintain capacity in the system.</div>);
const content03 = (<div className="popver-info">Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>);
const content04 = (<div className="popver-info">Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>);


export const ModalProjectView = ({visible, setVisible, data, template }: 
  {visible: boolean, setVisible: Function, data: any, template?: any}) => {
  const {setSave} = useProjectDispatch();
  const [typeProject, setTypeProyect] = useState('');
  const [subType, setSubType] = useState('');
  const [disable, setDisable] = useState(true);
  const [nameProject, setNameProject] = useState('');
 const [visibleSubType, setVisibleSubType] = useState(false);
  const [visibleModal, setVisibleModal] = useState(visible)
  const [visibleCapital, setVisibleCapital] = useState(false);
  const [visibleAcquisition, setVisibleAcquisition] = useState(false);
  const [visibleMaintenance, setVisibleMaintenance] = useState(false);
  const [visibleSpecial, setVisibleSpecial] = useState(false);
  const [visibleStudy, setVisibleStudy] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
    setNameProject('');
  };
  const handleOk = (e: any) => {  
    if(typeProject === NEW_PROJECT_TYPES.Capital ){
      console.log("capi")
      setVisibleCapital(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Acquisition ){
      setVisibleAcquisition(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Maintenance && subType !== '' ){
      setVisibleMaintenance(true);
    }
    if(typeProject ===  NEW_PROJECT_TYPES.Special ){
      setVisibleSpecial(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Study ){
      setVisibleStudy(true);
    }
    setDisable(true);
    setVisibleModal(false);
    setVisibleSubType(false);
  };
  const onChange = (e: any)=>{
    setNameProject(e.target.value);
    if(typeProject !== ''){
      if(typeProject === NEW_PROJECT_TYPES.Maintenance){
        if(subType !== ''){
          setDisable(false);
        }
      }
      else{
        setDisable(false);
      }
    }
  };
  const subTypeProject = (e: any) =>{
    setSubType(e);
    if(nameProject !== ''){
      setDisable(false);    
    }
  };
  const handleCancel = (e: any) => {
    setVisibleModal(false);
    setVisible(false);
  };
  const chooseSubtypes = (e: any) => {
    setTypeProyect(e);
    if(e === NEW_PROJECT_TYPES.Maintenance){
      setVisibleSubType(true);
    }
    else{
      if(nameProject !== '' ){
        setDisable(false);
        setVisibleSubType(false);
      }
     setVisibleSubType(false);
      setSubType('')
    }
  };
  return (
    <>
     {visibleCapital && <ModalCapital
      visibleCapital = {visibleCapital} 
      setVisibleCapital = {setVisibleCapital}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
     />}
     {visibleAcquisition && <ModalAcquisition
      visibleAcquisition = {visibleAcquisition} 
      setVisibleAcquisition = {setVisibleAcquisition}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
     />}
     {visibleMaintenance && <ModalMaintenance
      visibleMaintenance = {visibleMaintenance} 
      setVisibleMaintenance = {setVisibleMaintenance}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      subType = {subType}
      typeProject = {typeProject}
      setVisible = {setVisible}
     />}
     {visibleSpecial && <ModalSpecial
      visibleSpecial = {visibleSpecial} 
      setVisibleSpecial = {setVisibleSpecial}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
     />}
     {visibleStudy && <ModalStudy
      visibleStudy = {visibleStudy} 
      setVisibleStudy = {setVisibleStudy}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
     />}
     {/*<Button show modal */}
     {/*<Button type="primary" onClick={showModal}>
       Open Modal
     </Button>*/}
     {visibleModal && <Modal
       title="Create Project"
       centered
       visible={visibleModal}
       onOk={handleOk}
       onCancel={handleCancel}
       className="new-project"
       width="800px"
       footer={[
         <Button key="back" className="btn-borde" onClick={handleCancel}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" disabled={disable} onClick={handleOk}>
           Next
         </Button>,
       ]}
     >
     {/*Name*/}
      <h4>Name</h4>
      <Input placeholder="Name your project" onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />
      <br/><br/>
      {/*Buttons*/}
      <h4>Choose a Project Type</h4>
      <Row gutter={[16, 16]} >
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Capital) }>
          <Button className={typeProject===NEW_PROJECT_TYPES.Capital?"button-project button-project-active" : "button-project" } >
            <div className="project-img">
              <img src="/Icons/project/capital.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Capital</h5>
              <p>Master planned improvements that increase conveyance or reduce flow.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Maintenance) }>
        <Button className={typeProject===NEW_PROJECT_TYPES.Maintenance?"button-project button-project-active" : "button-project" }>
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
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Study) }>
          <Button className={typeProject===NEW_PROJECT_TYPES.Study?"button-project button-project-active" : "button-project" } >
            <div className="project-img">
              <img src="/Icons/project/study.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Study</h5>
              <p>Master plans that identify problems and recommend improvements.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Acquisition) }>
        <Button className={typeProject===NEW_PROJECT_TYPES.Acquisition?"button-project button-project-active" : "button-project" }>
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
        <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Special) }>
          <Button className={typeProject===NEW_PROJECT_TYPES.Special?"button-project button-project-active" : "button-project" }>
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
      {visibleSubType && <> <h4>Choose a Subtype</h4>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management)} >
          <Popover content={content00} ><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management? "btn-opacity-active btn-opacity" : "btn-opacity"}>Debris Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management)} >
          <Popover content={content01}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management? "btn-opacity-active btn-opacity" : "btn-opacity"}>Vegetation Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal)}>
          <Popover content={content02}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal? "btn-opacity-active btn-opacity" : "btn-opacity"}>Sediment Removal</Button></Popover>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs)}>
          <Popover content={content03}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs? "btn-opacity-active btn-opacity" : "btn-opacity"}>Minor Repairs</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration)} >
          <Popover content={content04}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration? "btn-opacity-active btn-opacity" : "btn-opacity"}>Restoration</Button></Popover>
        </Col>
      </Row></>}
      
     </Modal>}
    </>
  );
}
