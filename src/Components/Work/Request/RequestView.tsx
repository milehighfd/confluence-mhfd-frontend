import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Dropdown, Menu } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default () => {
  return (
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              {/* aqui va mapitash*/}
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
                            <Dropdown overlay={menu} className="menu-wr">
                              <a className="ant-dropdown-link">
                                 <img src="/Icons/icon-60.svg" alt=""/>
                              </a>
                            </Dropdown>
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
                          <Dropdown overlay={menu} className="menu-wr">
                            <a className="ant-dropdown-link">
                               <img src="/Icons/icon-60.svg" alt=""/>
                            </a>
                          </Dropdown>
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
                      <Row gutter={[16, 24]}>

                      </Row>
                      <div className="col-bg">
                        <Row gutter={[16, 24]}>
                          <Col span={6}><h5>Target Cost</h5></Col>
                          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        </Row>
                      </div>
                      <div className="col-bg">
                        <Row gutter={[16, 24]}>
                          <Col span={6}><h5>Differential</h5></Col>
                          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        </Row>
                      </div>
                    </div>
                   </TabPane>

                   <TabPane tab="Study" key="2">
                     Content of Tab Pane 2
                   </TabPane>
                   <TabPane tab="Maintenance" key="3">
                     Content of Tab Pane 3
                   </TabPane>
                   <TabPane tab="Acquisition" key="4">
                     Content of Tab Pane 3
                   </TabPane>
                   <TabPane tab="Special" key="5">
                     Content of Tab Pane 3
                   </TabPane>
                </Tabs>
              </div>

              <div className="work-footer">
                <Button className="btn-borde">Save Worplan</Button>
                <Button className="btn-purple">Submit for Review</Button>
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
}
