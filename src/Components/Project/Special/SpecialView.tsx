import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (
  <div className="popver-info"> Any effort for which MHFD funds or staff participation is requested that doesn’t fit into one of the other Project categories.</div>
);

const stateValue = {
  visible: false
}
const dataSource = [
  {
    latitude:'39.744137',
    longitude:'- 104.950050',
  },
];

const columns = [
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },

];

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
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <Input placeholder="Bear Canyon Creek at Araphoe Road"  />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Special</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <h5>1. Project Information</h5>
            <label className="sub-title">Description <img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
            <TextArea rows={4} placeholder="Add description"/>
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
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Progress<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Anticipated Purchase Date<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
            <br/>


            {/*Second Section*/}
            <h5>2. Drop Pin <Button className="btn-transparent"><img src="/Icons/icon-10.svg" alt="" height="15px" /></Button></h5>
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
                <Table dataSource={dataSource} columns={columns} bordered />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }}>
                  <Button className="btn-location">Add Location</Button>
              </Col>
            </Row>
            <br/>

            {/*Section*/}
            <h5>3. GENERATE PROJECT <img src="/Icons/icon-19.svg" alt="" height="14px" /></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>


            {/*Section*/}
            <h5>4. Upload Attachments <img src="/Icons/icon-19.svg" alt="" height="14px" /></h5>
            <Upload>
             <Button>
              <img src="/Icons/icon-17.svg" alt="" height="20px" />
              <p>Attach main image in PNG or JPEG format</p>
             </Button>
           </Upload>
           <Row className="title-galery">
            <Col xs={{ span: 24 }} lg={{ span: 21 }} xxl={{ span: 21 }}>Uploaded</Col>
            <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>Cover Image</Col>
           </Row>

            <Row className="card-image">
              <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
                <img src="/Icons/project/jpg.svg" alt="" height="27px" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
                <p>Image-1.jpg</p>
                <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
                <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
                <Checkbox/>
              </Col>
            </Row>

            <Row className="card-image">
              <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
                <img src="/Icons/project/png.svg" alt="" height="27px" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
                <p>Image-2.png</p>
                <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
                <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
                <Checkbox/>
              </Col>
            </Row>
          </div>
          <div className="footer-project">
            <Button className="btn-borde">Cancel</Button>
            <Button className="btn-purple">Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
