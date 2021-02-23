import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (
  <div className="popver-info">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>
);

const stateValue = {
  visibleStudy: false
}
const genExtra = () => (
  <div className="tab-head-project">
    <div>Cherry Creek</div>
  </div>
);
const genExtra00 = () => (
  <div className="tab-head-project">
    <div>Lakewood Gulch</div>
  </div>
);


export const ModalStudy= ({visibleStudy, setVisibleStudy}:
  {visibleStudy: boolean, setVisibleStudy: Function}) => {
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleStudy = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleStudy (false);
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleStudy (false);
    setState(auxState);
  };
  return (
    <>
     <Modal
       centered
       visible={visibleStudy}
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
                <Input placeholder="Bear Canyon Creek at Araphoe Road" />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Study</label>
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
                <label className="sub-title">Sponsor<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Potencial Co-Sponsor<img src="/Icons/icon-19.svg" alt="" height="10px" /></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
            <br/>

            {/*Second Section*/}
            <h5>2. SELECT STREAMS <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
              <Row className="streams">
                <Col xs={{ span: 24 }} lg={{ span: 11}}>Stream Name</Col>
                <Col xs={{ span: 24 }} lg={{ span: 5 }}>Length (mi)</Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>Drainage Area (sq mi)</Col>
              </Row>
            <div className="draw">
              <img src="/Icons/icon-08.svg" alt="" height="22px" />
              <p>Click on the icon and draw a polygon to select stream segments</p>
            </div>
            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition="right"
            >
              <Panel header="" key="1" extra={genExtra()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}> Aurora <img src="/Icons/icon-19.svg" alt="" height="10px" /></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5}}>1.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <label className="amount">24.0 sq mi</label>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                      <Timeline.Item color="purple">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}> Araphoe County <img src="/Icons/icon-19.svg" alt="" height="10px" /></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>1.4 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <label className="amount">41.8 sq mi</label>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel>
              <Panel header="" key="2" extra={genExtra00()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}> Boulder <img src="/Icons/icon-19.svg" alt="" height="10px" /></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>3.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }} >
                            <label className="amount">41.8 sq mi</label>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel>
            </Collapse>
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}>TOTAL</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><b>5.8mi</b></Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7}}><b>141.1 sq mi</b></Col>
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
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
