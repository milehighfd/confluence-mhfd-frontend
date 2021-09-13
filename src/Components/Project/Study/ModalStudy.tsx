import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { Project } from "../../../Classes/Project";
import { JURISDICTION } from "../../../constants/constants";
import {
  PROBLEMS_TRIGGER,
  XSTREAMS,
  MHFD_BOUNDARY_FILTERS,
} from "../../../constants/constants";
import { forceLink } from "d3";
import { useProfileState } from "../../../hook/profileHook";
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);


const content05 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content07 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content08 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content09 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

const stateValue = {
  visibleStudy: false
}
const genExtra = () => (
  <div className="tab-head-project">
    <div>Cherry Creek</div>
  </div>
);
const genExtra00 = () => (
  <div className="tab-head-project">
    <div>Lakewood Gulch</div>
  </div>
);
const genTitle = (streamName: any, streamData:any, setHighlightedStream: Function) => (
  <div className="tab-head-project" onMouseEnter={()=>setHighlightedStream(streamData[0].mhfd_code)} onMouseLeave={()=>setHighlightedStream(undefined)}>
    <div>{streamName} </div>
  </div>
)
const genTitleUnnamed = (streamName: any, streamData:any, setHighlightedStreams: Function) => (
  <div className="tab-head-project" onMouseEnter={()=>setHighlightedStreams(streamData)} onMouseLeave={()=>setHighlightedStreams(undefined)}>
    <div>{streamName} </div>
  </div>
)

export const ModalStudy= ({visibleStudy, setVisibleStudy, nameProject, setNameProject, typeProject, setVisible, locality, data, editable}:
  {visibleStudy: boolean, setVisibleStudy: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any, data:any, editable:boolean }) => {
  const {saveProjectStudy, setStreamsList, setStreamIntersected, updateSelectedLayers, setStreamsIds, editProjectStudy, setServiceAreaCounty, setJurisdictionSponsor, setHighlightedStream,setHighlightedStreams} = useProjectDispatch();
  const {streamsIntersectedIds, isDraw} =useProjectState();
  const {userInformation} = useProfileState();
  const {organization, groupOrganization} = useProfileState();
  const {listStreams, streamIntersected} = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [country, setCountry] = useState('');
  const [isDrawState, setIsDraw] = useState(false);
  const {changeDrawState} = useProjectDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const [cover, setCover] = useState('');
  const [streamsList, setThisStreamsList] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization+"");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId] = useState(-1);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [geom, setGeom] = useState<any>('');
  const [keys, setKeys] = useState<any>(['-false']);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const history = useHistory();
  useEffect(()=>{
    setServiceAreaCounty({});
    setStreamsList([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({geom:null});
    updateSelectedLayers([ PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS, XSTREAMS ]);
    return () => {
      setServiceArea({});
      setStreamsList([]);
      setStreamIntersected({geom:null});
      setStreamsIds([]);
    }
  },[]);
  useEffect(()=>{
    if(isDrawState && !isDraw){
      setIsDraw(isDraw);
    }
  },[isDraw]);
  useEffect(()=>{
    if(listStreams) {
      const idKey: any = [];
      const myset = new Set(keys);
      Object.keys(listStreams).map((key: any, id: any) => {
        if(!streamsList[key]){
          myset.add(`${id}${key}`);
        } else if( streamsList[key].length != listStreams[key].length ) {
          myset.add(`${id}${key}`);
        }
        idKey.push(`${id}${key}`);
      })
      // setKeys((keys: any) => [...idKey]);
      setKeys(Array.from(myset));
      setThisStreamsList(listStreams);
    }
  },[listStreams]);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    forceUpdate();
  }, [keys]);
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
  useEffect(()=>{
    if(data!== 'no data' ) {
      setSwSave(true);
      setDescription(data.description);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setjurisdiction(parseStringToArray(data.jurisdiction));
      setCosponsor(parseStringToArray(data.cosponsor));
      setNameProject(data.projectname);
      setProjectId(data.projectid);
      setEditsetprojectid(data.projectid);
      setSponsor(data.sponsor);
    }
  },[data]);
  useEffect(()=>{
    if(save === true){
      let mhfd_codes = streamsIntersectedIds.map((str:any) => str.mhfd_code);
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      var study = new Project();
      study.year = _year ? _year : study.year;
      study.projectname = nameProject;
      study.description = description;
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
      study.servicearea = cservice;
      study.county = ccounty;
      study.jurisdiction = cjurisdiction;
      study.sponsor = sponsor;
      study.cosponsor = csponsor;
      study.ids = mhfd_codes;
      study.files = files;
      study.geom = mhfd_codes;
      study.locality = locality? locality:'';
      study.editProject = editprojectid;
      study.cover = cover;
      let newStreamsArray: any = [];
      for(let str in listStreams) {
        newStreamsArray = [...newStreamsArray, ...listStreams[str]];
      }
      study.streams = newStreamsArray;
      if(swSave){
        editProjectStudy(study);
      }else{
        saveProjectStudy(study);
      }
      console.log(study, "+++STUDY+++");
      setVisibleStudy(false);
      setVisible(false);
    }
  },[save]);

  const projectReturn = useSelector((state:any)=>({
    state
  }));

  useEffect(()=>{
    setIds(projectReturn.state.project.streamsIntersectedIds);
  },[projectReturn.state.project ]);

  useEffect(()=>{
    if(ids.length !== 0 && description != '' && county.length !== 0 && serviceArea.length !== 0   && sponsor !== '' && jurisdiction.length !== 0 && streamsIntersectedIds != null && listStreams !== 0){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  },[ids, description, county, serviceArea, sponsor, jurisdiction, streamsIntersectedIds, listStreams]);

  const showModal = () => {
    const auxState = {...state};
    auxState.visibleStudy = true;
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

  const apllyCoSponsor = (e: any)=>{
    setCosponsor(e);
  };
  const handleCancel = (e: any) => {
    const auxState = {...state};
    setVisibleStudy (false);
    setState(auxState);
    setVisible(false);
  };

  const onClickDraw = () => {
    setIsDraw(!isDrawState);
  }
  const getTotalLength = () => {
    let total = 0;
    if(streamsList) {
      for( let stream in streamsList){
        // total += stream.length
        for( let s of streamsList[stream]) {
          total += s.length;
        }
      }
    }
    total = total * 0.000621371;
    return formatterDec.format(total);
  }
  const getTotalDreinage = () => {
    let total = 0;
    if(streamsList) {
      for( let stream in streamsList){
        // total += stream.dreinage
        for( let s of streamsList[stream]) {
          total += +s.drainage;
        }
      }
    }
    return formatterDec.format(total);
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const formatterDec = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  const formatterDec10 = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 10
  });
  const removeStream = (stream:any) => {
    let cartodbIdToRemove = stream.mhfd_code;
    let copyList = {...streamsList};
    for( let jurisdiction in copyList) {
      let newArray = [...copyList[jurisdiction]].filter((st:any)=> st.mhfd_code != cartodbIdToRemove);
      copyList[jurisdiction] = newArray;
    }
    let newCopyList:any = {};
    for(let jurisdiction in copyList) {
      if(copyList[jurisdiction].length > 0) {
        newCopyList[jurisdiction] = copyList[jurisdiction];
      }
    }

    setStreamsList(newCopyList);
    if(ids.length > 0) {
      let newIds = [...ids].filter((id:any) => id.mhfd_code != cartodbIdToRemove);
      setStreamsIds(newIds);
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
    changeDrawState(isDrawState);
  },[isDrawState]);

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
       visible={visibleStudy}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <CreateProjectMap type="STUDY" setGeom={setGeom} locality={locality} projectid={projectid} isEdit={swSave}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 17 }}>
                <label data-value={nameProject} style={{width: '100%'}}>
                  <textarea value={nameProject} onChange={(e) => onChange(e)} style={{
                    border: 'none',
                    width: '100%',
                    fontSize: '24px',
                    color: '#11093c',
                    wordWrap: 'break-word',
                    resize: 'none',
                  }} />
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()} />
                </Button>*/}
                <p>{serviceArea?(serviceArea.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea.length > 0 && county.length > 0)?'·':''} {county?(county.length > 1? 'Multiple Counties': (county[0])):''} </p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Study</label>
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
            <h5>2. SELECT STREAMS </h5>
            <div className={"draw "+(isDrawState?'active':'')} onClick={onClickDraw}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
                <p>Click on the icon and draw a polygon to select stream segments</p>
            </div>
            <Row className="streams">
              <Col xs={{ span: 24 }} lg={{ span: 11}}>Stream Name</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }}>Length (mi)</Col>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>Drainage Area (sq mi)</Col>
            </Row>
            { keys != 0 && keys.length &&
              <div key={'' + keys.length + Math.random()}>
              <Collapse
              key={'' + new Date()}
              defaultActiveKey={keys}
              activeKey={keys}
              destroyInactivePanel={false}
              expandIconPosition="right"
              onChange={(event: any)=> {setKeys(event)}}
            >
              {
                streamsList && Object.keys(streamsList).map((key: any, id: any) => {
                  return (
                    
                    <Panel header="" key={`${id}${key}`} extra={ key == 'Unnamed Streams'? genTitleUnnamed(key,streamsList[key], setHighlightedStreams) :genTitle(key, streamsList[key], setHighlightedStream)}>
                      <div key={Math.random() + ''} className="tab-body-project">
                        <Timeline>
                          {
                            streamsList[key] && streamsList[key].map((stream:any) => {
                              return (
                                <Timeline.Item color="green">
                                  <Row style={{marginLeft:'-18px'}}>
                                    <Col className="first" xs={{ span: 24 }} lg={{ span: 11}} xxl={{ span: 11 }}><label>{stream.jurisdiction}</label></Col>
                                    <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{ formatterDec.format(stream.length * 0.000621371)}</Col>
                                    <Col className="third" xs={{ span: 24 }} lg={{ span: 7}} xxl={{ span: 7 }}>{ formatterDec.format(stream.drainage)}</Col>
                                    <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent" onClick={()=> removeStream(stream)} ><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                                  </Row>
                                </Timeline.Item>
                              );
                            })
                          }

                        </Timeline>
                      </div>
                    </Panel>
                    )
                })
              }
            </Collapse>
            </div>
            }
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}>TOTAL</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><b>{getTotalLength()}mi</b></Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7}}><b>{getTotalDreinage()} sq mi</b></Col>
            </Row>

            {/*Section*/}
            {/* <h5>3. GENERATE PROJECT <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button> */}
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
              originModal="Study"
            />
            
            <br/>
            {/*Section*/}
            <UploadAttachment
              files={files}
              setFiles={setFiles}
              setCover={setCover}
              originModal="Study"
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
