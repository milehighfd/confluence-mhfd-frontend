import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectDispatch } from "../../../hook/projectHook";
import { Geom, Project} from "../../../Classes/Project";
import { setRouteRedirect } from "../../../store/actions/mapActions";
import { AlertViewSave } from "../../Alerts/AlertViewSave";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info"> Any effort for which MHFD funds or staff participation is requested that doesn’t fit into one of the other Project categories.</div>);
const content00 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"></div>);
const content04 = (<div className="popver-info"></div>);
const content05 = (<div className="popver-info"></div>);
const content06 = (<div className="popver-info"></div>);
const content08 = (<div className="popver-info"></div>);
const selec = [1];
for(var i = 2 ; i < 21 ; i++){
  selec.push(i);
}
const stateValue = {
  visibleSpecial: false
}

export const ModalSpecial = ({visibleSpecial, setVisibleSpecial, nameProject, setNameProject, typeProject, setVisible, locality, data}:
  {visibleSpecial: boolean, setVisibleSpecial: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any,data:any}) => {

  const {saveProjectSpecial, setStreamIntersected} = useProjectDispatch();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState('');
  const [county, setCounty] = useState('');
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  var date = new Date();
  var year = date.getFullYear();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(data!== 'no data' ) {
      setCounty(data.county);
      setDescription(data.description);
      setNameProject(data.projectname);
      setServiceArea(data.servicearea);
    }
  },[data]);
  useEffect(()=>{
    if(save === true){
      console.log("FILES", files);
      var special = new Project();
      special.geom =  geom;
      special.projectname = nameProject;
      special.description = description;
      special.county = county;
      special.servicearea = serviceArea;
      special.files = files;
      saveProjectSpecial(special);
      setVisibleSpecial(false);
      setVisible(false);
    };
  },[save]);

  const projectReturn = useSelector((state:any)=>({
    state
  }));

  useEffect(()=>{
    if(geom != undefined && description != '' && county != '' && serviceArea != '' ){
      setDisable(false);
    }
  },[geom, description, county, serviceArea]);

  useEffect(()=>{
    setStreamIntersected({geom:null});
  },[]);
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleSpecial = true;
    setState(auxState);
  };

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
    const auxState = {...state};
    //setVisibleSpecial (false);
    setState(auxState);
    setVisibleAlert( true);
  };

  const handleCancel = (e: any) => {
    const auxState = {...state};
    setVisibleSpecial (false);
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
       visible={visibleSpecial}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
            <CreateProjectMap type="SPECIAL" locality={locality}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <label data-value={nameProject} className="input-sizer">
                  <input type="text" value={nameProject} onChange={(e) => onChange(e)} size={5} placeholder={nameProject} /*disabled={disableName}*//>
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()}/>
                </Button>*/}
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
              description= {description}
              setDescription= {setDescription}
            />
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
            <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
