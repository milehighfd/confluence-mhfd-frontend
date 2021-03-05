import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Dropdown, Menu, Collapse, Timeline, Drawer } from 'antd';
import { PlusCircleFilled, RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const genExtra = () => (
  <div className="tab-head-project">
    <div><label>Total Cost</label></div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
  </div>
);
const content = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Edit Project</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-90.svg" alt="" width="8px" style={{opacity:'0.5'}}/> Edit Amount</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Zoom to</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-16.svg" alt="" width="10px"/> Delete</span>
    </Menu.Item>
  </Menu>
);

export default () => {
  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <div className="map">
               {/* here goes the map*/}
              </div>

              <Button className="btn-coll" >
                  <img src="/Icons/icon-34.svg" alt="" width="18px" style={{transform: 'rotate(180deg)'}}/>
              </Button>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div className="work-head">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <h2><i className="mdi mdi-circle"></i> Aurora Work Request</h2>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{textAlign:'right'}}>
                    <Select placeholder="Year 2018">
                       <Option value="jack">Year 2019</Option>
                       <Option value="lucy">Year 2020</Option>
                       <Option value="tom">Year 2021</Option>
                    </Select>

                    <ButtonGroup>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }} src=""/>
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" }} src=""/>
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }} src=""/>
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-03.svg') no-repeat center" }} src=""/>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              <div className="work-body">
                <Tabs defaultActiveKey="1" className="tabs-map">
                   <TabPane tab="Capital" key="1">
                     <div className="work-table">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-transparent"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr" style={{borderLeft: '3px solid #9faeb1'}}>
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <label className="purple">Aurora</label>
                            <label className="yellow">Draft</label>
                            <Popover placement="bottom" overlayClassName="work-popover" content={content} trigger="click">
                                <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                            </Popover>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3>2020</h3>
                        <div className="col-wr">
                        <div className="card-wr" style={{borderLeft: '3px solid #28C499 '}}>
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <label className="purple">Aurora</label>
                          <label className="yellow">Draft</label>
                          <Popover placement="bottom" overlayClassName="work-popover" content={content} trigger="click">
                              <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                          </Popover>
                        </div>
                        </div>
                      </div>

                      <div>
                        <h3>2021</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                      <h3>2022</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>2023</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>2024</h3>
                        <div className="col-wr">
                        </div>
                      </div>
                    </div>

                    <div className="cost-wr">
                      <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition="left"
                      >
                        <Panel header="" key="1" extra={genExtra()}>
                          <div className="tab-body-project streams">
                              <Timeline>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Boulder <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Louisville <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Superior <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                              </Timeline>
                          </div>
                        </Panel>
                      </Collapse>
                      <div className="col-bg">
                        <div><h5>Target Cost</h5></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                      </div>
                      <div className="col-bg">
                        <div><h5>Differential</h5></div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                      </div>
                    </div>
                   </TabPane>

                   <TabPane tab="Study" key="2">
                   Content of Tab Pane 2
                   </TabPane>

                   <TabPane tab="Maintenance" key="3">
                     <div className="work-table">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-transparent"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr" style={{borderLeft: '3px solid #9faeb1'}}>
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <label className="purple">Aurora</label>
                            <label className="yellow">Draft</label>
                            <Popover placement="bottomRight" overlayClassName="work-popover" content={content} trigger="click">
                                <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                            </Popover>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3>Debris Management</h3>
                        <div className="col-wr">
                        <div className="card-wr" style={{borderLeft: '3px solid #9faeb1 '}}>
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <label className="purple">Aurora</label>
                          <label className="yellow">Draft</label>
                          <Popover placement="bottomRight" overlayClassName="work-popover" content={content} trigger="click">
                              <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                          </Popover>
                        </div>
                        </div>
                      </div>

                      <div>
                        <h3>Vegetation Management</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                      <h3>Sediment Removal</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>Minor Repairs</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>-</h3>
                        <div className="col-wr">
                        </div>
                      </div>
                    </div>

                    <div className="cost-wr">
                      <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition="left"
                      >
                        <Panel header="" key="1" extra={genExtra()}>
                          <div className="tab-body-project streams">
                              <Timeline>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Boulder</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Louisville</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Superior</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                              </Timeline>
                          </div>
                        </Panel>
                      </Collapse>
                      <div className="col-bg">
                        <div><h5>Target Cost</h5></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                      </div>
                      <div className="col-bg">
                        <div><h5>Differential</h5></div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                      </div>
                    </div>
                   </TabPane>
                   <TabPane tab="Acquisition" key="4">
                     Content of Tab Pane 4
                   </TabPane>
                   <TabPane tab="Special" key="5">
                     Content of Tab Pane 5
                   </TabPane>
                </Tabs>
              </div>

              <div className="work-footer">
                <Button className="btn-borde">Save Work Request</Button>
                <Button className="btn-purple">Submit to County Manager</Button>
              </div>

            <Button className="btn-scroll"><RightOutlined /></Button>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
