
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import { WORK_PLAN } from 'constants/constants';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React, { useEffect, useState } from 'react';
import { SERVER } from 'Config/Server.config';
import * as datasets from "../../Config/datasets";
import { ModalCapital } from 'Components/Project/Capital/ModalCapital';
const pageWidth  = document.documentElement.scrollWidth;


const ModalProjectsCreate = ({visible, setVisible}
  :{
    visible:boolean,
    setVisible: Function
  }) => {

  const { 
    setVisibleCreateProject,
    setVisibleCreateOrImport
  } = useRequestDispatch();

  const {
    namespaceId
  } = useRequestState();

  const onClickNewProject = () => {
    setVisibleCreateOrImport(false);
    setVisibleCreateProject(true);
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

  useEffect(() => {
    const searchInfo = {
      keyword,
      locality: namespaceId.locality,
      year: namespaceId.year,
    }
    datasets.postData(SERVER.SEARH_BOARDS_IMPORT, searchInfo).then((data: any) => {
      setListProjects(data.map((item: any) => {
        return {
          id: item?.project_id,
          name: item?.projectData?.project_name,
          type: item?.board?.projecttype
        }
      }));
    });
  }, [keyword]);

  const getCompleteProjectData = () => {
    datasets.getData(SERVER.V2_DETAILED_PAGE(selectedProjectId), datasets.getToken())
      .then(dataFromDB => {
        setNameProject(dataFromDB?.project_name);
        setCompleteProjectData({ ...dataFromDB, projectType });
        //setVisible(false);
        setVisibleCapital(true);
        console.log('dataFromDB', dataFromDB);
      });
  }

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
        onCancel={() => setVisible(false)}
        className="new-project"
        width={pageWidth > 3000 ? "1100px" : "800px"}
        footer={[
          <Button key="back" className="btn-borde" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" className="btn-purple" onClick={() => getCompleteProjectData()}>
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
          <div className='new-project-sec' onClick={onClickNewProject}>
            <img src="/Icons/icon-18-green.svg" alt="plus-green" />
            <div className='text-new-project-sec'>
              <p>New Project</p>
              <p className='description-new-project-sec'>Includes CIP, Studies, Acquisitions, R&D and Maintenance Activities</p>
            </div>
          </div>
          <div className='existing-project'>
            <img src="/Icons/ic-files-green.svg" alt="plus-green" />
            <p className='text'>Existing Project</p>
          </div>
          <Input className='input-search' placeholder="Search for existing project" prefix={<SearchOutlined />} />
          <Row>
            <Col span={17}>
              <p className='title-list'>Project</p>
            </Col>
            <Col span={4}>
              <p className='title-list'>Type</p>
            </Col>
            {/* <Col span={3} style={{textAlign:'center'}}>
              <p className='title-list'>Work Plan Boards</p>
            </Col> */}
          </Row>
          <div className='body-create-projects'>
            {listProjects.map((project, index) => (
              <Row 
              key={index} 
              className={`row-detail-project ${selectedProjectId === project.id ? 'selected' : ''}`}
              onClick={() => setSelectedProjectId(project?.id)}
              >
                <Col span={17}>
                  {project.name}
                </Col>
                <Col span={4} style={{ opacity: 0.6 }}>
                  {project.type}
                </Col>
                {/* <Col span={3} style={{ textAlign: 'center', opacity: 0.6 }}>
                  2022
                </Col> */}
              </Row>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalProjectsCreate;
