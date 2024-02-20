
import { CloseCircleFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import { WORK_PLAN } from 'constants/constants';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React, { useCallback, useEffect, useState } from 'react';
import { SERVER } from 'Config/Server.config';
import * as datasets from "../../Config/datasets";
import { ModalCapital } from 'Components/Project/Capital/ModalCapital';
import { MaintenanceTypes } from 'Components/Work/Request/RequestViewUtil';
const pageWidth  = document.documentElement.scrollWidth;


const ModalProjectsCreate = ({visible, setVisible}
  :{
    visible:boolean,
    setVisible: Function
  }) => {

  const { 
    setVisibleCreateProject,
    setVisibleCreateOrImport,
    setIsCreatedFromBoard,
    setIsImported,
    setImportedProjectData
  } = useRequestDispatch();

  const {
    namespaceId
  } = useRequestState();

  const onClickNewProject = () => {
    setVisibleCreateOrImport(false);
    setVisibleCreateProject(true);
    setIsCreatedFromBoard(true);
  };
  
  const [isApproved, setIsApproved] = useState(false);
  const [listProjects, setListProjects] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(-1);
  const [completeProjectData, setCompleteProjectData] = useState<any>({});
  const [visibleCapital, setVisibleCapital] = useState(false);
  const [nameProject, setNameProject] = useState('');
  const [typeProject, setTypeProyect] = useState('');
  const [subType, setSubType] = useState('');

  const boardType = namespaceId.type === WORK_PLAN ? 'Work Plan' : 'Work Request';
  const projectType = namespaceId.projecttype;
  const isWorkPlan = namespaceId.type === WORK_PLAN;
  const boardLocality = namespaceId.locality;
  const year = namespaceId.year;

  useEffect(() => {
    const boardsInfo = {
      type: namespaceId.type,
      year: namespaceId.year,
      localities: [namespaceId.locality],
      projecttype: 'Capital',
    }
    datasets.postData(SERVER.GET_STATUS_BOARD, boardsInfo).then((data: any[]) => {
      let colorData: { locality: string, status: string }[] = data;
      const isApproved = colorData.some((item: { locality: string, status: string }) => item.locality === boardLocality && item.status === 'Approved');
      setIsApproved(isApproved);
    });
  }, [namespaceId]);

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

  useEffect(() => {
    performSearch('');
  }, []);

  const performSearch = (nameProject: string) => {
    const searchInfo = {
      keyword: nameProject,
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
  }

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;  
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const debouncedOnChange = useCallback(
    debounce((nameProject: string) => performSearch(nameProject), 500),
    []
  );

  return (
    <div >
      {visibleCapital && <ModalCapital
        visibleCapital={visibleCapital}
        setVisibleCapital={setVisibleCapital}
        nameProject={nameProject}
        setNameProject={setNameProject}
        typeProject={typeProject}
        setVisible={setVisible}
        locality={boardLocality}
        data={completeProjectData}
        editable={true}
        subTypeInit={subType}
      />}
      <Modal
        title="Create Project"
        centered
        maskClosable={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false)
          setIsCreatedFromBoard(false)
        }}
        className="new-project"
        width={pageWidth > 3000 ? "1100px" : "800px"}
        footer={[
          <Button key="back" className="btn-borde" onClick={() => setVisible(false)} style={{padding:'0px'}}>
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
        <div className='create-projects-modal'>
          {!isWorkPlan && <p className='subtitle-project-modal'>
            Create Project in:&nbsp; &nbsp;
            {isApproved ? <div className='circle' /> : <div className='circle-pending' />}&nbsp;
            <span className='subtitle-location'>
              {boardLocality} {year} {boardType}
            </span>
          </p>}
          {/* <div className='new-project-sec' onClick={onClickNewProject}>
            <img src="/Icons/icon-18-green.svg" alt="plus-green" />
            <div className='text-new-project-sec'>
              <p>New Project</p>
              <p className='description-new-project-sec'>Includes CIP, Studies, Acquisitions, R&D and Maintenance Activities</p>
            </div>
          </div> */}
          <div className='new-project-sec'>
            <div className='new-project-sec-right'>
              <img src="/Icons/ic-files-green.svg" alt="plus-green" />
              <div className='text-new-project-sec'>
                <p >Search for a Project</p>
                <p className='description-new-project-sec'>Search for a project from a previous year’s Work Request or Work Plan by name, project id, or OnBase project number. If searching for a project within a Work Request board, results are filtered by the local government.</p>
              </div>
            </div>
            <Button className="btn-transparent btn-create" onClick={onClickNewProject}>
                {<img src="/Icons/icon-18.svg" style={{ marginBottom: '2px' }} alt="" />}
                Create Project
            </Button>
          </div>
          <Input
            className='input-search'
            placeholder="Search for existing project"
            prefix={<SearchOutlined />}
            suffix={keyword && <CloseCircleFilled
              onClick={() => {
                setKeyword('')
                performSearch('')
              }} />}
            onChange={(event) => {
              setKeyword(event.target.value)
              debouncedOnChange(event.target.value)
            }}
            value={keyword}
          />
          {<Row className='row-project-project'>
            <Col span={16}>
              <p className='title-list' >Project</p>
            </Col>
            <Col span={8}>
              <p className='title-list' style={{ paddingLeft: '5px' }}>Type</p>
            </Col>
            {/* <Col span={4} >
              <p className='title-list' style={{ paddingLeft: '5px' }}>Preview</p>
            </Col> */}
          </Row>}
            {listProjects.length > 0 ? (
              <div className='body-create-projects'>
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
                  <Col span={16} className='col-create-project'>
                    {project.name}
                  </Col>
                  <Col span={8} className='col-create-project'>
                    {project.type}
                  </Col>
                  {/* <Col span={4} style={{}} className='col-create-project'>
                    <span style={{color:'#29C499', cursor:'pointer'}}>View</span>
                  </Col> */}
                </Row>
              ))}</div>)
            : <div className='nothing-found'>
                <img src='/Icons/no_data.svg' alt='no_data' />
                <h2>No matching results!</h2>
                <p>Try modifying your search parameter. Projects of the current<br/> year are ineligible for import, find those by using the<br/> board  search in the upper right corner.<br/>
                If still unable to locate, proceed to <span style={{color:'#29C499', textDecoration:'underline', cursor:'pointer'}}   onClick={onClickNewProject}>create a project</span>.
                </p>
              </div>
          }
        </div>
      </Modal>
    </div>
  );
}

export default ModalProjectsCreate;