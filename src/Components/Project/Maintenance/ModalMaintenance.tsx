import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Row, Col, Popover, Select, Switch, Checkbox, Dropdown, Radio, Table } from 'antd';
import { AlertView } from 'Components/Alerts/AlertView';
import { ProjectInformation } from 'Components/Project/TypeProjectComponents/ProjectInformation';
import CreateProjectMap from 'Components/CreateProjectMap/CreateProjectMap';
import { ADMIN, STAFF, NEW_PROJECT_TYPES, MAINTENANCE_ELIGIBILITY, WINDOW_WIDTH, WORK_PLAN_TAB } from 'constants/constants';
import { LocationInformation } from 'Components/Project/TypeProjectComponents/LocationInformation';
import { useProjectState, useProjectDispatch } from 'hook/projectHook';
import { Project } from 'Classes/Project';
import { useProfileState } from 'hook/profileHook';
import { useHistory } from 'react-router-dom';
import { UploadImagesDocuments } from 'Components/Project/TypeProjectComponents/UploadImagesDocuments';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useMapState } from 'hook/mapHook';
import TypeProjectsFilter from 'Components/FiltersProject/TypeProjectsFilter/TypeProjectsFilter';
import { DownOutlined, HeartFilled, HeartOutlined, UpOutlined } from '@ant-design/icons';
import { COLUMNS_GEOMEOTRY, DATA_SOURCE_GEOMEOTRY } from '../Constants/Constants';
import { useAppUserState } from 'hook/useAppUser';

const { Option } = Select;
const content = (<div className="popver-info"> Projects that repair or restore existing infrastructure and are eligible for MHFD participation.</div>);
const content03 = (<div className="popver-info">Frequency indicates the number of times per-year that a maintenance activity is requested for routine activities. For example, select 2 for twice-per-year, or select 12 for monthly.</div>);
const content04 = (<div className="popver-info">Flip this switch to indicate that the project is located on a property to which the Local Government has legal right-of-access. This is a requirement for all Maintenance Projects.</div>);
const content05 = (<div className="popver-info" style={{ width: '261px' }}> Indicate why this project is eligible for MHFD maintenance. <br /><br /><b>Capital Project</b> – The project was completed as part of a MHFD Capital Improvement Plan
  <br /> <b>MEP</b> – The project has been accepted through development review as part of MHFD's Maintenance Eligibility Program (MEP)
  <br /><b>Grandfathered</b> – Development occurred before MHFD’s Maintenance Eligibility Program started in 1980
  <br /><b>Not Eligible</b> – The project does not meet any of the above criteria
  <br /><b>Unknown</b>  – Maintenance eligibility status is unknown</div>);
const selec = ['None'];
for (var i = 1; i < 13; i++) {
  selec.push('' + i);
}
const stateValue = {
  visibleMaintenance: false
}

export const ModalMaintenance = ({ visibleMaintenance, setVisibleMaintenance, nameProject, setNameProject, subType, typeProject, setVisible, locality, data, editable }:
  { visibleMaintenance: boolean, setVisibleMaintenance: Function, nameProject: string, setNameProject: Function, subType: string, typeProject: string, setVisible: Function, locality?: any, data: any, editable: boolean }) => {

  const { 
    saveProjectMaintenance, 
    setStreamIntersected, 
    setEditLocation, 
    editProjectMainetnance, 
    setStreamsIds, 
    getGEOMByProjectId, 
    setServiceAreaCounty, 
    setJurisdictionSponsor,
    setIsEdit,
    setDeleteAttachmentsIds,
  } = useProjectDispatch();
  const { streamIntersected, deleteAttachmentsIds } = useProjectState();
  const { groupOrganization } = useProfileState();
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] = useState('');
  const [disable, setDisable] = useState(true);
  const [serviceArea, setServiceArea] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [sponsor, setSponsor] = useState("");
  const [cosponsor, setCosponsor] = useState<any>([]);
  const [frequency, setFrequency] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [isDraw, setIsDraw] = useState(false);
  const { changeDrawState } = useProjectDispatch();
  const [save, setSave] = useState(false);
  const [ownership, setOwnership] = useState(true);
  const [files, setFiles] = useState<any[]>([]);
  const [geom, setGeom] = useState();
  const [projectid, setProjectId] = useState(-1);
  const [swSave, setSwSave] = useState(false);
  const [editprojectid, setEditsetprojectid] = useState("");
  const [jurisdiction, setjurisdiction] = useState<any>([]);
  const [lengthName, setlengthName] = useState(0);
  const history = useHistory();
  const textRef = useRef<any>(null);
  const appUser = useAppUserState();
  const showCheckBox = appUser.designation === ADMIN || appUser.designation === STAFF;
  const { toggleAttachmentCover, removeAttachment } = useAttachmentDispatch();
  const [sendToWR,setsendToWR] = useState(!showCheckBox);
  const pageWidth  = document.documentElement.scrollWidth;
  const { tabActiveNavbar } = useMapState();
  const isWorkPlan = tabActiveNavbar === WORK_PLAN_TAB;
  const { userInformation } = useProfileState();
  const [favorite, setFavorite] = useState(false);
  const [activeTabBodyProject, setActiveTabBodyProject] = useState('Details');
  const [openDropdownTypeProject, setOpenDropdownTypeProject] = useState(false);

  //list Menu TypeProjects
  const menuTypeProjects = <TypeProjectsFilter />;

  useEffect(() => {
    setServiceAreaCounty({});
    setJurisdictionSponsor(undefined);
    if (subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management || subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management || subType === NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal) {
    }
    setStreamIntersected({ geom: null });
    setStreamsIds([]);
  }, []);

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
      setDescription(data?.description);
      setNameProject(data?.project_name);
      setCounty(parseCountiesToArray(data?.project_counties));
      setServiceArea(parseServiceAreaToArray(data?.project_service_areas));
      setjurisdiction(parseJurisdictionToArray(data?.project_local_governments));
      setCosponsor(parseSponsorCosponsorToArray(data?.project_partners, 'cosponsor'));
      setSponsor(parseSponsorCosponsorToArray(data?.project_partners, 'sponsor'));
      setProjectId(data?.project_id);
      setEditsetprojectid(data?.project_id);
      if (data?.code_maintenance_eligibility_type_id === null) {
        setEligibility('');
      } else {
        setEligibility(data?.code_maintenance_eligibility_type_id);
      }
      if (data?.project_details[0]?.maintenance_frequency === null) {
        setFrequency('');
      } else {
        console.log(data?.project_details[0]?.maintenance_frequency, 'frequency')
        if (data?.project_details[0]?.maintenance_frequency === 0) {
          setFrequency('None');
        }else{
          setFrequency(data?.project_details[0]?.maintenance_frequency);
        }        
      }
      if (data?.project_details[0]?.is_public_ownership === true) {
        console.log(data?.project_details[0]?.is_public_ownership === true);
        setOwnership(true);
      } else {
        console.log(data?.project_details[0]?.is_public_ownership === true);
        setOwnership(false);
      }

      setTimeout(() => {
        getGEOMByProjectId(data.project_id);
      }, 2200);

    } else {
      setStreamIntersected({ geom: null });
      setEditLocation(undefined);
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
      const params = new URLSearchParams(history.location.search)
      const _year = params.get('year');
      const _locality = params.get('locality');
      var maintenance = new Project();
      maintenance.locality = _locality;
      maintenance.isWorkPlan = isWorkPlan;
      maintenance.year = _year ?? maintenance.year;
      let csponsor = "";
      if (cosponsor) {
        cosponsor.forEach((element: any) => {
          csponsor = csponsor + element + ",";
        });
        if (cosponsor.length != 0) {
          csponsor = csponsor.substring(0, csponsor.length - 1)
        }
      }
      maintenance.servicearea = serviceAreaIds || '';
      maintenance.county = countyIds || '';
      maintenance.jurisdiction = jurisdictionIds || '';
      maintenance.sponsor = sponsor;
      maintenance.cosponsor = csponsor;
      maintenance.projectname = nameProject;
      maintenance.description = description;
      if (streamIntersected.geom) {
        maintenance.geom = streamIntersected.geom;
      }
      maintenance.projectsubtype = subType;
      if (frequency === 'None') {
        maintenance.frequency = 0;
      } else {
        maintenance.frequency = frequency;
      }
      maintenance.maintenanceeligibility = eligibility;
      maintenance.ownership = "" + ownership;
      maintenance.files = files;
      maintenance.editProject = editprojectid;
      maintenance.cover = '';
      maintenance.sendToWR = sendToWR;
      maintenance.type = 'maintenance';
      removeAttachment(deleteAttachmentsIds);
      files.forEach((file:any) => {
        if(file._id) {
          toggleAttachmentCover(0, file._id, file.isCover);
        }
      });
      if (swSave) {
        editProjectMainetnance(maintenance);
      } else {
        saveProjectMaintenance(maintenance);
      }
      setVisibleMaintenance(false);
      setVisible(false);
    }
  }, [save]);

  useEffect(() => {
    if (description != '' && county.length && serviceArea.length && jurisdiction.length && nameProject !== '') {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [geom, description, county, serviceArea, sponsor, cosponsor, nameProject, jurisdiction, streamIntersected.geom]);
  
  useEffect(() => {
    getTextWidth(nameProject);
  }, [nameProject]);

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
    }
    return counties;
  }
  const parseServiceAreaToArray = (list: any) => {
    let serviceAreas:any = [];
    if (list) {
    list.forEach((serviceArea : any) => {
      serviceAreas.push(serviceArea.CODE_SERVICE_AREA.service_area_name +' Service Area')
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
    setGeom(projectReturn.state.project.userPolygon);
  }, [projectReturn.state.project.userPolygon]);

  const apllyFrequency = (e: any) => {
    setFrequency(e);
  };
  const apllyEligibility = (e: any) => {
    setEligibility(e);
  };

  const onChange = (e: any) => {
    setNameProject(e.target.value);
  };

  const apllyOwnership = (e: any) => {
    setOwnership(e);
  };

  const handleOk = (e: any) => {
    setVisibleAlert(true);
  };

  const handleCancel = (e: any) => {
    const auxState = { ...state };
    setVisibleMaintenance(false);
    setState(auxState);
    setVisible(false);
  };

  const onClickDraw = () => {
    setServiceAreaCounty({});
    setServiceArea([]);
    setCounty([]);
    setjurisdiction([]);
    setIsDraw(!isDraw);
  }
  useEffect(() => {
    changeDrawState(isDraw);
  }, [isDraw]);

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

  return (
    <>
      {visibleAlert && <AlertView
        isWorkPlan={isWorkPlan}
        visibleAlert={visibleAlert}
        setVisibleAlert={setVisibleAlert}
        setSave={setSave}
        jurisdictions={jurisdiction}
        counties={county}
        serviceareas={null}
        type="Maintenance"
        isEdit={swSave}
        sendToWr={sendToWR}
        setsendToWR={setsendToWR}
        locality={[locality.replace(' Work Plan', '')]}
      />}
      <Modal
        centered
        maskClosable={false}
        visible={visibleMaintenance}
        onOk={handleOk}
        onCancel={handleCancel}
        className="projects"
        width={pageWidth >3000 ? "2000px" : "90.5%"}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <CreateProjectMap type="MAINTENANCE" locality={locality} projectid={projectid} isEdit={swSave}></CreateProjectMap>
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
                    {<p>{subType}</p>} &nbsp;
                    {openDropdownTypeProject ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
                  </a>
                </div>
              </Dropdown>
              <Popover content={content} placement="bottomRight" overlayClassName='popover-project'>
                <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
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
                (isWorkPlan && showCheckBox && !swSave) && <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{color: '#11093c'}}>
                  <div style={{paddingBottom: '15px'}} className='span-project-text'>
                    <Checkbox style={{paddingRight:'10px', paddingTop:'10px'}} checked={sendToWR} onChange={() => setsendToWR(!sendToWR)}></Checkbox>Submit this project also as a Work Request
                  </div>
                </Col>
              }
              <ProjectInformation
                description={description}
                setDescription={setDescription}
              />
              <Row gutter={[16, 16]} style={{marginTop: '13px'}}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Frequency <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <div id="freqid">
                    <Select
                      placeholder={frequency != '' ? frequency + "" : "Select a Frequency"}
                      style={{ width: '100%' }}
                      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                      onChange={(frequency) => apllyFrequency(frequency)}
                      getPopupContainer={() => (document.getElementById("freqid") as HTMLElement)}>
                    {selec.map((element) => {
                      return <Option key={element} value={element}>{element}</Option>
                    })}
                  </Select>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Access Control <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <p className="switch-option" style={{fontSize:'14px'}}>Public Access / Ownership <span>
                    <Switch checkedChildren="Yes" unCheckedChildren="No" checked={ownership} onChange={(ownership) => apllyOwnership(ownership)} />
                  </span></p>
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{marginTop:'10px'}}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <label className="sub-title">Maintenance Eligibility <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                  <div id="elegid">
                    <Select
                      placeholder={eligibility != '' ? MAINTENANCE_ELIGIBILITY.find((el: any) => parseInt(el.id) === parseInt(eligibility))?.name + "" : "Select a Eligibility"}
                      style={{ width: '100%' }}
                      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                      onChange={(eligibilit) => apllyEligibility(eligibilit)}
                      getPopupContainer={() => (document.getElementById("elegid") as HTMLElement)}>
                      {MAINTENANCE_ELIGIBILITY.map((element) => {
                        return <Option key={element.id} value={element.id}>{element.name}</Option>
                      })}
                    </Select>
                  </div>
                </Col>
              </Row>

              <br />
              {/* <h5 style={{marginTop:'5px'}}>
                2. Draw Activity
              </h5>
              <div className={"draw " + (isDraw ? 'active' : '')} onClick={onClickDraw}>
                <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
                <p>Click on the icon and draw a polygon to draw the activity area</p>
              </div> */}
              <div className="sub-title-project">
                <h5 className="location">2. PROJECT GEOMETRY *</h5>
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
              <div className={"draw " + (isDraw ? 'active' : '')} onClick={onClickDraw}>
                <img src="" className="icon-draw active" style={{ WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat' }} />
                <p>Click on the icon above and draw a polygon to define the project feature</p>
              </div>
              <Table
                dataSource={DATA_SOURCE_GEOMEOTRY }
                columns={COLUMNS_GEOMEOTRY }
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
                originModal="Maintenance"
                isWorkPlan={isWorkPlan}
              />
              <UploadImagesDocuments
              isCapital={false}
              setFiles={setFiles}
            />
            </div>:<></>}
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
