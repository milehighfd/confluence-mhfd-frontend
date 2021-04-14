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
import {
  PROBLEMS_TRIGGER,
  XSTREAMS,
  MHFD_BOUNDARY_FILTERS,
} from "../../../constants/constants";
import { forceLink } from "d3";
import { useProfileState } from "../../../hook/profileHook";
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info"><b>Sponsor</b> is the Jurisdiction that requested the project.</div>);
const content04 = (<div className="popver-info"><b>Co-Sponsor</b> is any additional Jurisdiction that will be contributing funding to the project.</div>);
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
const genTitle = (streamName: any) => (
  <div className="tab-head-project">
    <div>{streamName}</div>
  </div>
)

export const ModalStudy= ({visibleStudy, setVisibleStudy, nameProject, setNameProject, typeProject, setVisible, locality, data}:
  {visibleStudy: boolean, setVisibleStudy: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any, data:any }) => {
  const {saveProjectStudy, setStreamsList, setStreamIntersected, updateSelectedLayers, setStreamsIds} = useProjectDispatch();
  const {organization, groupOrganization} = useProfileState();
  const {listStreams, streamIntersected} = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState('');
  const [country, setCountry] = useState('');
  const [isDraw, setIsDraw] = useState(false);
  const {changeDrawState} = useProjectDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const [streamsList, setThisStreamsList] = useState<any>([]);
 const [sponsor, setSponsor] = useState(organization+"");
 const [cosponsor, setCosponsor] = useState([]);
  const [county, setCounty] = useState('');
  const [projectid, setProjectId] = useState(-1);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [name, setName ] = useState(false);
  const [disableName, setDisableName ] = useState(true);
  const [geom, setGeom] = useState<any>('');
  const [keys, setKeys] = useState<any>([]);

  useEffect(()=>{
    setStreamsList([]);
    setStreamIntersected({geom:null});
    updateSelectedLayers([ PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS, XSTREAMS ]);
  },[]);
  useEffect(()=>{
    // console.log("LIST STREAMS", listStreams);
    if(listStreams) {
      const idKey = [...keys];
      Object.keys(listStreams).map((key: any, id: any) => {
        idKey.push(`${id}${key}`);
      })
      setKeys(idKey);
      setThisStreamsList(listStreams);
    }
  },[listStreams]);
  useEffect(()=>{
    if(data!== 'no data' ) {
      setCounty(data.county);
      setDescription(data.description);
      setNameProject(data.projectname);
      setServiceArea(data.servicearea);
      setProjectId(data.projectid);
    }
  },[data]);
  useEffect(()=>{
    if(save === true){
      var study = new Project();
      study.projectname = nameProject;
      study.description = description;
      study.county = county;
      study.servicearea = serviceArea;
      study.sponsor = sponsor;
      study.cosponsor = cosponsor;
      study.ids = ids;
      study.files = files;
      study.geom = streamsList;
      saveProjectStudy(study);
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
    if(ids != undefined && description != '' && county != '' && serviceArea != '' ){
      setDisable(false);
    }
  },[ids, description, county, serviceArea]);

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
    const auxState = {...state};
   // setVisibleStudy (false);
    setState(auxState);
    setVisibleAlert( true);
  };
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
    setIsDraw(!isDraw);
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
    total = Math.round(total);
    return formatter.format(total);
  }
  const getTotalDreinage = () => {
    let total = 0;
    if(streamsList) {
      for( let stream in streamsList){
        // total += stream.dreinage
        for( let s of streamsList[stream]) {
          total += s.drainage;
        }
      }
    }
    total = Math.round(total);
    return formatter.format(total);
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const removeStream = (stream:any) => {
    console.log("WHAT IAM REMOVING?, data comes from strem list", stream, streamsList, 'ids', projectReturn.state.project.streamsIntersectedIds);
    let cartodbIdToRemove = stream.cartodb_id;
    let copyList = {...streamsList};
    for( let jurisdiction in copyList) {
      let newArray = [...copyList[jurisdiction]].filter((st:any)=> st.cartodb_id != cartodbIdToRemove);
      copyList[jurisdiction] = newArray;
    }
    let newCopyList:any = {};
    for(let jurisdiction in copyList) {
      if(copyList[jurisdiction].length > 0) {
        newCopyList[jurisdiction] = copyList[jurisdiction];
      }
    }

    setStreamsList(newCopyList);
    console.log("NEW LIST", copyList);
    if(ids.length > 0) {
      let newIds = [...ids].filter((id:any) => id != cartodbIdToRemove);
      console.log("NEW IDS", newIds);
      setStreamsIds(newIds);
    }
    
  }
  useEffect(()=>{
    changeDrawState(isDraw);
  },[isDraw]);
  
  return (
    <>
    {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
     />}
     <Modal
       centered
       visible={visibleStudy}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <CreateProjectMap type="STUDY" setGeom={setGeom} locality={locality}></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <label data-value={nameProject} className="input-sizer">
                  <input type="text" value={nameProject} onChange={(e) => onChange(e)} size={5} placeholder={nameProject} /*disabled={disableName}*//>
                </label>
                {/*<Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />*/}
                {/*<Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()} />
                </Button>*/}
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
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
            <h5>2. SELECT STREAMS <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
            <div className={"draw "+(isDraw?'active':'')} onClick={onClickDraw}>
              <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
                <p>Click on the icon and draw a polygon to select stream segments</p>
            </div>
            <Row className="streams">
              <Col xs={{ span: 24 }} lg={{ span: 11}}>Stream Name</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }}>Length (mi)</Col>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>Drainage Area (sq mi)</Col>
            </Row>
            { keys!=0 && keys.length && 
              <Collapse
              defaultActiveKey={keys}
              expandIconPosition="right"
            >
              {/* <Panel header="" key="1" extra={genExtra()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row style={{marginLeft:'-18px'}}>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}> <label>Aurora</label> <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>1.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <span className="amount">24.0 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                      <Timeline.Item color="purple">
                        <Row style={{marginLeft:'-18px'}}>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label> Araphoe County</label> <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>1.4 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <span className="amount">41.8 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel> */}
              {/* <Panel header="" key="2" extra={genExtra00()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label> Boulder</label> <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>3.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }} >
                            <span className="amount">41.8 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel> */}
              {
                streamsList && Object.keys(streamsList).map((key: any, id: any) => {
                  return (
                    <Panel header="" key={`${id}${key}`} extra={genTitle(key)}>
                      <div className="tab-body-project">
                        <Timeline>
                          {
                            streamsList[key].map((stream:any) => {
                              return (
                                <Timeline.Item color="green">
                                  <Row style={{marginLeft:'-18px'}}>
                                    <Col className="first" xs={{ span: 24 }} lg={{ span: 11}} xxl={{ span: 15 }}><label>{stream.jurisdiction}</label></Col>
                                    <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{ formatter.format(Math.round(stream.length))}</Col>
                                    <Col className="third" xs={{ span: 24 }} lg={{ span: 7}} xxl={{ span: 3 }}>{ formatter.format(stream.drainage)}</Col>
                                    <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent" onClick={()=> removeStream(stream)} ><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                                  </Row>
                                </Timeline.Item>
                              );
                            })
                          }

                        </Timeline>
                      </div>
                    </Panel>)
                })
              }
            </Collapse>
            }
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}>TOTAL</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><b>{getTotalLength()}mi</b></Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7}}><b>{getTotalDreinage()} sq mi</b></Col>
            </Row>
            <br/>

            {/*Section*/}
            {/* <h5>3. GENERATE PROJECT <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button> */}
            <br/>

            <LocationInformation
              setServiceArea = {setServiceArea}
              setCounty = {setCounty}
            />
            <br/>
            
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Sponsor <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder={sponsor+""}style={{width:'100%'}} >
                  <Option value={sponsor+""}>{sponsor+""}</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Potencial Co-Sponsor <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select  mode="multiple" placeholder="Select a Co-Sponsor" style={{width:'100%'}} onChange={(coSponsor:any)=> apllyCoSponsor(coSponsor)}>
                  {groupOrganization.map((element:any) =>{
                    if(element.aoi !== sponsor){
                      return <Option key={element.aoi} value={element.aoi}>{element.aoi}</Option>
                    }
                  })}
                </Select>
              </Col>
            </Row>
            {/*Section*/}
            <UploadAttachment
              typeProject = {typeProject}
              files={files}
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
