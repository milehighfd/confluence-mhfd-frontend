import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const stateValue = {
  visible: false
}

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
       centered
       visible={state.visible}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
       footer={[
         <Button key="back" className="btn-borde" onClick={handleCancel}>
           Cancel
         </Button>,
         <Button key="submit" className="btn-purple" onClick={handleOk}>
           Next
         </Button>,
       ]}
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <div>
            aqui va mapitash
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                <Input placeholder="Bear Canyon Creek at Araphoe Road"  />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
                <p>Cherry Creek Service Area · Aurora County</p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                <div className="tag-name">Capital Project</div>
                <img src="/Icons/icon-19.svg" alt="" height="18px" />
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <h5>1.Project Information</h5>
            <label className="sub-title">Description <img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
            <TextArea rows={4} />
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Service Area<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">County<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>

            {/*Second Section*/}
            <h5>2. SELECT COMPONENTS</h5>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
