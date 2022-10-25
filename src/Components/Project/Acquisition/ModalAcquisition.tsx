import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Popover, Select, Checkbox } from 'antd';
import { SERVER } from "../../../Config/Server.config";
import { AlertView } from "../../Alerts/AlertView";
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { DropPin } from "../TypeProjectComponents/DropPin";
import { PROJECT_INFORMATION } from "../../../constants/constants";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { getData, getToken } from "../../../Config/datasets";
import { useProjectDispatch } from "../../../hook/projectHook";
import { Project } from "../../../Classes/Project";
import { useProfileState } from "../../../hook/profileHook";
import { JURISDICTION, ADMIN, STAFF } from "../../../constants/constants";
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
import { useHistory, useLocation } from "react-router-dom";
import { UploadImagesDocuments } from "../TypeProjectComponents/UploadImagesDocuments";
import store from "../../../store";

const { Option } = Select;
const content = (<div className="popver-info">The purchase of property that is shown to have high flood risk or is needed to implement master plan improvements.</div>);
const content03 = (<div className="popver-info">Progress indicates the current status of the acquisition.</div>);
const content04 = (<div className="popver-info">This is the best available estimate of when the acquisition will close.</div>);
const selec = [0];

for (var i = 1; i < 21; i++) {
  selec.push(i);
}
const stateValue = {
  visibleAcqui: false,
}

export const ModalAcquisition = ({ visibleAcquisition, setVisibleAcquisition, nameProject, setNameProject, typeProject, setVisible, locality, data, editable }:
  {
    visibleAcquisition: boolean,
    setVisibleAcquisition: Function,
    nameProject: string,
    setNameProject: Function,
    typeProject: string,
    setVisible: Function,
    locality?: any,
    data: any,
    editable: boolean
  }) => {

  const { saveProjectAcquisition, setStreamIntersected, editProjectAcquisition, setEditLocation, setStreamsIds, setServiceAreaCounty, setJurisdictionSponsor } = useProjectDispatch();
  const { organization } = useProfileState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] = useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [sponsor, setSponsor] = useState(organization + "");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [progress, setProgress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [save, setSave] = useState(false);
  const [geom, setGeom] = useState<any>();
  const [files, setFiles] = useState<any[]>([]);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  var date = new Date();
  const history = useHistory();
  const location = useLocation();
  var year = date.getFullYear();
  const [currentYear, setCurrentYear] = useState(2023);
  const [lengthName, setlengthName] = useState(0);
  const appUser = store.getState().appUser;
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const { toggleAttachmentCover} = useAttachmentDispatch();
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const isWorkPlan = location.pathname.includes('work-plan');
  
  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    if (params.get('year')) {
      const t = params.get('year') ?? '2023';
      setCurrentYear(+t);
    }
  }, [history]);

  useEffect(() => {
    if (save === true) {
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var acquisition = new Project();
      acquisition.locality = _locality;
      acquisition.isWorkPlan = isWorkPlan;
      acquisition.year = _year ?? acquisition.year;
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
      })
      if (cjurisdiction.length != 0) {
        cjurisdiction = cjurisdiction.substring(0, cjurisdiction.length - 1);
      }

      let csponsor = "";
      if (cosponsor) {
        cosponsor.forEach((element: any) => {
          csponsor = csponsor + element + ",";
        });
        if (cosponsor.length != 0) {
          csponsor = csponsor.substring(0, csponsor.length - 1);
        }
      }
      acquisition.servicearea = cservice;
      acquisition.county = ccounty;
      acquisition.jurisdiction = cjurisdiction;
      acquisition.sponsor = sponsor;
      acquisition.cosponsor = csponsor;
      acquisition.projectname = nameProject;
      acquisition.description = description;
      acquisition.geom = geom;
      acquisition.acquisitionprogress = progress;
      acquisition.acquisitionanticipateddate = purchaseDate;
      acquisition.files = files;
      acquisition.editProject = editprojectid;
      acquisition.locality = locality ? locality : '';
      acquisition.cover = '';
      acquisition.sendToWR = sendToWR;
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      if (swSave) {
        editProjectAcquisition(acquisition);
      } else {
        saveProjectAcquisition(acquisition);
      }
      setVisibleAcquisition(false);
      setVisible(false);
    }
  }, [save]);


  const parseStringToArray = (list: string) => {
    if (list) {
      return list.split(',');
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
    if (data !== 'no data') {
      setSwSave(true);
      setDescription(data.description);
      setNameProject(data.projectname);
      if (data.acquisitionprogress == null) {
        setProgress('');
      } else {
        setProgress(data.acquisitionprogress);
      }
      if (data.acquisitionanticipateddate == null) {
        setPurchaseDate('');
      } else {
        setPurchaseDate(data.acquisitionanticipateddate);
      }
      setEditsetprojectid(data.projectid);
      setCounty(parseStringToArray(data.county));
      setServiceArea(parseStringToArray(data.servicearea));
      setjurisdiction(parseStringToArray(data.jurisdiction));
      setCosponsor(parseStringToArray(data.cosponsor));
      setSponsor(data.sponsor);
      setTimeout(() => {
        getData(SERVER.GET_GEOM_BY_PROJECTID(data.projectid), getToken())
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
    } else {
      setEditLocation(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (nameProject !== '' && geom != undefined && description != '' && serviceArea.length !== 0 && county.length !== 0 && jurisdiction.length !== 0 && sponsor !== '' && sponsor !== undefined) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [nameProject, geom, description, serviceArea, county, jurisdiction, sponsor]);


  useEffect(() => {
    setServiceAreaCounty({});
    setJurisdictionSponsor(undefined);
    setStreamIntersected({ geom: null });
    setStreamsIds([]);
    return () => {
      setGeom('');
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

  const onChange = (e: any) => {
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    setVisibleAlert(true);
  };

  const apllyProgress = (e: any) => {
    setProgress(e);
  };

  const apllyPurchaseDate = (e: any) => {
    setPurchaseDate(e);
  };
  const handleCancel = (e: any) => {
    const auxState = { ...state };
    setVisibleAcquisition(false);
    setState(auxState);
    setVisible(false);
  };

  return (
    <>
      {visibleAlert && <AlertView
        isWorkPlan={isWorkPlan}
        sponsor={sponsor}
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        setSave={setSave}
        jurisdictions={jurisdiction}
        counties={currentYear === 2023 ? [county] : null}
        serviceareas={serviceArea}
        type="Acquisition"
        isEdit={swSave}
        sendToWr={sendToWR}
        setsendToWR={setsendToWR}
      />}
      <Modal
        centered
        maskClosable={false}
        visible={visibleAcquisition}
        onOk={handleOk}
        onCancel={handleCancel}
        className="projects"
        width={pageWidth >3000 ? "2000px" : "1100px"}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 10 }}>
            <CreateProjectMap type="ACQUISITION" locality={locality} projectid={editprojectid} isEdit={swSave}></CreateProjectMap>
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
                      height: lengthName > 271 ? 'unset' : '34px'
                    }} />
                  </label>

                  <p>{serviceArea ? (serviceArea.length > 1 ? 'Multiple Service Area' : (serviceArea[0])) : ''} {(serviceArea.length > 0 && county.length > 0) ? '·' : ''} {county ? (county.length > 1 ? 'Multiple Counties' : (county[0])) : ''} </p>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{ textAlign: 'right' }}>
                  <label className="tag-name" style={{ padding: '10px' }}>Acquisition</label>
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
                description={description}
                setDescription={setDescription}
              />
              <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Progress <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <div id="progreid"><Select placeholder={progress != '' ? progress + "" : "Select a Status"} style={{ width: '100%' }} onChange={(progress) => apllyProgress(progress)} getPopupContainer={() => (document.getElementById("progreid") as HTMLElement)}>
                    {PROJECT_INFORMATION.PROGRESS.map((element) => {
                      return <Option key={element} value={element}>{element}</Option>
                    })}
                  </Select></div>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Anticipated Purchase Date <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <div id="antid">
                    <Select placeholder={purchaseDate != '' ? purchaseDate + "" : "Select a Purchase Date"} style={{ width: '100%' }} onChange={(purchaseDate) => apllyPurchaseDate(purchaseDate)} getPopupContainer={() => (document.getElementById("antid") as HTMLElement)}>
                      {selec.map((element) => {
                        var newYear = year + element;
                        return <Option key={newYear} value={newYear}>{newYear}</Option>
                      })}
                    </Select>
                  </div>
                </Col>
              </Row>
              <br />

              <DropPin
                typeProject={typeProject}
                geom={geom}
                setGeom={setGeom}
              />

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
                originModal="Acquisition"
              />
              <br />

              <UploadImagesDocuments
              isCapital={false}
              setFiles={setFiles}
            />
            </div>
            <div className="footer-project">
              <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
              <Button key="submit" className="btn-purple" disabled={disable} onClick={handleOk}>Save Draft Project</Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
