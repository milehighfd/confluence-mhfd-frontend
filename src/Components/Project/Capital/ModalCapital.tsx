import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Projects identified in a MHFD master plan that increase conveyance or reduce flow and require a 50% local match.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content04 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content05 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content07 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content08 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content09 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content10 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

const stateValue = {
  visibleCapital: false
}
const genExtra = () => (
  <Row className="tab-head-project">
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>West Tollgate Creek GSB Drops </Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}>Aurora</Col>
    <Col xs={{ span: 24 }} lg={{ span: 5}} xxl={{ span: 5 }}>PrelimDesign</Col>
    <Col xs={{ span: 24 }} lg={{ span: 3}} xxl={{ span: 4 }}>$450,200</Col>
  </Row>
);
const genExtra05 = () => (
  <Row className="tab-head-project">
    <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10 }}>Independent Component</Col>
    <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}>Aurora</Col>
    <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Final Design</Col>
    <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }}>$450,200</Col>
  </Row>
);

export const ModalCapital = ({visibleCapital, setVisibleCapital, nameProject, setNameProject}:
  {visibleCapital: boolean, setVisibleCapital: Function, nameProject: string , setNameProject: Function}) => {
  const [state, setState] = useState(stateValue);
  console.log(visibleCapital, "visiCap");

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

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
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)}  />
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
            <label className="sub-title">Description <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <TextArea rows={4} placeholder="Add description"/>
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Service Area <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">County <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
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
                <Col xs={{ span: 24 }} lg={{ span: 10 }} xxl={{ span: 10}}>Problem</Col>
                <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 5 }}>Jurisdiction</Col>
                <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Status <Popover content={content10}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></Col>
                <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 4 }}>Cost</Col>
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
                  <Timeline>
                    <Timeline.Item color="green">
                      <Row style={{marginLeft:'-18px'}}>
                        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}><label>Aurora Grade Control Structure </label><Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Proposed</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>$200,000</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                      </Row>
                    </Timeline.Item>
                    <Timeline.Item color="orange">
                      <Row style={{marginLeft:'-18px'}}>
                        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}><label>Araphoe County Detention Facility</label> <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Proposed</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>$200,000</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                      </Row>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      <Row style={{marginLeft:'-18px'}}>
                        <Col xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}><label>Pipe Appurtenances</label> <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>Proposed</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}>$200,000</Col>
                        <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                      </Row>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </Panel>
              <Panel header="" key="5" extra={genExtra05()}>
                <div className="tab-body-project">
                  <Timeline>
                    <Timeline.Item color="green">
                      <Row style={{marginLeft:'-18px'}}>
                        <Col className="first" xs={{ span: 24 }} lg={{ span: 14 }} xxl={{ span: 15 }}><label><Input placeholder="Unnamed Component" /></label></Col>
                        <Col className="second" xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><Input placeholder="Proposed" /></Col>
                        <Col className="third" xs={{ span: 24 }} lg={{ span: 4 }} xxl={{ span: 3 }}><Input placeholder="$200,000" /></Col>
                        <Col className="fourth" xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                      </Row>
                    </Timeline.Item>
                  </Timeline>
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
                <p>Overhead Cost <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></p>
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
                <p>Additional Cost <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></p>
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
            <h5>3. GENERATE PROJECT <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>


            {/*Section*/}
            <h5>4. Upload Attachments <Popover content={content09}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
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
