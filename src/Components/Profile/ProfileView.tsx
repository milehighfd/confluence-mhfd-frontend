import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Menu, Button, Tabs, Input, Table } from 'antd';


import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import CardInformationView from "../Shared/CardInformation/CardInformationView";


const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Search } = Input;

const menu = (
  <Menu className="no-links-dropdown">
    <Menu.Item> 
      <span className="menu-item-text">1st menu item</span>
    </Menu.Item>
    <Menu.Item> 
      <span className="menu-item-text">2nd menu item</span>
    </Menu.Item>
    <Menu.Item> 
      <span className="menu-item-text">3rd menu item</span>
    </Menu.Item>
  </Menu>
);

const genExtra = () => (
  <img src="/Icons/icon-20.svg" alt=""/>
);

const cardInformationProblems: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }
];

const cardInformationProjects: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "Maintenance", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "Study", percentage: "80%"
  }
];

const columns01 = [
  {
    title: '',
    dataIndex: 'Comp',
    key: 'Comp',
    ellipsis: true,
  },
  {
    title: 'Teams',
    dataIndex: 'Teams',
    key: 'Teams',
    ellipsis: true,
  },
  {
    title: 'Favorited',
    dataIndex: 'Favorited',
    key: 'Favorited',
    ellipsis: true,
  },

  {
    title: 'Jurisdiction',
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    ellipsis: true,
  },
  {
    title: 'Drafts',
    dataIndex: 'Drafts',
    key: 'Drafts',
    ellipsis: true,
  },
];

const pagination = { position: 'none' };
const data01 = [
  {
    key: '1',
    Comp: 'Capital',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '2',
    Comp: 'Maintenance',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
    className: 'meh',
  },
  {
    key: '3',
    Comp: 'Study',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '4',
    Comp: 'Acquisition',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '5',
    Comp: 'Special',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
];

const numberWithCommas = (x : number) => {
  return x?x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0;
}

export default () => {
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00 profile-00" style={{height: 'calc(100vh - 58px)', overflowY: 'scroll'}}>
              <Row className="profile-header">
                <Col span={13} className="profile-info">
                  <div style={{position: 'relative'}}><img className="profile-img" src="/Icons/icon-28.svg" alt=""/>
                    <div className="profile-change"><Button type="default" shape="circle" className="btn-edit-00"><img src="/Icons/icon-66.svg" alt=""/></Button></div>
                  </div>
                  <div className="profile-dat">
                    <div className="profile-name">
                      <h3>Elaine Thompson</h3>
                      <span>District Manager</span>
                    </div>
                    <div className="profile-contact">
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-65.svg" alt="" height="15px"/>
                      </Button>
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-64.svg" alt="" height="15px"/>
                      </Button>
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-67.svg" alt="" height="15px"/>
                      </Button>
                    </div>
                  </div>
                  <div className="profile-prot">
                      <Button>Aurora</Button>
                      <Button>Westminster</Button>
                  </div>
                  <div>

                </div>
                </Col>
                <Col span={11}>
                    <div className="profile-table">
                      <Table size={"small"} columns={columns01} dataSource={data01} pagination={false} />
                    </div>
                </Col>
                <div className="profile-divider"></div>
              </Row>
              <Row>
                <Col className="profile-tabs" span={17}>
                  <Tabs style={{padding:'0 53px'}} defaultActiveKey="1" className="tabs-map">
                      <TabPane tab="Problems" key="1">
                      <Row style={{background: '#fff', marginTop: '20px'}} className="card-map" gutter={[16, 16]}>
                      <div className="user-filter profile-filter">
                      <div>
                          <Search
                          placeholder="Search by Name"
                          onSearch={value => console.log(value)}
                          style={{ width: 240 }}
                          />
                      </div>
                      <div>
                          <Dropdown overlay={menu} trigger={['click']}>
                            <Button className="profile-bystatus" >
                                By Status <img src="/Icons/icon-14.svg" alt=""/>
                            </Button>
                          </Dropdown>
                      </div>
                      </div>
                        {cardInformationProblems.map((data: any, index: number) => {
                              return <CardInformationView key={index} data={data} type={"Problems"} numberWithCommas={numberWithCommas} />
                        })}
                      </Row>
                      </TabPane>
                      <TabPane tab="Projects" key="2">
                        <Row style={{background: '#fff', marginTop: '20px'}} className="card-map" gutter={[16, 16]}>
                          <div className="user-filter profile-filter">
                            <div>
                                <Search
                                placeholder="Search by Name"
                                onSearch={value => console.log(value)}
                                style={{ width: 240 }}
                                />
                            </div>
                            <div>
                                <Dropdown overlay={menu} trigger={['click']}>
                                  <Button className="profile-bystatus">
                                      By Status <img src="/Icons/icon-14.svg" alt=""/>
                                  </Button>
                                </Dropdown>
                            </div>
                          </div>
                          {cardInformationProjects.map((data: any, index: number) => {
                            return <CardInformationView key={index} data={data} type={"Projects"} numberWithCommas={numberWithCommas} />
                          })}
                        </Row>
                      </TabPane>
                  </Tabs>
                </Col>
                <Col style={{paddingLeft: '15px', height: '100%'}} span={7}>
                    <Row style={{background: '#fff', height: '100%'}}>
                      <Col className="profile-pad">
                        <h2>Project Collaborators</h2>
                        <Collapse accordion
                          bordered={false}
                          defaultActiveKey={['1']}
                          className="site-collapse-custom-collapse">
                          <Panel header="West Tollgate Creek GSB Drops" key="1" className="site-collapse-custom-panel" extra={genExtra()}>
                            <div className="chat-r pad-collab">
                              <Row>
                                <Col span={3}>
                                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                                </Col>
                                <Col span={14}>
                                  <h6>Jon Villines</h6>
                                  <p>Project Manager</p>
                                </Col>
                                <Col span={7} style={{textAlign: 'right'}}>
                                  <span>MHFD</span>
                                </Col>
                              </Row>
                            </div>
                          </Panel>
                          <Panel header="Piney Creek Channel Restoration" key="2" className="site-collapse-custom-panel" extra={genExtra()}>
                            <div className="chat-r pad-collab">
                              <Row>
                                <Col span={3}>
                                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                                </Col>
                                <Col span={14}>
                                  <h6>Jon Villines</h6>
                                  <p>Project Manager</p>
                                </Col>
                                <Col span={7} style={{textAlign: 'right'}}>
                                  <span>MHFD</span>
                                </Col>
                              </Row>
                            </div>
                          </Panel>
                          <Panel header="Murphy Creek Bank Stabilization" key="3" className="site-collapse-custom-panel" extra={genExtra()}>
                            <div className="chat-r pad-collab">
                              <Row>
                                <Col span={3}>
                                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                                </Col>
                                <Col span={14}>
                                  <h6>Jon Villines</h6>
                                  <p>Project Manager</p>
                                </Col>
                                <Col span={7} style={{textAlign: 'right'}}>
                                  <span>MHFD</span>
                                </Col>
                              </Row>
                            </div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
