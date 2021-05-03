import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { SERVER } from "../../../Config/Server.config";
import { AlertView } from "../../Alerts/AlertView";
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { getData, getToken, postData } from "../../../Config/datasets";
import { useProjectDispatch, useProjectState } from "../../../hook/projectHook";
import { Project, Geom } from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { JURISDICTION } from "../../../constants/constants";

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

export const ModalAcquisition = ({visibleAcquisition, setVisibleAcquisition, nameProject, setNameProject, typeProject, setVisible, locality, data, editable }:
  {visibleAcquisition: boolean, 
    setVisibleAcquisition: Function, 
    nameProject: string , 
    setNameProject: Function, 
    typeProject: string, 
    setVisible: Function, 
    locality?:any, 
    data: any,
    editable: boolean
  } ) => {

  const {saveProjectAcquisition, setStreamIntersected, editProjectAcquisition, setEditLocation, setStreamsIds, setServiceAreaCounty} = useProjectDispatch();
  const {currentServiceAreaCounty} =useProjectState();
  const {organization, groupOrganization} = useProfileState();
  const {userInformation} = useProfileState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization+"");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [progress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiccion, setJurisdiccion] = useState<any>([]);
  const [cover, setCover] = useState('');
  var date = new Date();

  var year = date.getFullYear();

  useEffect(()=>{
    if(save === true){
      console.log("FILES", files);
      var acquisition = new Project();
      let cservice = "";
      serviceArea.map((element:any) => {
        cservice= cservice + element + ",";
      })
      if(cservice.length != 0 ){
        cservice = cservice.substring(0, cservice.length-1)
      }
      let ccounty = "";
      county.map((element:any) => {
        ccounty= ccounty + element + ",";
      })
      if(ccounty.length != 0 ){
        ccounty = ccounty.substring(0, ccounty.length-1)
      }
      let cjurisdiction = "";
      jurisdiccion.map((element:any) => {
        cjurisdiction= cjurisdiction + element + ",";
      })
      if(cjurisdiction.length != 0 ){
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length-1)
      }
      
      let csponsor = "";
      cosponsor.map((element:any) => {
        csponsor= csponsor + element + ",";
      })
      if(cosponsor.length != 0 ){
        csponsor = csponsor.substring(0, csponsor.length-1)
      }
      acquisition.servicearea = cservice;
      acquisition.county = ccounty;
      acquisition.jurisdiction= cjurisdiction;
      acquisition.sponsor = sponsor;
      acquisition.cosponsor = csponsor;
      acquisition.projectname = nameProject;
      acquisition.description = description;
      acquisition.geom = geom;
      acquisition.acquisitionprogress = progress;
      acquisition.acquisitionanticipateddate = purchaseDate;
      acquisition.files = files;
      acquisition.editProject = editprojectid;
      acquisition.locality = locality? locality:'';
      acquisition.cover = cover;
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
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
 useEffect(()=>{
  let juris = JURISDICTION.find((elem:any) => elem.includes(organization));
  if(juris) {
    setSponsor(organization);
  } else {
    setSponsor(locality);
  }
},[organization]);
  useEffect(()=>{
    if(data!== 'no data' ) {
      console.log("HERE IS THE DATA ", data);
      setSwSave(true);
      setDescription(data.description);
      setNameProject(data.projectname);
      setProgress(data.acquisitionprogress);
      setPurchaseDate(data.acquisitionanticipateddate);
      setEditsetprojectid(data.projectid);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setJurisdiccion(parseStringToArray(data.jurisdiction));
      setCosponsor(parseStringToArray(data.cosponsor));
      setSponsor(data.sponsor);
      setTimeout(()=>{
        getData(SERVER.GET_GEOM_BY_PROJECTID(data.projectid), getToken())
        .then(
          (r: any) => {
            let coor = JSON.parse(r.createdCoordinates);
            let coordinates = coor.coordinates[0];
            setGeom(coordinates);
            setEditLocation(coordinates);
          },
          (e) => {
            console.log('e', e);
          }
        )  
      },1200);
    } else {
      setEditLocation(undefined);
    }
  },[data]);

  useEffect(()=>{
    if(geom != undefined && description != '' && progress != '' && purchaseDate != '' ){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[geom, description,progress,purchaseDate]);


  useEffect(()=>{
    setServiceAreaCounty({});
    setStreamIntersected({geom:null});
    setStreamsIds([]);
  },[]);
  
  // useEffect(()=>{
  //   if(swSave === true){
  //     if(locality !== currentServiceAreaCounty.jurisdiction){
  //       alert("It is not within your jurisdiction.");
  //     }
  //   }else{
  //     if(currentServiceAreaCounty.jurisdiction ){
  //       if(locality !== currentServiceAreaCounty.jurisdiction){
  //         alert("It is not within your jurisdiction.");
  //       }
  //     }
  //   }
  // },[currentServiceAreaCounty.jurisdiction]);
  
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
          <CreateProjectMap type="ACQUISITION" locality={locality} projectid={editprojectid} isEdit={swSave}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 17 }}>
                <label data-value={nameProject} className="input-sizer">
                  <input type="text" value={nameProject} onChange={(e) => onChange(e)} size={45 } placeholder={nameProject} /*disabled={disableName}*//>
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject}  />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()}/>
                </Button>*/}
                <p>{serviceArea?(serviceArea.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea && county)?'·':''} {county?(county.length > 1? 'Multiple Counties': (county[0])):''} </p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{textAlign:'right'}}>
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
              serviceArea = {serviceArea}
              setCounty = {setCounty}
              county = {county} 
              setJurisdiccion={setJurisdiccion}
              jurisdiccion={jurisdiccion}
              setCoSponsor={setCosponsor}
              cosponsor={cosponsor}
              setSponsor={setSponsor}
              sponsor={sponsor}
              editable= {editable}
              isEdit={swSave}
            />
            <br/>

            {/*Section*/}
            <UploadAttachment
              files={files}
              setFiles={setFiles}
              setCover={setCover}
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
