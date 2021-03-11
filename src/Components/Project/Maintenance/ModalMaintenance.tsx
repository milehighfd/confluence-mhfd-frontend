import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline, Switch } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { NEW_PROJECT_TYPES, PROJECT_INFORMATION } from "../../../constants/constants";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info"> Projects that repair or restore existing infrastructure and are eligible for MHFD participation.</div>);
const content00 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"><b>Frequency:</b> The number of times per year the maintenance activity should be done.</div>);
const content04 = (<div className="popver-info"><b>Access Control:</b> Is any part of the project on private property without an easement?</div>);
const content05 = (<div className="popver-info"><b>Maintenance Eligibility:</b> The maintenance eligibility status for the project. </div>);
const content06 = (<div className="popver-info"></div>);
const content07 = (<div className="popver-info"></div>);
const content08 = (<div className="popver-info"></div>);
const selec = ['None'];
for(var i = 1 ; i < 13 ; i++){
  selec.push(''+i);
}
const stateValue = {
  visibleMaintenance: false
}

export const ModalMaintenance = ({visibleMaintenance, setVisibleMaintenance, nameProject, setNameProject, subType, typeProject}:
  {visibleMaintenance: boolean, setVisibleMaintenance: Function, nameProject: string , setNameProject: Function, subType:string, typeProject:string }) => {
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(false);
  const [serviceArea, setServiceArea] = useState('');
  const [country, setCountry] = useState('');
  const [frequency, setFrequency] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [visibleEligibility, setVisibleEligibility] = useState(false);

  const showModal = () => {
    const auxState = {...state};
    auxState.visibleMaintenance = true;
    setState(auxState);
  };
  useEffect(()=>{
    if(subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management || subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management || subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal ){
    console.log("djhsdusd", subType)
    setVisibleEligibility(true);
    }
  },[])

  const apllyFrequency = (e: any)=>{
    setFrequency(e);
  };
  const apllyEligibility = (e: any)=>{
    setEligibility(e);
  };

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
   // setVisibleMaintenance(false);
    setState(auxState);
    setVisibleAlert( true);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleMaintenance(false);
    setState(auxState);
  };
  return (
    <>
    {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setVisible = {setVisibleMaintenance}
     />}
     <Modal
       centered
       visible={visibleMaintenance}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <div>
            here goes the map
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 10 }} style={{textAlign:'right'}}>
                <label className="tag-name">Maintenance</label>
                <label className="tag-name">{subType}</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <ProjectInformation
              description = {description}
              setDescription = {setDescription}
            />
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Frequency <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a Frequency" style={{width:'100%'}} onChange={(frequency)=> apllyFrequency(frequency)}>
                  {selec.map((element) =>{
                    return <Option key={element} value={element}>{element}</Option>
                  })}
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Access Control <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <p className="switch-option">Public Access / Ownership <span><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked /></span></p>
              </Col>
            </Row>
            {visibleEligibility &&
              <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Maintenance Eligibility <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <Select placeholder="Select a Eligibility" style={{width:'100%'}} onChange={(eligibilit)=> apllyEligibility(eligibilit)}>
                    {PROJECT_INFORMATION.MAINTENANCE_ELIGIBILITY.map((element) =>{
                      return <Option key={element} value={element}>{element}</Option>
                    })}
                  </Select>
                </Col>
              </Row>
            }

            <br/>


            {/*Second Section*/}
            <h5>2. Draw Activity <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
            <div className="draw">
              <img src="/Icons/icon-08.svg" alt="" height="22px" />
              <p>Click on the icon and draw a polygon to draw the activity area</p>
            </div>
            <br/>


            {/*Section*/}
            <h5>3. GENERATE PROJECT <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>

            {/*Section*/}
            <LocationInformation
              setServiceArea = {setServiceArea}
              setCountry = {setCountry}
            />
            <br/>

            {/*Section*/}
            <UploadAttachment
              typeProject = {typeProject}
            />
          </div>
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
