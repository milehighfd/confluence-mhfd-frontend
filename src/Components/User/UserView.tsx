import * as React from "react";
import {Layout, Row, Col, Tabs, Input, Menu, Dropdown, Button, Icon, Collapse, Radio, Switch, Table, Divider, Tag, Pagination} from 'antd';
import NavbarView from "../Navbar/NavbarContainer";
import SidebarView from "../Sidebar/SidebarContainer";
import Accordeon from './ApprovedUsers/Accordeon';

const {Content} = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Panel } = Collapse;
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      3rd item
    </Menu.Item>
  </Menu>
);
const genExtra = () => (
  <Row className="user-head" type="flex" justify="space-around" align="middle">
    <Col span={19}>
      <h6>1. Ronnie Gougers</h6>
      <span>(Organization - Service Area - User Designation)</span>
    </Col>
    <Col span={3} style={{textAlign: 'right'}}>
      <div>
        <Switch defaultChecked />
      </div>
    </Col>
    <Col span={1} style={{textAlign: 'right'}}><img src="Icons/icon-20.svg" alt=""/></Col>
  </Row>
);

export default () => {
  return <>
    <Layout>
      <NavbarView></NavbarView>
        <Layout>
            <SidebarView></SidebarView>
            <Layout className="layout user">
              <Content style={{ padding: '0 132.7px' }}>
                <div>
                  <Row>
                    <Col span={24}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Approved Users" key="1">
                          <div className="user-filter">
                            <div>
                              <Search
                                placeholder="Search by Name"
                                onSearch={value => console.log(value)}
                                style={{ width: 240 }}
                              />
                            </div>

                            <div>
                              <Dropdown overlay={menu}>
                                <Button>
                                  Organization <img src="Icons/icon-12.svg" alt=""/>
                                </Button>
                              </Dropdown>
                            </div>
                            <div>
                              <Dropdown overlay={menu}>
                                <Button>
                                  Service Area <img src="Icons/icon-12.svg" alt=""/>
                                </Button>
                              </Dropdown>
                            </div>

                            <div>
                              <Dropdown overlay={menu}>
                                <Button>
                                  User Designation <img src="Icons/icon-12.svg" alt=""/>
                                </Button>
                              </Dropdown>
                            </div>

                            <div>
                              <Button className="f-btn">Reset</Button>
                            </div>

                            <div className="btn-r">
                              <label>Sort by:</label>
                              <Dropdown overlay={menu}>
                                <Button>
                                  Approval Date <img src="Icons/icon-14.svg" alt=""/>
                                </Button>
                              </Dropdown>
                            </div>
                          </div>

                          <Accordeon menu={menu} />

                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={200} />
                          </div>
                        </TabPane>

                        <TabPane tab="Pending User Requests" key="2">
                        <div className="user-filter">
                          <div>
                            <Search
                              placeholder="Search by Name"
                              onSearch={value => console.log(value)}
                              style={{ width: 240 }}
                            />
                          </div>

                          <div>
                            <Dropdown overlay={menu}>
                              <Button>
                                Organization <img src="Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </div>
                          <div>
                            <Dropdown overlay={menu}>
                              <Button>
                                Service Area <img src="Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </div>

                          <div>
                            <Dropdown overlay={menu}>
                              <Button>
                                User Designation <img src="Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </div>

                          <div>
                            <Button className="f-btn">Reset</Button>
                          </div>

                          <div className="btn-r">
                            <label>Sort by:</label>
                            <Dropdown overlay={menu}>
                              <Button>
                                Approval Date <img src="Icons/icon-14.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </div>
                        </div>

                        <Collapse accordion className="user-tab">
                          <Panel header="" key="1" extra={genExtra()}>
                            <div className="gutter-example">
                              <h3>PROFILE</h3>
                              <Row gutter={16}>
                                <Col className="gutter-row" span={12}><Input placeholder="First Name" /></Col>
                                <Col className="gutter-row" span={12}><Input placeholder="Last Name" /></Col>
                              </Row>
                              <br></br>
                              <Row gutter={16}>
                                <Col className="gutter-row" span={12}><Input placeholder="Email" /></Col>
                                <Col className="gutter-row" span={12}>
                                  <Dropdown overlay={menu}>
                                    <Button>
                                      Organization <img src="Icons/icon-12.svg" alt=""/>
                                    </Button>
                                  </Dropdown>
                                </Col>
                              </Row>
                            </div>

                            <hr></hr>

                            <div className="gutter-example">
                              <h3>USER DESIGNATION</h3>
                              <Row gutter={16}>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d"><h6>MHFD Admin</h6></div>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d"><h6>MHFD Staff</h6></div>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d">
                                      <h6>Local </h6>
                                      <h6>Government Admin</h6>
                                    </div>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d">
                                      <h6>Local</h6>
                                      <h6>Government</h6>
                                    </div>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                  <div className="user-card">
                                    <p><Radio></Radio></p>
                                    <div className="user-d"><h6>Other</h6></div>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <hr></hr>

                            <div className="gutter-example">
                              <h3>PROFILE</h3>
                              <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                  <Dropdown overlay={menu}>
                                    <Button>
                                      User Designation <img src="Icons/icon-12.svg" alt=""/>
                                    </Button>
                                  </Dropdown>
                                </Col>

                                <Col className="gutter-row" span={12}>
                                  <Dropdown overlay={menu}>
                                    <Button>
                                      User Designation <img src="Icons/icon-12.svg" alt=""/>
                                    </Button>
                                  </Dropdown>
                                </Col>
                              </Row>
                              <br></br>
                              <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                <Dropdown overlay={menu}>
                                  <Button>
                                    User Designation <img src="Icons/icon-12.svg" alt=""/>
                                  </Button>
                                </Dropdown>
                                </Col>
                              </Row>
                            </div>
                            <div className="user-footer">
                              <Button className="btn-d">Delete</Button>
                              <Button className="btn-s">Save</Button>
                            </div>
                          </Panel>
                        </Collapse>

                        <div className="pagi-00">
                          <Pagination defaultCurrent={1} total={200} />
                        </div>
                        </TabPane>

                        <TabPane tab="User Activity" key="3">
                          <Button className="btn-down"><img src="/Icons/icon-15.svg" alt=""/></Button>
                          <Row className="activity-h">
                            <Col span={5}><Button>Data and Time <img src="Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>User <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>City <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>Change <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={200} />
                          </div>
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                </div>
              </Content>
            </Layout>
        </Layout>
    </Layout>
  </>
}
