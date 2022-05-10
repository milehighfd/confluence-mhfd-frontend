import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Popover } from 'antd';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { SERVER } from "../../../Config/Server.config";
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { getData, getToken } from "../../../Config/datasets";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectDispatch } from "../../../hook/projectHook";
import { Project} from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
import { JURISDICTION } from "../../../constants/constants";
import { useHistory } from "react-router-dom";

const content = (<div className="popver-info"> Any effort for which MHFD funds or staff participation is requested that doesn’t fit into one of the other Project categories.</div>);
const selec = [1];
for(var i = 2 ; i < 21 ; i++){
  selec.push(i);
}
const stateValue = {
  visibleSpecial: false
}

export const ModalSpecial = ({visibleSpecial, setVisibleSpecial, nameProject, setNameProject, typeProject, setVisible, locality, data, editable}:
  {visibleSpecial: boolean, setVisibleSpecial: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any,data:any, editable:boolean}) => {

  const {saveProjectSpecial, setStreamIntersected, editProjectSpecial, setEditLocation, setStreamsIds, setServiceAreaCounty, setJurisdictionSponsor} = useProjectDispatch();
  const {getAttachmentByProject} = useAttachmentDispatch();
  const {organization} = useProfileState();
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
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const history = useHistory();
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }

 useEffect(() => {
  getTextWidth(nameProject);
},[nameProject]);
 const getTextWidth = (text: any) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  let fontType = "16px sans-serif";
  try {
    if(context) {
      context.font = fontType;
      let length = context.measureText(text).width;
      if(!isNaN(length)) {
        setlengthName(length);
      } else {
        setlengthName(0);
      }
    }
  } catch (e) {
    console.log("Error in getting width", context);
    return 0;
  }
}

  useEffect(()=>{
    if(data!== 'no data' ) {
      getAttachmentByProject(data.projectid);
      setSwSave(true);
      setDescription(data.description);
      setNameProject(data.projectname);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setjurisdiction(parseStringToArray(data.jurisdiction));
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
      setEditsetprojectid(data.projectid);
    } else {
      setEditLocation(undefined);
    }
  },[data]);
  useEffect(()=>{
    if(save === true){
      console.log("FILES", files);
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      var special = new Project();
      special.year = _year ? _year : special.year;
      special.servicearea = serviceArea+ "";
      special.county = county+"";
      special.jurisdiction= jurisdiction+"";
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

  useEffect(()=>{
    if(geom != undefined && description != '' && county.length !== 0 && serviceArea.length !== 0  && sponsor !== '' && jurisdiction.length !== 0 ){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[geom, description, county, serviceArea, sponsor, jurisdiction]);

  useEffect(()=>{
    setStreamIntersected({geom:null});
    setJurisdictionSponsor(undefined);
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
  const handleCancel = (e: any) => {
    const auxState = {...state};
    setVisibleSpecial (false);
    setState(auxState);
    setVisible(false);
  };

  return (
    <>
    {visibleAlert && <AlertView
      sponsor={sponsor}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
     />}
     <Modal
       centered
       maskClosable={false}
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
                <label data-value={nameProject} style={{width: '100%'}}>
                  <textarea className="project-name" value={nameProject} onChange={(e) => onChange(e)} style={{
                    border: 'none',
                    width: '100%',
                    fontSize: '24px',
                    color: '#11093c',
                    wordWrap: 'break-word',
                    resize: 'none',
                    lineHeight: '27px',
                    height: lengthName > 268 ? 'unset' :'34px'
                  }} />
                </label>
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
            <br/>

            {/*Section*/}
            <LocationInformation
              setServiceArea = {setServiceArea}
              serviceArea = {serviceArea}
              setCounty = {setCounty}
              county = {county} 
              setjurisdiction={setjurisdiction}
              jUrisdiction={jurisdiction}
              setCoSponsor={setCosponsor}
              cosponsor={cosponsor}
              setSponsor={setSponsor}
              sponsor={sponsor}
              editable= {editable}
              isEdit={swSave}
              originModal="Special"
            />
            <br/>

            {/*Section*/}
            <UploadAttachment
              files={files}
              setFiles={setFiles}
              setCover={setCover}
              originModal="Special"
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
