import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Row, Col, Popover } from 'antd';
import { ModalCapital } from 'Components/Project/Capital/ModalCapital';
import { ModalAcquisition } from 'Components/Project/Acquisition/ModalAcquisition';
import { ModalMaintenance } from 'Components/Project/Maintenance/ModalMaintenance';
import { ModalSpecial } from 'Components/Project/Special/ModalSpecial';
import { ModalStudy } from 'Components/Project/Study/ModalStudy';
import { NEW_PROJECT_TYPES } from 'constants/constants';
import { useProjectDispatch } from 'hook/projectHook';
import { getAllowedBasedOnLocality } from 'Components/Work/Request/RequestViewUtil';
import { postData } from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { getCurrentProjectStatus } from 'utils/parsers';
import { useAttachmentDispatch } from 'hook/attachmentHook';

const content00 = (<div className="popver-info">Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>);
const content01 = (<div className="popver-info">Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>);
const content02 = (<div className="popver-info">Removal of accumulated sediment to maintain capacity in the system.</div>);
const content03 = (<div className="popver-info">Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>);
const content04 = (<div className="popver-info">Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>);

const ModalProjectView = ({
  visible,
  setVisible,
  data,
  defaultTab,
  showDefaultTab,
  locality,
  editable,
  problemId,
  currentData,
  year
}: {
  visible: boolean,
  setVisible: Function,
  data: any,
  defaultTab?: any,
  showDefaultTab?: any,
  locality?: any,
  editable:boolean,
  problemId?: any,
  currentData?: any,
  year?: number
}) => {
  const {
    getStreamsByProjectId, 
    getIndependentComponentsByProjectId, 
    getComponentsByProjectId, 
    setBoardProjectsCreate,
    setDeleteAttachmentsIds
  } = useProjectDispatch();
  const {getAttachmentProjectId,setProjectId} = useAttachmentDispatch();
  const [typeProject, setTypeProyect] = useState('');
  const [subType, setSubType] = useState('');
  const [disable, setDisable] = useState(true);
  const [nameProject, setNameProject] = useState('');
  const [visibleSubType, setVisibleSubType] = useState(false);
  const [visibleModal, setVisibleModal] = useState(visible)
  const [visibleCapital, setVisibleCapital] = useState(false);
  const [visibleAcquisition, setVisibleAcquisition] = useState(false);
  const [visibleMaintenance, setVisibleMaintenance] = useState(false);
  const [visibleSpecial, setVisibleSpecial] = useState(false);
  const [visibleStudy, setVisibleStudy] = useState(false);
  const [allowed, setAllowed] = useState<string[]>([]);
  const pageWidth  = document.documentElement.scrollWidth;
  const RandD = 'R&D';

  const handleOk = (e: any) => {  
    let dataForBoard = {...currentData};
    dataForBoard.projecttype = typeProject;
    postData(`${SERVER.URL_BASE}/board/`, dataForBoard)
      .then(
        (r: any) => {
          let { projects } = r; 
          if (projects) { 
            let idsProjects = projects.map((proj:any)=> {
              return proj.projectData?.projectid;
            });
            if(projects.length>0){
              setBoardProjectsCreate({ ids: idsProjects });
            } else {
              setBoardProjectsCreate(['-7777']);
            }

          }
        }
      )
    if(typeProject === NEW_PROJECT_TYPES.Capital ){
      setVisibleCapital(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Acquisition ){
      setVisibleAcquisition(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Maintenance && subType !== '' ){
      setVisibleMaintenance(true);
    }
    if(typeProject ===  NEW_PROJECT_TYPES.Special || typeProject === RandD ){
      setVisibleSpecial(true);
    }
    if(typeProject === NEW_PROJECT_TYPES.Study ){
      setVisibleStudy(true);
    }
    setDisable(true);
    setVisibleModal(false);
    setVisibleSubType(false);
  };
  const onChange = (e: any)=>{
    setNameProject(e.target.value);
    if(typeProject !== ''){
      if(typeProject === NEW_PROJECT_TYPES.Maintenance){
        if(subType !== ''){
          setDisable(false);
        }
      }
      else{
        setDisable(false);
      }
    }
  };
  const subTypeProject = (e: any) =>{
    setSubType(e);
    if(nameProject !== ''){
      setDisable(false);    
    }
  };
  const handleCancel = (e: any) => {
    setVisibleModal(false);
    setVisible(false);
  };
  const chooseSubtypes = (e: any) => {
    setTypeProyect(e);
    if(e === NEW_PROJECT_TYPES.Maintenance){
      setVisibleSubType(true);
      setSubType(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management);
    }
    else{
      if(nameProject !== '' ){
        setDisable(false);
        setVisibleSubType(false);
      }
     setVisibleSubType(false);
      setSubType('')
    }
  };
  useEffect(()=>{
    if(defaultTab) {
      if (defaultTab === NEW_PROJECT_TYPES.Maintenance) {
        setVisibleSubType(true);
        setSubType(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management);
      }
      setTypeProyect(defaultTab);
    }
  },[defaultTab]);
  useEffect(()=>{
    if(showDefaultTab) {
      if(data === "no data"){
        setVisibleCapital(true);
        setNameProject('Ex: Stream Name @ Location 202X');
      } else {
        if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 1){
          getStreamsByProjectId(data.project_id);
        } else if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 5) {
          getIndependentComponentsByProjectId(data.project_id);
          getComponentsByProjectId(data.project_id);
        }
          
      }
      
      if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 5 || data.tabKey === 'Capital'){
        setVisibleCapital(true);
      }
      if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 1 || data.tabKey === 'Study'){
        setVisibleStudy(true);
      }
      if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 7 || 
        getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 8 || 
        getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 9 || 
        getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 10 || 
        getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 11 || data.tabKey === 'Maintenance'
        ){
        setSubType(data?.code_project_type?.project_type_name);
        setVisibleMaintenance(true);
      }
      if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 13 || data.tabKey === 'Acquisition'){
        setVisibleAcquisition(true);
      }
      if(getCurrentProjectStatus(data)?.code_phase_type?.code_project_type?.code_project_type_id === 15 || data.tabKey === 'Special'){
        setVisibleSpecial(true);
      }
    }
  },[showDefaultTab]);

  useEffect(() => {
    if (data.project_id) {
      setDeleteAttachmentsIds([]);
      getAttachmentProjectId(data.project_id);
      setProjectId(data.project_id);
    }    
  }, [data]);

  useEffect(() => {
    setAllowed(getAllowedBasedOnLocality(locality, year));
  }, [locality]);

  return (
    <div id='modalProjectView'>
     {visibleCapital && <ModalCapital
      visibleCapital = {visibleCapital} 
      setVisibleCapital = {setVisibleCapital}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
      locality = {locality}
      data={data}
      editable= {editable}
      problemId= {problemId}
     />}
     {visibleAcquisition && <ModalAcquisition
      visibleAcquisition = {visibleAcquisition} 
      setVisibleAcquisition = {setVisibleAcquisition}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
      locality = {locality}
      data={data}
      editable= {editable}
     />}
     {visibleMaintenance && <ModalMaintenance
      visibleMaintenance = {visibleMaintenance} 
      setVisibleMaintenance = {setVisibleMaintenance}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      subType = {subType}
      typeProject = {typeProject}
      setVisible = {setVisible}
      locality = {locality}
      data={data}
      editable= {editable}
     />}
     {visibleSpecial && <ModalSpecial
      visibleSpecial = {visibleSpecial} 
      setVisibleSpecial = {setVisibleSpecial}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
      locality = {locality}
      data={data}
      editable= {editable}
     />}
     {visibleStudy && <ModalStudy
      visibleStudy = {visibleStudy} 
      setVisibleStudy = {setVisibleStudy}
      nameProject = {nameProject}
      setNameProject = {setNameProject}
      typeProject = {typeProject}
      setVisible = {setVisible}
      locality = {locality}
      data={data}
      editable= {editable}
     />}
     {visibleModal && <Modal
       title="Create Project"
       centered
       maskClosable={false}
       visible={visibleModal}
       onOk={handleOk}
       onCancel={handleCancel}
       className="new-project"
       width={pageWidth > 3000 ? "1100px":"800px"}
       footer={[
         <Button key="back" className="btn-borde" onClick={handleCancel}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" disabled={disable} onClick={handleOk}>
           Next
         </Button>,
       ]}
     >
      <h4>Name</h4>
      <Input placeholder="Name your project in the format: STREAM NAME @ LOCATION 202X" onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} onPressEnter = {handleOk}  />
      <br/><br/>
      <h4>Choose a Project Type</h4>
      <Row gutter={[16, 16]} style={{marginTop: '-8px'}}>
        {
          allowed.includes(NEW_PROJECT_TYPES.Capital) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Capital) } style={{padding: '8px'}}>
          <Button className={typeProject===NEW_PROJECT_TYPES.Capital?"button-project button-project-active" : "button-project" } >
            <div className="project-img">
              <img src="/Icons/project/capital.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Capital</h5>
              <p>Master planned improvements that increase conveyance or reduce flow.</p>
            </div>
          </Button>
        </Col>
        }
        {
          allowed.includes(NEW_PROJECT_TYPES.Maintenance) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Maintenance) } style={{padding: '8px'}}>
        <Button className={typeProject===NEW_PROJECT_TYPES.Maintenance?"button-project button-project-active" : "button-project" }>
          <div className="project-img">
            <img src="/Icons/project/maintenance.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Maintenance</h5>
            <p>Restore existing infrastructure eligible for MHFD participation.</p>
          </div>
        </Button>
        </Col>
        }
      </Row>
      <Row gutter={[16, 16]}>
        {
          allowed.includes(NEW_PROJECT_TYPES.Study) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Study) } style={{padding: '8px'}}>
          <Button className={typeProject===NEW_PROJECT_TYPES.Study?"button-project button-project-active" : "button-project" } >
            <div className="project-img">
              <img src="/Icons/project/study.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Study</h5>
              <p>Master plans that identify problems and recommend improvements.</p>
            </div>
          </Button>
        </Col>
        }
        {
          allowed.includes(NEW_PROJECT_TYPES.Acquisition) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Acquisition) } style={{padding: '8px'}}>
        <Button className={typeProject===NEW_PROJECT_TYPES.Acquisition?"button-project button-project-active" : "button-project" }>
          <div className="project-img">
            <img src="/Icons/project/acquisition.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Acquisition</h5>
            <p>Property with high flood risk or needed for improvements.</p>
          </div>
        </Button>
        </Col>
        }
        {
          allowed.includes(NEW_PROJECT_TYPES.Special || RandD) &&  !allowed.includes(NEW_PROJECT_TYPES.Study) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Special) } style={{padding: '8px'}}>
          <Button className={typeProject===NEW_PROJECT_TYPES.Special || typeProject === RandD?"button-project button-project-active" : "button-project" }>
            <div className="project-img">
              <img src="/Icons/project/special.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>R&D</h5>
              <p>Any other effort for which MHFD funds or staff time is requested.</p>
            </div>
          </Button>
        </Col>
        }
      </Row>
      <Row gutter={[16, 16]}>
        {
          allowed.includes(NEW_PROJECT_TYPES.Special || RandD) && allowed.includes(NEW_PROJECT_TYPES.Study) &&
          <Col xs={{ span: 24 }} lg={{ span: 12 }} onClick={()=> chooseSubtypes(NEW_PROJECT_TYPES.Special) } style={{padding: '8px'}}>
          <Button className={typeProject===NEW_PROJECT_TYPES.Special || typeProject === RandD?"button-project button-project-active" : "button-project" }>
            <div className="project-img">
              <img src="/Icons/project/special.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>R&D</h5>
              <p>Any other effort for which MHFD funds or staff time is requested.</p>
            </div>
          </Button>
        </Col>
        }
      </Row>
      <br/>

      {visibleSubType && <> <h4>Choose a Subtype</h4>
      <Row gutter={[16, 16]} >
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management)}  style={{padding: '8px'}}>
          <Popover content={content00} ><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management? "btn-opacity-active btn-opacity" : "btn-opacity"}>Routine Trash and Debris</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management)} style={{padding: '8px'}}>
          <Popover content={content01}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Vegetation_Management? "btn-opacity-active btn-opacity" : "btn-opacity"}>Vegetation Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal)} style={{padding: '8px'}}>
          <Popover content={content02}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Sediment_Removal? "btn-opacity-active btn-opacity" : "btn-opacity"}>Sediment Removal</Button></Popover>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop: '12px', marginBottom: '-28px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs)} style={{padding: '8px'}}>
          <Popover content={content03}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Minor_Repairs? "btn-opacity-active btn-opacity" : "btn-opacity"}>Minor Repair</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} onClick={()=> subTypeProject(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration)} style={{padding: '8px'}}>
          <Popover content={content04}><Button className={subType===NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Restoration? "btn-opacity-active btn-opacity" : "btn-opacity"}>Restoration</Button></Popover>
        </Col>
      </Row></>}
      
     </Modal>}
    </div>
  );
}

export default ModalProjectView;
