import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;

const genExtra = () => (
  <Row className="tab-head">
    <Col span={9}>Piney Creek Channel Restoration</Col>
    <Col span={5}>Westminster</Col>
    <Col span={4}>$450,200</Col>
    <Col span={4} style={{textAlign: 'center'}}>
       <p>90%</p>
      <Progress percent={90} showInfo={false} style={{height: '4px !important'}}/>
    </Col>
    <Col span={2}><img src="/Icons/icon-20.svg" alt=""/></Col>
  </Row>
);

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
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
            <Row>
              <Col span={12}>
                <div className="map">
                  <div className="m-head">
                    <Search
                      placeholder="Search..."
                      onSearch={value => console.log(value)}
                      style={{ width: 200 }}
                    />
                    <Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>
                    <Dropdown overlay={MapFilterView} className="btn-02">
                      <Button>
                        <img src="/Icons/icon-05.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>

                  <Dropdown overlay={MapTypesView} className="btn-03">
                    <Button>
                      Dark Terrain <img src="/Icons/icon-12.svg" alt=""/>
                    </Button>
                  </Dropdown>

                  <div className="m-footer">
                    <h5>NFHL 100 year floodplain</h5>
                    <hr/>
                    <p><div style={{background:'#99C9FF'}}></div> 6 - 12 inches</p>
                    <p><div style={{background:'#4B9CFF'}}></div> 12 - 18 inches</p>
                    <p><div style={{background:'#4C81C4'}}></div> 18 - 24 inches</p>
                    <p><div style={{background:'#4A6A9C'}}></div> +24 inches</p>
                    <p><div style={{background:'#8FA7C8', height: '2px', marginTop: '7px'}}></div> Stream Channel</p>
                    <p><div style={{background:'#ffffff', border: '1px dashed'}}></div> Service Area (Watershed)</p>
                  </div>

                  <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt=""/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt=""/></Button>
                  </div>
                </div>
                <Button className="btn-coll">
                  <img src="/Icons/icon-34.svg" alt=""/>
                </Button>
              </Col>
              <Col span={12}>
                <div className="count request">
                <Row>
                  <Col span={14}><h2>Boulder County Work Request</h2></Col>
                  <Col span={10} style={{textAlign:'right'}}>
                    <Button className="btn-request"><img src="/Icons/icon-01.svg" alt=""/></Button>
                    <Button className="btn-request"><img src="/Icons/icon-02.svg" alt=""/></Button>
                    <Button className="btn-comment"><img src="/Icons/icon-03.svg" alt=""/> Comments</Button>
                  </Col>
                </Row>

                <Tabs defaultActiveKey="1" className="tabs-map">
                  <TabPane tab="Capital" key="1">
                    <div className="work-request">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr">
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
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
                        <div className="card-wr">
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <p>Aurora <label>Draft</label></p>
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
                    </div>

                    <div className="cost-wr">
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Target Cost</h5></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Differential</h5></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>

                  </TabPane>
                  <TabPane tab="Study" key="2">
                    <div className="work-request">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr">
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
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
                        <div className="card-wr">
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <p>Aurora <label>Draft</label></p>
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
                    </div>

                    <div className="cost-wr">
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Target Cost</h5></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Differential</h5></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tab="Maintenance" key="3">
                    <div className="work-request">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr">
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
                            <Dropdown overlay={menu} className="menu-wr">
                              <a className="ant-dropdown-link">
                                 <img src="/Icons/icon-60.svg" alt=""/>
                              </a>
                            </Dropdown>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3>Debris</h3>
                        <div className="col-wr">
                        <div className="card-wr">
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <p>Aurora <label>Draft</label></p>
                          <Dropdown overlay={menu} className="menu-wr">
                            <a className="ant-dropdown-link">
                               <img src="/Icons/icon-60.svg" alt=""/>
                            </a>
                          </Dropdown>
                        </div>
                        </div>
                      </div>

                      <div>
                        <h3>Vegetation</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                      <h3>Sidimient</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>2023</h3>
                        <div className="col-wr">
                        </div>
                      </div>
                    </div>

                    <div className="cost-wr">
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Target Cost</h5></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Differential</h5></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tab="Acquisition" key="4">
                    <div className="work-request">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr">
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
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
                        <div className="card-wr">
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <p>Aurora <label>Draft</label></p>
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


                    </div>

                    <div className="cost-wr">
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Target Cost</h5></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Differential</h5></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tab="Special" key="5">
                    <div className="work-request">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr">
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
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
                        <div className="card-wr">
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <p>Aurora <label>Draft</label></p>
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

                    </div>

                    <div className="cost-wr">
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                        <Col span={6}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Target Cost</h5></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <Row gutter={[16, 24]} style={{padding: '0px 20px'}}>
                        <Col span={6}><h5>Differential</h5></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                        <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                </Tabs>

                </div>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
