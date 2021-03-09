import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPing";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { selectedComponents } from "../../../constants/mapStyles";


const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">The purchase of property that is shown to have high flood risk or is needed to implement master plan improvements.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content04 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content05 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const selec = [0];
for(var i = 1 ; i < 21 ; i++){
  selec.push(i);
}
const stateValue = {
  visibleAcqui: false,
}
const dataSource = [
  {
    latitude:'-',
    longitude:'-',
  },
];

const columns = [
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },
];
 
export const ModalAcquisition = ({visibleAcquisition, setVisibleAcquisition, nameProject, setNameProject, typeProject}:
  {visibleAcquisition: boolean, setVisibleAcquisition: Function, nameProject: string , setNameProject: Function, typeProject: string} ) => {
  var date = new Date();
  var year = date.getFullYear();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(false);
  const [serviceArea, setServiceArea] = useState('');
  const [country, setCountry] = useState('');
  const [Porgress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    console.log("entra");
   //setVisibleAcquisition(false);
    setVisibleAlert( true);
  };
  
  const apllyProgress = (e: any)=>{
    setProgress(e);
  };

  const apllyPurchaseDate = (e: any)=>{
    setPurchaseDate(e);
  };
  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleAcquisition(false);
    setState(auxState);
  };
  return (
    <> 
     {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setVisible = {setVisibleAcquisition}
     />}
     <Modal
       centered
       visible={visibleAcquisition}
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
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject}  />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Acquisition</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <ProjectInformation
              typeProject = {typeProject}
              description = {description}
              setDescription = {setDescription}
              serviceArea = {serviceArea}
              setServiceArea = {setServiceArea}
              country = {country} 
              setCountry = {setCountry}
            />
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Progress <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a Progress" style={{width:'100%'}} onChange={(progress)=> apllyProgress(progress)}>
                 {PROJECT_INFORMATION.PROGRESS.map((element) =>{
                    return <Option key={element} value={element}>{element}</Option>
                  })}
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Anticipated Purchase Date <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a Purchase Date" style={{width:'100%'}} onChange={(purchaseDate)=> apllyPurchaseDate(purchaseDate)} >
                  {selec.map((element) =>{
                    var newYear = year+element;
                    return <Option key={newYear} value={newYear}>{newYear}</Option>
                  })}
                </Select>
              </Col>
            </Row>
            <br/>

            {/*Second Section*/}
            <DropPin
              typeProject= {typeProject}
            />

            {/*Section*/}
            <h5>3. GENERATE PROJECT <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>

            {/*Section*/}
            <UploadAttachment
              typeProject = {typeProject}
            />
          </div>
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button key="submit" className="btn-purple" disabled={disable} onClick={handleOk}>Save Draft Project</Button>     
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
