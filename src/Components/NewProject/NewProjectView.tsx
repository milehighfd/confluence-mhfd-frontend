import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover } from 'antd';

const stateValue = {
  visible: false
}
const content00 = (<div className="popver-info">Collection and removal of trash and debris that could prevent the system from functioning as intended.</div>);
const content01 = (<div className="popver-info">Planting, seeding, thinning, weed control, adaptive management, and other vegetation-related activities.</div>);
const content02 = (<div className="popver-info">Removal of accumulated sediment to maintain capacity in the system.</div>);
const content03 = (<div className="popver-info">Upkeep of aging or failing drop structures, outfalls, and other eligible flood control features.</div>);
const content04 = (<div className="popver-info">Re-establishing the natural processes of a stream to promote high functioning and low maintenance systems.</div>);

export default () => {
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setState(auxState);
  };
  return (
    <>
    <Button type="primary" onClick={showModal}>
       Open Modal
     </Button>
     <Modal
       title="Create Project"
       centered
       visible={state.visible}
       onOk={handleOk}
       onCancel={handleCancel}
       className="new-project"
       width="800px"
       footer={[
         <Button key="back" className="btn-borde" onClick={handleCancel}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" onClick={handleOk}>
           Next
         </Button>,
       ]}
     >
     {/*Name*/}
      <h4>Name</h4>
      <Input placeholder="Name your project" />
      <br/><br/>

      {/*Buttons*/}
      <h4>Choose a Project Type</h4>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/capital.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Capital</h5>
              <p>Master planned improvements that increase conveyance or reduce flow.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Button className="button-project">
          <div className="project-img">
            <img src="/Icons/project/maintenance.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Mainenance</h5>
            <p>Restore existing infrastructure eligible for MHFD participation.</p>
          </div>
        </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/study.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Study</h5>
              <p>Master plans that identify problems and recommend improvements.</p>
            </div>
          </Button>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Button className="button-project">
          <div className="project-img">
            <img src="/Icons/project/acquisition.svg" alt="" height="30px" />
          </div>
          <div className="project-info">
            <h5>Acquisition</h5>
            <p>Property with high flood risk or needed for improvements.</p>
          </div>
        </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Button className="button-project">
            <div className="project-img">
              <img src="/Icons/project/special.svg" alt="" height="30px" />
            </div>
            <div className="project-info">
              <h5>Special</h5>
              <p>Any other effort for which MHFD funds or staff time is requested.</p>
            </div>
          </Button>
        </Col>
      </Row>
      <br/>

      {/*Buttons*/}
      <h4>Choose a Subtype</h4>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content00}><Button className="btn-opacity">Debris Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content01}><Button className="btn-opacity">Vegetation Management</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content02}><Button className="btn-opacity">Sediment Removal</Button></Popover>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content03}><Button className="btn-opacity">Minor Repairs</Button></Popover>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Popover content={content04}><Button className="btn-opacity">Restoration</Button></Popover>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
