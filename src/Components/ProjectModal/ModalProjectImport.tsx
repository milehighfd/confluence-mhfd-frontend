import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Row, Col, Popover } from 'antd';
import { ModalCapital } from 'Components/Project/Capital/ModalCapital';
import { NEW_PROJECT_TYPES, MAINTENANCE_IDS } from 'constants/constants';
import { useProjectDispatch } from 'hook/projectHook';
import * as datasets from "../../Config/datasets";
import { SERVER } from 'Config/Server.config';
import { MaintenanceTypes } from 'Components/Work/Request/RequestViewUtil';
import { getAllowedBasedOnLocality } from 'Components/Work/Request/RequestViewUtil';
import { postData, getToken } from 'Config/datasets';
import { getCurrentProjectStatus } from 'utils/parsers';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { BASE_BOARD_RESOURCE_URL } from 'Config/endpoints/board';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';

const content00 = (<div className="popver-info">Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>);
const content01 = (<div className="popver-info">Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>);
const content02 = (<div className="popver-info">Removal of accumulated sediment to maintain capacity in the system.</div>);
const content03 = (<div className="popver-info">Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>);
const content04 = (<div className="popver-info">Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>);

const ModalProjectImport= ({
  visible,
  setVisible,
  // data,
  locality,
}: {
  visible: boolean,
  setVisible: Function,
  // data: any,
  locality?: any,
}) => {
  const {
    isCreatedFromBoard
  } = useRequestState();
  const [keyword, setKeyword] = useState('');
  const [listProjects, setListProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(-1);
  const {
    setIsImported,
    setImportedProjectData
  } = useRequestDispatch();
  const [completeProjectData, setCompleteProjectData] = useState<any>({});

  const [typeProject, setTypeProyect] = useState('');
  const [subType, setSubType] = useState('');
  const [disable, setDisable] = useState(true);
  const [nameProject, setNameProject] = useState('');
  const [visibleCapital, setVisibleCapital] = useState(false);
  const {
    namespaceId
  } = useRequestState();
  const pageWidth  = document.documentElement.scrollWidth;

  useEffect(() => {
    if (!keyword) return;
    const searchInfo = {
      keyword,
      locality: namespaceId.locality,
      year: namespaceId.year,
    }
    datasets.postData(SERVER.SEARH_BOARDS_IMPORT, searchInfo).then((data: any) => {
      setListProjects(data.map((item: any) => {
        const CODE_SPONSOR = 11;
        const CODE_ACQUISITION = 13;
        const sponsor = item?.project_partners?.find((sponsor: any) => sponsor?.code_partner_type_id === CODE_SPONSOR);
        let projectCode = '';
        if (MaintenanceTypes.includes(item?.code_project_type?.project_type_name)) {
          projectCode = 'Maintenance';
        } else if (item?.code_project_type?.code_project_type_id === CODE_ACQUISITION) {
          projectCode = 'Acquisition';
        } else {
          projectCode = item?.code_project_type?.project_short_name;
        }
        return {
          id: item?.project_id,
          name: item?.project_name,
          type: projectCode,
          sponsor: sponsor?.business_associate.business_name,
        }
      }));
    });
  }, [keyword]);

  const getCompleteProjectData = () => {
    if (selectedProjectId === -1) return;
    datasets.getData(SERVER.V2_DETAILED_PAGE(selectedProjectId), datasets.getToken())
      .then(dataFromDB => {
        setNameProject(dataFromDB?.project_name);
        let projectTypeS = dataFromDB?.code_project_type?.project_type_name;
        if (MaintenanceTypes.includes(projectTypeS)) {
          setSubType(projectTypeS);
          projectTypeS = 'Maintenance';
        } else if (projectTypeS === 'CIP') {
          projectTypeS = 'Capital';
        }
        setTypeProyect(projectTypeS);
        setCompleteProjectData({ ...dataFromDB, tabkey: projectTypeS });
        //setVisible(false);
        setVisibleCapital(true);
        setIsImported(true);
      });
  }

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
  const handleCancel = (e: any) => {
    setVisible(false);
  };


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
      data={completeProjectData}
      editable= {true}
      subTypeInit={subType}
     />}
     {visible && <Modal
       title="Import Project"
       centered
       maskClosable={false}
       visible={visible}
      //  onOk={handleOk}
       onCancel={handleCancel}
       className="new-project"
       width={pageWidth > 3000 ? "1100px":"800px"}
       footer={[
        <Button key="back" className="btn-borde" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          className="btn-purple"
          onClick={() => getCompleteProjectData()}
          disabled={selectedProjectId === -1}
        >
          Next
        </Button>,
       ]}
     >
      <h4>Name</h4>
      <Input
        placeholder="Search for existing project"
        onChange={(nameProject)=> onChange(nameProject)}
        value= {nameProject}
        onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => setKeyword(event.currentTarget.value)}
      />
      <br/><br/>
      {keyword && <Row className='row-project-project'>
        <Col span={12}>
          <p className='title-list' >Project</p>
        </Col>
        <Col span={4}>
          <p className='title-list' style={{ paddingLeft: '5px' }}>Type</p>
        </Col>
        <Col span={8} >
          <p className='title-list' style={{ paddingLeft: '5px' }}>Sponsor</p>
        </Col>
      </Row>}
      {keyword && <div className='body-create-projects'>
        {listProjects.map((project, index) => (
          <Row 
          key={index} 
          className={`row-detail-project ${selectedProjectId === project.id ? 'selected' : ''}`}
          onClick={() => {
            setSelectedProjectId(project?.id)
            setImportedProjectData({
              projectType: project?.type,
              projectSponsor: project?.sponsor,
            })
          }}
          >
            <Col span={12} className='col-create-project'>
              {project.name}
            </Col>
            <Col span={4} className='col-create-project'>
              {project.type}
            </Col>
            <Col span={8} style={{}} className='col-create-project'>
              {project.sponsor}
            </Col>
          </Row>
        ))}
      </div>}
      
      
     </Modal>}
    </div>
  );
}

export default ModalProjectImport;