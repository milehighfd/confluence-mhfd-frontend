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

const genTitle = (streamName: any, streamData: any, setHighlightedStream: Function) => (
  <div className="tab-head-project" onMouseEnter={() => setHighlightedStream(streamData[0].mhfd_code)} onMouseLeave={() => setHighlightedStream(undefined)}>
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
  const { saveProjectStudy, setStreamsList, setStreamIntersected, setStreamsIds, editProjectStudy, setServiceAreaCounty, setJurisdictionSponsor, setHighlightedStream, setHighlightedStreams } = useProjectDispatch();
  const { streamsIntersectedIds, isDraw } = useProjectState();
  const { organization } = useProfileState();
  const { listStreams } = useProjectState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] = useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [isDrawState, setIsDraw] = useState(false);
  const { changeDrawState } = useProjectDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const [streamsList, setThisStreamsList] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization + "");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId] = useState(data.project_id);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [geom, setGeom] = useState<any>('');
  const [keys, setKeys] = useState<any>(['-false']);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const [studyreason, setStudyReason] = useState();
  const [studysubReason, setStudySubReason] = useState();
  const history = useHistory();
  const location = useLocation();
  const { toggleAttachmentCover} = useAttachmentDispatch();
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const isWorkPlan = location.pathname.includes('work-plan');

  useEffect(() => {
    setServiceAreaCounty({});
    setStreamsList([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    return () => {
      setServiceArea({});
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
    console.log(' par ', studyreason, 'par 2' , studysubReason);
  }, [studyreason, studysubReason]);
  useEffect(() => {
    if (listStreams) {
      const idKey: any = [];
      const myset = new Set(keys);
      Object.keys(listStreams).forEach((key: any, id: any) => {
        if (!streamsList[key]) {
          myset.add(`${key}`);
        } else if (streamsList[key].length != listStreams[key].length) {
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
      counties.push(county.CODE_STATE_COUNTY.county_name +' County')
    });
      console.log('counties',counties)
    }
    return counties;
  }
  const parseServiceAreaToArray = (list: any) => {
    let serviceAreas:any = [];
    if (list) {
    list.forEach((serviceArea : any) => {
      serviceAreas.push(serviceArea.CODE_SERVICE_AREA.service_area_name +' Service Area')
    });
      console.log('serviceAreas',serviceAreas)
    }
    return serviceAreas;
  }

  const parseJurisdictionToArray = (list: any) => {
    let jurisdictions:any = [];
    if (list) {
    list.forEach((jurisdiction : any) => {
      jurisdictions.push(jurisdiction.CODE_LOCAL_GOVERNMENT.local_government_name)
    });
      console.log('jurisdictions',jurisdictions)
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
      console.log('sponsors',sponsors)
      console.log('cosponsors',cosponsors)
    }
    if(type === 'sponsor'){
      return sponsors;
    }
    if(type === 'cosponsor'){
      return cosponsors;
    }
  }

  useEffect(() => {
    console.log('dataaaaa',data)
    if (data !== 'no data') {
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
      
      setStudyReason(data.project_studies[0].study.code_study_sub_reason.code_study_reasons[0].reason_name);
      setStudySubReason(data.project_studies[0].study.code_study_sub_reason.sub_reason_name);
    }
  }, [data]);
  useEffect(() => {
    if (save === true) {
      let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var study = new Project();
      study.locality = _locality;
      study.isWorkPlan = isWorkPlan;
      study.year = _year ?? study.year;
      study.projectname = nameProject;
      study.description = description;
      let cservice = "";
      serviceArea.forEach((element: any) => {
        cservice = cservice + element + ",";
      });
      if (cservice.length != 0) {
        cservice = cservice.substring(0, cservice.length - 1);
      }
      let ccounty = "";
      county.forEach((element: any) => {
        ccounty = ccounty + element + ",";
      });
      if (ccounty.length != 0) {
        ccounty = ccounty.substring(0, ccounty.length - 1);
      }
      let cjurisdiction = "";
      jurisdiction.forEach((element: any) => {
        cjurisdiction = cjurisdiction + element + ",";
      });
      if (cjurisdiction.length != 0) {
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length - 1);
      }

      let csponsor = "";
      if (cosponsor) {
        cosponsor.forEach((element: any) => {
          csponsor = csponsor + element + ",";
        });
        if (cosponsor.length != 0) {
          csponsor = csponsor.substring(0, csponsor.length - 1)
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
      study.locality = locality ? locality : '';
      study.editProject = editprojectid;
      study.cover = '';
      study.studyreason = studyreason ?? '';
      study.studysubreason = studysubReason || '';
      study.sendToWR = sendToWR;
      let newStreamsArray: any = [];
      for (let str in listStreams) {
        newStreamsArray = [...newStreamsArray, ...listStreams[str]];
      }
      study.streams = newStreamsArray;
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
      console.log(study, "+++STUDY+++");
      setVisibleStudy(false);
      setVisible(false);
    }
  }, [save]);

  const projectReturn = useSelector((state: any) => ({
    state
  }));

  useEffect(() => {
    setIds(projectReturn.state.project.streamsIntersectedIds);
  }, [projectReturn.state.project]);

  useEffect(() => {
    if (description != '' && county.length !== 0 && serviceArea.length !== 0 && sponsor !== '' && sponsor !== undefined && jurisdiction.length !== 0) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [ids, description, county, serviceArea, sponsor, jurisdiction, streamsIntersectedIds, listStreams]);

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
          total += s.length_in_mile;
        }
      }
    }
    // commented cause new data of lenght comes in miles
    // total = total * 0.000621371;
    return formatterDec.format(total);
  }
  const getTotalDreinage = () => {
    let total = 0;
    if (streamsList) {
      for (let stream in streamsList) {
        for (let s of streamsList[stream]) {
          total += +s.drainage_area_in_sq_miles;
        }
      }
    }
    return formatterDec.format(total);
  }

  const formatterDec = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  const removeStream = (stream: any) => {
    let cartodbIdToRemove = stream.mhfd_code;
    let copyList = { ...streamsList };
    for (let jurisdiction in copyList) {
      let newArray = [...copyList[jurisdiction]].filter((st: any) => st.mhfd_code != cartodbIdToRemove);
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
      let newIds = [...ids].filter((id: any) => id.mhfd_code != cartodbIdToRemove);
      setStreamsIds(newIds);
    }

  }
  useEffect(() => {
    let juris = JURISDICTION.find((elem: any) => elem.includes(organization));
    if (juris) {
      setSponsor(organization);
    } else {
      setSponsor(locality);
    }
  }, [organization]);
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
                (showCheckBox && !swSave) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}}>
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
                subReason={studysubReason}
                setSubReason={setStudySubReason}
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
                <Col xs={{ span: 24 }} lg={{ span: 5 }}>Length (mi)</Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>Drainage Area (sq mi)</Col>
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
                                  streamsList[key] && streamsList[key].map((stream: any) => {
                                    return (
                                      <Timeline.Item color="green">
                                        <Row style={{ marginLeft: '-18px' }}>
                                          <Col className="first" xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label>{stream.local_government_id}</label></Col>
                                          {/* <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{formatterDec.format(stream.length * 0.000621371)}</Col> */}
                                          <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{formatterDec.format(stream.length_in_mile)}</Col>
                                          <Col className="third" xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>{formatterDec.format(stream.drainage_area_in_sq_miles? stream.drainage_area_in_sq_miles: 0)}</Col>
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
                <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><b>{getTotalLength()}mi</b></Col>
                <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}><b>{getTotalDreinage()} sq mi</b></Col>
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
              <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
