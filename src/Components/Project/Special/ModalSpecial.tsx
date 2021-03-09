import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPing";
import { PROJECT_INFORMATION } from "../../../constants/constants";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info"> Any effort for which MHFD funds or staff participation is requested that doesn’t fit into one of the other Project categories.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content04 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content05 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const selec = [1];
for(var i = 2 ; i < 21 ; i++){
  selec.push(i);
}
const stateValue = {
  visibleSpecial: false
}
const dataSource = [
  {
    latitude:'39.744137',
    longitude:'- 104.950050',
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

export const ModalSpecial = ({visibleSpecial, setVisibleSpecial, nameProject, setNameProject, typeProject}:
  {visibleSpecial: boolean, setVisibleSpecial: Function, nameProject: string , setNameProject: Function, typeProject:string}) => {
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(false);
  const [serviceArea, setServiceArea] = useState('');
  const [country, setCountry] = useState('');
  const [Porgress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  var date = new Date();
  var year = date.getFullYear();
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleSpecial = true;
    setState(auxState);
  };

  const apllyProgress = (e: any)=>{
    setProgress(e);
  };

  const apllyPurchaseDate = (e: any)=>{
    setPurchaseDate(e);
  };
  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    //setVisibleSpecial (false);
    setState(auxState);
    setVisibleAlert( true);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleSpecial (false);
    setState(auxState);
  };
  return (
    <>
    {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setVisible = {setVisibleSpecial}
     />}
     <Modal
       centered
       visible={visibleSpecial}
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
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Special</label>
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
            <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
