import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Dropdown, Menu, Collapse, Timeline, Drawer, AutoComplete, Icon } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { JURISDICTION } from "../../../constants/constants";
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';
import '../../../index.scss';
import { getData, getToken, postData } from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { ModalProjectView } from '../../../Components/ProjectModal/ModalProjectView';
import TrelloLikeCard from "./TrelloLikeCard";

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

const type = 'WORK_REQUEST';

interface projectType { project: any, column: number, positon: number };

const defaultColumns: any[] = [
  {
    title: 'Workspace',
    hasCreateOption: true,
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  },
  {
    title: '',
    projects: [],
  }
]

const MaintenanceTypes = ['Debris Management', 'Vegetation Management', 'Sediment Removal', 'Minor Repairs', 'Restoration'];

const generateColumns = (projects: projectType[], year: number, tabKey: string) => {
  let columns: any[] = defaultColumns.map((dc: any, index: number) => {
    let title = dc.title;
    if (index > 0) {
      if (tabKey === 'Maintenance') {
        title = MaintenanceTypes[index - 1];
      } else {
        title = year + index - 1;
      }
    }
    return {
      ...dc,
      title,
      projects: []
    }
  });

  projects.forEach((project) => {
    if (project.project) {
      columns[project.column].projects.push(project.project);
    }
  })
  return columns;
}

export default () => {
  const [dataAutocomplete, setDataAutocomplete] = useState<string[]>([]);
  const years = [2021, 2020, 2019, 2018];
  const tabKeys = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'Special'];
  const [locality, setLocality] = useState('');
  const [year, setYear] = useState<any>(years[0]);
  const [tabKey, setTabKey] = useState<string>(tabKeys[0]);
  const [namespaceId, setNamespaceId] = useState<string>('');
  const [dataProblem, setDataProblem] = useState({
    problemid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
    cartoid: ''
  });
  const [visibleCreateProject, setVisibleCreateProject ] = useState(false);

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

  const onClickNewProject = () => {
    setVisibleCreateProject(true);
  }

  useEffect(() => {
    getData(`${SERVER.URL_BASE}/locality/`, getToken())
    // getData(`${'http://localhost:3003'}/locality/`, getToken())
      .then(
        (r: any) => {
          setDataAutocomplete(r.localities.map((l: any) => l.name));
          if (r.localities.length > 0) {
            setLocality(r.localities[0].name)
          }
        },
        (e) => {
          console.log('e', e);
        }
      )
  }, []);

  useEffect(() => {
    if (!locality) {
      return;
    }
    let data = {
      type,
      year: `${year}`,
      locality,
      projecttype: tabKey
    }
    setColumns(defaultColumns);
    postData(`${SERVER.URL_BASE}/board/`, data)
    // postData(`${'http://localhost:3003'}/board/`, data)
      .then(
        (r: any) => {
          let { board, projects } = r;
          if (board) {
            setNamespaceId(board._id)
            let cols = generateColumns(projects, year, tabKey);
            setColumns(cols);
          }
        },
        (e) => {
          console.log('e', e);
        }
      )
  }, [year, locality, tabKey]);

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
    const interval = setInterval(() => {
      let data = {
        type,
        year: `${year}`,
        locality,
        projecttype: tabKey
      }
      postData(`${SERVER.URL_BASE}/board/`, data)
      // postData(`${'http://localhost:3003'}/board/`, data)
        .then(
          (r: any) => {
            let { board, projects } = r;
            if (board) {
              setNamespaceId(board._id)
              let cols = generateColumns(projects, year, tabKey);
              setColumns(cols);
            }
          },
          (e) => {
            console.log('e', e);
          }
        )
    }, 5000);
    return () => clearInterval(interval);
  }, [namespaceId]);

  return <>
    <div>
      {
        visibleCreateProject &&
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={dataProblem}
          defaultTab={tabKey}
          locality={locality}
        />
      }
    </div>
    <Layout>
      <Navbar />
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <div className="map">
                <CreateProjectMap type="CAPITAL" locality={locality}></CreateProjectMap>
              </div>

              <Button className="btn-coll" >
                <img src="/Icons/icon-34.svg" alt="" width="18px" style={{ transform: 'rotate(180deg)' }} />
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
                  <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
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
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }} src="" />
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" }} src="" />
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }} src="" />
                      </Button>
                      <Button className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-03.svg') no-repeat center" }} src="" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              <div className="work-body">
                <Tabs defaultActiveKey={tabKey}  onChange={(key) => setTabKey(key)} className="tabs-map">
                  {
                    tabKeys.map((tk: string) => (
                      <TabPane tab={tk} key={tk}>
                        <div className="work-table">
                          {
                            columns.map((column, columnIdx) => (
                              <div className="container-drag">
                                <h3>{column.title}</h3>
                                <div className="col-wr droppable" onDragOver={onDragOver} onDrop={(e: any) => onDrop(e, columnIdx, 'complete')}>
                                  {
                                    column.hasCreateOption &&
                                    <Button className="btn-transparent" onClick={onClickNewProject} >
                                      <img src="/Icons/icon-18.svg" alt=""/>
                                      Create Project
                                    </Button>
                                  }
                                  {
                                    column.projects.map((p: any, i: number) => (
                                      <TrelloLikeCard key={i} project={p} />
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
                    ))
                  }
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
