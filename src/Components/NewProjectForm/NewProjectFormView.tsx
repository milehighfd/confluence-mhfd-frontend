import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Breadcrumb, Tabs, Tag, Card, Input, Progress, Timeline, Upload, message, Table } from 'antd';

import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Dragger } = Upload;
const { TextArea } = Input;

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

const columns01 = [
  {
    title: 'Component',
    dataIndex: 'Component',
    key: 'Component',
    width: 170,
    ellipsis: true,
  },
  {
    title: 'Jurisdiction',
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Cost',
    dataIndex: 'Cost',
    key: 'Cost',
    width: 150,
    ellipsis: true,
  },

  {
    title: 'Study Name',
    dataIndex: 'StudyName',
    key: 'StudyName',
    width: 270,
    ellipsis: true,
  },
  {
    key: 'action',
    render: () => <a><img src="/Icons/icon-16.svg" alt=""/></a>,
    width: 60,
  },
];

const pagination = { position: 'none' };

const data01 = [
  {
    key: '1',
    Component: 'New Fork Creek',
    Jurisdiction: 'Westminster',
    Cost: <span>$1,570,000</span>,
    StudyName: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    Component: 'New Fork Creek',
    Jurisdiction: 'Westminster',
    Cost: <span>$1,570,000</span>,
    StudyName: 'New York No. 1 Lake Park',
  },
];

const columns02 = [
  {
    title: 'SUBTOTAL COST',
    dataIndex: 'Component',
    key: 'Component',
    width: 170,
    ellipsis: true,
  },
  {
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    width: 150,
    ellipsis: true,
  },
  {
    dataIndex: 'Cost',
    key: 'Cost',
    width: 150,
    ellipsis: true,
  },

  {
    title: 'Study Name',
    dataIndex: 'StudyName',
    key: 'StudyName',
    width: 270,
    ellipsis: true,
  },
];

const data02 = [
  {
    key: '1',
    Component: 'Additional Cost',
    Jurisdiction: <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Click me 
    </a>
    </Dropdown>,
    Cost: <span>$1,570,000</span>,
    StudyName: <TextArea rows={1} placeholder="Enter Description" />,
  },
  {
    key: '2',
    Component: 'Overhead Cost',
    Jurisdiction: <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Click me 
    </a>
    </Dropdown>,
    Cost: <span>$1,570,000</span>,
    StudyName: <TextArea rows={1} placeholder="Enter Description" />,
  },
];


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
                <div className="count">
                  <Row className="head-m">
                    <Col span={24}>
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>Application Center</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                  </Row>

                    <div className="head-m project-comp">
                      <div className="project-comp-btn">
                        <h5>SELECTED COMPONENTS</h5>
                        <button><img src="/Icons/icon-08.svg" alt=""/></button>
                        <span>|</span>
                        <button><img src="/Icons/icon-35.svg" alt=""/></button>
                      </div>
                        <span>TOTAL COST: $11,370,000</span>
                    </div>
                    <div className="head-m draw-section">
                            <button><img src="/Icons/icon-08.svg" alt=""/></button>
                            <h6>Click on the icon above and draw a polygon to select components</h6>
                    </div>

                    <div className="table-create-pro">
                      <Table columns={columns01} dataSource={data01} pagination={false} />
                    </div>
                    <div className="table-create-bottom">
                      <Table columns={columns02} dataSource={data02} pagination={false} />
                    </div>
                    <div className="gutter-example user-tab">
                        <h3>PROJECT INFORMATION</h3>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={12}><label htmlFor="">MHFD Funding Request</label>
                          <Input placeholder="Enter MHFD funding request" /></Col>
                          <Col className="gutter-row" span={12}><label htmlFor="">Local Dollars Contribution</label>
                          <Input placeholder="Enter local dollars" /></Col>
                        </Row>
                        <br></br>
                        <Row gutter={16}>
                        <Col className="gutter-row" span={12}><label htmlFor="">Requested Funding Year</label>
                            <Dropdown overlay={menu}>
                              <Button>
                              - Select - <img src="Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>                          
                          <Col className="gutter-row" span={12}><label htmlFor="">Goal</label>
                            <Dropdown overlay={menu}>
                              <Button>
                              - Select - <img src="Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>
                        </Row>
                    </div>
                    <div>
                    <h3>Upload Main Image</h3>
                      <Dragger>
                        <p className="ant-upload-drag-icon">
                        </p>
                        <img src="Icons/icon-17.svg" alt=""/>
                        <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
                      </Dragger>
                      <div className="tag-upload">
                      <Tag closable>
                        Little Dry Creek_image-1.jpg
                      </Tag>
                      </div>   
                    </div>
                    <div>
                    <h3>Upload Attachments</h3>
                      <Dragger>
                        <p className="ant-upload-drag-icon">
                        </p>
                        <img src="Icons/icon-17.svg" alt=""/>
                        <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
                      </Dragger>
                      <div className="tag-upload">
                      <Tag closable>
                        Little Dry Creek_image-1.jpg
                      </Tag>
                      </div>   
                    </div>            
                </div>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
