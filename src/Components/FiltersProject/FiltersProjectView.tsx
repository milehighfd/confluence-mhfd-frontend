import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline,Checkbox, Select, Radio} from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

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

                      <Row className="filt-00" style={{marginTop: '10px'}}>
                        <Col span={12}>
                          <h5>Solution Cost <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>$20M-$25M</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$10M-$15M</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$5M-10M</Radio> <span className="filt-s">302</span></p>
                          <p><Radio>$1M-$10M</Radio> <span className="filt-s">109</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Priority <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>High</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>Medium</Radio> <span className="filt-s">302</span></p>
                          <p><Radio>Low</Radio> <span className="filt-s">109</span></p>
                        </Col>
                      </Row>

                      <h5 className="filt-h5">Migration type <img src="Icons/icon-19.svg" alt=""/></h5>
                      <Row className="filt-00">
                        <Col span={12}>
                          <p><Checkbox>Increased Conveyance - Crossing</Checkbox> <span className="filt-s">71</span></p>
                          <p><Checkbox>Increased Conveyance - Streams</Checkbox> <span className="filt-s">16</span></p>
                          <p><Checkbox>Increased Conveyance - Pipe</Checkbox> <span className="filt-s">5</span></p>
                          <p><Checkbox>Flow Reduction</Checkbox> <span className="filt-s">4</span></p>
                          <p><Checkbox>Stabilization - Vertical</Checkbox> <span className="filt-s">1</span></p>
                        </Col>
                        <Col span={12}>
                          <p><Checkbox>Stabilization - Lateral</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Acquisition</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Municipalities</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Municipalities</Checkbox> <span className="filt-s">1</span></p>
                        </Col>
                      </Row>

                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>Status <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>75%-100%</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>50%-75%</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>25%-50%</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>10%-25%</Radio> <span className="filt-s">208</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>County <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Checkbox>Adams</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Arapahoe</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Boulder</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Broomfield</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Denver</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Douglas</Checkbox><span className="filt-s">1</span></p>
                          <p><Checkbox>Jefferson</Checkbox><span className="filt-s">1</span></p>
                        </Col>
                      </Row>

                      <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt=""/></h5>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Jurisdiction</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>MHFD Manager</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Problem Type</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>Source</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>

                      <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01">Apply</Button>
                      </div>

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

                      <Row className="filt-00" style={{marginTop: '10px'}}>
                        <Col span={12}>
                          <h5>Project type <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>Capital</Radio> <span className="filt-s">13%</span></p>
                          <p><Radio>Maintenance</Radio> <span className="filt-s">8%</span></p>
                          <p><Radio>Study</Radio> <span className="filt-s">19%</span></p>
                          <p><Radio>Property Acquisition</Radio> <span className="filt-s">25%</span></p>
                          <p><Radio>Special</Radio> <span className="filt-s">35%</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Estimated total cost <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>20M-25M</Radio> <span className="filt-s">30</span></p>
                          <p><Radio>15M-20M</Radio> <span className="filt-s">30</span></p>
                          <p><Radio>5M-10M</Radio> <span className="filt-s">30</span></p>
                          <p><Radio>0 - 5M</Radio> <span className="filt-s">30</span></p>
                        </Col>
                      </Row>


                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>Capital Status <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Checkbox>Approved</Checkbox> <span className="filt-s">71</span></p>
                          <p><Checkbox>Idle</Checkbox> <span className="filt-s">16</span></p>
                          <p><Checkbox>Initiated</Checkbox> <span className="filt-s">5</span></p>
                          <p><Checkbox>Preliminary Design</Checkbox> <span className="filt-s">4</span></p>
                          <p><Checkbox>Final Design</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Construction</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Monitoring</Checkbox> <span className="filt-s">1</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Study Status <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Checkbox>Approved</Checkbox> <span>1</span></p>
                          <p><Checkbox>Idle</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Initiated</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Hydrology</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Floodplain</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Alternatives</Checkbox> <span className="filt-s">1</span></p>
                          <p><Checkbox>Conceptual</Checkbox> <span className="filt-s">1</span></p>
                        </Col>
                      </Row>

                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>Start year <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>2015</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2017</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2019</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2021</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2023</Radio> <span className="filt-s">8</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Completed year <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>2015</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2017</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2019</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2021</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2023</Radio> <span className="filt-s">8</span></p>
                        </Col>
                      </Row>

                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>Capital Goal <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Shared-Use Paths and Recreation</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Include Permanent Water Quality BMP</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Stream Bank or Bed Stabilization</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Vegetation Enhancements</Radio> <span className="filt-s">8</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Study goal - Master plan & Fhad <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Stabilization</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Eliminate Roadway Overstopping</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Increased Conveyance</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Peak Flow Reduction</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Water Quality</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>Guide Development</Radio> <span className="filt-s">8</span></p>
                        </Col>
                      </Row>

                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>MHFD Dollars Allocated <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>0-5M</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>5M-10M</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>10M-15M</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>15M-20M</Radio> <span className="filt-s">8</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Work Plan Year <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>2015</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2017</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2019</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2020</Radio> <span className="filt-s">8</span></p>
                          <p><Radio>2023</Radio> <span className="filt-s">8</span></p>
                        </Col>
                      </Row>

                      <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt=""/></h5>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Problem Type</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>Watershed Manager / Service Area</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Jurisdiction</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>County</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Local Government Manager</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>Requested Start Year</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Stream Name</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>Creator</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>MHFD Dollars Requestede</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                      </Row>

                      <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01">Apply</Button>
                      </div>

                    </TabPane>

                    <TabPane tab="Components" key="3">
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

                      <Row className="filt-00" style={{marginTop: '10px'}}>
                        <Col span={12}>
                          <h5>Component Type <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>Grade Control Structure</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>Pipe Appurtenances</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>Special Item Point</Radio> <span className="filt-s">302</span></p>
                          <p><Radio>Special Item Linear</Radio> <span className="filt-s">109</span></p>
                          <p><Radio>Special Item Area</Radio> <span className="filt-s">109</span></p>
                          <p><Radio>Channel Improvements Linear</Radio> <span className="filt-s">109</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Component Status <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>Approved</Radio> <span className="filt-s">13%</span></p>
                          <p><Radio>Active</Radio> <span className="filt-s">13%</span></p>
                          <p><Radio>None</Radio> <span className="filt-s">13%</span></p>
                          <p><Radio>Completed</Radio> <span className="filt-s">13%</span></p>
                        </Col>
                      </Row>

                      <Row className="filt-00">
                        <Col span={12}>
                          <h5>Year Of Study <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>1972</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>1984</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>1996</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>2008</Radio> <span className="filt-s">208</span></p>
                          <p><Radio></Radio> <span className="filt-s">208</span></p>
                        </Col>
                        <Col span={12}>
                          <h5>Estimated Cost <img src="Icons/icon-19.svg" alt=""/></h5>
                          <p><Radio>0</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$2M</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$4M</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$6M</Radio> <span className="filt-s">208</span></p>
                          <p><Radio>$8M</Radio> <span className="filt-s">208</span></p>
                        </Col>
                      </Row>

                      <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt=""/></h5>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Jurisdiction</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>County</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>JMHFD Watershed / Manager</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                        <label>Solution Type</label>
                        <Select defaultValue="- Select -" style={{ width: '100%' }}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled" disabled>
                            Disabled
                          </Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        </Col>
                      </Row>
                      <Row className="filt-00" gutter={[24, 16]}>
                        <Col span={12}>
                          <label>Stream Name</label>
                          <Select defaultValue="- Select -" style={{ width: '100%' }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                              Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>
                        </Col>
                      </Row>

                      <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01">Apply</Button>
                      </div>
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
