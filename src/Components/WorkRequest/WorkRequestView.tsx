import React, {useState} from "react";
import { Layout, Row, Col, Dropdown, Menu, Button, Tabs, Input, Progress, Drawer } from 'antd';


import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import MapFilterView from '../Shared/MapFilter/MapFilterView';
import MapTypesView from "../Shared/MapTypes/MapTypesView";
import { MAP_DROPDOWN_ITEMS } from "../../constants/constants";

const { TabPane } = Tabs;
const { Search } = Input;

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
  const [dropdownItems, setDropdownItems] = useState<any>({default: 0, items: MAP_DROPDOWN_ITEMS});
  const selectMapStyle = (index : number) => {
    setDropdownItems({...dropdownItems, default: index});
  }
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
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
            <Row>
              <Col span={12}>
                <div className="map">
                  <div className="m-head">
                    <Search
                      placeholder="Search..."
                      onSearch={value => console.log(value)}
                      style={{width: '200px', height: '35px' }}
                    />
                    {/*<Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>*/}
                    <Dropdown overlay={MapFilterView} className="btn-02" trigger={['click']}>
                      <Button>
                        <img src="/Icons/icon-05.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>

                  <Dropdown trigger={['click']} overlay={MapTypesView({dropdownItems, selectMapStyle})} className="btn-03">
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
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt="" width="12px"/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>
                  </div>
                </div>
                <Button className="btn-coll">
                  <img src="/Icons/icon-34.svg" alt="" width="18px"/>
                </Button>
              </Col>
              <Col span={12}>
                <div className="count request">
                <Row>
                  <Col span={14}><h2>Boulder County Work Request</h2></Col>
                  <Col span={10} style={{textAlign:'right'}}>
                    <Button className="btn-request"><img src="/Icons/icon-01.svg" alt=""/></Button>
                    <Button className="btn-request"><img src="/Icons/icon-02.svg" alt=""/></Button>
                    <Button className="btn-comment" onClick={() => { setVisible(true);console.log('click ', visible);  }}><img src="/Icons/icon-03.svg" alt=""/> Comments</Button>
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
