import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline , Tooltip } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import { Geom, Project } from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { JURISDICTION } from "../../../constants/constants";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>);
const contentIndComp = (<div className="popver-info">Independent Components should be added to represent any known project components that are not already shown in the Components layer. Independent Component costs should reflect only the cost of construction; they will have Overhead Costs applied to them</div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"></div>);
const content04 = (<div className="popver-info"></div>);
const content05 = (<div className="popver-info"></div>);
const contentOverheadCost = (<div className="popver-info"> Overhead Cost includes all costs beyond the costs of physical construction (Subtotal Cost). The default values shown here can and should be changed when different percentages are anticipated, such as in urban settings. Please add a description explaining any changes from default values. </div>);
const contentAdditionalCost = (<div className="popver-info"> Enter any additional costs here that were not captured previously as Components, Independent Components, or Overhead Costs. Additional Costs (unlike Independent Components) will NOT have Overhead Costs applied to them. </div>);
const content08 = (<div className="popver-info"></div>);
const content09 = (<div className="popver-info"></div>);
const content10 = (<div className="popver-info">The Component Status indicates whether or not the Component has already been built (Complete) or still needs to be built (Proposed).</div>);
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
const genExtra = () => (
  <Row className="tab-head-project">
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>West Tollgate Creek GSB Drops </Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}>Aurora</Col>
    <Col xs={{ span: 24 }} lg={{ span: 5}} xxl={{ span: 5 }}>PrelimDesign</Col>
    <Col xs={{ span: 24 }} lg={{ span: 3}} xxl={{ span: 4 }}>$450,200</Col>
  </Row>
);
const genExtra05 = (totalIndependentComp: any) => (
  <Row className="tab-head-project">
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>Independent Component</Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}></Col>
    <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}></Col>
    <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }} >{formatter.format(totalIndependentComp)}</Col>
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
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}></Col>
    <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}></Col>
  <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }} style={{whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{formatter.format(totalSumCost)}</Col>
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
      <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}>{problem.jurisdiction}</Col>
      <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{problem.solutionstatus}%</Col>
      <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }}>{formatter.format(totalSumCost)}</Col>
    </Row>
  )
  }
 const unnamedComponent = (Component: any) => {
    const apllyType = (e: any) =>{
      Component.type = e;
    };
    const apllyStatus = (e: any) =>{
      Component.status = e;
    };
    const apllyOriginal_Cost = (e: any) =>{
      Component.status = e;
    };
  return (
    <div className="tab-body-project">
      <Timeline>
        <Timeline.Item color="green">
          <Row style={{marginLeft:'-18px'}}>
            <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }} onChange={(e) => apllyType(e)} ><label><Input placeholder="Unnamed Component"  /></label></Col>
            <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }} onChange={(e) => apllyStatus(e)}><Input placeholder="Proposexxd"  style={{ color: 'rgba(17, 9, 60, 0.5) !important'}}/></Col>
            <Col className="third" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} onChange={(e) => apllyOriginal_Cost(e)}><Input placeholder="$200,000" /></Col>
            <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
          </Row>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}
export const ModalCapital = ({visibleCapital, setVisibleCapital, nameProject, setNameProject, typeProject, setVisible, locality, data, editable, problemId}:
  {visibleCapital: boolean, setVisibleCapital: Function, nameProject: string , setNameProject: Function, typeProject: string, setVisible: Function, locality?:any, data:any, editable:boolean, problemId?: any}) => {
  let Component = {
    type:"Unnamend Component",
    status:"Proposssssed",
    original_cost:0,
  };
  const {saveProjectCapital, setComponentIntersected, getListComponentsByComponentsAndPolygon, setStreamIntersected, setHighlightedComponent, setStreamsIds, setIndComponents, getGEOMByProjectId, editProjectCapital, setServiceAreaCounty, setJurisdictionSponsor, getZoomGeomComp, getZoomGeomProblem, setHighlightedProblem} = useProjectDispatch();
  const {listComponents, componentsFromMap, userPolygon, streamIntersected, independentComponents} = useProjectState();
  const {userInformation,organization} = useProfileState();
  const [state, setState] = useState(stateValue);
  const [description, setDescription] =useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const [isDrawStateCapital, setIsDrawCapital] = useState(false);
  const {changeDrawState, changeDrawStateCapital, setEditLocation} = useProjectDispatch();
  const [sponsor, setSponsor] = useState(organization+"");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId ] = useState(-1);
  const {isDraw, isDrawCapital} = useProjectState();
  const [save, setSave] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [groups,setGroups] = useState<any>({});
  const [componentsToSave, setComponentsToSave] = useState([]);
  const [panelUnnamedComponent, setPanelUnnamedComponent] = useState<any[]>([]);
  const [problems, setProblems] = useState({});
  const [geom, setGeom] = useState();
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [ visibleUnnamedComponent, setVisibleUnnamedComponent ] = useState(false)
  const [ thisIndependentComponents, setIndependentComponents] = useState<any[]>([]);
  const [overheadValues, setOverheadValues] = useState<any>([0,5,0,0,5,15,5,10,25]);
  const [overheadCosts, setOverheadCosts] = useState<any>([0,0,0,0,0,0,0,0,0]);
  const [keys, setKeys] = useState<any>(['-false']);
  const [additionalCost, setAdditionalCost] = useState<number>(0);
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [overheadDescription, setOverheadDescription] = useState("");
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [cover, setCover] = useState('');
  const history = useHistory();
  const [prevList, setPrevList] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);

  useEffect(()=>{
    let juris = JURISDICTION.find((elem:any) => elem.includes(organization));
    if(juris) {
      setSponsor(organization);
    } else {
      setSponsor(locality);
    }
  },[organization]);
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
      setAdditionalCost(parseInt(data.additionalcost));
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
        // setStreamIntersected({geom:data.createdCoordinates});
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
    // if(independentComponents.length > 0) {
      setIndependentComponents(independentComponents);
    // }
  },[independentComponents]);
  useEffect(()=>{
    if(componentsFromMap.length > 0 ) {
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
      // Object.keys(listComponents.groups).map((key: any,id:any) => {
      //   if (listComponents.groups[key].components.length) {
      //     idKey.push(id + '-collapse1');
      //   }
      // });
      // console.log("ID KEYS", idKey);
      // setKeys(idKey);
      Object.keys(listComponents.groups).map((key:any, id:any) => {
        if(!groups[key]){
          myset.add(key+'-collapse1');
        } else if( listComponents.groups[key].components.length != groups[key].components.length){
          myset.add(key+'-collapse1');
        }
        
        // si es undefined se pone al idkey, sino 
        // if (listComponents.groups[key].components.length) { 
        //   idKey.push(key+'-collapse1')
        // }
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
    if(listComponents && listComponents.problems && listComponents.result.length > 0){
      setProblems(listComponents.problems);
    } else {
      setProblems({});
    }
    updateOverheadCosts();
  },[listComponents]);

  useEffect(()=>{

    if(save === true){
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      var capital = new Project();
      capital.year = _year ? _year : capital.year;
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
      jurisdiction.map((element:any) => {
        cjurisdiction= cjurisdiction + element + ",";
      })
      if(cjurisdiction.length != 0 ){
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length-1)
      }

      let csponsor = "";
      if(cosponsor){
        cosponsor.map((element:any) => {
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
      capital.additionalcost = additionalCost;
      capital.additionalcostdescription = additionalDescription;
      capital.components = componentsToSave? JSON.stringify(componentsToSave, null, 2 ): [];
      capital.independetComponent = JSON.stringify(thisIndependentComponents, null,2);
     // capital.locality = locality? locality:'';
      capital.editProject = editprojectid;
      capital.cover = cover;
      capital.estimatedcost = getTotalCost();
      // console.log( JSON.stringify(capital, null, 2),"****+++CAPITAL******")
      if(swSave){
        editProjectCapital(capital);
      }
      else{
        saveProjectCapital(capital);
      }
      setVisibleCapital(false);
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
  const getTotal = () => {

    let totalSumCost = 0;
    if(listComponents && listComponents.result) {
      for( let component in listComponents.result){
        totalSumCost += listComponents.result[component].original_cost;
      }
    }
    return totalSumCost;
  }
  const projectReturn = useSelector((state:any)=>({
    state
  }));

  useEffect(()=>{
    let streamValidation = streamIntersected.geom ? JSON.parse(streamIntersected.geom): undefined;
    
    if(geom != undefined && description !== '' && county.length !== 0 && serviceArea.length !== 0 && sponsor !== ''  && nameProject !== ''   && streamValidation != undefined && streamValidation.coordinates.length > 0){
      // if(locality === "no locality" ){
      //   setDisable(false);
      // }else{
        setDisable(false);
      // }\
    }
    else{setDisable(true);}
  },[geom, description, county, serviceArea , sponsor, nameProject, componentsToSave, streamIntersected]);

  useEffect(() => {
    getTextWidth(nameProject);
  },[nameProject]);
  const onChange = (e: any) =>{
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

  const showModal = () => {
    const auxState = {...state};
    auxState.visibleCapital = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
      setVisibleAlert( true);
  };

  // useEffect(()=>{
  //   if(swSave === true){
  //     // if(locality !== currentServiceAreaCounty.jurisdiction){
  //     //   alert("It is not within your jurisdiction.");
  //     // }
  //   }else{
  //     if(currentServiceAreaCounty.jurisdiction ){
  //       // if(locality !== currentServiceAreaCounty.jurisdiction){
  //       //   if(locality !== "no locality"){
  //       //    alert("It is not within your jurisdiction.");
  //       //   }
  //       // }
  //     }
  //   }
  // },[currentServiceAreaCounty.jurisdiction]);

  const handleCancel = (e: any) => {
    console.log(e);
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
    console.log("HEY REMOVE", newComponents);
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
        //newIC[key] = value.target.value;
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
    // if( keys.find((key:any) => (groupid+'-collapse1') == key) ) {
    //   console.log("IS HERE", keys, groupid);
    //   let k = keys.filter((key:any) => ((groupid+'-collapse1') != key && '-1200-collapse1' != key ));
    //   if(k.length > 0) {
    //     setKeys(k);
    //   } else {
    //     setKeys(['-1200-collapse1'])
    //   }
      
    // } else {
    //   setKeys([...keys, groupid+'-collapse1']);
    // }
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
      sponsor={sponsor}
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
     />}
     <Modal
       centered
       maskClosable={false}
       visible={visibleCapital}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          {/* mapitash */}
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
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)}  />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()} />
                </Button>*/}
                <p>{serviceArea?(serviceArea.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea.length > 0 && county.length > 0)?'·':''} {county?(county.length > 1? 'Multiple Counties': (county[0])):''} </p>
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

            {/*First Section*/}
            <ProjectInformation
              description = {description}
              setDescription = {setDescription}
            />
            <br/>
            {/*Second Section*/}
            <h5>2. SELECT COMPONENTS</h5>

            <div className={"draw "+(isDrawState?'active':'')} onClick={onClickDraw}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
              <p>Click on the icon above and draw a polygon to select components</p>
            </div>
            {(keys && keys.length || visibleUnnamedComponent) &&
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
            expandIconPosition="right"
            onChange={(event: any)=> {setKeys(event)}}
          >
              {groups && Object.keys(groups).map((key: any,id:any) => {
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
                                      <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }} onClick={()=>setValueZoomComp(component)}>{component.status}</Col>
                                      <Col className="third" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} onClick={()=>setValueZoomComp(component)}> {formatter.format(Math.floor(component.original_cost))}</Col>
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
                                    <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }} onClick={()=>setValueZoomComp(component)}>{component.status}</Col>
                                    <Col className="third" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} onClick={()=>setValueZoomComp(component)}>{formatter.format(component.original_cost)}</Col>
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
              expandIconPosition="right"
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
                                <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><Input className='ant-input-color' placeholder="Proposed"  defaultValue="Proposed"  onChange={(e) => changeValueIndComp(e,'status', indComp)} value={indComp.status} disabled={true} /></Col>
                                <Col className="third" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }} >
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
            <Button className="btn-transparent-green" onClick={()=>{applyIndependentComponent()}}><PlusCircleFilled /> Independent Component</Button> <Popover content={contentIndComp}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{marginBottom:'2px'}}/></Popover>
            <h5>3. PROJECT GEOMETRY </h5>

            <div className={"draw "+(isDrawStateCapital?'active':'')}  onClick={onClickDrawCapital}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
              <p >Click on the icon above and draw a polygon to define the project feature</p>
            </div>
            <h5>4. FINANCIAL INFORMATION </h5>
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
                {/* <Select placeholder="75%" dropdownClassName="menu-medium" >
                  <Option value="75">75%</Option>
                  <Option value="80">80%</Option>
                  <Option value="85">85%</Option>
                  <Option value="90">90%</Option>
                  <Option value="95">95%</Option>
                </Select> */}
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>{formatter.format(getOverheadCost())}</Col>
            </Row>

            <Timeline className="sub-project" style={{marginTop:'10px'}}>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Overhead Cost</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="0%" dropdownClassName="menu-medium" value={overheadValues[0] + '%'} onSelect={(e:any)=>changeValue(e, 0)}>
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
              </Timeline.Item>
              <Timeline.Item color="purple">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}><label>Mobilization</label></Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                  <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[1] + '%'} onSelect={(e:any)=>changeValue(e, 1)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                  <Select placeholder="0%" dropdownClassName="menu-medium" value={overheadValues[2] + '%'} onSelect={(e:any)=>changeValue(e, 2)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="0%" dropdownClassName="menu-medium" value={overheadValues[3] + '%'} onSelect={(e:any)=>changeValue(e, 3)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[4] + '%'} onSelect={(e:any)=>changeValue(e, 4)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="15%" dropdownClassName="menu-medium" value={overheadValues[5] + '%'} onSelect={(e:any)=>changeValue(e, 5)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="5%" dropdownClassName="menu-medium" value={overheadValues[6] + '%'} onSelect={(e:any)=>changeValue(e, 6)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="10%" dropdownClassName="menu-medium" value={overheadValues[7] + '%'} onSelect={(e:any)=>changeValue(e, 7)}>
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
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                    <Select placeholder="25%" dropdownClassName="menu-medium" value={overheadValues[8] + '%'} onSelect={(e:any)=>changeValue(e, 8)}>
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
              <Input placeholder={overheadDescription!==""? overheadDescription  +"": "Enter Description"} onChange={(description) => onChangeOverheadDescription(description)} value={overheadDescription}/>
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
                <Input placeholder={additionalDescription!==""? additionalDescription  +"":"Enter Description"} onChange={(description) => onChangeAdditionalDescription(description)} value={additionalDescription}/>
              </Col>
            </Row>
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>TOTAL COST</Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>{formatter.format(getTotalCost() ? getTotalCost() : 0)}</b></Col>
            </Row>

            {/*Section*/}
            {/* <h5>3. GENERATE PROJECT <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button> */}

            {/*Section*/}
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

            {/*Section*/}
            <UploadAttachment
              files={files}
              setFiles={setFiles}
              setCover={setCover}
              isCapital={true}
              originModal="Capital"
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
