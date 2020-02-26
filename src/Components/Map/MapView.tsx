import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
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
              <Col span={12}>Aquí va el mapitash :v</Col>
              <Col style={{padding:'20px 0px'}} span={12}>
              {/*<Collapse accordion>
                <Panel header="" key="1">*/}
                  <Row className="head-m">
                    <Col span={12}>
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Westminter, CO  <img src="icons/icon-12.svg" alt=""/>
                      </a>
                    </Dropdown>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={12}>
                      <ButtonGroup>
                        <Button className="btn-mm">
                          <img className="img-h" src="/icons/icon-30.svg" alt=""/>
                          <img className="img-a" src="/icons/icon-32.svg" alt=""/>
                        </Button>
                        <Button>
                          <img className="img-h" src="/icons/icon-31.svg" alt=""/>
                          <img className="img-a" src="/icons/icon-33.svg" alt=""/>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  <div className="head-filter">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={16}>
                        <Search
                          placeholder="Search..."
                          onSearch={value => console.log(value)}
                          style={{ width: 200 }}
                        />
                      </Col>
                      <Col  style={{textAlign: 'right'}} span={8}>
                        <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort by Cost <img src="icons/icon-14.svg" alt=""/>
                          </a>
                        </Dropdown>
                        <Button><img src="icons/icon-29.svg" alt=""/> Filters (4)</Button>
                      </Col>
                    </Row>
                  </div>

                  <Tabs defaultActiveKey="1" className="tabs-map">
                    <TabPane tab="Problems" key="1">
                      <div className="hastag">
                        <h6>Showing 67 Problems:</h6>
                        <div>
                          <Tag closable >
                             $600K - $1.2M
                          </Tag>
                          <Tag closable >
                             Active
                          </Tag>
                          <Tag closable >
                             Stream Restoration
                          </Tag>
                          <Tag closable >
                             Maintenance
                          </Tag>
                          <Tag closable >
                             Westminster
                          </Tag>
                          <Tag closable >
                             Components
                          </Tag>
                        </div>
                      </div>
                      <Row className="card-map" gutter={[16, 16]}>
                        <Col span={8}>
                          <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt="example" src="/icons/eje.png" />}
                          >
                            <h4>West Tollagate Creek GSB Drops</h4>
                            <h6>Westminster</h6>
                            <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
                            <hr/>
                            <div style={{display: 'flex', width:'100%'}}>
                              <p style={{color: 'red', width:'50%'}}>High Priority</p>
                              <span style={{textAlign: 'right', width:'50%'}}>80%</span>
                            </div>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt="example" src="/icons/eje.png" />}
                          >
                            <h4>West Tollagate Creek GSB Drops</h4>
                            <h6>Westminster</h6>
                            <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
                            <hr/>
                            <div style={{display: 'flex', width:'100%'}}>
                              <p style={{color: 'red', width:'50%'}}>High Priority</p>
                              <span style={{textAlign: 'right', width:'50%'}}>80%</span>
                            </div>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt="example" src="/icons/eje.png" />}
                          >
                            <h4>West Tollagate Creek GSB Drops</h4>
                            <h6>Westminster</h6>
                            <h5>$400,500 <span style={{float: 'right'}}><b>5</b> Components</span></h5>
                            <hr/>
                            <div style={{display: 'flex', width:'100%'}}>
                              <p style={{color: 'red', width:'50%'}}>High Priority</p>
                              <span style={{textAlign: 'right', width:'50%'}}>80%</span>
                            </div>
                          </Card>
                        </Col>

                      </Row>
                    </TabPane>
                    <TabPane tab="Projects" key="2">
                      Tab 2
                    </TabPane>
                  </Tabs>

                {/*</Panel>
                </Collapse>*/}
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
