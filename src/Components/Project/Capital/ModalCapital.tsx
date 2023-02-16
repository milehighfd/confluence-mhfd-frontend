import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Collapse, Timeline , Tooltip, Checkbox } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
import { Project } from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { GOVERNMENT_STAFF } from "../../../constants/constants";
import { useHistory, useLocation } from "react-router-dom";
import { UploadImagesDocuments } from "../TypeProjectComponents/UploadImagesDocuments";
import store from "../../../store";
import { ADMIN, STAFF } from "../../../constants/constants";

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
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>No Problem Group Available</Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 4 }}></Col>
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
      <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>{problem.problemname}</Col>
      <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 4 }}>{problem.jurisdiction}</Col>
      <Col style={{textAlign:'center'}} className='col-cost-geom' xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{problem.solutionstatus ? problem.solutionstatus + '%' : ''}</Col>
      <Col className="tab-cost cost-position" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{formatter.format(totalSumCost)}</Col>
    </Row>
  )
}
export const ModalCapital = ({visibleCapital, setVisibleCapital, nameProject, setNameProject, typeProject, setVisible, locality, data, editable, problemId}:
  {visibleCapital: boolean, setVisibleCapital: Function, nameProject: string , setNameProject: Function, typeProject: string, setVisible: Function, locality?:any, data:any, editable:boolean, problemId?: any}) => {
 
  const {saveProjectCapital,saveOverheadCost, setComponentIntersected, getListComponentsByComponentsAndPolygon, setStreamIntersected, setHighlightedComponent, setStreamsIds, setIndComponents, getGEOMByProjectId, editProjectCapital, setServiceAreaCounty, setJurisdictionSponsor, getZoomGeomComp, getZoomGeomProblem, setHighlightedProblem} = useProjectDispatch();
  const {listComponents, componentsFromMap, userPolygon, streamIntersected, independentComponents} = useProjectState();
  const { userInformation } = useProfileState();
  const [state, setState] = useState(stateValue);
  const [description, setDescription] =useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const [isDrawStateCapital, setIsDrawCapital] = useState(false);
  const {changeDrawState, changeDrawStateCapital, setEditLocation} = useProjectDispatch();
  const [sponsor, setSponsor] = useState("Select a Sponsor");
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
  const location = useLocation();
  const [lengthName, setlengthName] = useState(0);
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const { toggleAttachmentCover } = useAttachmentDispatch();
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const isWorkPlan = location.pathname.includes('work-plan');

  useEffect(() => {
    if (userInformation?.designation === GOVERNMENT_STAFF) {
      if (userInformation?.organization) {
        setSponsor(userInformation?.organization);
      }
    }
  }, [userInformation]);
  useEffect(()=>{
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
    setJurisdictionSponsor(undefined);
    setDescription('');
    if(componentsFromMap.length > 0 ) {
      getListComponentsByComponentsAndPolygon(componentsFromMap, null);
    } else {
      setComponentIntersected([]);
    }
    setStreamIntersected({geom:null});
    setStreamsIds([]); 
    return () => {
      setIndependentComponents([]);
    }
  },[]);
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
  useEffect(()=>{
    if(data!== 'no data' ) {
      setSwSave(true);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setjurisdiction(parseStringToArray(data.jurisdiction));
      setCosponsor(parseStringToArray(data.cosponsor));
      setDescription(data.description);
      setNameProject(data.projectname);
      setProjectId(data.projectid);
      setEditsetprojectid(data.projectid);
      setAdditionalCost(parseInt(data.additionalcost || '0'));
      let newOV = (data.overheadcost || '').split(',').map((x:any)=>{
        return parseInt(x);
      })
      setTimeout(()=>{
        setOverheadValues(newOV);
      },1000);
      if(data.additionalcostdescription == null){
        setAdditionalDescription("");
      }
      else{
        setAdditionalDescription(data.additionalcostdescription);
      }
      if(data.overheadcostdescription == null){
        setOverheadDescription("");
      }
      else{
        setOverheadDescription(data.overheadcostdescription);
      }
      setSponsor(data.sponsor);
      setTimeout(()=>{
        getGEOMByProjectId(data.projectid)
      },2200);
    } else {
      setStreamIntersected([]);
      setIndComponents([]);
      setIndependentComponents([]);
      setEditLocation(undefined);
    }
  },[data]);

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
    updateOverheadCosts();
  },[listComponents]);

  useEffect(()=>{

    if (save === true){
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var capital = new Project();
      capital.locality = _locality;
      capital.isWorkPlan = isWorkPlan;
      capital.year = _year ?? capital.year;
      let cservice = "";
      serviceArea.forEach((element:any) => {
        cservice= cservice + element + ",";
      })
      if(cservice.length != 0 ){
        cservice = cservice.substring(0, cservice.length-1)
      }
      let ccounty = "";
      county.forEach((element:any) => {
        ccounty= ccounty + element + ",";
      })
      if(ccounty.length != 0 ){
        ccounty = ccounty.substring(0, ccounty.length-1)
      }
      let cjurisdiction = "";
      jurisdiction.forEach((element:any) => {
        cjurisdiction= cjurisdiction + element + ",";
      })
      if(cjurisdiction.length != 0 ){
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length-1)
      }

      let csponsor = "";
      if(cosponsor){
        cosponsor.forEach((element:any) => {
          csponsor= csponsor + element + ",";
        }); 
        if(cosponsor.length != 0 ){
          csponsor = csponsor.substring(0, csponsor.length-1)
        }
      }
      
      capital.servicearea = cservice;
      capital.county = ccounty;
      capital.jurisdiction= cjurisdiction;
      capital.sponsor = sponsor;
      capital.cosponsor = csponsor;
      capital.projectname = nameProject;
      capital.description = description;
      capital.geom = streamIntersected.geom;
      capital.files = files ;
      capital.overheadcost = overheadValues;
      capital.overheadcostdescription = overheadDescription;
      console.log('my additional cost is ', additionalCost);
      capital.additionalcost = additionalCost;
      capital.additionalcostdescription = additionalDescription;
      capital.components = componentsToSave? JSON.stringify(componentsToSave, null, 2 ): [];
      capital.independetComponent = JSON.stringify(thisIndependentComponents, null,2);
      capital.editProject = editprojectid;
      capital.cover = '';
      capital.estimatedcost = getTotalCost();
      capital.sendToWR = sendToWR;
      capital.componentcost = getSubTotalCost();
      capital.componentcount = (componentsToSave?.length > 0 ? componentsToSave.length : 0) + (thisIndependentComponents?.length > 0 ? thisIndependentComponents.length : 0);
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      if(swSave){
        editProjectCapital(capital);
      }
      else{
        const costOverhead={
          "6":overheadCosts[1],
          "7":overheadCosts[2],
          "8":overheadCosts[3],
          "9":overheadCosts[4],
          "10":overheadCosts[5],
          "12":overheadCosts[6],
          "11":overheadCosts[7],
          "13":overheadCosts[8],
        }
        // saveOverheadCost(costOverhead);
        saveProjectCapital(capital);
      }
      setVisibleCapital(false);
      console.log('or this could it be');
      setVisible(false);
    }
  },[save]);

  const onChangeAdditionalCost = (e: any) =>{
        let newValue=e.target.value
        let vAlue = newValue.replace("$", "");
        vAlue = vAlue.replace(",", "");
        if(vAlue){
          setAdditionalCost(parseInt(vAlue));
        }else{
          setAdditionalCost(parseInt ('0'));
        }
  };
  const onChangeAdditionalDescription = (e: any) =>{
    setAdditionalDescription(e.target.value);
  };
  const onChangeOverheadDescription = (e: any) =>{
    setOverheadDescription(e.target.value);
  };

  useEffect(()=>{
    let streamValidation = streamIntersected.geom ? JSON.parse(streamIntersected.geom): undefined;
    if(geom != undefined && description !== '' && county.length !== 0 && serviceArea.length !== 0 && sponsor !== '' && sponsor !== undefined  && nameProject !== ''   && streamValidation != undefined && streamValidation.coordinates.length > 0  && jurisdiction.length > 0){
        setDisable(false);
    }
    else{setDisable(true);}
  },[geom, description, county, serviceArea , sponsor, nameProject, componentsToSave, streamIntersected, jurisdiction]);

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
    console.log(e);
    const auxState = {...state};
    setVisibleCapital (false);
    setState(auxState);
    console.log('or this one');
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
    updateOverheadCosts();
  },[thisIndependentComponents]);
  useEffect(()=>{
    if((((listComponents && listComponents.groups && listComponents.result.length > 0)) || thisIndependentComponents.length > 0) && !flagInit) {
      flagInit = true;
    }
  },[thisIndependentComponents, listComponents])
  const applyIndependentComponent = () => {
    let component = {
      index: Math.random()+'_'+Date.now(),
      name:undefined,
      status:'Proposed',
      cost:0,
    };
    setIndependentComponents([...thisIndependentComponents,component]);
  };
  const removeComponent = (component: any) => {
    let newComponents: any = [];
    let currentComponents = listComponents.result;
    newComponents = currentComponents.filter( (comp: any) => ( ! (comp.cartodb_id == component.cartodb_id && comp.table == component.table)));
    getListComponentsByComponentsAndPolygon(newComponents, null);
  }
  const updateOverheadCosts = () => {
    let newOverheadCosts = [...overheadCosts];
    overheadValues.forEach((element:any, index:any) => {
      newOverheadCosts[index] = (element*getSubTotalCost())/100;
      newOverheadCosts[index] = parseInt(newOverheadCosts[index]);
    });
    setOverheadCosts(newOverheadCosts);
  }
  useEffect(()=>{
    let newOverheadCosts = [...overheadCosts];
    overheadValues.forEach((element:any, index:any) => {
      newOverheadCosts[index] = (element*getSubTotalCost())/100;
      newOverheadCosts[index] = parseInt(newOverheadCosts[index]);
    });
    setOverheadCosts(newOverheadCosts);
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
    currentComponents = currentComponents.filter( (comp: any) => ( comp._id != indComp._id ) );
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
  return (
    <>
    {visibleAlert && <AlertView
      isWorkPlan={isWorkPlan}
      sponsor={sponsor}
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
       width={pageWidth >3000 ? "2000px" : "1100px"}
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <CreateProjectMap type="CAPITAL" locality={locality} projectid={projectid} isEdit={swSave} problemId={problemId}></CreateProjectMap>
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
                    height: lengthName > 259 ? 'unset' :'34px'
                  }} />
                </label>
                <p>{serviceArea?(serviceArea?.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea?.length > 0 && county?.length > 0)?'·':''} {county?(county?.length > 1? 'Multiple Counties': (county[0])):''} </p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Capital Project</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">
              {
                (showCheckBox && !swSave) &&  <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}}>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
            <ProjectInformation
              description = {description}
              setDescription = {setDescription}
            />
            <br/>
            <h5 style={{marginTop:'15px'}}>
              2. SELECT ACTIONS
              <span className="requiered">&nbsp;*&nbsp;</span>
              <img src="/Icons/icon-08.svg" />
            </h5>

            <div className={"draw "+(isDrawState?'active':'')} onClick={onClickDraw}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
              <p>Click on the icon above and draw a polygon to select actions</p>
            </div>
            {((keys && keys!==0 && keys.length && groups && Object.keys(groups).length > 0)  || visibleUnnamedComponent) &&
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
                if(key.toString() == '-1') {
                  if(groups[key].components.length > 0){
                    return (
                      <Panel header="" key={key + '-collapse1'} extra={genTitleNoAvailable(groups[key], setKeyOpenClose)}>
                        <div className="tab-body-project">
                          <Timeline>
                            {
                              groups[key].components.map((component:any) => {
                                return (
                                  <div>
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
                        <div className="tab-body-project">
                          <Timeline>
                            <Timeline.Item color="green">
                              <Row style={{marginLeft:'-18px'}}>
                                <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}  ><label><Input placeholder="Unnamed Component"  onChange={(e) => changeValueIndComp(e, 'name',indComp)} value={indComp.name} /></label></Col>
                                <Col className="second" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}><Input className='ant-input-color' placeholder="Proposed"  defaultValue="Proposed"  onChange={(e) => changeValueIndComp(e,'status', indComp)} value={indComp.status} disabled={true} /></Col>
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
            </Collapse>
            <Button className="btn-transparent-green" onClick={()=>{applyIndependentComponent()}}><PlusCircleFilled /> Independent Actions</Button> <Popover content={contentIndComp}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{marginBottom:'2px'}}/></Popover>
            <h5 style={{marginTop:'10px'}}>3. PROJECT GEOMETRY<span className="requiered">&nbsp;*</span></h5>

            <div className={"draw "+(isDrawStateCapital?'active':'')}  onClick={onClickDrawCapital}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
              <p >Click on the icon above and draw a polygon to define the project feature</p>
            </div>
            <h5 style={{marginTop:'20px'}}>4. FINANCIAL INFORMATION </h5>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>SUBTOTAL COST</Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format( getSubTotalCost())}</b></Col>
            </Row>
            <hr/>
            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}>
                <p>Overhead Cost <Popover content={contentOverheadCost}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{marginBottom: '2px'}} /></Popover></p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(getOverheadCost())}</Col>
            </Row>

            <Timeline className="sub-project" style={{marginTop:'10px'}}>
              {/* <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Overhead Cost</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="0%" dropdownClassName="menu-medium border-select" value={overheadValues[0] + '%'} onSelect={(e:any)=>changeValue(e, 0)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[0])}</Col>
                </Row>
              </Timeline.Item> */}
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Mobilization</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                  <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[1] + '%'} onSelect={(e:any)=>changeValue(e, 1)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[1])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Traffic Control</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                  <Select placeholder="0%" dropdownClassName="menu-medium" value={overheadValues[2] + '%'} onSelect={(e:any)=>changeValue(e, 2)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[2])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Utility Coordination / Relocation</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="0%" dropdownClassName="menu-medium" value={overheadValues[3] + '%'} onSelect={(e:any)=>changeValue(e, 3)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[3])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Stormwater Management / Erosion Control</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[4] + '%'} onSelect={(e:any)=>changeValue(e, 4)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[4])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Engineering</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="15%" dropdownClassName="menu-medium" value={overheadValues[5] + '%'} onSelect={(e:any)=>changeValue(e, 5)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[5])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Legal / Administrative</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[6] + '%'} onSelect={(e:any)=>changeValue(e, 6)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[6])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Contract Admin / Construction Management</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="10%" dropdownClassName="menu-medium" value={overheadValues[7] + '%'} onSelect={(e:any)=>changeValue(e, 7)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[7])}</Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Contingency</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} style={{marginTop:'-7.5px'}}>
                    <Select placeholder="25%" dropdownClassName="menu-medium" value={overheadValues[8] + '%'} onSelect={(e:any)=>changeValue(e, 8)} bordered={false} style={{fontSize: '12px', marginTop: '-2px'}}>
                      <Option value="0">0%</Option>
                      <Option value="5">5%</Option>
                      <Option value="10">10%</Option>
                      <Option value="15">15%</Option>
                      <Option value="20">20%</Option>
                      <Option value="25">25%</Option>
                      <Option value="30">30%</Option>
                      <Option value="35">35%</Option>
                      <Option value="40">40%</Option>
                      <Option value="45">45%</Option>
                      <Option value="50">50%</Option>
                      <Option value="55">55%</Option>
                      <Option value="60">60%</Option>
                      <Option value="65">65%</Option>
                      <Option value="70">70%</Option>
                      <Option value="75">75%</Option>
                      <Option value="80">80%</Option>
                      <Option value="85">85%</Option>
                      <Option value="90">90%</Option>
                      <Option value="95">95%</Option>
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(overheadCosts[8])}</Col>
                </Row>
              </Timeline.Item>
            </Timeline>

            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
              <Input placeholder={overheadDescription!==""? overheadDescription  +"": "Overhead Cost Description"} onChange={(description) => onChangeOverheadDescription(description)} value={overheadDescription}/>
              </Col>
            </Row>
            <br/>

            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>
                <p>Additional Cost <Popover content={contentAdditionalCost}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{marginBottom:'2px'}}/></Popover></p>
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

            <br></br>
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
            <br/>
            <UploadImagesDocuments
              isCapital={true}
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
