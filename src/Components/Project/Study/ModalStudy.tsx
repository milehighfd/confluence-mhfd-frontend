import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Modal, Button, Input, Row, Col, Popover, Select, Collapse, Timeline, Checkbox } from 'antd';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { Project } from "../../../Classes/Project";
import { JURISDICTION, NEW_PROJECT_TYPES, STREAMS_FILTERS, ADMIN, STAFF } from "../../../constants/constants";
import store from "../../../store";
import {
  PROBLEMS_TRIGGER,
  XSTREAMS,
  MHFD_BOUNDARY_FILTERS,
} from "../../../constants/constants";
import { useProfileState } from "../../../hook/profileHook";
import { useHistory } from "react-router-dom";
import { UploadImagesDocuments } from "../TypeProjectComponents/UploadImagesDocuments";
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
  const { saveProjectStudy, setStreamsList, setStreamIntersected, updateSelectedLayers, setStreamsIds, editProjectStudy, setServiceAreaCounty, setJurisdictionSponsor, setHighlightedStream, setHighlightedStreams } = useProjectDispatch();
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
  const [cover, setCover] = useState('');
  const [streamsList, setThisStreamsList] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization + "");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [projectid, setProjectId] = useState(-1);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [name, setName] = useState(false);
  const [disableName, setDisableName] = useState(true);
  const [geom, setGeom] = useState<any>('');
  const [keys, setKeys] = useState<any>(['-false']);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const [studyreason, setStudyReason] = useState();
  const [studysubReason, setStudySubReason] = useState();
  const history = useHistory();
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const [isWorkRequest,setIsWorkRequest] = useState(false);
  useEffect(() => {
    setServiceAreaCounty({});
    setStreamsList([]);
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    updateSelectedLayers([PROBLEMS_TRIGGER, MHFD_BOUNDARY_FILTERS, XSTREAMS, STREAMS_FILTERS]);
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
    if (listStreams) {
      const idKey: any = [];
      const myset = new Set(keys);
      Object.keys(listStreams).map((key: any, id: any) => {
        if (!streamsList[key]) {
          myset.add(`${id}${key}`);
        } else if (streamsList[key].length != listStreams[key].length) {
          myset.add(`${id}${key}`);
        }
        idKey.push(`${id}${key}`);
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
  useEffect(() => {
    if (data !== 'no data') {
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
      setSponsor(data.studyreason);
      setSponsor(data.sutdysubreason);
    }
  }, [data]);
  useEffect(() => {
    if (save === true) {
      let mhfd_codes = streamsIntersectedIds.map((str: any) => str.mhfd_code);
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      var study = new Project();
      study.year = _year ? _year : study.year;
      study.projectname = nameProject;
      study.description = description;
      let cservice = "";
      serviceArea.map((element: any) => {
        cservice = cservice + element + ",";
      })
      if (cservice.length != 0) {
        cservice = cservice.substring(0, cservice.length - 1)
      }
      let ccounty = "";
      county.map((element: any) => {
        ccounty = ccounty + element + ",";
      })
      if (ccounty.length != 0) {
        ccounty = ccounty.substring(0, ccounty.length - 1)
      }
      let cjurisdiction = "";
      jurisdiction.map((element: any) => {
        cjurisdiction = cjurisdiction + element + ",";
      })
      if (cjurisdiction.length != 0) {
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length - 1)
      }

      let csponsor = "";
      if (cosponsor) {
        cosponsor.map((element: any) => {
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
      study.cover = cover;
      study.studyreason = studyreason ?? '';
      study.studysubreason = studysubReason || '';
      let newStreamsArray: any = [];
      for (let str in listStreams) {
        newStreamsArray = [...newStreamsArray, ...listStreams[str]];
      }
      study.streams = newStreamsArray;
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
    if (ids.length !== 0 && description != '' && county.length !== 0 && serviceArea.length !== 0 && sponsor !== '' && sponsor !== undefined && jurisdiction.length !== 0 && streamsIntersectedIds != null && listStreams !== 0) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [ids, description, county, serviceArea, sponsor, jurisdiction, streamsIntersectedIds, listStreams]);

  const showModal = () => {
    const auxState = { ...state };
    auxState.visibleStudy = true;
    setState(auxState);
  };

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
        sponsor={sponsor}
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        setSave={setSave}
        jurisdictions={jurisdiction}
        counties={null}
        serviceareas={serviceArea}
        type="Study"
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
                showCheckBox && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                    <div style={{paddingBottom: '15px'}}>
                      <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={isWorkRequest} onChange={() => setIsWorkRequest(!isWorkRequest)}></Checkbox>Submit this project also as a Work Request
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
                <span className="requiered">&nbsp;*&nbsp;</span>
              <img src="/Icons/icon-08.svg" />
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
              {keys != 0 && keys.length &&
                <div key={'' + keys.length + Math.random()}>
                  <Collapse
                    key={'' + new Date()}
                    defaultActiveKey={keys}
                    activeKey={keys}
                    destroyInactivePanel={false}
                    expandIconPosition="end"
                    onChange={(event: any) => { setKeys(event) }}
                  >
                    {
                      streamsList && Object.keys(streamsList).map((key: any, id: any) => {
                        return (

                          <Panel header="" key={`${id}${key}`} extra={key == 'Unnamed Streams' ? genTitleUnnamed(key, streamsList[key], setHighlightedStreams) : genTitle(key, streamsList[key], setHighlightedStream)}>
                            <div key={`${key}~${id}`} className="tab-body-project">
                              <Timeline>
                                {
                                  streamsList[key] && streamsList[key].map((stream: any) => {
                                    return (
                                      <Timeline.Item color="green">
                                        <Row style={{ marginLeft: '-18px' }}>
                                          <Col className="first" xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label>{stream.jurisdiction}</label></Col>
                                          <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>{formatterDec.format(stream.length * 0.000621371)}</Col>
                                          <Col className="third" xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>{formatterDec.format(stream.drainage)}</Col>
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
