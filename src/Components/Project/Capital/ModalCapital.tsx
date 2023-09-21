import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Input, Row, Col, Popover, Select, Collapse, Timeline , Tooltip, Checkbox, Dropdown, Table, Radio,Menu } from 'antd';
import { DeleteOutlined, DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, PlusCircleFilled, UpOutlined } from '@ant-design/icons';
import CreateProjectMap from 'Components/CreateProjectMap/CreateProjectMap';
import { AlertView } from 'Components/Alerts/AlertView';
import { ProjectInformation } from 'Components/Project/TypeProjectComponents/ProjectInformation';
import { LocationInformation } from 'Components/Project/TypeProjectComponents/LocationInformation';
import { useProjectState, useProjectDispatch } from 'hook/projectHook';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { Project } from 'Classes/Project';
import { useProfileState } from 'hook/profileHook';
import { ADMIN, NEW_PROJECT_TYPES, STAFF, WINDOW_WIDTH, WORK_PLAN_TAB } from 'constants/constants';
import { useHistory } from 'react-router-dom';
import { UploadImagesDocuments } from 'Components/Project/TypeProjectComponents/UploadImagesDocuments';
import { getProjectOverheadCost } from 'utils/parsers';
import { useMapState } from 'hook/mapHook';
import { Header } from '../TypeProjectComponents/Header';
import FinancialInformation from '../TypeProjectComponents/FinancialInformation';
import { DropPin } from '../TypeProjectComponents/DropPin';
import ProposedActions from '../TypeProjectComponents/ProposedActions';
import { ProjectGeometry } from '../TypeProjectComponents/ProjectGeometry';
import RequestorInformation from '../TypeProjectComponents/RequestorInformation';
import { getData, getToken } from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import * as datasets from "../../../Config/datasets";
import { Countywide } from '../TypeProjectComponents/Countywide';
import { TypeProjectsMenu } from '../TypeProjectComponents/TypeProjectMenu';
import { setStreamsList } from 'store/actions/ProjectActions';
import { deletefirstnumbersmhfdcode } from 'utils/utils';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { DiscussionCreateProject } from '../TypeProjectComponents/DiscussionCreateProject';
import { ActivitiCreateProject } from '../TypeProjectComponents/ActivityCreateProject';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
import EditAmountCreateProject from '../TypeProjectComponents/EditAmountCreateProject';

const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>);
const contentIndComp = (<div className="popver-info">Independent Actions should be added to represent any known project actions that are not already shown in the Actions layer. Independent Action costs should reflect only the cost of construction; they will have Overhead Costs applied to them</div>);
const contentOverheadCost = (<div className="popver-info"> Overhead Cost includes all costs beyond the costs of physical construction (Subtotal Cost). The default values shown here can and should be changed when different percentages are anticipated, such as in urban settings. Please add a description explaining any changes from default values. </div>);
const contentAdditionalCost = (<div className="popver-info"> Enter any additional costs here that were not captured previously as Actions, Independent Actions, or Overhead Costs. Additional Costs (unlike Independent Actions) will NOT have Overhead Costs applied to them. </div>);
const content10 = (<div className="popver-info">The Action Status indicates whether or not the Action has already been built (Complete) or still needs to be built (Proposed).</div>);
const content05 = (<div className="popver-info" style={{ width: '261px' }}> Indicate why this project is eligible for MHFD maintenance. <br /><br /><b>Capital Project</b> – The project was completed as part of a MHFD Capital Improvement Plan
  <br /> <b>MEP</b> – The project has been accepted through development review as part of MHFD's Maintenance Eligibility Program (MEP)
  <br /><b>Grandfathered</b> – Development occurred before MHFD’s Maintenance Eligibility Program started in 1980
  <br /><b>Not Eligible</b> – The project does not meet any of the above criteria
  <br /><b>Unknown</b>  – Maintenance eligibility status is unknown</div>);
let flagInit = false;
const stateValue = {
  visibleCapital: false
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const genExtra05 = (totalIndependentComp: any) => (
  <Row className="tab-head-project">
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>Independent Actions</Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 6 }}></Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 4 }}></Col>
    <Col className="tab-cost-independent" xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }} >{formatter.format(totalIndependentComp)}</Col>
  </Row>
);
const genTitleNoAvailable = (groups:any, setKeyOpenClose: Function) => {
  let totalSumCost = 0;
  for( let component of groups.components){
    totalSumCost += component.original_cost;
  }

  return (
  <Row className="tab-head-project" onClick={()=>{setKeyOpenClose(-1)}}>
    <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 14 }}>No Problem Group Available</Col>
    <Col style={{textAlign:'center'}} xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}></Col>
  <Col className="tab-cost" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }} style={{ whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{formatter.format(totalSumCost)}</Col>
  </Row>
  )
}
const genTitleProblem = (problem: any, key:any, setValuesProblem:Function, setValueZoomProb: Function, setKeyOpenClose: Function) => {
  let totalSumCost = 0;
  for( let component of problem.components){
    totalSumCost += component.original_cost;
  }
  return (
    <Row className="tab-head-project" onMouseEnter={()=> setValuesProblem(key, problem.problemname)} onMouseLeave={()=>setValuesProblem(undefined,undefined)} onClick={()=>{setValueZoomProb(key); setKeyOpenClose(key)}} >
      <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 14 }}>{problem.problemname}</Col>
      <Col style={{textAlign:'center'}} className='col-cost-geom' xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{problem.solutionstatus ? problem.solutionstatus + '%' : ''}</Col>
      <Col className="tab-cost cost-position" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{formatter.format(totalSumCost)}</Col>
    </Row>
  )
}
export const ModalCapital = ({
  visibleCapital, 
  setVisibleCapital, 
  nameProject, 
  setNameProject, 
  typeProject, 
  setVisible, 
  locality, 
  data, 
  editable, 
  problemId,
  subTypeInit,
}:{
  visibleCapital: boolean, 
  setVisibleCapital: Function, 
  nameProject: string, 
  setNameProject: Function, 
  typeProject: string, 
  setVisible: Function, 
  locality?:any, 
  data:any, 
  editable:boolean, 
  problemId?: any,
  subTypeInit?: string
}) => {
 
  const {
    saveProjectCapital,
    setComponentIntersected, 
    getListComponentsByComponentsAndPolygon, 
    setStreamIntersected, 
    setStreamsIds, 
    setIndComponents, 
    getGEOMByProjectId, 
    editProjectCapital, 
    setServiceAreaCounty, 
    setJurisdictionSponsor, 
    setIsEdit,
    setStreamsList,
    saveSpecialLocation,
    saveAcquisitionLocation,
    setDisableFieldsForLg,
    setIsGeomDrawn
  } = useProjectDispatch();
  const {
    listComponents, 
    componentsFromMap, 
    userPolygon, 
    isGeomDrawn,
    streamIntersected, 
    independentComponents, 
    status,
    deleteAttachmentsIds,
    listStreams,
    streamsIntersectedIds,
    disableFieldsForLG,
  } = useProjectState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(stateValue);
  const [description, setDescription] =useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const [isDrawStateCapital, setIsDrawCapital] = useState(false);
  const {changeDrawState, changeDrawStateCapital, setEditLocation,setComponentsFromMap, changeAddLocationState } = useProjectDispatch();
  const [sponsor, setSponsor] = useState("");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId ] = useState(-1);
  const {isDraw, isDrawCapital} = useProjectState();
  const [save, setSave] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [groups,setGroups] = useState<any>({});
  const [componentsToSave, setComponentsToSave] = useState([]);
  const [geom, setGeom] = useState<any>();
  const [visibleUnnamedComponent, setVisibleUnnamedComponent] = useState(false)
  const [thisIndependentComponents, setIndependentComponents] = useState<any[]>([]);
  const [overheadValues, setOverheadValues] = useState<any>([0,5,0,0,5,15,5,10,25]);
  const [overheadCosts, setOverheadCosts] = useState<any>([0,0,0,0,0,0,0,0,0]);
  const [keys, setKeys] = useState<any>(['-false']);
  const [additionalCost, setAdditionalCost] = useState<number>(0);
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [overheadDescription, setOverheadDescription] = useState("");
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const history = useHistory();
  const [lengthName, setlengthName] = useState(0);
  const appUser = useProfileState();
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const { toggleAttachmentCover , removeAttachment } = useAttachmentDispatch();
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const { groupOrganization, userInformation} = useProfileState();
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);
  const [activeTabBodyProject, setActiveTabBodyProject] = useState('Details');
  const [favorite, setFavorite] = useState(false);
  const [groupParsed, setGroupParsed] = useState<any>([]);
  const [selectedTypeProject, setSelectedTypeProject] = useState((typeProject.toLowerCase() === 'r&d' ? 'special' : typeProject.toLowerCase()) || 'capital');
  const [selectedLabelProject, setSelectedLabelProject] = useState((subTypeInit === '' ? (typeProject) : subTypeInit) || 'Capital');
  const [lastValue, setLastValue] = useState('');
  const [showDraw, setShowDraw] = useState(true);
  const [showCounty, setShowCounty] = useState(false);
  const [isCountyWide, setIsCountyWide] = useState();
  const [isSouthPlate, setIsSouthPlate] = useState();
  const [disabledLG, setDisabledLG] = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');
  const { openNotification } = useNotifications();
  //maintenance
  const [frequency, setFrequency] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [ownership, setOwnership] = useState(true);
  const [subType, setSubType] = useState(subTypeInit || '');
  const [isRoutine, setIsRoutine] = useState(false);
  //study 
  const [studyreason, setStudyReason] = useState<any>('');
  const [otherReason, setOtherReason] = useState('');
  const [streamsList, setThisStreamsList] = useState<any>([]);
  //acquisition
  var date = new Date();
  var year = date.getFullYear();
  const [progress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [isEditingPosition,setIsEditingPosition ]= useState(false)
  //special
  const setTypeAndSubType = (type:string, subType:string, label:string) => {
    setSubType(subType);
    setLastValue(selectedTypeProject);
    setSelectedTypeProject(type);
    setSelectedLabelProject(label);
  }; 

  //list Menu TypeProjects
  const menuTypeProjects = () => {
    return (<TypeProjectsMenu setTypeAndSubType={setTypeAndSubType} />)
  };

  //Delete all data when opening
  useEffect(() => {
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    setStreamsIds([]);
    setStreamsList([]);
    setIsGeomDrawn(false);
    return () => {
      setIndependentComponents([]);
      setComponentsFromMap([]);
    }
  }, []);

  //Load Sponsor with Local Government if user is Local Government
  useEffect(() => {
    const CODE_LOCAL_GOVERNMENT = 3;
    if (!swSave) {
      if (userInformation?.business_associate_contact?.business_address?.business_associate?.code_business_associates_type_id === CODE_LOCAL_GOVERNMENT) {        
        if (userInformation?.business_associate_contact?.business_address?.business_associate?.business_name) {     
          setSponsor(userInformation?.business_associate_contact?.business_address?.business_associate?.business_name);
        }
      }
    }       
  }, [userInformation]);
  useEffect(() => {
    if(!showDraw) {
      setStreamIntersected({ geom: null });
      setStreamsList([]);
      changeAddLocationState(false);
      setGeom(undefined);
      saveSpecialLocation({geom: null});
      saveAcquisitionLocation({geom: null});
      setEditLocation([]);
    }
  }, [showDraw]);
  //Load Data if is Edit
  useEffect(() => {
    setIsEdit(false);
    if (data !== 'no data') {
      const counties = data.project_counties.map((e: any) => e?.CODE_STATE_COUNTY?.county_name);
      const serviceAreas = data.project_service_areas.map((e: any) => e?.CODE_SERVICE_AREA?.service_area_name);
      const localJurisdiction = data.project_local_governments.map((e: any) => e?.CODE_LOCAL_GOVERNMENT?.local_government_name);
      setCounty(counties);
      setServiceArea(serviceAreas);
      setjurisdiction(localJurisdiction);
      setDescription(data.description);
      setNameProject(data.project_name);
      setProjectId(data.project_id);
      setIsCountyWide(data.is_county_wide);
      setIsSouthPlate(data.is_located_on_south_plate_river);
      if(data.is_county_wide){
        setShowCounty(true);
        setShowDraw(false);
      }else{
        setShowCounty(false);
        setShowDraw(true);
      }
      const coEsponsor = data.project_partners.map((e: any) => {
        if (e.code_partner_type_id === 12) {
          return titleCase(e.business_associate.business_name)
        }
        return undefined;
      }).filter((e: any) => !!e);
      const sponsor = data.project_partners.map((e: any) => {
        if (e.code_partner_type_id === 11) {
          return e.business_associate.business_name
        }
        return undefined;
      }).filter((e: any) => !!e).join("");
      setCosponsor(coEsponsor);
      setSponsor(titleCase(sponsor));
      setSwSave(true);
      setIsEdit(true);
      setEditsetprojectid(data.project_id);
      if (selectedTypeProject === 'capital') {        
        const aditionalCostObject = data.project_costs.filter((e: any) => e.code_cost_type_id === 4)[0];
        setComponentIntersected(data.project_proposed_actions || []);
        setAdditionalCost(parseInt(aditionalCostObject?.cost || '0'));
        setAdditionalDescription(aditionalCostObject?.cost_description);
        if (data.project_costs.length > 0) {
          const parsed = getProjectOverheadCost(data.project_costs);
          setOverheadCosts(parsed);
        }
        setTimeout(() => {
          getGEOMByProjectId(data.project_id)
        }, 2200);
      }
      if (selectedTypeProject === 'study') {
        setStudyReason(data?.project_details[0]?.code_study_reason_id);
        setOtherReason(data?.project_details[0]?.comment);
      }
      if (selectedTypeProject === 'acquisition') {
        setTimeout(() => {
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
        }, 1200);
        if (data?.project_details[0]?.code_acquisition_progress_status_id == null) {
          setProgress('');
        } else {
          setProgress(data?.project_details[0]?.code_acquisition_progress_status_id);
        }
        if (data?.project_details[0]?.acquisition_anticipated_year == null) {
          setPurchaseDate('');
        } else {
          setPurchaseDate(data?.project_details[0]?.acquisition_anticipated_year);
        }
      }
      if (selectedTypeProject === 'maintenance') {
        setTimeout(() => {
          getGEOMByProjectId(data.project_id);
        }, 2200);
        if (data?.code_maintenance_eligibility_type_id === null) {
          setEligibility('');
        } else {
          setEligibility(data?.code_maintenance_eligibility_type_id);
        }
        if (data?.project_details[0]?.maintenance_frequency === null) {
          setFrequency('');
        } else {
          if (data?.project_details[0]?.maintenance_frequency === 0) {
            setFrequency('None');
          } else {
            setFrequency(data?.project_details[0]?.maintenance_frequency);
          }
        }
        if (data?.project_details[0]?.is_routine) {
          setIsRoutine(true);
        }else{
          setIsRoutine(false);
        }
        if (data?.project_details[0]?.is_public_ownership === true) {
          console.log(data?.project_details[0]?.is_public_ownership === true);
          setOwnership(true);
        } else {
          console.log(data?.project_details[0]?.is_public_ownership === true);
          setOwnership(false);
        }
      }   
      if (selectedTypeProject === 'special') {
        setTimeout(() => {
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
        }, 1200);
      }
    } else {
      setStreamIntersected([]);
      setIndComponents([]);
      setIndependentComponents([]);
      setEditLocation(undefined);
    }
  }, [data]);
  //Send for Create Data or Edit Data
  useEffect(() => {
    let serviceAreaIds: any = [];
    let countyIds: any = [];
    let jurisdictionIds: any = [];
    const jurisdictionList: any = [];
    const countyList: any = [];
    const serviceAreaList: any = [];
    if (save === true) {
      setLoading(true);
      groupOrganization.forEach((item: any) => {
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
      let serviceA = serviceArea.map((element: any) => element.replace(' Service Area', ''));
      let countyA = county.map((element: any) => element.replace(' County', ''));
      serviceAreaIds = serviceAreaList.filter((service: any) => serviceA.includes(service.name)).map((service: any) => service.id);
      countyIds = countyList.filter((countys: any) => countyA.includes(countys.name)).map((countyl: any) => countyl.id);
      jurisdictionIds = jurisdictionList.filter((juris: any) => jurisdiction.includes(juris.name)).map((juris: any) => juris.id);
      const filteredCountyList = countyList.filter((county: any) => county.name.toLowerCase().includes('county'));
      let sponsorList = [...serviceAreaList, ...filteredCountyList, ...jurisdictionList];
      let matchedSponsor = sponsorList.find((item: any) => sponsor.toLowerCase() === item.name.toLowerCase());
      let sponsorId = matchedSponsor ? matchedSponsor.id : null;
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var capital = new Project();
      //general
      capital.locality = _locality;
      capital.year = _year ? _year : (capital.year ?? '1900');
      let csponsor = "";
      if (cosponsor) {
        cosponsor.forEach((element: any) => {
          csponsor = csponsor + element + ",";
        });
        if (cosponsor.length != 0) {
          csponsor = csponsor.substring(0, csponsor.length - 1)
        }
      }
      capital.servicearea = serviceAreaIds;
      capital.county = countyIds;
      capital.jurisdiction = jurisdictionIds;
      capital.sponsor = sponsor === 'Select a Sponsor' ? '' : sponsor;
      capital.sponsorId = sponsorId;
      capital.cosponsor = csponsor;
      capital.projectname = nameProject;
      capital.description = description;      
      capital.files = files;
      capital.editProject = editprojectid;
      capital.cover = '';
      capital.sendToWR = sendToWR;
      capital.isWorkPlan = isWorkPlan;
      capital.type = selectedTypeProject == 'special' ? (+capital.year >= 2024 ? 'r&d': selectedTypeProject): selectedTypeProject;
      capital.isCountyWide = isCountyWide ? isCountyWide : false;
      capital.isSouthPlate = isSouthPlate ? isSouthPlate : false;
      changeAddLocationState(false);
      //capital 
      if (selectedTypeProject === 'capital') {
        capital.geom = streamIntersected.geom;
        capital.overheadcost = overheadCosts;
        capital.overheadcostdescription = overheadDescription;
        capital.additionalcost = additionalCost;
        capital.additionalcostdescription = additionalDescription;
        capital.components = componentsToSave ? JSON.stringify(componentsToSave, null, 2) : [];
        capital.independentComponent = JSON.stringify(thisIndependentComponents, null, 2);
        capital.estimatedcost = getTotalCost();
        capital.componentcost = getSubTotalCost();
        capital.componentcount = (
          componentsToSave?.length > 0 ?
            componentsToSave.length : 0) +
          (thisIndependentComponents?.length > 0 ? thisIndependentComponents.length : 0);
        let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
        capital.ids = mhfd_codes;
        let newStreamsArray: any = [];
        for (let str in listStreams) {
          newStreamsArray = [...newStreamsArray, ...listStreams[str]];
        }
        capital.streams = newStreamsArray;
      }     
      //maintenance
      if (selectedTypeProject === 'maintenance') {
        capital.is_routine = isRoutine;
        capital.geom = streamIntersected.geom;
        capital.projectsubtype = subType;
        capital.frequency = frequency === 'None' ? 0 : frequency;
        capital.maintenanceeligibility = eligibility;
        capital.ownership = String(ownership);
        let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
        capital.ids = mhfd_codes;
        let newStreamsArray: any = [];
        for (let str in listStreams) {
          newStreamsArray = [...newStreamsArray, ...listStreams[str]];
        }
        capital.streams = newStreamsArray;
      }      
      //study
      if (selectedTypeProject === 'study') {
        let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
        capital.ids = mhfd_codes;
        let newStreamsArray: any = [];
        for (let str in listStreams) {
          newStreamsArray = [...newStreamsArray, ...listStreams[str]];
        }
        capital.streams = newStreamsArray;
        capital.studyreason = studyreason;
        capital.otherReason = otherReason;
      }
      //acquisition
      if (selectedTypeProject === 'acquisition') {
        capital.geom = geom;
        capital.acquisitionprogress = progress;
        capital.acquisitionanticipateddate = purchaseDate;
      }
      //special
      if (selectedTypeProject === 'special') {
        capital.geom = geom;
      }
      files.forEach((file: any) => {
        if (file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      removeAttachment(deleteAttachmentsIds);
      if (swSave) {
        editProjectCapital(capital);
      }
      else {
        saveProjectCapital(capital);
      }
      // setVisible(false);
    }
  }, [save]);
  useEffect(() => {
    if(status === 1 || status === 0) {
      setVisible(false);
      setVisibleCapital(false);
      setLoading(false);
    } else {
      setLoading(false);
      setSave(false);
    }
  }, [status]);

  //Disable fields in edit workplan if the user is LG
  useEffect(() => {
    if (disabledLG && isWorkPlan && swSave) {
      setDisableFieldsForLg(true);
    }else{
      setDisableFieldsForLg(false);
    }
  }, [disabledLG, isWorkPlan, swSave]);

  const handleOk = (e: any) => {
    datasets.postData(SERVER.CHECK_PROJECT_NAME, { project_name: nameProject }, datasets.getToken()).then(data => {
      if (data.exists && !swSave) {
        handleNotification(`Project name already exists.`);
      } else {
        if (!disable) {
          setVisibleAlert(true);
        } else {
          let missingFields = [];
          if (!description) missingFields.push('Description');
          if (!county?.length) missingFields.push('County');
          if (!serviceArea?.length) missingFields.push('Service Area');
          if (!jurisdiction?.length) missingFields.push('Jurisdiction');
          if (!nameProject) missingFields.push('Project Name');
          if (!sponsor) missingFields.push('Sponsor');
          const isGeom = (selectedTypeProject === 'capital' || selectedTypeProject === 'maintenance');
          const isPin = (selectedTypeProject === 'acquisition' || selectedTypeProject === 'special');
          let geomLengthFlag = false;
          if ((geom?.coordinates || streamIntersected?.geom) && isGeomDrawn===true) {
            geomLengthFlag = true;
          } else {
            geomLengthFlag = false;
          }
          if (isGeom && !geomLengthFlag && !isCountyWide) missingFields.push('Geometry');
          if (isPin && !geom && !isCountyWide) missingFields.push('Pin');
          if (selectedTypeProject === 'study' && !streamsIntersectedIds.length && !isCountyWide) missingFields.push('Geometry');
          if (selectedTypeProject === 'study' && !studyreason) missingFields.push('Study Reason');
          if (selectedTypeProject === 'capital' && !componentsToSave?.length && !thisIndependentComponents?.length) missingFields.push('Proposed Actions or Independent Actions');
          if (selectedTypeProject === 'acquisition' && !progress) missingFields.push('Progress');
          if (selectedTypeProject === 'acquisition' && !purchaseDate) missingFields.push('Purchase Date');
          if (selectedTypeProject === 'maintenance' && !frequency) missingFields.push('Frequency');
          if (selectedTypeProject === 'maintenance' && !eligibility) missingFields.push('Eligibility');
          if (thisIndependentComponents.length && !checkIfIndependentHaveName()) {
            missingFields.push('Independent actions name');
          }
          if (missingFields.length > 0) {
            handleErrorNotification(missingFields);
          }else{
            handleNotification('Please fill out all required fields.');
          }
        }
      }
    })
  };

  const checkIfIndependentHaveName = () => {
      let result = true;
      thisIndependentComponents.forEach((comp: any) => {
        if(!comp.name || comp.name === 'Proposed Actions'){
          result = false;
        }
      });
      return result;
    }
  //Check if required fields are filled to enable save button
  useEffect(()=>{    
    let disableEditForLG = disabledLG && isWorkPlan && swSave;    
    if (!disableEditForLG) {  
      const pinFlag = (selectedTypeProject === 'acquisition'
        || selectedTypeProject === 'special')
        && (geom || isCountyWide);
      let geomLengthFlag = false;
      if ((geom?.coordinates || streamIntersected?.geom)) {
        geomLengthFlag = true;
      } else {
        geomLengthFlag = false;
      }
      if (description && county?.length && serviceArea?.length && jurisdiction?.length && nameProject && sponsor && nameProject !== 'Add Project Name' && checkIfIndependentHaveName()) {
        if (selectedTypeProject === 'study' && studyreason && (streamsIntersectedIds.length || isCountyWide)) {
          setDisable(false);
        } else if (selectedTypeProject === 'capital' && (thisIndependentComponents?.length > 0 || componentsToSave?.length > 0) && (geomLengthFlag || isCountyWide)) {
          setDisable(false);
        } else if (selectedTypeProject === 'special' && (pinFlag || isCountyWide)) {
          setDisable(false);
        } else if (selectedTypeProject === 'maintenance' && (geomLengthFlag || isCountyWide) && frequency && eligibility) {
          setDisable(false);
        } else if (selectedTypeProject === 'acquisition' && progress && purchaseDate && (pinFlag || isCountyWide)) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      } else {
        setDisable(true);
      }
    }
  },[
    geom,
    description,
    county,
    serviceArea ,
    sponsor,
    nameProject,
    componentsToSave,
    streamIntersected,
    jurisdiction,
    selectedTypeProject,
    studyreason,
    thisIndependentComponents,
    progress,
    purchaseDate,
    streamsIntersectedIds,
    frequency,
    eligibility,
    isCountyWide
  ]);

  useEffect(() => {
    if(componentsFromMap.length > 0 ) {      
      getListComponentsByComponentsAndPolygon(componentsFromMap, null);
    } else {
      setComponentIntersected([]);
    }
  }, [componentsFromMap]);
  
  function titleCase(str: any) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }  

  useEffect(()=>{
    setIndependentComponents(independentComponents);
  },[independentComponents]);

  useEffect(()=>{
    if(componentsFromMap?.length > 0 ) {
      if(componentsFromMap.length > 0  && listComponents.length > 0){
        getListComponentsByComponentsAndPolygon([...listComponents, ...componentsFromMap], null);
      } else if(listComponents.length == 0 && componentsFromMap.length > 0) {
        getListComponentsByComponentsAndPolygon([ ...componentsFromMap], null);
      } else if(listComponents.length > 0 && componentsFromMap.length == 0) {
        getListComponentsByComponentsAndPolygon([ ...listComponents], null);
      }
    }
  },[componentsFromMap]);
  
  useEffect(() => {
    if (selectedTypeProject === 'capital' || selectedTypeProject === 'maintenance' || selectedTypeProject === 'study') {
            setGeom(userPolygon);
    }
  }, [userPolygon, selectedTypeProject]);

  useEffect(()=>{
        if(listComponents && listComponents.groups && listComponents.result.length > 0){
      const myset = new Set(keys);
      Object.keys(listComponents.groups).forEach((key:any, id:any) => {
        if(!groups[key]){
          myset.add(key+'-collapse1');
        } else if( listComponents.groups[key].components.length != groups[key].components.length){
          myset.add(key+'-collapse1');
        }
      });
      setKeys(Array.from(myset));
      setGroups(listComponents.groups);
      let newC = listComponents.result.map((c:any) => {
        return { table: c.table, objectid: c.objectid}
      })
      setComponentsToSave(newC);
    } else {
      setGroups({});
      setComponentsToSave([]);
    }
  },[listComponents]);  

  const onChangeAdditionalCost = (e: any) => {
    let newValue = e.target.value
    newValue = newValue.replace(/-/g, '');
    let value = newValue.replace("$", "");
    value = value.replace(",", "");
    if (value) {
      setAdditionalCost(parseInt(value));
    } else {
      setAdditionalCost(parseInt('0'));
    }
  };
  const onChangeAdditionalDescription = (e: any) =>{
    setAdditionalDescription(e.target.value);
  };
  const onChangeOverheadDescription = (e: any) =>{
    setOverheadDescription(e.target.value);
  };

  useEffect(() => {
    getTextWidth(nameProject);
  },[nameProject]);
  const onChange = (e: any) =>{
    setNameProject(e.target.value);
  };

  const handleCancel = (e: any) => {
    const auxState = {...state};
    setVisibleCapital (false);
    setState(auxState);
    setVisible(false);
  };

  const onClickDraw = () => {
    setIsDraw(!isDrawState);
    setIsDrawCapital(false);
  }
  useEffect(()=>{
    changeDrawState(isDrawState);
  },[isDrawState]);
  useEffect(()=>{
    if(isDrawState && !isDraw){
      setIsDraw(isDraw);
    }
    if(isDrawStateCapital && !isDraw) {
      setIsDrawCapital(isDraw);
    }
  },[isDraw]);

  const onClickDrawCapital = () => {
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
    if ( selectedTypeProject !== 'study') {
      setStreamsList([]);
    }
    setIsDrawCapital(!isDrawStateCapital);
    setIsDraw(false);
  }
  useEffect(()=>{
    changeDrawStateCapital(isDrawStateCapital);
  },[isDrawStateCapital]);

  useEffect(()=>{
    if(isDrawStateCapital && !isDrawCapital){
      setIsDrawCapital(isDrawCapital);
    }
  },[isDrawCapital]);

  useEffect(()=>{
    if(thisIndependentComponents.length > 0 ){
      setVisibleUnnamedComponent(true);
    } else {
      setVisibleUnnamedComponent(false);
    }
  },[thisIndependentComponents]);

  useEffect(()=>{
    if((((listComponents && listComponents.groups && listComponents.result.length > 0)) || thisIndependentComponents.length > 0) && !flagInit) {
      flagInit = true;
    }
  },[thisIndependentComponents, listComponents])

  const applyIndependentComponent = () => {
    let index = 0;
    if(thisIndependentComponents.length > 0) {      
      index = thisIndependentComponents[thisIndependentComponents.length - 1].index;
    }
    let component = {
      key: index + 1,
      index: index + 1,
      name:undefined,
      status:'Proposed',
      cost:0,
    };
    setIndependentComponents([...thisIndependentComponents,component]);
  };
  const removeComponent = (component: any) => {
    let newComponents: any = [];
    let currentComponents = listComponents.result;
    newComponents = currentComponents
      .filter((comp: any) => !(comp.cartodb_id === component.cartodb_id && comp.table === component.table))
      .map((comp: any) => ({
        ...comp,
        source_table_name: comp.table,
        object_id: comp.objectid
      }));
    getListComponentsByComponentsAndPolygon(newComponents, null);
    setComponentsToSave(newComponents);
  }

  useEffect(() => {
    const subtotalCost = getSubTotalCost();
    if (data !== 'no data') {
      const parsed = getProjectOverheadCost(data.project_costs);
      let newOverheadValue: any = [];
      if (listComponents && listComponents.result && subtotalCost !== 0 && !(parsed.every((elem: any) => elem === 0))) {
        parsed.forEach((overheadcost: any, index: number) => {
          if (index > 0) {
            newOverheadValue[index] = Math.round((overheadcost * 100) / subtotalCost)
          } else {
            newOverheadValue[index] = 0
          }
        });
        setOverheadValues(newOverheadValue)
      }
    }
    if (subtotalCost === 0) {
      setOverheadValues([0, 5, 0, 0, 5, 15, 5, 10, 25])
    }
  }, [listComponents, thisIndependentComponents])

  useEffect(()=>{
    if(!(overheadValues.every((elem:any)=> elem ===0))){
      let newOverheadCosts = [...overheadCosts];
      overheadValues.forEach((element:any, index:any) => {
        newOverheadCosts[index] = (element*getSubTotalCost())/100;
        newOverheadCosts[index] = parseInt(newOverheadCosts[index]);
      });
      setOverheadCosts(newOverheadCosts);
    }
  },[overheadValues, thisIndependentComponents, listComponents]);

  
  const changeValue = (e:any, index:any) => {
    let newoverhead = [...overheadValues];
    newoverhead[index] = parseInt(e);
    setOverheadValues(newoverhead);
  }

  const getSubTotalCost = () => {
    let subtotalcost = 0;
    if(listComponents && listComponents.result) {
      let totalcomponents = listComponents.result;
      for( let component of totalcomponents) {
        subtotalcost += component.original_cost;
      }
    }
    if(thisIndependentComponents.length > 0) {
      for( let comp of thisIndependentComponents) {
        subtotalcost += parseFloat(comp.cost) ;
      }
    }
    return subtotalcost;
  }

  const getOverheadCost = () => {
    let overheadcost = overheadCosts.reduce((a:any, b:any) => a + b, 0);
    return overheadcost;
  }

  const changeValueIndComp = (value:any, key:any, indComp:any) => {
    let currentComponents = [...thisIndependentComponents];
    for(let ic of currentComponents) {
      if( ic.index == indComp.index) {
        let newIC = indComp;
        let newValue=value.target.value
        if(key === 'cost'){
          let vAlue = newValue.replace("$", "");
          vAlue = vAlue.replaceAll(",", "");
          if(vAlue){
            newIC[key] = parseInt (vAlue);
          }else{
            newIC[key] = parseInt ('0');
          }
        }
        else{
          newIC[key] = newValue;
        }
        ic = newIC;
      }
    }
    setIndependentComponents([...currentComponents]);
  }

  const removeIndComponent = (indComp: any) => {
    let currentComponents = [...thisIndependentComponents];
    currentComponents = currentComponents.filter( (comp: any) => ( comp.index !== indComp.index ) );
    setIndependentComponents([...currentComponents]);
  }

  const getTotalCost = () =>{
    let n = getSubTotalCost() + additionalCost + getOverheadCost();
    return(n);
  }
    
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

  const getServiceAreaAndCountyString = (jurisdictions: string[], serviceArea: string[], county: string[]): string => {
    const serviceAreaWithoutLabel = serviceArea?.map(area => area.replace(' Service Area', ''));
    const countyWithoutLabel = county?.map(county => county.replace(' County', ''));
    let result = '';
    if (jurisdictions?.length > 0) {
      result += jurisdictions.length > 1 ? 'Multiple Jurisdictions' : `${jurisdictions[0]}`;
    }
    if (serviceAreaWithoutLabel?.length > 0) {
      if (result){
        result += ' · ';
      }
      result += serviceAreaWithoutLabel.length > 1 ? 'Multiple Service Areas' : `${serviceAreaWithoutLabel[0]} Service Area`;
    }    
    if (countyWithoutLabel?.length > 0) {
      if (result){
        result += ' · ';
      }
      result += countyWithoutLabel.length > 1 ? 'Multiple Counties' : `${countyWithoutLabel[0]} County`;
    }
    return result;
  };

  const RestartLocation = () => {
    setGeom(undefined);
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
  }

  useEffect(() => {
    if ((['capital', 'maintenance'].includes(lastValue)) && (['acquisition', 'special'].includes(selectedTypeProject))) {
      RestartLocation();
    }
    if ((['acquisition', 'special'].includes(lastValue)) && (['capital', 'maintenance'].includes(selectedTypeProject))) {
      RestartLocation();
    }
    if ((['study'].includes(lastValue)) && (['capital', 'maintenance', 'acquisition', 'special'].includes(selectedTypeProject))) {
      RestartLocation();
    }
    if ((['capital', 'maintenance', 'acquisition', 'special'].includes(lastValue)) && (['study'].includes(selectedTypeProject))) {
      RestartLocation();
    }
  },[selectedTypeProject]);

  useEffect(() => {
    if (listStreams) {
      const idKey: any = [];
      const myset = new Set(keys);
      Object.keys(listStreams).forEach((key: any, id: any) => {
        if (!streamsList[key]) {
          myset.add(`${key}`);
        } else if (streamsList[key].length !== listStreams[key].length) {
          myset.add(`${key}`);
        }
        idKey.push(`${key}`);
      })
      setKeys(Array.from(myset));
      setThisStreamsList(listStreams);
    }
  }, [listStreams]);

  useEffect(() => {
    if (showCounty) {
      if(county.length > 0) {
        const countyList: any = [];
        groupOrganization.forEach((item: any) => {
          if (item.table === 'CODE_STATE_COUNTY') {
            item.name = item.name.replace(' County', '');
            countyList.push(item);
          }
        });
        let countyA = county.map((element: any) => element.replace(' County', ''));
        let countyIds = countyList.filter((countys: any) => countyA.includes(countys.name)).map((countyl: any) => countyl.id);
        datasets.postData(SERVER.GET_COUNTY_DATA_CREATE, { state: countyIds }, datasets.getToken()).then(data => {
          const serviceAreaNames = data.serviceArea.map((item: any) => item.service_area_name);
          const localGovernmentNames = data.localGovernment.map((item: any) => item.local_government_name);
          setServiceArea(serviceAreaNames);
          setjurisdiction(localGovernmentNames);
        })
      }else{
        setServiceArea([]);
        setjurisdiction([]);
      }      
    }
  }, [county]);

  //capital
  useEffect(() => {
    if (Array.isArray(groups)) {
      const output = groups.flatMap((x: any) =>
        x?.components?.map((y: any) => ({
          key: y.object_id,
          action: y.table,
          cost: y.original_cost,
          status: 'Active',
          problem: x.problemname,
          cartodb_id: y.cartodb_id,
          table: y.table,
        }))
      );
      setGroupParsed(output);
    }
  }, [groups]);

  //maintenance functions
  const applyFrequency = (e: any) => {
    setFrequency(e);
  };
  const applyEligibility = (e: any) => {
    setEligibility(e);
  };
  const applyOwnership = (e: any) => {
    setOwnership(e);
  };

  //acquisition special functions
  useEffect(()=> {
    if(isEditingPosition && (selectedTypeProject === 'acquisition'|| selectedTypeProject === 'special')){
      setServiceArea([])
      setCounty([])
      setjurisdiction([])
    }
  },[isEditingPosition])

  const handleErrorNotification = (emptyFields: any[]) => {
    const inputLength = emptyFields.length;
    const inputText = inputLength>1?"inputs":"input";
    const message = `Missing ${inputText}: ${emptyFields.join(', ')}.`;
    openNotification(`Warning! Required ${inputText} are missing below.`, "warning", message);
  }

  const handleNotification = (message: string) => {
    openNotification(`Warning!`, "warning", message);
  }
  
  let indexForm = 1;

    return (
    <>
    {loading && <LoadingViewOverall></LoadingViewOverall>}
    {visibleAlert && <AlertView
      isWorkPlan={isWorkPlan}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
      jurisdictions={jurisdiction}
      counties={county}
      serviceareas={null}
      type={selectedTypeProject}
      isEdit={swSave}
      sendToWr={sendToWR}
      setsendToWR={setsendToWR}
      locality={[locality.replace(' Work Plan', '')]}
      sponsor = {sponsor}
    />}
     <Modal
       centered
       maskClosable={false}
       visible={visibleCapital}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width={pageWidth >3000 ? "2000px" : "90.5%"}
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <CreateProjectMap type={selectedTypeProject.toUpperCase()} locality={locality} projectid={projectid} isEdit={swSave} problemId={problemId} lastValue={lastValue}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Header
            nameProject={nameProject}
            onChange={onChange}
            favorite={favorite}
            setFavorite={setFavorite}
            menuTypeProjects={menuTypeProjects}
            locationData={getServiceAreaAndCountyString(jurisdiction, serviceArea, county)}
            selectedType={selectedLabelProject}
            isEdit = {swSave}
          />          
          {/* { tabs- options } */}
          {/* <div className='header-tab'>
            <p className={activeTabBodyProject ===  'Details'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Details')}}>Details</p>
            <p className={activeTabBodyProject ===  'Discussion'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Discussion')}}>Discussion</p>
            <p className={activeTabBodyProject ===  'Activity'? 'tab active-tab': 'tab'} onClick={()=>{setActiveTabBodyProject('Activity')}}>Activity</p>
          </div>
          {activeTabBodyProject === 'Details' && <> */}
            <div className="body-project">
              {
                (isWorkPlan && showCheckBox && !swSave) &&  
                <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div className='span-project-text'>
                    <Checkbox className='checkbox-body-project' checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
              <ProjectInformation
                type={selectedTypeProject}
                description = {description}
                setDescription = {setDescription}
                frequency={frequency}
                applyFrequency={applyFrequency}
                eligibility={eligibility}
                applyEligibility={applyEligibility}
                ownership={ownership}
                applyOwnership={applyOwnership}
                reason={studyreason}
                setReason={setStudyReason}
                otherReason={otherReason}
                setOtherReason={setOtherReason}
                progress={progress}
                setProgress={setProgress}
                purchaseDate={purchaseDate}
                setPurchaseDate={setPurchaseDate}
                isRoutine={isRoutine}
                setIsRoutine={setIsRoutine}
                year={year}
                index= {indexForm++}
              />
              {selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Capital.toLowerCase() && 
                <ProposedActions
                  keys={keys}
                  groups={groups}
                  removeIndComponent={removeIndComponent}
                  removeComponent={removeComponent}
                  thisIndependentComponents={thisIndependentComponents}
                  setThisIndependentComponents={setIndependentComponents}
                  visibleUnnamedComponent={visibleUnnamedComponent}
                  isDrawState={isDrawState}
                  onClickDraw={onClickDraw}
                  applyIndependentComponent={applyIndependentComponent}
                  contentIndComp={contentIndComp}
                  changeValueIndComp={changeValueIndComp}
                  index={indexForm++}
                />
              }
              {(selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Capital.toLowerCase()||
              selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Maintenance.toLowerCase()||
              selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Study.toLowerCase()) &&
                <div className="sub-title-project">
                  <h5 className="geometry">{indexForm++}. PROJECT GEOMETRY *</h5>
                </div>
              }
              {
                (selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Acquisition.toLowerCase()||
                selectedTypeProject && selectedTypeProject?.toLowerCase() === 'special') &&
                <div className="sub-title-project">
                  <h5 className="requestor-information">
                    {indexForm++}. Drop Pin *
                  </h5>
                </div>
              }
              <Countywide
                county={county}
                setCounty={setCounty}
                setShowDraw={setShowDraw}
                showDraw={showDraw}
                showCounty={showCounty}
                setShowCounty={setShowCounty} 
                isSouthPlate={isSouthPlate}
                setIsSouthPlate={setIsSouthPlate}
                isCountyWide={isCountyWide}
                setIsCountyWide={setIsCountyWide}
              />
              {(selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Capital.toLowerCase()||
              selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Maintenance.toLowerCase()||
              selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Study.toLowerCase()) && 
                <ProjectGeometry
                  isDrawStateCapital={isDrawStateCapital}
                  onClickDrawCapital={onClickDrawCapital}
                  showDraw={showDraw}
                  type = {selectedTypeProject}
                />              
              }
              {(selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Acquisition.toLowerCase()||
                selectedTypeProject && selectedTypeProject?.toLowerCase() === 'special') &&
                <DropPin
                  typeProject={selectedTypeProject}
                  geom={geom}
                  setGeom={setGeom}
                  setIsEditingPosition={setIsEditingPosition}
                  showDraw={showDraw}
                />
              }
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
                isCapital={true}
                originModal={selectedTypeProject}
                index={indexForm++}
              />
              <RequestorInformation
                index = {indexForm++}
                sponsor = {sponsor}
                setSponsor = {setSponsor}
                cosponsor = {cosponsor}
                setCoSponsor = {setCosponsor}                
                originModal={selectedTypeProject}
                projectId = {projectid}
              />
              {selectedTypeProject && selectedTypeProject?.toLowerCase() === NEW_PROJECT_TYPES.Capital.toLowerCase() &&
                <FinancialInformation
                  formatter={formatter}
                  getSubTotalCost={getSubTotalCost}
                  getOverheadCost={getOverheadCost}
                  onChangeOverheadDescription={onChangeOverheadDescription}
                  overheadDescription={overheadDescription}
                  onChangeAdditionalCost={onChangeAdditionalCost}
                  additionalCost={additionalCost}
                  additionalDescription={additionalDescription}
                  contentOverheadCost={contentOverheadCost}
                  contentAdditionalCost={contentAdditionalCost}
                  getTotalCost={getTotalCost}
                  onChangeAdditionalDescription={onChangeAdditionalDescription}
                  overheadValues={overheadValues}
                  overheadCosts={overheadCosts}
                  changeValue={changeValue}
                  index={indexForm++}
                />
              }       
              <EditAmountCreateProject 
                index={indexForm++}
                type={selectedTypeProject}
                project_id={data?.project_id}
                getTotalCost={getTotalCost}
                save={save}
                subType={subType}
              />                 
              <UploadImagesDocuments
                isCapital={true}
                setFiles={setFiles}
                index={indexForm++}
                type={''}
                visibleCapital={visibleCapital}
              />
            </div>
          {/* </>}
          {activeTabBodyProject === 'Discussion' &&
          <DiscussionCreateProject/>}
          {activeTabBodyProject === 'Activity' &&
          <ActivitiCreateProject/>} */}
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk}><span className="text-color-disable">Save Draft Project</span></Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
