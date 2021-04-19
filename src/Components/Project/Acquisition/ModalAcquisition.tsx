import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { selectedComponents } from "../../../constants/mapStyles";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectDispatch, useProjectState } from "../../../hook/projectHook";
import { Project, Geom } from "../../../Classes/Project";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">The purchase of property that is shown to have high flood risk or is needed to implement master plan improvements.</div>);
const content00 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"></div>);
const content04 = (<div className="popver-info"></div>);
const content05 = (<div className="popver-info"></div>);
const content06 = (<div className="popver-info"></div>);
const content08 = (<div className="popver-info"></div>);
const selec = [0];

for(var i = 1 ; i < 21 ; i++){
  selec.push(i);
}
const stateValue = {
  visibleAcqui: false,
}

export const ModalAcquisition = ({visibleAcquisition, setVisibleAcquisition, nameProject, setNameProject, typeProject, setVisible, locality, data }:
  {visibleAcquisition: boolean, setVisibleAcquisition: Function, nameProject: string , setNameProject: Function, typeProject: string, setVisible: Function, locality?:any, data: any} ) => {

  const {saveProjectAcquisition, setStreamIntersected, editProjectAcquisition, setEditLocation, setStreamsIds} = useProjectDispatch();
  const {currentServiceAreaCounty} =useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState('');
  const [county, setCounty] = useState('');
  const [progress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  var date = new Date();

  var year = date.getFullYear();

  useEffect(()=>{
    if(save === true){
      console.log("FILES", files);
      var acquisition = new Project();
      acquisition.projectname = nameProject;
      acquisition.description = description;
      acquisition.county = county;
      acquisition.servicearea = serviceArea;
      acquisition.geom = geom;
      acquisition.acquisitionprogress = progress;
      acquisition.acquisitionanticipateddate = purchaseDate;
      acquisition.files = files;
      acquisition.editProject = editprojectid;
      if(swSave){
        editProjectAcquisition(acquisition);
      }else{
        saveProjectAcquisition(acquisition);
      }
      setVisibleAcquisition(false);
      setVisible(false);
    }
  },[save]);
  const projectReturn = useSelector((state:any)=>({
    state
  }));
  useEffect(()=>{
    if(data!== 'no data' ) {
      setSwSave(true);
      setCounty(data.county);
      setDescription(data.description);
      setNameProject(data.projectname);
      setServiceArea(data.servicearea);
      setProgress(data.acquisitionprogress);
      setPurchaseDate(data.acquisitionanticipateddate);
      setGeom(data.coordinates);
      setEditsetprojectid(data.projectid);
      setEditLocation(data.coordinates);
    } else {
      setEditLocation(undefined);
    }
  },[data]);

  useEffect(()=>{
    if(geom != undefined && description != '' && locality === currentServiceAreaCounty.jurisdiction && progress != '' && purchaseDate != '' ){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[geom, description,progress,purchaseDate, currentServiceAreaCounty.jurisdiction]);


  useEffect(()=>{
    setStreamIntersected({geom:null});
    setStreamsIds([]);
  },[]);
  
  useEffect(()=>{
    if(swSave === true){
      if(locality !== currentServiceAreaCounty.jurisdiction){
        alert("It is not within your jurisdiction.");
      }
    }else{
      if(currentServiceAreaCounty.jurisdiction ){
        if(locality !== currentServiceAreaCounty.jurisdiction){
          alert("It is not within your jurisdiction.");
        }
      }
    }
  },[currentServiceAreaCounty.jurisdiction]);
  
  const onChange = (e: any)=>{
    setNameProject(e.target.value);
    /*if(name===true){
      setNameProject(e.target.value);
    }*/
  };
  const apllyName = ()=>{
    if(name === true){
      setDisableName(true);
      setName(false);
    }
    else{
      setDisableName(false);
      setName(true);
    }
  };
  
  const handleOk = (e: any) => {
    setVisibleAlert( true);
  };

  const apllyProgress = (e: any)=>{
    setProgress(e);
  };

  const apllyPurchaseDate = (e: any)=>{
    setPurchaseDate(e);
  };
  const handleCancel = (e: any) => {
    const auxState = {...state};
    setVisibleAcquisition(false);
    setState(auxState);
    setVisible(false);
  };

  return (
    <>
     {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
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
          <CreateProjectMap type="ACQUISITION" locality={locality} projectid={editprojectid}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <label data-value={nameProject} className="input-sizer">
                  <input type="text" value={nameProject} onChange={(e) => onChange(e)} size={5} placeholder={nameProject} /*disabled={disableName}*//>
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject}  />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()}/>
                </Button>*/}
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
              description = {description}
              setDescription = {setDescription}
            />
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Progress <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder={swSave? progress+"": "Select a Status" }  style={{width:'100%'}} onChange={(progress)=> apllyProgress(progress)}>
                 {PROJECT_INFORMATION.PROGRESS.map((element) =>{
                    return <Option key={element} value={element}>{element}</Option>
                  })}
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Anticipated Purchase Date <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder={swSave? purchaseDate   +"": "Select a Purchase Date"} style={{width:'100%'}} onChange={(purchaseDate)=> apllyPurchaseDate(purchaseDate)} >
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
              geom= {geom}
              setGeom= {setGeom}
            />

            {/*Section*/}
            {/* <h5>3. GENERATE PROJECT <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button> */}
            <br/>

            {/*Section*/}
            <LocationInformation
              setServiceArea = {setServiceArea}
              setCounty = {setCounty}
            />
            <br/>

            {/*Section*/}
            <UploadAttachment
              typeProject = {typeProject}
              files={files}
              setFiles={setFiles}
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
