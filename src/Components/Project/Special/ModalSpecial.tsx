import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { SERVER } from "../../../Config/Server.config";
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { getData, getToken, postData } from "../../../Config/datasets";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectDispatch, useProjectState } from "../../../hook/projectHook";
import { Geom, Project} from "../../../Classes/Project";
import { setRouteRedirect } from "../../../store/actions/mapActions";
import { AlertViewSave } from "../../Alerts/AlertViewSave";
import { editSpecial } from "../../../store/actions/ProjectActions";
import { useProfileState } from "../../../hook/profileHook";
import { useAttachmentDispatch, useAttachmentState } from "../../../hook/attachmentHook";
import { JURISDICTION } from "../../../constants/constants";

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

export const ModalSpecial = ({visibleSpecial, setVisibleSpecial, nameProject, setNameProject, typeProject, setVisible, locality, data, editable}:
  {visibleSpecial: boolean, setVisibleSpecial: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any,data:any, editable:boolean}) => {

  const {saveProjectSpecial, setStreamIntersected, editProjectSpecial, setEditLocation, setStreamsIds, setServiceAreaCounty} = useProjectDispatch();
  const {getAttachmentProjectId, getAttachmentByProject} = useAttachmentDispatch();
  const {attachments, uploadAttachment} = useAttachmentState();
  const { currentServiceAreaCounty} = useProjectState();
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
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [cover, setCover] = useState('');
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiccion, setJurisdiccion] = useState<any>([]);
  var date = new Date();
  var year = date.getFullYear();
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(attachments, "*ATTACH*");
    console.log(uploadAttachment, "**ATTACH**");
      //setFiles(attachments);
  },[attachments,uploadAttachment]);
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
 useEffect(()=>{
  console.log("COUNTY CHANGE", county);
 },[county]);
 useEffect(()=>{
  console.log("SERA CHANGE", serviceArea);
 },[serviceArea]);
 useEffect(()=>{
  console.log("JURIS CHANGE", jurisdiccion);
 },[jurisdiccion]);
  useEffect(()=>{
    if(data!== 'no data' ) {
      console.log("HERE IS THE DATA YEYEEYEY", data);
      //getAttachmentProjectId(data.projectid);
      getAttachmentByProject(data.projectid);
      setSwSave(true);
      setDescription(data.description);
      setNameProject(data.projectname);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setJurisdiccion(parseStringToArray(data.jurisdiction));
      setCosponsor(parseStringToArray(data.cosponsor));
      setSponsor(data.sponsor);
      // setGeom(data.coordinates);
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
      setEditsetprojectid(data.projectid);
    } else {
      setEditLocation(undefined);
    }
  },[data]);
  useEffect(()=>{
    if(save === true){
      console.log("FILES", files);
     var special = new Project();
     /* let cservice = "";
      if(serviceArea){
        serviceArea.map((element:any) => {
          cservice= cservice + element + ",";
        })
      }
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
      }*/
      special.servicearea = serviceArea+ "";
      special.county = county+"";
      special.jurisdiction= jurisdiccion+"";
      special.sponsor = sponsor;
      special.cosponsor = cosponsor + "";
      special.geom =  geom;
      special.projectname = nameProject;
      special.description = description;
      special.files = files;
      special.editProject = editprojectid;
      special.locality = locality? locality:'';
      special.cover = cover;
      if(swSave){
        editProjectSpecial(special);
      }else{
        saveProjectSpecial(special);
      }
      setVisibleSpecial(false);
      setVisible(false);
    };
  },[save]);

  const projectReturn = useSelector((state:any)=>({
    state
  }));

  useEffect(()=>{
    if(geom != undefined && description != '' && county != '' && serviceArea != ''){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[geom, description, county, serviceArea]);

  useEffect(()=>{
    setStreamIntersected({geom:null});
    setStreamsIds([]);
    setServiceAreaCounty({});
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
  useEffect(()=>{
    let juris = JURISDICTION.find((elem:any) => elem.includes(organization));
    if(juris) {
      setSponsor(organization);
    } else {
      setSponsor(locality);
    }
  },[organization]);
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
            <CreateProjectMap type="SPECIAL" locality={locality} projectid={editprojectid} isEdit={swSave}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 17 }}>
                <label data-value={nameProject} className="input-sizer">
                  <input type="text" value={nameProject} onChange={(e) => onChange(e)} size={45} placeholder={nameProject} /*disabled={disableName}*//>
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()}/>
                </Button>*/}
                <p>{serviceArea?(serviceArea.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea.length > 0 && county.length > 0)?'·':''} {county?(county.length > 1? 'Multiple Counties': (county[0])):''} </p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{textAlign:'right'}}>
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
            <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
