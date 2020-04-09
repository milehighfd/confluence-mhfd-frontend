import React, {useState} from "react";
import { Layout, Row, Col, Dropdown, Menu, Button, Tabs, Input, Drawer, Select } from 'antd';


import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";

const { TabPane } = Tabs;
const { Option } = Select;

// const genExtra = () => (
//   <Row className="tab-head">
//     <Col span={9}>Piney Creek Channel Restoration</Col>
//     <Col span={5}>Westminster</Col>
//     <Col span={4}>$450,200</Col>
//     <Col span={4} style={{textAlign: 'center'}}>
//        <p>90%</p>
//       <Progress percent={90} showInfo={false} style={{height: '4px !important'}}/>
//     </Col>
//     <Col span={2}><img src="/Icons/icon-20.svg" alt=""/></Col>
//   </Row>
// );

const menu = (
  <Menu className="menu-card">
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <a target="_blank" rel="noopener noreferrer" href="">
        Edit
      </a>
    </Menu.Item>
    <Menu.Item style={{borderBottom: '1px solid rgba(61, 46, 138, 0.07)'}}>
      <a target="_blank" rel="noopener noreferrer" href="">
        Copy
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="" style={{color: 'red'}}>
        Delete
      </a>
    </Menu.Item>
  </Menu>
);

export default () => {
  const [visible, setVisible] = useState(false);
  const chat =  <Drawer
    placement="right"
    closable={false}
    onClose={() => setVisible(false)}
    visible={visible}
    className="chat-r"
    >
      <h5>Team Collaborators</h5>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px"/>
        </Col>
        <Col span={13}>
          <h6>Jon Villines</h6>
          <p>Project Manager</p>
        </Col>
        <Col span={7} style={{textAlign: 'right'}}>
          <span>MHFD</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px"/>
        </Col>
        <Col span={13}>
          <h6>Carolyn Roan</h6>
          <p>Floodplain Administration</p>
        </Col>
        <Col span={7} style={{textAlign: 'right'}}>
          <span>City of Littleton</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px"/>
        </Col>
        <Col span={13}>
          <h6>Deb Ohlinger</h6>
          <p>People Manager</p>
        </Col>
        <Col span={7} style={{textAlign: 'right'}}>
          <span>Olsson</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px"/>
        </Col>
        <Col span={13}>
          <h6>Amy Gabor</h6>
          <p>Project Engineer</p>
        </Col>
        <Col span={7} style={{textAlign: 'right'}}>
          <span>Olsson</span>
        </Col>
      </Row>
      <div className="chat-00">
        <div className="chat-head">
          Comments <img src="/Icons/icon-19.svg" alt="" height="20px"/>
        </div>
        <div className="chat-body">
          <img src="/Icons/icon-61.svg" alt=""/>
          <h6>Share your thoughts</h6>
          <p>
            Let everyone in your group know
            what you think about this listing
          </p>
        </div>
        <div className="chat-footer">
        <Row>
          <Col span={4}>
            <img src="/Icons/icon-28.svg" alt="" height="35px"/>
          </Col>
          <Col span={13}>
            <Input placeholder="Add a comment..." />
          </Col>
          <Col span={7} style={{textAlign: 'right'}}>
            <Button className="btn-send">SEND</Button>
          </Col>
        </Row>
        </div>
      </div>
  </Drawer>
  return <>
        {chat}
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout style={{margin: '20px'}}>
            <Row>
              <Col span={24}>
                <div className="count request" style={{paddingBottom: '20px',height: 'calc(100vh - 78px)'}}>
                <Row>
                  <Col span={14}><h2 style={{display: 'inline-block'}}>Boulder County Work Plan</h2> <Button className="btn-comment-01"><img src="/Icons/icon-09.svg" alt=""/> Invite</Button></Col>
                  <Col span={10} style={{textAlign:'right'}}>
                    <Button className="btn-request"><img src="/Icons/icon-01.svg" alt=""/></Button>
                    <Button className="btn-request"><img src="/Icons/icon-06.svg" alt=""/></Button>
                    <Button className="btn-comment" onClick={() => { setVisible(true);console.log('click ', visible);  }}><img src="/Icons/icon-03.svg" alt=""/> Comments</Button>
                  </Col>
                </Row>

                <Tabs defaultActiveKey="1" className="tabs-map">
                  <TabPane tab="Capital" key="1">
                    <Row gutter={[8, 24]} className="work-plan">
                      <Col span={3}>
                        <h3>Workspace <img src="/Icons/icon-19.svg" alt=""/></h3>
                        <div className="col-wr" style={{marginTop: '35px'}}>
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

                          <div className="card-wr" style={{borderLeft: '4px solid #29c499'}}>
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
                            <Dropdown overlay={menu} className="menu-wr">
                              <a className="ant-dropdown-link">
                                 <img src="/Icons/icon-60.svg" alt=""/>
                              </a>
                            </Dropdown>
                          </div>

                          <div className="card-wr" style={{borderLeft: '4px solid #fdb32b'}}>
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <p>Aurora <label>Draft</label></p>
                            <Dropdown overlay={menu} className="menu-wr">
                              <a className="ant-dropdown-link">
                                 <img src="/Icons/icon-60.svg" alt=""/>
                              </a>
                            </Dropdown>
                          </div>

                          <div className="card-wr" style={{borderLeft: '4px solid #ff4040'}}>
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
                      </Col>
                      <Col span={3}>
                        <h3>2020</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
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
                      </Col>
                      <Col span={3}>
                        <h3>2021</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr">
                        </div>
                      </Col>
                      <Col span={3}>
                        <h3>2022</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr">
                        </div>
                      </Col>
                      <Col span={3}>
                        <h3>2023</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr">
                        </div>
                      </Col>
                      <Col span={3}>
                        <h3>2024</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr">
                        </div>
                      </Col>
                      <Col span={6}>
                        <div style={{display: 'flex'}}>
                          <h3 style={{width: '50%'}}>Analysis</h3>
                          <Select defaultValue="2021" style={{width: '50%'}}>
                            <Option value="2020">2020</Option>
                            <Option value="2021">2021</Option>
                            <Option value="2022">2022</Option>
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                          </Select>
                        </div>

                      <div className="work-pc" style={{marginTop: '26px'}}>
                        <div className="wp-chart">
                          <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt=""/></h5>
                        </div>
                        <div className="wp-chart">
                          <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt=""/></h5>
                        </div>
                      </div>

                      </Col>
                    </Row>

                    <div className="cost-wr">
                      <Row gutter={[8, 16]}>
                        <Col span={3}><h5>TOTAL REQUESTED</h5></Col>
                        <Col span={3}><Input placeholder="Total cost" /></Col>
                        <Col span={3}><Input placeholder="Total cost" /></Col>
                        <Col span={3}><Input placeholder="Total cost" /></Col>
                        <Col span={3}><Input placeholder="Total cost" /></Col>
                        <Col span={3}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <br></br>
                      <Row gutter={[8, 16]}>
                        <Col span={3}><h5>Target Cost</h5></Col>
                        <Col span={3}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={3}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={3}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={3}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                        <Col span={3}><Input className="input-pp" placeholder="Enter target cost" /></Col>
                      </Row>
                      <br></br>
                      <Row gutter={[8, 16]}>
                        <Col span={3}><h5>Differential</h5></Col>
                        <Col span={3}><Input className="input-r1" placeholder="XXX Difference" /></Col>
                        <Col span={3}><Input className="input-r1" placeholder="XXX Difference" /></Col>
                        <Col span={3}><Input className="input-r1" placeholder="XXX Difference" /></Col>
                        <Col span={3}><Input className="input-r1" placeholder="XXX Difference" /></Col>
                        <Col span={3}><Input className="input-r1" placeholder="XXX Difference" /></Col>
                      </Row>
                      <Row style={{padding: '0px 20px'}}>
                        <Col span={24} style={{textAlign: 'right'}}>
                          <Button className="btn-00">Save Work Plan</Button>
                          <Button>Submit to Admin</Button>
                        </Col>
                      </Row>
                    </div>

                  </TabPane>
                  <TabPane tab="Study" key="2">
                  <Row gutter={[8, 16]} className="work-plan work-title">
                    <Col span={18}>
                    <Row gutter={[8, 24]}>
                      <div className="col-name">MP</div>
                      <Col span={4}>
                        <h3>Workspace <img src="/Icons/icon-19.svg" alt=""/></h3>
                        <div className="col-wr-01" style={{marginTop: '35px'}}>
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                        </div>
                      </Col>
                      <Col span={4}>
                        <h3>2020</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <h3>2021</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <h3>2022</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <h3>2023</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <h3>2024</h3>
                        <div style={{textAlign:'center'}}><a href="">View Map</a></div>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                    </Row>
                    <div className="cost-wr">
                      <Row gutter={[8, 16]}>
                        <Col span={4}><h5>TOTAL Cost</h5></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <br></br>
                      <Row gutter={[8, 16]}>
                        <Col span={4}><h5>Budget Cost</h5></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                      </Row>
                    </div>
                    <hr></hr>
                    <Row gutter={[8, 24]}>
                     <div className="col-name-01">FHAD</div>
                      <Col span={4}>
                        <div className="col-wr-01" style={{marginTop: '13px'}}>
                          <Button className="btn-create"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="col-wr-01">
                        </div>
                      </Col>
                    </Row>
                    <div className="cost-wr">
                      <Row gutter={[8, 16]}>
                        <Col span={4}><h5>TOTAL Cost</h5></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                        <Col span={4}><Input placeholder="Total cost" /></Col>
                      </Row>
                      <br></br>
                      <Row gutter={[8, 16]}>
                        <Col span={4}><h5>Budget Cost</h5></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                        <Col span={4}><Input className="input-pp" placeholder="Enter budget cost" /></Col>
                      </Row>
                    </div>
                    </Col>
                    <Col span={6}>
                      <div style={{display: 'flex'}}>
                        <h3 style={{width: '50%'}}>Analysis</h3>
                        <Select defaultValue="2021" style={{width: '50%'}}>
                          <Option value="2020">2020</Option>
                          <Option value="2021">2021</Option>
                          <Option value="2022">2022</Option>
                          <Option value="2023">2023</Option>
                          <Option value="2024">2024</Option>
                        </Select>
                      </div>

                      <div className="work-pc work-pc-01" style={{marginTop: '26px'}}>
                        <div className="wp-chart">
                          <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt=""/></h5>
                        </div>
                        <div className="wp-chart">
                          <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt=""/></h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="cost-wr">
                    <Row style={{padding: '0px 20px'}}>
                      <Col span={24} style={{textAlign: 'right'}}>
                        <Button className="btn-00">Save Work Plan</Button>
                        <Button>Submit to Admin</Button>
                      </Col>
                    </Row>
                  </div>
                  </TabPane>
                  <TabPane tab="Maintenance" key="3">
                  </TabPane>
                  <TabPane tab="Acquisition" key="4">
                  </TabPane>
                  <TabPane tab="Special" key="5">

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
