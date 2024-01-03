
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import { WORK_PLAN } from 'constants/constants';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React, { useEffect, useState } from 'react';
import { SERVER } from 'Config/Server.config';
import * as datasets from "../../Config/datasets";
import { ModalCapital } from 'Components/Project/Capital/ModalCapital';
import { MaintenanceTypes } from 'Components/Work/Request/RequestViewUtil';
import ModalProjectImport from './ModalProjectImport';
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
  const [visibleImport, setVisibleImport] = useState(false);
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


  return (
    <div >
      {visibleImport && <ModalProjectImport
        visible={visibleImport}
        setVisible={setVisibleImport}
        locality={boardLocality}
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
          <Button key="back" className="btn-borde" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          // <Button
          //   key="submit"
          //   className="btn-purple"
          //   onClick={() => getCompleteProjectData()}
          //   disabled={selectedProjectId === -1}
          // >
          //   Next
          // </Button>,
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
              <p className='description-new-project-sec'>Includes CIP, Studies, Acquisitions, R&D and Maintenance Activities.</p>
            </div>
          </div>
          <div className='new-project-sec' onClick={() => setVisibleImport(true)}>
            <img src="/Icons/ic-files-green.svg" alt="plus-green" />
            <div className='text-new-project-sec'>
              <p className='text'>Import Project</p>
              <p className='description-new-project-sec'>
                Search for a project from a previous years' Work Request or Work Plan by Name, Project ID, or Onbase Project Number.
              </p>
            </div>
          </div>
          {/* <Input
            className='input-search'
            placeholder="Search for existing project"
            prefix={<SearchOutlined />}
            onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => setKeyword(event.currentTarget.value)}
          />
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
          </div>} */}
        </div>
      </Modal>
    </div>
  );
}

export default ModalProjectsCreate;
