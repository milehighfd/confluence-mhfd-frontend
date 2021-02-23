import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (
  <div className="popver-info">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>
);

const stateValue = {
  visibleCapital: false
}
const genExtra = () => (
  <div className="tab-head-project">
    <div>West Tollgate Creek GSB Drops </div>
    <div>Aurora</div>
    <div>PrelimDesign</div>
    <div>$450,200</div>
  </div>
);
const genExtra05 = () => (
  <div className="tab-head-project">
    <div>Independent Component</div>
    <div>Aurora</div>
    <div>Final Design</div>
    <div>$450,200</div>
  </div>
);

export const ModalCapital = ({visibleCapital, setVisibleCapital}:
  {visibleCapital: boolean, setVisibleCapital: Function}) => {
  const [state, setState] = useState(stateValue);
  console.log(visibleCapital, "visiCap");
  
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleCapital = true;
    setState(auxState);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleCapital (false);
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleCapital (false);
    setState(auxState);
  };
  return (
    <>
     <Modal
       centered
       visible={visibleCapital}
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
                <p>Cherry Creek Service Area · Aurora County</p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Capital Project</label>
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
            <br/>


            {/*Second Section*/}
            <h5>2. SELECT COMPONENTS <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
              <div className="tab-titles">
                <div>Problem</div>
                <div>Jurisdiction</div>
                <div>Status <img src="/Icons/icon-19.svg" alt="" height="15px" /></div>
                <div>Cost</div>
              </div>
            <div className="draw">
              <img src="/Icons/icon-08.svg" alt="" height="22px" />
              <p>Click on the icon above and draw a polygon to select components</p>
            </div>
            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition="right"
            >
              <Panel header="" key="1" extra={genExtra()}>
                <div className="tab-body-project">
                  <div className="first">
                    <Timeline>
                      <Timeline.Item color="green">Grade Control Structure <img src="/Icons/icon-19.svg" alt="" height="10px" /></Timeline.Item>
                      <Timeline.Item color="orange">Detention Facility <img src="/Icons/icon-19.svg" alt="" height="10px" /></Timeline.Item>
                      <Timeline.Item color="green">Pipe Appurtenances <img src="/Icons/icon-19.svg" alt="" height="10px" /></Timeline.Item>
                    </Timeline>
                  </div>
                  <div className="second">Proposed</div>
                  <div className="third">$200,000</div>
                  <div className="fourth"><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></div>
                </div>
              </Panel>
              <Panel header="" key="2" extra={genExtra()}>
                <div></div>
              </Panel>
              <Panel header="" key="3" extra={genExtra()}>
                <div></div>
              </Panel>
              <Panel header=" " key="4" extra={genExtra()}>
                <div></div>
              </Panel>
              <Panel header="" key="5" extra={genExtra05()}>
                <div className="tab-body-project">
                  <div className="first">
                    <Timeline>
                      <Timeline.Item color="green"><Input placeholder="Unnamed Component" /></Timeline.Item>
                    </Timeline>
                  </div>
                  <div className="second"><Input placeholder="Proposed" /></div>
                  <div className="third"><Input placeholder="$200,000" /></div>
                  <div className="fourth"><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></div>
                </div>
              </Panel>
            </Collapse>
            <Button className="btn-transparent-green"><PlusCircleFilled /> Independent Component</Button>

            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>SUBTOTAL COST</Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>$8,230,000</b></Col>
            </Row>
            <hr/>
            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 17 }}>
                <p>Overhead Cost <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>
                <Select placeholder="75%" dropdownClassName="menu-large" >
                  <Option value="75">75%</Option>
                  <Option value="80">80%</Option>
                  <Option value="85">85%</Option>
                  <Option value="90">90%</Option>
                  <Option value="95">95%</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>$8,230,000</Col>

            </Row>
            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
                <Input placeholder="Enter Description" />
              </Col>
            </Row>
            <br/>
            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>
                <p>Additional Cost <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}>$8,230,000</Col>
            </Row>
            <Row className="sub-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 18 }}>
                <Input placeholder="Enter Description" />
              </Col>
            </Row>
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 20 }}>TOTAL COST</Col>
              <Col xs={{ span: 24 }} lg={{ span: 6 }} xxl={{ span: 4 }}><b>$8,230,000</b></Col>
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
