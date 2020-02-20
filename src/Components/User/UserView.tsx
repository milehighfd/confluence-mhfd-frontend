import * as React from "react";
import {Layout, Row, Col, Tabs, Input, Menu, Dropdown, Button, Icon, Collapse, Radio} from 'antd';

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
  // <Icon
  //   type="setting"
  //   onClick={event => {
  //    If you don't want click extra trigger collapse, you can prevent this:
  //     event.stopPropagation();
  //   }}
  // />
  <img src="icons/icon-20.svg" alt=""/>
);

export default () => {
  return   <Layout className="layout user">
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
                        Organization <img src="icons/icon-12.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown overlay={menu}>
                      <Button>
                        Service Area <img src="icons/icon-12.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>

                  <div>
                    <Dropdown overlay={menu}>
                      <Button>
                        User Designation <img src="icons/icon-12.svg" alt=""/>
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
                        Approval Date <img src="icons/icon-14.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                <Collapse accordion className="user-tab">
                  <Panel header="1. Rinnie Gauger" key="1" extra={genExtra()}>
                    <div className="gutter-example">
                      <h3>PROFILE</h3>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={12}><Input placeholder="First Name" /></Col>
                        <Col className="gutter-row" span={12}><Input placeholder="Last Name" /></Col>
                      </Row>
                      <br></br>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={12}><Input placeholder="Email" /></Col>
                        <Col className="gutter-row" span={12}><Input placeholder="Organization" /></Col>
                      </Row>
                    </div>

                    <hr></hr>

                    <div className="gutter-example">
                      <h3>USER DESIGNATION</h3>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d"><h6>MHFD Staff</h6></div>
                            <p><Radio></Radio></p>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                            <p><Radio></Radio></p>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d">
                              <h6>Local</h6>
                              <h6>Government</h6>
                            </div>
                            <p><Radio></Radio></p>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d"><h6>Other</h6></div>
                            <p><Radio></Radio></p>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d">
                              <h6>Local </h6>
                              <h6>Government Admin</h6>
                            </div>
                            <p><Radio></Radio></p>
                          </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <div className="user-card">
                            <div className="user-d"><h6>MHFD Admin</h6></div>
                            <p><Radio></Radio></p>
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
                              User Designation <img src="icons/icon-12.svg" alt=""/>
                            </Button>
                          </Dropdown>
                        </Col>

                        <Col className="gutter-row" span={12}>
                          <Dropdown overlay={menu}>
                            <Button>
                              User Designation <img src="icons/icon-12.svg" alt=""/>
                            </Button>
                          </Dropdown>
                        </Col>
                      </Row>
                      <br></br>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                        <Dropdown overlay={menu}>
                          <Button>
                            User Designation <img src="icons/icon-12.svg" alt=""/>
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
                      Organization <img src="icons/icon-12.svg" alt=""/>
                    </Button>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown overlay={menu}>
                    <Button>
                      Service Area <img src="icons/icon-12.svg" alt=""/>
                    </Button>
                  </Dropdown>
                </div>

                <div>
                  <Dropdown overlay={menu}>
                    <Button>
                      User Designation <img src="icons/icon-12.svg" alt=""/>
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
                      Approval Date <img src="icons/icon-14.svg" alt=""/>
                    </Button>
                  </Dropdown>
                </div>
              </div>

              <Collapse accordion className="user-tab">
                <Panel header="1. Rinnie Gauger" key="1" extra={genExtra()}>
                  <div className="gutter-example">
                    <h3>PROFILE</h3>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={12}><Input placeholder="First Name" /></Col>
                      <Col className="gutter-row" span={12}><Input placeholder="Last Name" /></Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={12}><Input placeholder="Email" /></Col>
                      <Col className="gutter-row" span={12}><Input placeholder="Organization" /></Col>
                    </Row>
                  </div>

                  <hr></hr>

                  <div className="gutter-example">
                    <h3>USER DESIGNATION</h3>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d"><h6>MHFD Staff</h6></div>
                          <p><Radio></Radio></p>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                          <p><Radio></Radio></p>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d">
                            <h6>Local</h6>
                            <h6>Government</h6>
                          </div>
                          <p><Radio></Radio></p>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d"><h6>Other</h6></div>
                          <p><Radio></Radio></p>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d">
                            <h6>Local </h6>
                            <h6>Government Admin</h6>
                          </div>
                          <p><Radio></Radio></p>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div className="user-card">
                          <div className="user-d"><h6>MHFD Admin</h6></div>
                          <p><Radio></Radio></p>
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
                            User Designation <img src="icons/icon-12.svg" alt=""/>
                          </Button>
                        </Dropdown>
                      </Col>

                      <Col className="gutter-row" span={12}>
                        <Dropdown overlay={menu}>
                          <Button>
                            User Designation <img src="icons/icon-12.svg" alt=""/>
                          </Button>
                        </Dropdown>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={12}>
                      <Dropdown overlay={menu}>
                        <Button>
                          User Designation <img src="icons/icon-12.svg" alt=""/>
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
               </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </Content>
  </Layout>
}
