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
              </Col>
              <Col span={12}>
                <div className="count">
                <Button className="btn-coll">
                  <img src="/Icons/icon-34.svg" alt=""/>
                </Button>
              {/*<Collapse accordion>
                <Panel header="" key="1">*/}
                  <Row className="head-m">
                    <Col span={12}>
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Westminter, CO  <img src="/Icons/icon-12.svg" alt=""/>
                      </a>
                    </Dropdown>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={12}>
                      <ButtonGroup>
                        <Button className="btn-mm">
                          <img className="img-h" src="/Icons/icon-30.svg" alt=""/>
                          <img className="img-a" src="/Icons/icon-32.svg" alt=""/>
                        </Button>
                        <Button>
                          <img className="img-h" src="/Icons/icon-31.svg" alt=""/>
                          <img className="img-a" src="/Icons/icon-33.svg" alt=""/>
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
                            Sort by Cost <img src="Icons/icon-14.svg" alt=""/>
                          </a>
                        </Dropdown>
                        <Button><img src="Icons/icon-29.svg" alt=""/> Filters (4)</Button>
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
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                      <Row className="card-map" gutter={[16, 16]}>
                        <Col span={8}>
                          <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                            cover={<img alt="example" src="/Icons/eje.png" />}
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
                    {/*LIST*/}
                    <Row className="list-h">
                      <Col span={9}>Problem & Component Name</Col>
                      <Col span={5}>Jurisdiction</Col>
                      <Col span={4}>Solution Cost</Col>
                      <Col span={6}> Solution Status</Col>
                    </Row>
                    <Collapse accordion>
                      <Panel header="" key="1" extra={genExtra()}>
                        <Row>
                          <Col span={9}>
                          <Timeline>
                            <Timeline.Item color="green">
                              <p>Component 1 <img className="img-h" src="/Icons/icon-19.svg" alt=""/></p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                              <p>Component 2 <img className="img-h" src="/Icons/icon-19.svg" alt=""/></p>
                            </Timeline.Item>
                            <Timeline.Item color="green" className="line-00">
                              <div className="ant-timeline-item-tail" style={{top:'10px', left:'-38px'}}></div>
                              <p style={{marginBottom: '0px'}}>Component 3 <img className="img-h" src="/Icons/icon-19.svg" alt=""/></p>
                            </Timeline.Item>
                            </Timeline>
                          </Col>
                          <Col span={5}>
                            <p>Westminter</p>
                            <p>Westminter</p>
                            <p>Westminter</p>
                          </Col>
                          <Col span={4}>
                            <p>$200,000</p>
                            <p>$200,000</p>
                            <p>$200,000</p>
                          </Col>
                          <Col span={6}>
                            <p>Project XYZ</p>
                            <p>Project XYZ</p>
                            <p>Project XYZ</p>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                    </TabPane>
                  </Tabs>
                {/*</Panel>
                </Collapse>*/}
                </div>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
