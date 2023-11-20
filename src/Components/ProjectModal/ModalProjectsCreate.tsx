
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row } from 'antd';
import React from 'react';
const pageWidth  = document.documentElement.scrollWidth;


const ModalProjectsCreate = ({visible, setVisible}
  :{
    visible:boolean,
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
  }) => {
  return (
    <div >
     <Modal
       title="Create Project"
       centered
       maskClosable={false}
       visible={visible}
       onOk={() => setVisible(false)}
       onCancel={() => setVisible(false)}
       className="new-project"
       width={pageWidth > 3000 ? "1100px":"800px"}
       footer={[
         <Button key="back" className="btn-borde" onClick={() => setVisible(false)}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" onClick={() => setVisible(false)}>
           Next
         </Button>,
       ]}
     >
      <div className='create-projects-modal'>
        <p className='subtitle-project-modal'>
          Create Project in:&nbsp; &nbsp;
          <div className='circle'/>&nbsp;
          <span className='subtitle-location'>
            Aurora 2024 Work Request
          </span>
        </p>
        <div className='new-project-sec'>
          <img src="/Icons/icon-18-green.svg" alt="plus-green" />
          <div className='text-new-project-sec'>
            <p>New Project</p>
            <p className='description-new-project-sec'>Includes CIP, Studies, Acquisitions, R&D and Maintenance Activities</p>
          </div>
        </div>
        <div className='existing-project'>
          <img src="/Icons/ic-search-green.svg" alt="plus-green" />
          <p className='text'>Existing Project</p>
        </div>
        <Input className='input-search' placeholder="Search for existing project" prefix={<SearchOutlined />} />
        <Row>
          <Col span={17}>
            <p className='title-list'>project</p>
          </Col>
          <Col span={4}>
            <p className='title-list'>Type</p>
          </Col>
          <Col span={3} style={{textAlign:'center'}}>
            <p className='title-list'>Work Plan Boards</p>
          </Col>
        </Row>
        <div className='body-create-projects'>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
          <Row className='row-detail-project'>
            <Col span={17}>
              West Tollgate Creek @ 15th and Clementine Avenue
            </Col>
            <Col span={4} style={{opacity:0.6}}>
              Restoration
            </Col>
            <Col span={3} style={{textAlign:'center',opacity:0.6}}>
              2022
            </Col>
          </Row>
        </div>
      </div>
      </Modal>
    </div>
  );
}

export default ModalProjectsCreate;
