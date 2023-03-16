import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Popover, Checkbox } from 'antd';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { SERVER } from "../../../Config/Server.config";
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { getData, getToken } from "../../../Config/datasets";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectDispatch } from "../../../hook/projectHook";
import { Project} from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
import { JURISDICTION, ADMIN, STAFF } from "../../../constants/constants";
import { useHistory, useLocation } from "react-router-dom";
import { UploadImagesDocuments } from "../TypeProjectComponents/UploadImagesDocuments";
import store from "../../../store";

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
  const {organization, groupOrganization} = useProfileState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [year, setYear] = useState(2023);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization+"");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const isWorkPlan = location.pathname.includes('work-plan');

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    if (params.get('year')) {
      const t = params.get('year') ?? '2023';
      setYear(+t);
    }
  }, [history]);
  const { toggleAttachmentCover} = useAttachmentDispatch();
  const pageWidth  = document.documentElement.scrollWidth;

  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
 const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [sendToWR,setsendToWR] = useState(!showCheckBox);

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
      const counties = data.project_counties.map(( e :any ) => e.CODE_STATE_COUNTY.county_name);
      const serviceAreas = data.project_service_areas.map((e: any) => e.CODE_SERVICE_AREA.service_area_name);
      const localJurisdiction = data.project_local_governments.map((e:any) => e.CODE_LOCAL_GOVERNMENT.local_government_name);
      const coEsponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 12) {
          return e.business_associate.business_name
        }
        return undefined;
      }).filter((e:any)=> !!e);
      const sponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 11) {
          return e.business_associate.business_name
        }
        return undefined;
      }).filter((e:any)=> !!e).join("");

      setSwSave(true);
      setDescription(data.description);
      setNameProject(data.project_name);
      setCounty(counties);
      setServiceArea(serviceAreas);
      setjurisdiction(localJurisdiction);
      setCosponsor(coEsponsor);
      setSponsor(sponsor);
      setTimeout(()=>{
        getData(SERVER.GET_GEOM_BY_PROJECTID(data.project_id), getToken())
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
      setEditsetprojectid(data.project_id);
    } else {
      setEditLocation(undefined);
    }
  },[data]);
  useEffect(()=>{
    if (save === true){

      let serviceAreaIds:any=[];
      let countyIds:any=[];
      let jurisdictionIds:any=[];
      serviceAreaIds = groupOrganization.filter((service:any) => serviceArea.includes(service.name)).map((service:any) => service.id);
      countyIds = groupOrganization.filter((countylist:any) => county.includes(countylist.name)).map((countylist:any) => countylist.id);
      jurisdictionIds = groupOrganization.filter((juris:any) => jurisdiction.includes(juris.name)).map((juris:any) => juris.id);

      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var special = new Project();
      special.locality = _locality;
      special.isWorkPlan = isWorkPlan;
      special.year = _year ?? special.year;
      special.servicearea = serviceAreaIds+ "";
      special.county = countyIds+"";
      special.jurisdiction= jurisdictionIds+"";
      special.sponsor = sponsor;
      special.cosponsor = cosponsor + "";
      special.geom =  geom;
      special.projectname = nameProject;
      special.description = description;
      special.files = files;
      special.editProject = editprojectid;
      special.locality = locality? locality:'';
      special.cover = '';
      special.sendToWR = sendToWR;
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
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
    if(geom != undefined && description != '' && county.length !== 0 && serviceArea.length !== 0 && sponsor !== undefined  && sponsor !== '' && jurisdiction.length !== 0 ){
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
      isWorkPlan={isWorkPlan}
      sponsor={sponsor}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
      jurisdictions={jurisdiction}
      counties={year === 2023 ? [county] : null}
      serviceareas={serviceArea}
      type="Special"
      isEdit={swSave}
      sendToWr={sendToWR}
      setsendToWR={setsendToWR}
      locality={[locality.replace(' Work Plan', '')]}
     />}
     <Modal
       centered
       maskClosable={false}
       visible={visibleSpecial}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width={pageWidth >3000 ? "2000px" : "1100px"}
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
                <label className="tag-name" style={{padding:'10px'}}>R&D</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">
             {
                (showCheckBox && !swSave) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}} className='span-project-text'>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
            <ProjectInformation
              description= {description}
              setDescription= {setDescription}
            />
            <br/>
            <DropPin
              typeProject= {typeProject}
              geom= {geom}
              setGeom= {setGeom}
            />

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
            <UploadImagesDocuments
              isCapital={false}
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
