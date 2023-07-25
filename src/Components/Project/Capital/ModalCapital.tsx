import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Row, Col, Popover, Select, Collapse, Timeline , Tooltip, Checkbox, Dropdown, Table, Radio } from 'antd';
import { DeleteOutlined, DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, PlusCircleFilled, UpOutlined } from '@ant-design/icons';
import CreateProjectMap from 'Components/CreateProjectMap/CreateProjectMap';
import { AlertView } from 'Components/Alerts/AlertView';
import { ProjectInformation } from 'Components/Project/TypeProjectComponents/ProjectInformation';
import { LocationInformation } from 'Components/Project/TypeProjectComponents/LocationInformation';
import { useProjectState, useProjectDispatch } from 'hook/projectHook';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { Project } from 'Classes/Project';
import { useProfileState } from 'hook/profileHook';
import { ADMIN, STAFF, WINDOW_WIDTH, WORK_PLAN_TAB } from 'constants/constants';
import { useHistory } from 'react-router-dom';
import { UploadImagesDocuments } from 'Components/Project/TypeProjectComponents/UploadImagesDocuments';
import store from 'store';
import { getProjectOverheadCost } from 'utils/parsers';
import { useMapState } from 'hook/mapHook';
import TypeProjectsFilter from 'Components/FiltersProject/TypeProjectsFilter/TypeProjectsFilter';

const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>);
const contentIndComp = (<div className="popver-info">Independent Actions should be added to represent any known project actions that are not already shown in the Actions layer. Independent Action costs should reflect only the cost of construction; they will have Overhead Costs applied to them</div>);
const contentOverheadCost = (<div className="popver-info"> Overhead Cost includes all costs beyond the costs of physical construction (Subtotal Cost). The default values shown here can and should be changed when different percentages are anticipated, such as in urban settings. Please add a description explaining any changes from default values. </div>);
const contentAdditionalCost = (<div className="popver-info"> Enter any additional costs here that were not captured previously as Actions, Independent Actions, or Overhead Costs. Additional Costs (unlike Independent Actions) will NOT have Overhead Costs applied to them. </div>);
const content10 = (<div className="popver-info">The Action Status indicates whether or not the Action has already been built (Complete) or still needs to be built (Proposed).</div>);
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
export const ModalCapital = ({visibleCapital, setVisibleCapital, nameProject, setNameProject, typeProject, setVisible, locality, data, editable, problemId}:
  {visibleCapital: boolean, setVisibleCapital: Function, nameProject: string , setNameProject: Function, typeProject: string, setVisible: Function, locality?:any, data:any, editable:boolean, problemId?: any}) => {
 
  const {
    saveProjectCapital,
    saveOverheadCost, 
    setComponentIntersected, 
    getListComponentsByComponentsAndPolygon, 
    setStreamIntersected, 
    setHighlightedComponent, 
    setStreamsIds, 
    setIndComponents, 
    getGEOMByProjectId, 
    editProjectCapital, 
    setServiceAreaCounty, 
    setJurisdictionSponsor, 
    getZoomGeomComp, 
    getZoomGeomProblem, 
    setHighlightedProblem, 
    setIsEdit,
    setDeleteAttachmentsIds
  } = useProjectDispatch();
  const {
    listComponents, 
    componentsFromMap, 
    userPolygon, 
    streamIntersected, 
    independentComponents, 
    isEdit,
    deleteAttachmentsIds
  } = useProjectState();
  const { userInformation } = useProfileState();
  const [state, setState] = useState(stateValue);
  const [description, setDescription] =useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const [isDrawStateCapital, setIsDrawCapital] = useState(false);
  const {changeDrawState, changeDrawStateCapital, setEditLocation,setComponentsFromMap } = useProjectDispatch();
  const [sponsor, setSponsor] = useState("");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId ] = useState(-1);
  const {isDraw, isDrawCapital} = useProjectState();
  const [save, setSave] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [groups,setGroups] = useState<any>({});
  const [componentsToSave, setComponentsToSave] = useState([]);
  const [geom, setGeom] = useState();
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
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const { toggleAttachmentCover , removeAttachment } = useAttachmentDispatch();
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const { groupOrganization } = useProfileState();
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);
  const [activeTabBodyProject, setActiveTabBodyProject] = useState('Details');
  const [favorite, setFavorite] = useState(false);

  //list Menu TypeProjects
  const menuTypeProjects = <TypeProjectsFilter />;

  //Delete all data when opening
  useEffect(() => {
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    setStreamsIds([]);
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

  //Load Data if is Edit
  useEffect(()=>{
    setIsEdit(false);
    if(data !== 'no data' ) {
      const counties = data.project_counties.map(( e :any ) => e?.CODE_STATE_COUNTY?.county_name);
      const serviceAreas = data.project_service_areas.map((e: any) => e?.CODE_SERVICE_AREA?.service_area_name);
      const localJurisdiction = data.project_local_governments.map((e:any) => e?.CODE_LOCAL_GOVERNMENT?.local_government_name);
      const aditionalCostObject = data.project_costs.filter((e:any) => e.code_cost_type_id === 4)[0];
      const coEsponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 12) {
          return titleCase(e.business_associate.business_name)
        }
        return undefined;
      }).filter((e:any)=> !!e);
      const sponsor = data.project_partners.map((e:any) => {
        if (e.code_partner_type_id === 11) {
          return e.business_associate.business_name
        }
        return undefined;
      }).filter((e:any)=> !!e).join("");
      setComponentIntersected(data.project_proposed_actions || []);
      setSwSave(true);
      setIsEdit(true);
      setCounty(counties);
      setServiceArea(serviceAreas);
      setjurisdiction(localJurisdiction);
      setCosponsor(coEsponsor);
      setDescription(data.description);
      setNameProject(data.project_name);
      setProjectId(data.project_id);
      setEditsetprojectid(data.project_id);
      setAdditionalCost(parseInt(aditionalCostObject?.cost || '0'));
      setAdditionalDescription(aditionalCostObject?.cost_description);
      if (data.project_costs.length > 0) {
        const parsed = getProjectOverheadCost(data.project_costs);
        setOverheadCosts(parsed);
      }
      setSponsor(titleCase(sponsor));
      setTimeout(()=>{
        getGEOMByProjectId(data.project_id)
      },2200);
    } else {
      setStreamIntersected([]);
      setIndComponents([]);
      setIndependentComponents([]);
      setEditLocation(undefined);
    }
  },[data]);

  //Send for Create Data or Edit Data
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
      var capital = new Project();
      capital.locality = _locality;      
      capital.year = _year ?? capital.year;
      let csponsor = "";
      if(cosponsor){
        cosponsor.forEach((element:any) => {
          csponsor= csponsor + element + ",";
        }); 
        if(cosponsor.length != 0 ){
          csponsor = csponsor.substring(0, csponsor.length-1)
        }
      }
      capital.servicearea = serviceAreaIds;
      capital.county = countyIds;
      capital.jurisdiction= jurisdictionIds;
      capital.sponsor = sponsor === 'Select a Sponsor' ? '' : sponsor;
      capital.cosponsor = csponsor;
      capital.projectname = nameProject;
      capital.description = description;
      capital.geom = streamIntersected.geom;
      capital.files = files ;
      capital.overheadcost = overheadCosts;
      capital.overheadcostdescription = overheadDescription;
      capital.additionalcost = additionalCost;
      capital.additionalcostdescription = additionalDescription;
      capital.components = componentsToSave? JSON.stringify(componentsToSave, null, 2 ): [];
      capital.independentComponent = JSON.stringify(thisIndependentComponents, null,2);
      capital.editProject = editprojectid;
      capital.cover = '';
      capital.estimatedcost = getTotalCost();
      capital.sendToWR = sendToWR;
      capital.isWorkPlan = isWorkPlan;
      capital.componentcost = getSubTotalCost();
      capital.type = 'capital';
      capital.componentcount = (componentsToSave?.length > 0 ? componentsToSave.length : 0) + (thisIndependentComponents?.length > 0 ? thisIndependentComponents.length : 0);
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      removeAttachment(deleteAttachmentsIds);
      if(swSave){
        editProjectCapital(capital);
      }
      else{
        saveProjectCapital(capital);
      }
      setVisibleCapital(false);
      console.log('or this could it be');
      setVisible(false);
    }
  },[save]);

  //Check if required fields are filled to enable save button
  useEffect(()=>{
    let streamValidation = streamIntersected.geom ? JSON.parse(streamIntersected.geom): undefined;
    if(geom != undefined && description !== '' && county.length !== 0 && serviceArea.length !== 0 && nameProject !== ''   && streamValidation != undefined && streamValidation.coordinates.length > 0  && jurisdiction.length > 0 && componentsToSave.length > 0){
        setDisable(false);
    }
    else{setDisable(true);}
  },[geom, description, county, serviceArea , sponsor, nameProject, componentsToSave, streamIntersected, jurisdiction]);

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

  useEffect(()=>{
    setGeom(userPolygon);
  },[userPolygon]);
  
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

  const handleOk = (e: any) => {
    setVisibleAlert( true);
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
      index: index + 1,
      name:undefined,
      status:'Proposed',
      cost:0,
    };
    setIndependentComponents([...thisIndependentComponents,component]);
  };
  const removeComponent = (component: any) => {
    console.log(component)
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
    console.log(currentComponents, indComp)
    currentComponents = currentComponents.filter( (comp: any) => ( comp.index !== indComp.index ) );
    setIndependentComponents([...currentComponents]);
  }

  const getTotalIndComp = () => {
    let total = 0;
    if(thisIndependentComponents.length > 0) {
      for( let comp of thisIndependentComponents) {
        let newValue= comp.cost+','
        let value = newValue.replace("$", "");
        value = value.replace(",", "");
        total += parseFloat(value) ;
      }
    }
    return total;
  }
  const getTotalCost = () =>{
    let n = getSubTotalCost() + additionalCost + getOverheadCost();
    return(n);
  }
  const setValuesComp = (comp: any) => {
    if(comp.source_table_name === "stream_improvement_measure"){
      comp.source_table_name = 'stream_improvement_measure_copy'
      comp.table = 'stream_improvement_measure_copy'
    }
    setHighlightedComponent(comp);
  }
  const setValueZoomComp = (comp: any) => {
    if(comp.table && comp.objectid) {
      getZoomGeomComp(comp.table, comp.objectid);
    }
  }
  const setValuesProblem = (problemid:any, problemname:any) => {
    setHighlightedProblem(problemid);
  }
  const setValueZoomProb = (problemid: any) => {
    getZoomGeomProblem(problemid);
  }
  const setKeyOpenClose = (groupid: any) => {
  }
  //table information action
  const dataSource = [
    {
      key: '1',
      action: 'Alpha St culvert',
      cost: '$500,000',
      status: 'Active',
      problem:'Increased Conveyance - Crossing'
    },
    {
      key: '2',
      action: 'Beta Ave culvert',
      cost: '$1,200,000',
      status: 'Active',
      problem:'Increased Conveyance - Crossing'
    },
    {
      key: '3',
      action: 'Beta Ave culvert',
      cost: '$600,000',
      status: 'Active',
      problem:'Increased Conveyance - Crossing'
    },
    {
      key: '4',
      action: 'Beta Ave culvert',
      cost: '$250,000',
      status: 'Active',
      problem:'Increased Conveyance - Crossing'
    },
    {
      key: '5',
      action: 'Beta Ave culvert',
      cost: '$2,650,000',
      status: 'Active',
      problem:'Increased Conveyance - Crossing'
    },
    {
      key: '6',
      action: 'Total Proposed Cost',
      cost: '$2,650,000',
      delete: true,
    },
  ];
  
  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '35%',
      render: (text: any) => {
        if(text === 'Total Proposed Cost'){
          return (
            <span className='total-cost'>
              {text}
            </span>
          );
        }
        return (text);
      }
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '34%',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any) => {
        console.log(text, 'STATE')
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' onClick={() => console.log('delete')} />
            </div>
          );
        }
      }
    },
  ];
  //table independent action
  const dataSourceIndependent = [
    {
      key: '1',
      status: 'Proposed',
      problem:'None'
    },
    {
      key: '2',
      status: 'Proposed',
      problem:'None'
    },
    {
      key: '3',
      status: 'Proposed',
      problem:'None'
    },
    {
      key: '4',
      status: 'Proposed',
      problem:'None'
    },
    {
      key: '5',
      status: 'Proposed',
      problem:'None'
    },
  ];
  
  const columnsIndependent  = [
    {
      title: 'Independent Actions',
      dataIndex: 'action',
      key: 'action',
      width: '35%',
      sorter: (a:any, b:any) => a.age - b.age,
      render: () => (
        <input className='input-independent' placeholder='Proposed Actions'/>
      )
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a:any, b:any) => a.age - b.age,
      render: () => (
        <input className='input-independent' placeholder='$0'/>
      ),
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '15%',
      render: (text: any) => {
        if(text && text.length > 0){
          return (
            <span className='tag-active'>
              {text}
            </span>
          );
        }
        return ('');
      }
    },
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
      sorter: (a:any, b:any) => a.age - b.age,
      width: '34%',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
      render: (text:any) => {
        console.log(text, 'STATE')
        if(text && text === true){
          return ('');
        }else{
          return (
            <div>
              <DeleteOutlined className='ico-delete' onClick={() => console.log('delete')} />
            </div>
          );
        }
      }
    },
  ];
    //table geomeotry
    const dataSourceGeomeotry = [
      {
        key: 'title-1',
        reach: 'Clear Creek',
        delete: true,
      },
      {
        key: '2',
        reach: 'Alpha St culvert',
        code:'6.3600.2',
        tributary:'2302 acres',
        length:'1861 ft',
      },
      {
        key: '3',
        reach: 'Beta Ave culvert',
        code:'6.3600.2',
        tributary:'2302 acres',
        length:'1861 ft',
      },
      {
        key: '4',
        reach: 'Beta Ave culvert',
        code:'6.3600.2',
        tributary:'2302 acres',
        length:'1861 ft',
      },
      {
        key: 'title-2',
        reach: 'Big Bear Branch',
        delete: true,
      },
      {
        key: '5',
        reach: 'Beta Ave culvert',
        code:'6.3600.2',
        tributary:'2302 acres',
        length:'1861 ft',
      },
      {
        key: 'total',
        reach: 'Total',
        tributary:'2302 acres',
        length:'1861 ft',
        delete: true,
      },
    ];
    
    const columnsGeomeotry  = [
      {
        title: 'Reach',
        dataIndex: 'reach',
        key: 'reach',
        width: '39%',
        render: (text: any) => {
          if(text === 'Total'){
            return (
              <span className='total-cost'>
                {text}
              </span>
            );
          }
          return (text);
        }
      },
      {
        title: 'MHFD Code',
        dataIndex: 'code',
        key: 'code',
        width: '20%',
      },
      {
        title: 'Tributary',
        dataIndex: 'tributary',
        key: 'tributary',
        width: '20%',
      },
      {
        title: 'Reach Length',
        dataIndex: 'length',
        key: 'length',
        width: '20%',
      },
      {
        title: '',
        dataIndex: 'delete',
        key: 'delete',
        width: '1%',
        render: (text:any) => {
          console.log(text, 'STATE')
          if(text && text === true){
            return ('');
          }else{
            return (
              <div>
                <DeleteOutlined className='ico-delete' onClick={() => console.log('delete')} />
              </div>
            );
          }
        }
      },
    ];
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

  const timelineItems = [
    { label: 'Mobilization', index: 1 },
    { label: 'Traffic Control', index: 2 },
    { label: 'Utility Coordination / Relocation', index: 3 },
    { label: 'Stormwater Management / Erosion Contro', index: 4 },
    { label: 'Engineering', index: 5 },
    { label: 'Contract Admin / Construction Management', index: 6 },
    { label: 'Legal / Administrative', index: 7 },
    { label: 'Contingency', index: 8 },
  ];

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

  function renderTimelineItem(label: string, index: number) {
    return (
      <Timeline.Item color="purple" key={index}>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>{label}</label></Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
            <Select
              placeholder={overheadValues[index] + '%'}
              dropdownClassName="menu-medium"
              value={overheadValues[index] + '%'}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onSelect={(e:any)=>changeValue(e, index)}
              bordered={false}
              style={{fontSize: '12px', marginTop: '-2px'}}
            >
              {Array.from({ length: 20 }, (_, i) => i * 5).map((value) => (
                <Option key={value} value={value}>{value}%</Option>
              ))}
            </Select>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[index])}</Col>
        </Row>
      </Timeline.Item>
    );
  }

  return (
    <>
    {visibleAlert && <AlertView
      isWorkPlan={isWorkPlan}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
      jurisdictions={jurisdiction}
      counties={county}
      serviceareas={null}
      type="Capital"
      isEdit={swSave}
      sendToWr={sendToWR}
      setsendToWR={setsendToWR}
      locality={[locality.replace(' Work Plan', '')]}
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
          <CreateProjectMap type="CAPITAL" locality={locality} projectid={projectid} isEdit={swSave} problemId={problemId}></CreateProjectMap>
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
                    {<p>Capital</p>} &nbsp;
                    {openDropdownTypeProject ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
                  </a>
                </div>
              </Dropdown>
              <Popover content={content} overlayClassName='popover-project' placement="bottomRight">
                <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px"/>
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
                (isWorkPlan && showCheckBox && !swSave) &&  <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div className='span-project-text'>
                    <Checkbox className='checkbox-body-project' checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
              <ProjectInformation
                description = {description}
                setDescription = {setDescription}
              />
              <div className="sub-title-project">
                <h5  className="requestor-information ">2. PROPOSED  ACTIONS&nbsp;*</h5>
              </div>

              <div className={"draw "+(isDrawState?'active':'')} onClick={onClickDraw}>
                <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
                <p>Click on the icon above and draw a polygon to select action items</p>
              </div>
              {((keys && keys!==0 && keys.length && groups && Object.keys(groups).length > 0)  || visibleUnnamedComponent) &&
                <>
                  <Table dataSource={dataSource} columns={columns} className='table-project'/>
                  <Table dataSource={dataSourceIndependent } columns={columnsIndependent } className='table-project'/>
                </>
              }
              {/* proposet actions */}
              {/* {((keys && keys!==0 && keys.length && groups && Object.keys(groups).length > 0)  || visibleUnnamedComponent) &&
              <div className="tab-titles">
                  <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10}}>Problem</Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Status <Popover content={content10}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }}>Cost</Col>
                </div>
              }
              {keys!=0 && keys.length &&
              <Collapse
              defaultActiveKey={keys}
              activeKey={keys}
              destroyInactivePanel={false}
              expandIconPosition="end"
              onChange={(event: any)=> {setKeys(event)}}
            >
                {groups && Object.keys(groups).map((key: any) => {
                  if(key.toString() === '-1') {
                    if(groups[key].components.length > 0){
                      return (
                        <Panel header="" key={key + '-collapse1'} extra={genTitleNoAvailable(groups[key], setKeyOpenClose)}>
                          <div className="tab-body-project">
                            <Timeline>
                              {
                                groups[key].components.map((component:any, index: number) => {
                                  return (
                                    <div key={component.type + component.status+ index}>
                                    <Timeline.Item color="green">
                                      <Row style={{marginLeft:'-18px'}}
                                      onMouseEnter={() => setValuesComp(component)}
                                      onMouseLeave={()=> setValuesComp({table:'', value:''})}
                                      >
                                        <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }} onClick={()=>setValueZoomComp(component)}><label>{component.type}</label></Col>
                                        <Col className="second" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }} onClick={()=>setValueZoomComp(component)}>{component.status}</Col>
                                        <Col className="third cost-third" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 3 }} onClick={()=>setValueZoomComp(component)}> {formatter.format(Math.floor(component.original_cost))}</Col>
                                        <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}>
                                          <Button className="btn-transparent" onClick={() => removeComponent(component)}><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                                      </Row>
                                    </Timeline.Item>
                                    </div>
                                  );
                                })
                              }

                            </Timeline>
                          </div>
                        </Panel>)
                    }
                    return null;
                  } else {
                    return (
                      <Panel header="" key={key + '-collapse1'} extra={genTitleProblem(groups[key], key, setValuesProblem, setValueZoomProb, setKeyOpenClose)}>
                        <div className="tab-body-project">
                          <Timeline>
                            {
                              groups[key].components.map((component:any) => {
                                return (
                                  <div onMouseEnter={() => setValuesComp(component)} onMouseLeave={()=> setValuesComp({table:'', value:''})} key={key+'-'+Math.random()}>
                                  <Timeline.Item color="green">
                                    <Row style={{marginLeft:'-18px'}}>
                                      <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }} onClick={()=>setValueZoomComp(component)}><label>{component.type}</label></Col>
                                      <Col className="second" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }} onClick={()=>setValueZoomComp(component)}>{component.status}</Col>
                                      <Col className="third cost-third" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 3 }} onClick={()=>setValueZoomComp(component)}>{formatter.format(component.original_cost)}</Col>
                                      <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}>
                                        <Button className="btn-transparent" onClick={() => removeComponent(component)}><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                                    </Row>
                                  </Timeline.Item>
                                  </div>
                                );
                              })
                            }

                          </Timeline>
                        </div>
                      </Panel>)
                    }
                  })
                }
              </Collapse>
              }
              <Collapse
                defaultActiveKey={["Unnamed Component"]}
                expandIconPosition="end"
              >
                  {visibleUnnamedComponent &&
                  <Panel header="" key="Unnamed Component" extra={genExtra05(getTotalIndComp())}>
                    {
                      thisIndependentComponents.map((indComp:any) => {
                        return (
                          <div className="tab-body-project" key={indComp?.index}>
                            <Timeline>
                              <Timeline.Item color="green">
                                <Row style={{marginLeft:'-18px'}}>
                                  <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}  ><label><Input placeholder="Proposed Actions"  onChange={(e) => changeValueIndComp(e, 'name',indComp)} value={indComp.name} /></label></Col>
                                  <Col className="second" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}><Input className='ant-input-color' placeholder="Proposed"  defaultValue="Proposed"  onChange={(e) => changeValueIndComp(e,'status', indComp)} value={indComp.action_status} disabled={true} /></Col>
                                  <Col className="third cost-third" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 3 }} >
                                    <Tooltip placement="topLeft" title="Only numeric values are accepted.">
                                      <Input placeholder="$200,000" onChange={(e) => changeValueIndComp(e, 'cost',indComp)} value={formatter.format(indComp.cost)} maxLength={11}/>
                                    </Tooltip>
                                  </Col>
                                  <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }} ><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" onClick={() => removeIndComponent(indComp)} /></Button></Col>
                                </Row>
                              </Timeline.Item>
                            </Timeline>
                          </div>
                        )
                      })
                    }
                  </Panel>
                }
              </Collapse> */}
              <Button className="btn-transparent-green" onClick={()=>{applyIndependentComponent()}}><PlusCircleFilled /> Independent Actions</Button> <Popover content={contentIndComp}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-actions'/></Popover>
              <div className="sub-title-project">
                <h5>3. PROJECT GEOMETRY *</h5>
              </div>
              <p className='text-default'>Projects are spatially defined by stream reaches.  Select the option below that best allows you to define the project.</p>
              <div className='section-gemetry'>
                <p>i. Is this a countywide project?</p>
                <Radio.Group>
                  <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
                  <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
                </Radio.Group>
                <div className='section-county'>
                  <label className="sub-title">Select one or multiple counties </label>
                  <Select
                    mode="multiple"
                    placeholder={serviceArea?.length !== 0 ? serviceArea : "Select a County"}
                    style={{ width: '100%' }}
                    listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                    onChange={(serviceArea: any) => setServiceArea(serviceArea)}
                    value={serviceArea}>
                    <Option key='Adams' value='Adams'>Adams</Option>
                  </Select>
                </div>
                <p>ii. Is this project located on the South Platte River?</p>
                <Radio.Group>
                  <Radio value="Yes"><span className='text-radio-btn'>Yes</span></Radio>
                  <Radio value="No"><span className='text-radio-btn'>No</span></Radio>
                </Radio.Group>
                <p className='sub-sub-title-projects'>iii. Draw your project geometry</p>
              </div>

              <div className={"draw "+(isDrawStateCapital?'active':'')}  onClick={onClickDrawCapital}>
                <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
                <p className='text-body-project'>Click on the icon above and draw a polygon to define the project feature</p>
              </div>
              <Table
                dataSource={dataSourceGeomeotry }
                columns={columnsGeomeotry }
                className='table-project table-geometry'
                rowClassName={(record, index) => {
                  console.log(record, index, 'RECORD');
                  if(record.key.includes('total')){
                    return ('row-geometry-total')
                  }
                  if (record.key.includes('title') || record.key.includes('total')) {
                    return('row-geometry-title')
                  }else{
                    return ('row-geometry-body')
                  }
                }}
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
                isCapital={true}
                originModal="Capital"
              />
              <div className="sub-title-project">
                <h5 className="requestor-information">6. FINANCIAL INFORMATION </h5>
              </div>
              <Row className="cost-project">
                <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>SUBTOTAL COST</Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format( getSubTotalCost())}</b></Col>
              </Row>
              <hr/>
              <Row className="sub-project">
                <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}>
                  <p className='title-sub-project'>Overhead Cost &nbsp;&nbsp;<Popover content={contentOverheadCost}><InfoCircleOutlined style={{color:'#c5c2d5'}} /></Popover></p>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><p className='title-sub-project'>{formatter.format(getOverheadCost())}</p></Col>
              </Row>

              <Timeline className="sub-project" style={{marginTop:'10px'}}>
                {timelineItems.map(({ label, index }) => renderTimelineItem(label, index))}              
              </Timeline>

              <Row className="sub-project">
                <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
                <Input placeholder={overheadDescription!==""? overheadDescription  +"": "Overhead Cost Description"} onChange={(description) => onChangeOverheadDescription(description)} value={overheadDescription}/>
                </Col>
              </Row>
              <br/>

              <Row className="sub-project">
                <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>
                  <p>Additional Cost <Popover content={contentAdditionalCost}><img src="/Icons/icon-19.svg" alt="" height="10px" className='icon-cost'/></Popover></p>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>
                  <Input style={{paddingLeft:'0px'}} placeholder="$0" onChange={(description) => onChangeAdditionalCost(description)} value={formatter.format(additionalCost ? additionalCost : 0)}/>
                </Col>
              </Row>
              <Row className="sub-project">
                <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
                  <Input placeholder={additionalDescription!==""? additionalDescription  +"":"Additional Cost Description"} onChange={(description) => onChangeAdditionalDescription(description)} value={additionalDescription}/>
                </Col>
              </Row>
              <hr/>
              <Row className="cost-project">
                <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>TOTAL COST</Col>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format(getTotalCost() ? getTotalCost() : 0)}</b></Col>
              </Row>
              <UploadImagesDocuments
                isCapital={true}
                setFiles={setFiles}
              />
            </div>
          :<>
          <div className="body-project">
            <div className='discution-body'>
              <div className='discution-other-user'>
                <div className='other-user-information'>
                  02/14/23
                </div>
                <div className='discution'>
                  <div>
                    Hi, I would like to follow-up on my submission
                  </div>
                  <div>
                    We are requesting a new culvert along Almond Rd to Shawnee Avenue, as shown through our submission in February 2023.
                  </div>
                </div>
              </div>
              <div className='discution-user'>
                We are requesting a new culvert along Almond Rd to Shawnee Avenue, as shown through our submission in February 2023.
              </div>
            </div>
            <div className='discution-footer'>
              <input placeholder="Write a comment..."/>
              <Button>
                <img>
                </img>
              </Button>
            </div>
          </div>
          </>}
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
