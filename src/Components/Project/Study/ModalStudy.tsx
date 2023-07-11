import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Modal, Button, Row, Col, Popover, Collapse, Timeline, Checkbox } from 'antd';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { Project } from "../../../Classes/Project";
import { JURISDICTION, NEW_PROJECT_TYPES, ADMIN, STAFF } from "../../../constants/constants";
import store from "../../../store";
import { useProfileState } from "../../../hook/profileHook";
import { useHistory, useLocation } from "react-router-dom";
import { UploadImagesDocuments } from "../TypeProjectComponents/UploadImagesDocuments";
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
const { Panel } = Collapse;
const content = (<div className="popver-info">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>);

const stateValue = {
  visibleStudy: false
}
const deletefirstnumbersmhfdcode = (value: any) => {
  const arrayValues = value.stream.stream.MHFD_Code.split('.');
  arrayValues.shift();
  return arrayValues.join('.');
}
const genTitle = (streamName: any, streamData: any, setHighlightedStream: Function) => (
  <div className="tab-head-project" onMouseEnter={() => { const valueHighlight = !(streamData[0].mhfd_code) ? deletefirstnumbersmhfdcode(streamData[0]) : streamData[0].mhfd_code;  setHighlightedStream(valueHighlight)}} onMouseLeave={() => setHighlightedStream(undefined)}>
    <div>{streamName} </div>
  </div>
)
const genTitleUnnamed = (streamName: any, streamData: any, setHighlightedStreams: Function) => (
  <div className="tab-head-project" onMouseEnter={() => setHighlightedStreams(streamData)} onMouseLeave={() => setHighlightedStreams(undefined)}>
    <div>{streamName} </div>
  </div>
)

export const ModalStudy = ({ visibleStudy, setVisibleStudy, nameProject, setNameProject, typeProject, setVisible, locality, data, editable }:
  { visibleStudy: boolean, setVisibleStudy: Function, nameProject: string, setNameProject: Function, typeProject: string, setVisible: Function, locality?: any, data: any, editable: boolean }) => {
  const { 
    saveProjectStudy, 
    setStreamsList, 
    setStreamIntersected, 
    setStreamsIds, 
    editProjectStudy, 
    setServiceAreaCounty, 
    setJurisdictionSponsor, 
    setHighlightedStream, 
    setHighlightedStreams, 
    setIsEdit,
    setDeleteAttachmentsIds,
  } = useProjectDispatch();
  const { streamsIntersectedIds, isDraw , deleteAttachmentsIds} = useProjectState();
  const { organization, groupOrganization } = useProfileState();
  const { listStreams } = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [description, setDescription] = useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const { changeDrawState } = useProjectDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const [streamsList, setThisStreamsList] = useState<any>([]);
  const [sponsor, setSponsor] = useState("");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId] = useState(-1);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [geom, setGeom] = useState<any>('');
  const [keys, setKeys] = useState<any>(['-false']);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const [studyreason, setStudyReason] = useState<any>();
  const history = useHistory();
  const location = useLocation();
  const { toggleAttachmentCover,removeAttachment} = useAttachmentDispatch();
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const isWorkPlan = location.pathname.includes('work-plan');
  const { userInformation } = useProfileState();

  useEffect(() => {
    const CODE_LOCAL_GOVERNMENT = 3;
    if (userInformation?.business_associate_contact?.business_address?.business_associate?.code_business_associates_type_id === CODE_LOCAL_GOVERNMENT) {      
      if (userInformation?.business_associate_contact?.business_address?.business_associate?.business_name) {
        setSponsor(userInformation?.business_associate_contact?.business_address?.business_associate?.business_name);
      }
    }
  }, [userInformation]);

  useEffect(() => {
    setIsEdit(false);
    if (data !== 'no data') {
      setIsEdit(true);
      setSwSave(true);
      setDescription(data.description);
      setCounty(parseCountiesToArray(data.project_counties));
      setServiceArea(parseServiceAreaToArray(data.project_service_areas));
      setjurisdiction(parseJurisdictionToArray(data.project_local_governments));
      setCosponsor(parseSponsorCosponsorToArray(data.project_partners, 'cosponsor'));
      setSponsor(parseSponsorCosponsorToArray(data.project_partners, 'sponsor'));
      setNameProject(data.project_name);
      setProjectId(data.project_id);
      setEditsetprojectid(data.project_id);
      setStudyReason(data?.project_details[0]?.code_study_reason_id);
      setOtherReason(data?.project_details[0]?.comment);
    }
  }, [data]);

  useEffect(() => {
    if (save === true) {
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
      let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      let study = new Project();
      study.locality = _locality;
      study.isWorkPlan = isWorkPlan;
      study.year = _year ?? study.year;
      study.projectname = nameProject;
      study.description = description;
      let csponsor = "";
      if (cosponsor) {
        cosponsor.forEach((element: any) => {
          csponsor = csponsor + element + ",";
        });
        if (cosponsor.length !== 0) {
          csponsor = csponsor.substring(0, csponsor.length - 1)
        }
      }
      study.servicearea = serviceAreaIds;
      study.county = countyIds;
      study.jurisdiction = jurisdictionIds;
      study.sponsor = sponsor;
      study.cosponsor = csponsor;
      study.ids = mhfd_codes;
      study.files = files;
      study.geom = mhfd_codes;
      study.locality = locality ? locality : '';
      study.editProject = editprojectid;
      study.cover = '';
      study.studyreason = studyreason ?? 1;
      study.sendToWR = sendToWR;
      study.otherReason = otherReason;
      study.type = 'study';
      let newStreamsArray: any = [];
      for (let str in listStreams) {
        newStreamsArray = [...newStreamsArray, ...listStreams[str]];
      }
      study.streams = newStreamsArray;
      removeAttachment(deleteAttachmentsIds);
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      if (swSave) {
        editProjectStudy(study);
      } else {
        saveProjectStudy(study);
      }
      setVisibleStudy(false);
      setVisible(false);
    }
  }, [save]);

  useEffect(() => {
    if (description !== '' && county.length !== 0 && serviceArea.length !== 0 && jurisdiction.length !== 0) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [ids, description, county, serviceArea, sponsor, jurisdiction, streamsIntersectedIds, listStreams]);

  useEffect(() => {
    setServiceAreaCounty({});
    setStreamsList([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    return () => {
      setServiceArea([]);
      setStreamsList([]);
      setStreamIntersected({ geom: null });
      setStreamsIds([]);
    }
  }, []);

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
  useEffect(() => {
    getTextWidth(nameProject);
  }, [nameProject]);
  useEffect(() => {
    if (isDrawState && !isDraw) {
      setIsDraw(isDraw);
    }
  }, [isDraw]);
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
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    forceUpdate();
  }, [keys]);
  const parseStringToArray = (list: string) => {
    if (list) {
      return list.split(',');
    }
  }
  function titleCase(str:any) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

  const parseCountiesToArray = (list: any) => {
    let counties:any = [];
    if (list) {
    list.forEach((county : any) => {
      counties.push(county?.CODE_STATE_COUNTY?.county_name +' County')
    });
    }
    return counties;
  }
  const parseServiceAreaToArray = (list: any) => {
    let serviceAreas:any = [];
    if (list) {
    list.forEach((serviceArea : any) => {
      serviceAreas.push(serviceArea?.CODE_SERVICE_AREA?.service_area_name +' Service Area')
    });
    }
    return serviceAreas;
  }

  const parseJurisdictionToArray = (list: any) => {
    let jurisdictions:any = [];
    if (list) {
    list.forEach((jurisdiction : any) => {
      jurisdictions.push(jurisdiction.CODE_LOCAL_GOVERNMENT.local_government_name)
    });
    }
    return jurisdictions;
  }
  const parseSponsorCosponsorToArray = (list: any, type:string) => {
    let sponsors:any = [];
    let cosponsors:any = [];
    if (list) {
    list.forEach((sponsorCosponsor : any) => {
      if(sponsorCosponsor.code_partner_type_id === 11){
        sponsors.push(titleCase(sponsorCosponsor.business_associate.business_name))
      }
      if(sponsorCosponsor.code_partner_type_id === 12){
        cosponsors.push(titleCase(sponsorCosponsor.business_associate.business_name))
      }
    });
    }
    if(type === 'sponsor'){
      return sponsors;
    }
    if(type === 'cosponsor'){
      return cosponsors;
    }
  } 

  const projectReturn = useSelector((state: any) => ({
    state
  }));

  useEffect(() => {
    setIds(projectReturn.state.project.streamsIntersectedIds);
  }, [projectReturn.state.project]);

  const onChange = (e: any) => {
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    setVisibleAlert(true);
  };

  const handleCancel = (e: any) => {
    const auxState = { ...state };
    setVisibleStudy(false);
    setState(auxState);
    setVisible(false);
  };

  const onClickDraw = () => {
    setIsDraw(!isDrawState);
  }
  const getTotalLength = () => {
    let total = 0;
    if (streamsList) {
      for (let stream in streamsList) {
        for (let s of streamsList[stream]) {
          total += s.length;
        }
      }
    }
    if (swSave ) {
      return formatterDec.format(total);
    }
    total = total * 0.000621371;
    return formatterDec.format(total);
  }
  const getTotalDreinage = () => {
    let total = 0;
    if (streamsList) {
      for (let stream in streamsList) {
        for (let s of streamsList[stream]) {
          total += +s.drainage;
        }
      }
    }
    if (swSave ) {
      return formatterDec.format(total);
    }
    return formatterDec.format(total);
  }

  const formatterDec = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  const removeStream = (stream: any) => {
    console.log('Stream to remove', stream);
    let mhfd_codeIdToRemove = stream?.mhfd_code;
    let copyList = { ...streamsList };
    console.log('Current list', streamsList, mhfd_codeIdToRemove);
    for (let jurisdiction in copyList) {
      let newArray = [...copyList[jurisdiction]].filter((st: any) => st.mhfd_code != mhfd_codeIdToRemove);
      copyList[jurisdiction] = newArray;
    }
    let newCopyList: any = {};
    for (let jurisdiction in copyList) {
      if (copyList[jurisdiction].length > 0) {
        newCopyList[jurisdiction] = copyList[jurisdiction];
      }
    }

    setStreamsList(newCopyList);
    if (ids.length > 0) {
      let newIds = [...ids].filter((id: any) => {
        const arrayValues = mhfd_codeIdToRemove.split('.');
        arrayValues.shift();
        console.log('THIS IS TRHUE', id.mhfd_code,  arrayValues.join('.'), id.mhfd_code == arrayValues.join('.'));
        return id.mhfd_code !== arrayValues.join('.');
      });
      
      
      console.log('Ids before', ids, 'After', newIds);
      setStreamsIds(newIds);
    }

  }
  
  useEffect(() => {
    changeDrawState(isDrawState);
  }, [isDrawState]);

  return (
    <>
      {visibleAlert && <AlertView
        isWorkPlan={isWorkPlan}
        sponsor={sponsor}
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        setSave={setSave}
        jurisdictions={jurisdiction}
        counties={null}
        serviceareas={serviceArea}
        type="Study"
        isEdit={swSave}
        sendToWr={sendToWR}
        setsendToWR={setsendToWR}
        locality={[locality.replace(' Work Plan', '')]}
      />}
      <Modal
        centered
        maskClosable={false}
        visible={visibleStudy}
        onOk={handleOk}
        onCancel={handleCancel}
        className="projects"
        width={pageWidth >3000 ? "2000px" : "1100px"}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 10 }}>
            <CreateProjectMap type="STUDY" setGeom={setGeom} locality={locality} projectid={projectid} isEdit={swSave}></CreateProjectMap>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
            <div className="head-project">
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 17 }}>
                  <label data-value={nameProject} style={{ width: '100%' }}>
                    <textarea className="project-name" value={nameProject} onChange={(e) => onChange(e)} style={{
                      border: 'none',
                      width: '100%',
                      fontSize: '24px',
                      color: '#11093c',
                      wordWrap: 'break-word',
                      resize: 'none',
                      lineHeight: '27px',
                      height: lengthName > 280 ? 'unset' : '34px'
                    }} />
                  </label>
                  <p>{serviceArea ? (serviceArea.length > 1 ? 'Multiple Service Area' : (serviceArea[0])) : ''} {(serviceArea.length > 0 && county.length > 0) ? '·' : ''} {county ? (county.length > 1 ? 'Multiple Counties' : (county[0])) : ''} </p>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{ textAlign: 'right' }}>
                  <label className="tag-name" style={{ padding: '10px' }}>Study</label>
                  <Popover content={content}>
                    <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                  </Popover>
                </Col>
              </Row>
            </div>

            <div className="body-project">
              {
                (isWorkPlan && showCheckBox && !swSave) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}} className='span-project-text'>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
              <ProjectInformation
                type={NEW_PROJECT_TYPES.Study}
                description={description}
                setDescription={setDescription}
                reason={studyreason}
                setReason={setStudyReason}
                otherReason={otherReason}
                setOtherReason={setOtherReason}
              />
              <br />
              <h5 style={{marginTop:'5px'}}>
                2. SELECT STREAMS
            </h5>
              <div className={"draw " + (isDrawState ? 'active' : '')} onClick={onClickDraw}>
                <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
                <p>Click on the icon and draw a polygon to select stream segments</p>
              </div>
              <Row className="streams">
                <Col xs={{ span: 24 }} lg={{ span: 11 }}>Stream Name</Col>
                <Col xs={{ span: 24 }} lg={{ span: 5 }} style={{textAlign:'center'}}>Length (mi)</Col>
                <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{textAlign:'center'}}>Drainage Area (sq mi)</Col>
                <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}></Col>
              </Row>
              {keys !== 0 && keys.length &&
                <div key={'code'}>
                  <Collapse
                    key={'collapse'}
                    defaultActiveKey={keys}
                    activeKey={keys}
                    destroyInactivePanel={false}
                    expandIconPosition="end"
                    onChange={(event: any) => { setKeys(event) }}
                  >
                    {
                      streamsList && Object.keys(streamsList).map((key: any, id: any) => {
                        return (

                          <Panel header="" key={`${key}`} extra={key == 'Unnamed Streams' ? genTitleUnnamed(key, streamsList[key], setHighlightedStreams) : genTitle(key, streamsList[key], setHighlightedStream)}>
                            <div key={`${key}`} className="tab-body-project">
                              <Timeline>
                                {
                                  streamsList[key] && streamsList[key].map((stream: any, index :any) => {
                                    return (
                                      <Timeline.Item color="green" key={index}>
                                        <Row style={{ marginLeft: '-18px' }}>
                                          <Col className="first" xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label>{stream?.code_local_goverment.length > 0 ? stream.code_local_goverment[0].local_government_name: ''}</label></Col>
                                          <Col className="second" style={{textAlign:'center'}} xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{swSave ? stream.length : formatterDec.format(stream.length * 0.000621371)}</Col>
                                          <Col className="third" style={{textAlign:'center',paddingLeft: '0px'}} xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>{swSave ? stream.drainage : formatterDec.format(stream.drainage)}</Col>
                                          <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent" onClick={() => removeStream(stream)} ><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
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
              <hr />
              <Row className="cost-project">
                <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}>TOTAL</Col>
                <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }} style={{textAlign:'center'}}><b>{getTotalLength()} mi</b></Col>
                <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }} style={{textAlign:'center'}}><b>{getTotalDreinage()} sq mi</b></Col>
              </Row>
              <br></br>
              <LocationInformation
                setServiceArea={setServiceArea}
                serviceArea={serviceArea}
                setCounty={setCounty}
                county={county}
                setjurisdiction={setjurisdiction}
                jUrisdiction={jurisdiction}
                setCoSponsor={setCosponsor}
                cosponsor={cosponsor}
                setSponsor={setSponsor}
                sponsor={sponsor}
                editable={editable}
                isEdit={swSave}
                originModal="Study"
              />

              <br />
              <UploadImagesDocuments
              isCapital={false}
              setFiles={setFiles}
            />
            </div>
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
