import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Dropdown, Menu, Collapse, Timeline, Drawer, AutoComplete, Icon } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { JURISDICTION } from "../../../constants/constants";
import '../../../index.scss';
import { postData } from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const genExtra = () => (
  <div className="tab-head-project">
    <div><label>Total Cost</label></div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
    <div>$1,000,000</div>
  </div>
);
const content = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <span><img src="/Icons/icon-04.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Edit Project</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-90.svg" alt="" width="8px" style={{opacity:'0.5'}}/> Edit Amount</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-13.svg" alt="" width="10px" style={{opacity:'0.5'}}/> Zoom to</span>
    </Menu.Item>
    <Menu.Item>
      <span><img src="/Icons/icon-16.svg" alt="" width="10px"/> Delete</span>
    </Menu.Item>
  </Menu>
);

const type = 'WORK_REQUEST';

interface projectType {project: any, column: number, positon: number};

const generateColumns = (projects: projectType[], year: number) => {
  let columns: any[] = [];
  for(var i = 0 ; i <= 5; i++) {
    columns.push({
      title: i === 0 ? 'Workspace' : year + i,
      hasCreateOption: i === 0,
      projects: []
    })
  }

  projects.forEach((project) => {
    columns[project.column].projects.push(project.project);
  })
  return columns;
}

export default () => {
  // JURISDICTION
  const dataAutocomplete = JURISDICTION;
  const years = [ 2021, 2020, 2019, 2018 ];
  const [locality, setLocality] = useState(dataAutocomplete[0]);
  const [year, setYear] = useState<any>(years[0]);
  const [namespaceId, setNamespaceId] = useState<string>('');

  const [columns, setColumns] = useState([
    {
      title: 'Workspace',
      hasCreateOption: true,
      projects: [],
    },
    {
      title: '2021',
      projects: [],
    },
    {
      title: '2022',
      projects: [],
    },
    {
      title: '2023',
      projects: [],
    },
    {
      title: '2024',
      projects: [],
    },
    {
      title: '2025',
      projects: [],
    }
  ])

  useEffect(() => {
    if (!namespaceId) {
      return;
    }
    WsService.connect(namespaceId, (socket: any) => {
      console.log('connected', socket.id);
    });
    WsService.receiveUpdate((data: any) => {
      console.log('receiveUpdate', data);
      setColumns(data);
    })
    return () => {
      WsService.disconnect();
    }
  }, [namespaceId])

  useEffect(() => {
    let data = {
      type,
      year: `${year}`,
      locality
    }
    postData(`${SERVER.URL_BASE}/board/`, data)
      .then(
        (r: any) => {
          let { board, projects } = r;
          if (board) {
            setNamespaceId(board._id)
            let cols = generateColumns(projects, year);
            setColumns(cols);
          }
        }, 
        (e) => {
          console.log('e', e);
        }
      )
  }, [year, locality]);

  const generateCard = (project: any) => {
    const {
      projectid,
      projectname,
      price,
      jurisdiction,
      state
    } = project;
    return (
      <div className="card-wr" style={{borderLeft: '3px solid #9faeb1'}} draggable onDragStart={e => onDragStart(e, projectid)}>
        <h4>{projectname}</h4>
        <h6>{price}</h6>
        <label className="purple">{jurisdiction}</label>
        <label className="yellow">{state}</label>
        <Popover placement="bottom" overlayClassName="work-popover" content={content} trigger="click">
            <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
        </Popover>
      </div>
    )
  }
  
  const onDragStart = (e: any, id: any) => {
    e.dataTransfer.setData('id', id);
  }

  const onDragOver = (e: any) => {
    e.preventDefault();
  }

  const onDrop = (e: any, columnIdx: number, cat: string) => {
    let id = e.dataTransfer.getData("id");
    let fromColumnIdx = -1;
    let project: any;
    columns.map(r => r.projects).forEach((ps: any, i) => {
      ps.forEach((p: any) => {
        if (p.projectid == id) {
          fromColumnIdx = i;
          project = p;
        }
      })
    })

    if (fromColumnIdx === columnIdx) {
      return;
    }

    const newColumns = columns.map((c: any, i: number) => {
      if (i === fromColumnIdx) {
        return {
          ...c,
          projects: c.projects.filter((p: any) => p.projectid != id)
        }
      }
      if (i === columnIdx) {
        return {
          ...c,
          projects: [...c.projects, project]
        }
      }
      return c;
    })
    WsService.sendUpdate(newColumns);
    setColumns(newColumns);
  }

  const onSelect = (value: any) => {
    setLocality(value);
  };

  useEffect(() => {
    console.log('year, locality', year, locality)
  }, [year, locality])

  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <div className="map">
               {/* here goes the map*/}
              </div>

              <Button className="btn-coll" >
                  <img src="/Icons/icon-34.svg" alt="" width="18px" style={{transform: 'rotate(180deg)'}}/>
              </Button>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div className="work-head">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <div className="auto-complete-map">
                      {/* <h2><i className="mdi mdi-circle"></i></h2> */}
                      <AutoComplete
                        className={'ant-select-1'}
                        dataSource={dataAutocomplete}
                        placeholder={locality}
                        filterOption={(inputValue, option: any) => {
                          if (dataAutocomplete.includes(inputValue)) {
                            return true;
                          }
                          return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                        }}
                        onSelect={onSelect}
                        value={locality}
                        onSearch={(input2: any) => {
                          setLocality(input2)
                        }}
                        >
                        <Input suffix={<Icon type="down" className="certain-category-icon" />} />
                      </AutoComplete>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{textAlign:'right'}}>
                    <Select
                      defaultValue={year}
                      onChange={(y: any) => setYear(y)}
                      className={'ant-select-2'}>
                      {
                        years.map((y, i) => (
                          <Option key={i} value={y}>Year {y}</Option>
                        ))
                      }
                    </Select>

                    <ButtonGroup>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }} src=""/>
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" }} src=""/>
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }} src=""/>
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-03.svg') no-repeat center" }} src=""/>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              <div className="work-body">
                <Tabs defaultActiveKey="1" className="tabs-map">
                   <TabPane tab="Capital" key="1">
                     <div className="work-table">
                      {
                        columns.map((column, columnIdx) => (
                          <div className="container-drag">
                            <h3>{column.title}</h3>
                            <div className="col-wr droppable" onDragOver={onDragOver} onDrop={(e: any) => onDrop(e, columnIdx, 'complete')}>
                                { column.hasCreateOption && <Button className="btn-transparent"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button> }
                                {
                                  column.projects.map((p) => (
                                    generateCard(p)
                                  ))
                                }
                            </div>
                          </div>
                        ))
                      }
                    </div>

                    <div className="cost-wr">
                      <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition="left"
                      >
                        <Panel header="" key="1" extra={genExtra()}>
                          <div className="tab-body-project streams">
                              <Timeline>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Boulder <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Louisville <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Superior <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                              </Timeline>
                          </div>
                        </Panel>
                      </Collapse>
                      <div className="col-bg">
                        <div><h5>Target Cost</h5></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                      </div>
                      <div className="col-bg">
                        <div><h5>Differential</h5></div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                      </div>
                    </div>
                   </TabPane>

                   <TabPane tab="Study" key="2">
                   Content of Tab Pane 2
                   </TabPane>

                   <TabPane tab="Maintenance" key="3">
                     <div className="work-table">
                      <div>
                        <h3>Workspace</h3>
                        <div className="col-wr">
                          <Button className="btn-transparent"><img src="/Icons/icon-18.svg" alt=""/> Create Project</Button>
                          <div className="card-wr" style={{borderLeft: '3px solid #9faeb1'}}>
                            <h4>West Tollgate Creek GSB Drops </h4>
                            <h6>$410,000</h6>
                            <label className="purple">Aurora</label>
                            <label className="yellow">Draft</label>
                            <Popover placement="bottomRight" overlayClassName="work-popover" content={content} trigger="click">
                                <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                            </Popover>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3>Debris Management</h3>
                        <div className="col-wr">
                        <div className="card-wr" style={{borderLeft: '3px solid #9faeb1 '}}>
                          <h4>West Tollgate Creek GSB Drops </h4>
                          <h6>$410,000</h6>
                          <label className="purple">Aurora</label>
                          <label className="yellow">Draft</label>
                          <Popover placement="bottomRight" overlayClassName="work-popover" content={content} trigger="click">
                              <img src="/Icons/icon-60.svg" alt="" className="menu-wr" />
                          </Popover>
                        </div>
                        </div>
                      </div>

                      <div>
                        <h3>Vegetation Management</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                      <h3>Sediment Removal</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>Minor Repairs</h3>
                        <div className="col-wr">
                        </div>
                      </div>

                      <div>
                        <h3>-</h3>
                        <div className="col-wr">
                        </div>
                      </div>
                    </div>

                    <div className="cost-wr">
                      <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition="left"
                      >
                        <Panel header="" key="1" extra={genExtra()}>
                          <div className="tab-body-project streams">
                              <Timeline>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Boulder</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Louisville</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="purple">
                                  <div className="tab-body-line">
                                    <div><label>Superior</label></div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                    <div>$170,000</div>
                                  </div>
                                </Timeline.Item>
                              </Timeline>
                          </div>
                        </Panel>
                      </Collapse>
                      <div className="col-bg">
                        <div><h5>Target Cost</h5></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                        <div><Input placeholder="Enter target cost" /></div>
                      </div>
                      <div className="col-bg">
                        <div><h5>Differential</h5></div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                        <div>$241,800</div>
                      </div>
                    </div>
                   </TabPane>
                   <TabPane tab="Acquisition" key="4">
                     Content of Tab Pane 4
                   </TabPane>
                   <TabPane tab="Special" key="5">
                     Content of Tab Pane 5
                   </TabPane>
                </Tabs>
              </div>

              <div className="work-footer">
                <Button className="btn-borde">Save Work Request</Button>
                <Button className="btn-purple">Submit to County Manager</Button>
              </div>

            <Button className="btn-scroll"><RightOutlined /></Button>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
