import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Popover, Checkbox, Dropdown } from 'antd';
import CreateProjectMap from 'Components/CreateProjectMap/CreateProjectMap';
import { SERVER } from 'Config/Server.config';
import { AlertView } from 'Components/Alerts/AlertView';
import { ProjectInformation } from 'Components/Project/TypeProjectComponents/ProjectInformation';
import { DropPin } from 'Components/Project/TypeProjectComponents/DropPin';
import { getData, getToken } from 'Config/datasets';
import { LocationInformation } from 'Components/Project/TypeProjectComponents/LocationInformation';
import { useProjectDispatch,useProjectState } from 'hook/projectHook';
import { Project} from 'Classes/Project';
import { useProfileState } from 'hook/profileHook';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { ADMIN, STAFF, WORK_PLAN_TAB } from 'constants/constants';
import { useHistory } from 'react-router-dom';
import { UploadImagesDocuments } from 'Components/Project/TypeProjectComponents/UploadImagesDocuments';
import { useMapState } from 'hook/mapHook';
import TypeProjectsFilter from 'Components/FiltersProject/TypeProjectsFilter/TypeProjectsFilter';
import { DownOutlined, HeartFilled, HeartOutlined, UpOutlined } from '@ant-design/icons';

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

  const {
    saveProjectSpecial, 
    setStreamIntersected, 
    editProjectSpecial, 
    setEditLocation, 
    setStreamsIds, 
    setServiceAreaCounty, 
    setJurisdictionSponsor, 
    setIsEdit,
  } = useProjectDispatch();
  const {getAttachmentByProject} = useAttachmentDispatch();
  const { organization, groupOrganization } = useProfileState();
  const { deleteAttachmentsIds } = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [year, setYear] = useState(2023);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [sponsor, setSponsor] = useState("");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState();
  const [files, setFiles] = useState<any[]>([]);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const history = useHistory();
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const [isEditingPosition,setIsEditingPosition ]= useState(false)
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);
  const [activeTabBodyProject, setActiveTabBodyProject] = useState('Details');
  const [favorite, setFavorite] = useState(false);
  const {userInformation} = useProfileState();
  const showCheckBox = userInformation.designation === ADMIN || userInformation.designation === STAFF;
  
  //list Menu TypeProjects
  const menuTypeProjects = <TypeProjectsFilter />;

  useEffect(()=>{
    setStreamIntersected({geom:null});
    setJurisdictionSponsor(undefined);
    setStreamsIds([]);
    setServiceAreaCounty({});
  },[]);

  useEffect(() => {
    const CODE_LOCAL_GOVERNMENT = 3;
    if (userInformation?.business_associate_contact?.business_address?.business_associate?.code_business_associates_type_id === CODE_LOCAL_GOVERNMENT) {      
      if (userInformation?.business_associate_contact?.business_address?.business_associate?.business_name) {
        setSponsor(userInformation?.business_associate_contact?.business_address?.business_associate?.business_name);
      }
    }
  }, [userInformation]);

  useEffect(()=>{
    setIsEdit(false);
    if(data!== 'no data' ) {      
      setIsEditingPosition(false);
      const counties = data.project_counties.map(( e :any ) => e.CODE_STATE_COUNTY.county_name);
      const serviceAreas = data.project_service_areas.map((e: any) => e.CODE_SERVICE_AREA.service_area_name);
      const localJurisdiction = data.project_local_governments.map((e:any) => e.CODE_LOCAL_GOVERNMENT.local_government_name);
      const coEsponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 12) {
          return titleCase(e.business_associate.business_name)
        }
        return undefined;
      }).filter((e:any)=> !!e);
      const sponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 11) {
          return titleCase(e.business_associate.business_name)
        }
        return undefined;
      }).filter((e:any)=> !!e).join("");
      setIsEdit(true);
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
      const jurisdictionList:any = [];
      const countyList:any = [];
      const serviceAreaList:any = [];      
      groupOrganization.forEach((item:any) => {
        if (item.table === 'CODE_LOCAL_GOVERNMENT') {
          jurisdictionList.push(item);
        } else if (item.table === 'CODE_STATE_COUNTY') {
          item.name = item.name.replace(' County', '');
          countyList.push(item);
        } else if (item.table === 'CODE_SERVICE_AREA') {
          item.name = item.name.replace(' Service Area', '');
          serviceAreaList.push(item);
        }
      });  
      let serviceA = serviceArea.map((element:any) => element.replace(' Service Area', ''));
      let countyA = county.map((element:any) => element.replace(' County', ''));        
      serviceAreaIds = serviceAreaList.filter((service:any) => serviceA.includes(service.name)).map((service:any) => service.id);
      countyIds = countyList.filter((countys:any) => countyA.includes(countys.name)).map((countyl:any) => countyl.id);
      jurisdictionIds = jurisdictionList.filter((juris:any) => jurisdiction.includes(juris.name)).map((juris:any) => juris.id);       
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
      special.type = 'special';
      removeAttachment(deleteAttachmentsIds);
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
    if(geom != undefined && description != '' && county.length !== 0 && serviceArea.length !== 0 && jurisdiction.length !== 0 ){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[geom, description, county, serviceArea, sponsor, jurisdiction]);

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    if (params.get('year')) {
      const t = params.get('year') ?? '2023';
      setYear(+t);
    }
  }, [history]);

  const { toggleAttachmentCover, removeAttachment } = useAttachmentDispatch();
  const pageWidth = document.documentElement.scrollWidth;

  
  const [sendToWR, setsendToWR] = useState(!showCheckBox);

  useEffect(() => {
    getTextWidth(nameProject);
  }, [nameProject]);

  const getTextWidth = (text: any) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let fontType = "16px sans-serif";
    try {
      if (context) {
        context.font = fontType;
        let length = context.measureText(text).width;
        if (!isNaN(length)) {
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

  function titleCase(str: any) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }  

  useEffect(()=> {
    if(isEditingPosition ){
      setServiceArea([])
      setCounty([])
      setjurisdiction([])
    }
  },[isEditingPosition])

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
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

  const getServiceAreaAndCountyString = (serviceArea: string[], county: string[]): string => {
    const serviceAreaWithoutLabel = serviceArea?.map(area => area.replace(' Service Area', ''));
    const countyWithoutLabel = county?.map(county => county.replace(' County', ''));
    let result = '';
    if (serviceAreaWithoutLabel?.length > 0) {
      result += serviceAreaWithoutLabel.length > 1 ? 'Multiple Service Areas' : `${serviceAreaWithoutLabel[0]} Service Area`;
    }
    if (serviceAreaWithoutLabel?.length > 0 && countyWithoutLabel?.length > 0) {
      result += ' · ';
    }
    if (countyWithoutLabel?.length > 0) {
      result += countyWithoutLabel.length > 1 ? 'Multiple Counties' : `${countyWithoutLabel[0]} County`;
    }
    return result;
  };

  return (
    <>
    {visibleAlert && <AlertView
      isWorkPlan={isWorkPlan}
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
       width={pageWidth >3000 ? "2000px" : "90.5%"}
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <CreateProjectMap type="SPECIAL" locality={locality} projectid={editprojectid} isEdit={swSave}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <div className="head-project">
            <div className='project-title'>
              <label data-value={nameProject} style={{width: '100%'}}>
                <div className='project-name-icons'>
                  <textarea className="project-name" value={nameProject} onChange={(e) => onChange(e)} style={{                  
                    height: lengthName > 259 ? 'unset' :'34px'
                  }} />
                  <div className='ico-title'>
                  <Button className={favorite ? "btn-transparent":"btn-transparent" } onClick={()=>{setFavorite(!favorite)}}>
                    {favorite? <HeartFilled className='heart'/>:<HeartOutlined className='ico-heart'/>}
                  </Button>
                    <img src="/Icons/ic_send_purple.svg" alt="" height="16px"></img>
                  </div>
                </div>
                <p className='project-sub-name'>Aurora · Northeast Service Area · Adams County</p>
              </label>
            </div>
            <div className='project-type'>
              <Dropdown overlay={menuTypeProjects} trigger={['click']} overlayClassName="drop-menu-type-project" placement="bottomRight" onVisibleChange={()=>{setOpenDropdownTypeProject(!openDropdownTypeProject)}}>
                <div className="drop-espace">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%', display:'flex', alignItems:'center'}}>
                    {<p>R&D</p>} &nbsp;
                    {openDropdownTypeProject ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
                  </a>
                </div>
              </Dropdown>
              <Popover content={content} overlayClassName='popover-project'>
                <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" style={{opacity:0.4}}/>
              </Popover>
            </div>
          </div>
            <div className='header-tab'>
            <p className={activeTabBodyProject ===  'Details'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Details')}}>Details</p>
            <p className={activeTabBodyProject ===  'Discussion'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Discussion')}}>Discussion</p>
            <p className={activeTabBodyProject ===  'Activity'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Activity')}}>Activity</p>
          </div>
          {activeTabBodyProject === 'Details' ?

          <div className="body-project">
             {
                (isWorkPlan && showCheckBox && !swSave) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}} className='span-project-text'>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
            <ProjectInformation
              description= {description}
              setDescription= {setDescription}
            />
            <DropPin
              typeProject= {typeProject}
              geom= {geom}
              setGeom= {setGeom}
              setIsEditingPosition={setIsEditingPosition}
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
            <UploadImagesDocuments
              isCapital={false}
              setFiles={setFiles}
            />
          </div>:<></>}
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk} disabled={disable}><span className="text-color-disable">Save Draft Project</span></Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
