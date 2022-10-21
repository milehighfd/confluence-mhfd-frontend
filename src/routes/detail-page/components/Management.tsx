import React, { useState } from "react";
import { Button, Carousel, Col, Dropdown, Menu, Modal, Progress, Row, Select, Space, Steps, Table, Timeline, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, ArrowRightOutlined, ClockCircleOutlined, DownOutlined, EditOutlined, FieldTimeOutlined, LinkOutlined, MenuOutlined, MessageOutlined, PaperClipOutlined, PlusOutlined, TableOutlined } from "@ant-design/icons";
import ModalAction from "./ModalAction";

const { Step } = Steps;
const { Option } = Select;
const Management = () => {
  const [normalTimelie, setNormalTimeline] = useState(true);
  const [modalAction, setModalAction] = useState(false);
  const menu = (
    <Menu
      style={{marginTop:'15px'}}
      className="menu-density"
      onClick={(e) => (setNormalTimeline(e.key === 'Normal' ? true: false))}
      items={[
        {
          label:<p style={{marginBottom:'0px'}}>Compact</p>,
          key: 'Compact',
        },
        {
          label: <p style={{marginBottom:'0px'}}>Normal</p>,
          key: 'Normal',
        },
      ]}
    />
  );
  return (
    <>
      {modalAction && <ModalAction visible={modalAction} setVisible={setModalAction}/>}
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}}>PROJECT MANAGEMENT</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <p style={{marginTop:'5px'}}>Phase</p>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Draft</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
              <div className="phaseview-timeline">
                <Steps>
                  <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
                </Steps>
              </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">3</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Work Plan (WP) </p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">6</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Startup</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">2</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Funding</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6', textUnderlineOffset: '3px'}}>Consulting Procurement</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Conceptual Design</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">6</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Preliminary Design</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">6</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Final Design</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active-active"><span className="active-active">6</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Construction Contracting</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-inactive"><span className="inactive">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Construction</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-inactive"><span className="inactive">6</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Documentation</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-inactive"><span className="inactive">2</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Establishment</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-inactive"><span className="inactive">4</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p style={{opacity:'0.6'}}>Closeout</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{paddingLeft:'20px'}}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-inactive"><span className="inactive">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 18 }} style={{textAlign: 'end'}}>
          <Button style={{marginRight:'10px', height:'40px', borderRadius:'7px'}}><EditOutlined />Settings</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Button  style={{marginRight:'10px', height:'40px', borderRadius:'7px'}}><TableOutlined /> Density<DownOutlined /></Button>
            </a>
          </Dropdown>
          <Button className="btn-purple" style={{height:'40px'}}><PlusOutlined />Item</Button>
          <div style={{textAlign:'initial', padding:'20px'}} className="timeline-detail">
            <p><span className="span-wp"><ArrowRightOutlined /> Work Plan</span>  Mar 3 to Nov 15, 2022 <span style={{opacity:'0.4', margin:'0px 5px'}}>|</span> <ClockCircleOutlined /> 55 scheduled</p>
            <Timeline mode='left'>
              <Timeline.Item label={<span>Mar 24</span>}>
                <div style={{paddingBottom:'20px'}}>
                  <p>Phase 3:  Work Plan</p>
                  <div className="notes">
                    <p style={{marginBottom:'0px'}}>Notes</p>
                    <p style={{opacity:'0.6', marginBottom:'0px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item label={<span style={{opacity:'0.6'}}>Sep 30</span>}>
                <div style={{paddingBottom:'20px'}} onClick={()=>{setModalAction(true)}}>
                  <div className="action-item">
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        {normalTimelie ? (
                          <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        ):(
                          <span className="title"><div className="circulo"/><span style={{opacity:'0.35', lineHeight:'15px'}}>Action Item 1: Schedule Kickoff Meeting</span></span>
                        )}
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'20px', textAlign:'end'}}>
                        <div>
                        <img src={"/picture/user01.png"} alt="" height="24px" />
                        <span className="in-progress"> In Progress</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="action-text">
                      <div style={{width:'85%'}}>
                        {normalTimelie ?
                          <div>
                            <span className="title"><span style={{opacity:'0.35', lineHeight:'15px', marginTop:'10px'}}>Action Item 1: Schedule Kickoff Meeting</span></span>
                            <p style={{opacity:'0.35', lineHeight:'17px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div> : <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        }
                      </div>
                      <div style={normalTimelie ? {color:'#11093C', alignSelf:'end'} : {color:'#11093C'}}>
                        <ClockCircleOutlined/> Apr 30
                      </div>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item label={<span style={{opacity:'0.6'}}>Nov 18</span>}>
                <div style={{paddingBottom:'20px'}}>
                  <div className="action-item">
                  <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        {normalTimelie ? (
                          <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        ):(
                          <span className="title"><div className="circulo"/><span style={{opacity:'0.35', lineHeight:'15px'}}>Action Item 2: Provide Conceptual Design Cost Estimate</span></span>
                        )}
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'20px', textAlign:'end'}}>
                        <div>
                        <img src={"/picture/user01.png"} alt="" height="24px" />
                        <span className="in-progress"> In Progress</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="action-text">
                      <div style={{width:'85%'}}>
                        {normalTimelie ?
                          <div>
                            <span className="title"><span style={{opacity:'0.35', lineHeight:'15px', marginTop:'10px'}}>Action Item 2: Provide Conceptual Design Cost Estimate</span></span>
                            <p style={{opacity:'0.35', lineHeight:'17px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div> : <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        }
                      </div>
                      <div style={normalTimelie ? {color:'#11093C', alignSelf:'end'} : {color:'#11093C'}}>
                        <ClockCircleOutlined/> Apr 30
                      </div>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item label={<span style={{opacity:'0.6'}}>Dec 7</span>}>
                <div style={{paddingBottom:'20px'}}>
                  <div className="action-item">
                  <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        {normalTimelie ? (
                          <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        ):(
                          <span className="title"><div className="circulo"/><span style={{opacity:'0.35', lineHeight:'15px'}}>Action Item 3: Provide Conceptual Design Cost Estimate</span></span>
                        )}
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'20px', textAlign:'end'}}>
                        <div>
                        <img src={"/picture/user01.png"} alt="" height="24px" />
                        <span className="in-progress"> In Progress</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="action-text">
                      <div style={{width:'85%'}}>
                        {normalTimelie ?
                          <div>
                            <span className="title"><span style={{opacity:'0.35', lineHeight:'15px', marginTop:'10px'}}>Action Item 3: Provide Conceptual Design Cost Estimate</span></span>
                            <p style={{opacity:'0.35', lineHeight:'17px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div> : <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        }
                      </div>
                      <div style={normalTimelie ? {color:'#11093C', alignSelf:'end'} : {color:'#11093C'}}>
                        <ClockCircleOutlined/> Apr 30
                      </div>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item label={<span style={{opacity:'0.6'}}>Jan 8</span>}>
                <div style={{paddingBottom:'20px'}}>
                  <div className="action-item">
                  <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        {normalTimelie ? (
                          <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        ):(
                          <span className="title"><div className="circulo"/><span style={{opacity:'0.35', lineHeight:'15px'}}>Action Item 4: Provide Conceptual Design Cost Estimate</span></span>
                        )}
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'20px', textAlign:'end'}}>
                        <div>
                        <img src={"/picture/user01.png"} alt="" height="24px" />
                        <span className="in-progress"> In Progress</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="action-text">
                      <div style={{width:'85%'}}>
                        {normalTimelie ?
                          <div>
                            <span className="title"><span style={{opacity:'0.35', lineHeight:'15px', marginTop:'10px'}}>Action Item 4: Provide Conceptual Design Cost Estimate</span></span>
                            <p style={{opacity:'0.35', lineHeight:'17px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div> : <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        }
                      </div>
                      <div style={normalTimelie ? {color:'#11093C', alignSelf:'end'} : {color:'#11093C'}}>
                        <ClockCircleOutlined/> Apr 30
                      </div>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item label={<span style={{opacity:'0.6'}}>Feb 16</span>}>
                <div style={{paddingBottom:'20px'}}>
                  <div className="action-item">
                  <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        {normalTimelie ? (
                          <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        ):(
                          <span className="title"><div className="circulo"/><span style={{opacity:'0.35', lineHeight:'15px'}}>Action Item 5: Provide Conceptual Design Cost Estimate</span></span>
                        )}
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{paddingLeft:'20px', textAlign:'end'}}>
                        <div>
                        <img src={"/picture/user01.png"} alt="" height="24px" />
                        <span className="in-progress"> In Progress</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="action-text">
                      <div style={{width:'85%'}}>
                        {normalTimelie ?
                          <div>
                            <span className="title"><span style={{opacity:'0.35', lineHeight:'15px', marginTop:'10px'}}>Action Item 5: Provide Conceptual Design Cost Estimate</span></span>
                            <p style={{opacity:'0.35', lineHeight:'17px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div> : <span style={{color:'#11093C'}}><MenuOutlined /> 4 &nbsp;&nbsp;&nbsp;<MessageOutlined /> 1 &nbsp;&nbsp;&nbsp;<PaperClipOutlined /> 1</span>
                        }
                      </div>
                      <div style={normalTimelie ? {color:'#11093C', alignSelf:'end'} : {color:'#11093C'}}>
                        <ClockCircleOutlined/> Apr 30
                      </div>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item>
                <div style={{paddingBottom:'20px', display:'flex'}}>
                  <p><DownOutlined /> See More </p><div className="line-01" style={{width:'78%'}}></div>
                </div>
              </Timeline.Item>
            </Timeline>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Management;