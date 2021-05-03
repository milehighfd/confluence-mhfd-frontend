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
const genTitle = (streamName: any) => (
  <div className="tab-head-project">
    <div>{streamName}</div>
  </div>
)

export const ModalStudy= ({visibleStudy, setVisibleStudy, nameProject, setNameProject, typeProject, setVisible, locality, data, editable}:
  {visibleStudy: boolean, setVisibleStudy: Function, nameProject: string , setNameProject: Function, typeProject:string, setVisible: Function, locality?:any, data:any, editable:boolean }) => {
  const {saveProjectStudy, setStreamsList, setStreamIntersected, updateSelectedLayers, setStreamsIds, editProjectStudy, setServiceAreaCounty} = useProjectDispatch();
  const {streamsIntersectedIds} =useProjectState();
  const {userInformation} = useProfileState();
  const {organization, groupOrganization} = useProfileState();
  const {listStreams, streamIntersected} = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [country, setCountry] = useState('');
  const [isDraw, setIsDraw] = useState(false);
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
  const [keys, setKeys] = useState<any>([]);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiccion, setJurisdiccion] = useState<any>([]);
  useEffect(()=>{
    setServiceAreaCounty({});
    setStreamsList([]);
    setStreamIntersected({geom:null});
    updateSelectedLayers([ PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS, XSTREAMS ]);
  },[]);
  useEffect(()=>{
    console.log("LIST STREAMS", listStreams);
    if(listStreams) {
      const idKey = [...keys];
      Object.keys(listStreams).map((key: any, id: any) => {
        idKey.push(`${id}${key}`);
      })
      setKeys(idKey);
      setThisStreamsList(listStreams);
    }
  },[listStreams]);
  const parseStringToArray = (list:string) => {
    if( list ){
      return list.split(',');
    }
 }
  useEffect(()=>{
    console.log("DATA WAHTTT", data);
    if(data!== 'no data' ) {
      setSwSave(true);
      setDescription(data.description);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setJurisdiccion(parseStringToArray(data.jurisdiction));
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
      console.log("streams", mhfd_codes);
      var study = new Project();
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
    if(ids != undefined && description != '' && county != '' && serviceArea != ''  ){
      setDisable(false);
    }
    else{
      setDisable(true);
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
    total = total * 0.000621371;
    return formatterDec.format(total);
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
  const formatterDec = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
  const removeStream = (stream:any) => {
    // console.log("WHAT IAM REMOVING?, data comes from strem list", stream, streamsList, 'ids', projectReturn.state.project.streamsIntersectedIds);
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
          <CreateProjectMap type="STUDY" setGeom={setGeom} locality={locality} projectid={projectid} isEdit={swSave}></CreateProjectMap>
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
                  <img src="/Icons/icon-04.svg" alt="" height="18px" onClick={()=> apllyName()} />
                </Button>*/}
                <p>{serviceArea?(serviceArea.length > 1? 'Multiple Service Area': (serviceArea[0])):''} { (serviceArea && county)?'·':''} {county?(county.length > 1? 'Multiple Counties': (county[0])):''} </p>
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
                            streamsList[key] && streamsList[key].map((stream:any) => {
                              return (
                                <Timeline.Item color="green">
                                  <Row style={{marginLeft:'-18px'}}>
                                    <Col className="first" xs={{ span: 24 }} lg={{ span: 11}} xxl={{ span: 11 }}><label>{stream.jurisdiction}</label></Col>
                                    <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{ formatterDec.format(stream.length * 0.000621371)}</Col>
                                    <Col className="third" xs={{ span: 24 }} lg={{ span: 7}} xxl={{ span: 7 }}>{ formatter.format(stream.drainage)}</Col>
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
