import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Dropdown, Menu, Collapse, Timeline, Drawer, AutoComplete, Icon, InputNumber } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { COMPLETE_SCREEN, EMPTY_SCREEN, JURISDICTION, MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT, MAP_RESIZABLE_TRANSITION } from "../../../constants/constants";
import WorkRequestMap from './../../WorkRequestMap/WorkRequestMap';
import '../../../index.scss';
import { getData, getToken, postData } from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { ModalProjectView } from '../../../Components/ProjectModal/ModalProjectView';
import TrelloLikeCard from "./TrelloLikeCard";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import Analytics from "../Drawers/Analytics";
const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

const type = 'WORK_REQUEST';

interface boardProject {
  projectData: any,
  project_id: number,
  req1: number, req2: number, req3: number, req4: number, req5: number,
  positon0: number, positon1: number, positon2: number, positon3: number, positon4: number, positon5: number
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const genExtra = (obj: any) => (
  <div className="tab-head-project">
    <div><label>Total Cost</label></div>
    <div>{obj.req1 ? formatter.format(obj.req1) : 0}</div>
    <div>{obj.req2 ? formatter.format(obj.req2) : 0}</div>
    <div>{obj.req3 ? formatter.format(obj.req3) : 0}</div>
    <div>{obj.req4 ? formatter.format(obj.req4) : 0}</div>
    <div>{obj.req5 ? formatter.format(obj.req5) : 0}</div>
  </div>
);

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

const generateColumns = (boardProjects: boardProject[], year: number, tabKey: string) => {
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
  let temporalColumns: any = [[], [], [], [], [], []]

  boardProjects.forEach((boardProject: boardProject | any) => {
    let isInAnyColumn = false;
    for(var i = 1 ; i <= 5; i++) {
      if (boardProject[`position${i}`] != null) {
        isInAnyColumn = true;
        temporalColumns[i].push(boardProject);
      }
    }
    if (!isInAnyColumn) {
      temporalColumns[0].push(boardProject);
    }
  });

  columns = columns.map((c, i) => {
    return {
      ...c,
      projects: temporalColumns[i]
    };
  })

  return columns;
}

const RequestView = () => {
  const emptyStyle: React.CSSProperties = { transform: 'rotate(180deg)' };
  const [rotationStyle, setRotationStyle] = useState(emptyStyle );
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_RIGHT - 1);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_LEFT + 1);
  const [dataAutocomplete, setDataAutocomplete] = useState<string[]>([]);
  const years = [2021, 2020, 2019, 2018];
  const tabKeys = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'Special'];
  const [locality, setLocality] = useState('');
  const [year, setYear] = useState<any>(years[0]);
  const [tabKey, setTabKey] = useState<string>(tabKeys[0]);
  const [namespaceId, setNamespaceId] = useState<string>('');
  const [visibleCreateProject, setVisibleCreateProject] = useState(false);
  const [sumByCounty, setSumByCounty] = useState<any[]>([]);
  const [sumTotal, setSumTotal] = useState<any>({});
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [diff, setDiff] = useState<any[]>([null, null, null, null, null]);
  const [reqManager, setReqManager] = useState<any[]>([null, null, null, null, null]);

  const {setBoardProjects, setZoomProject} = useProjectDispatch();
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
  const updateWidth = () => {
    if (leftWidth === MEDIUM_SCREEN_RIGHT - 1) {
      setLeftWidth(EMPTY_SCREEN);
      setRightWitdh(COMPLETE_SCREEN);
      setRotationStyle({});
    } else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRightWitdh(MEDIUM_SCREEN_LEFT + 1);
      setRotationStyle(emptyStyle);
    }
  }
  const onDrop = (e: any, columnIdx: number, cat: string) => {
    let txt = e.dataTransfer.getData("text");
    let parsedObject = JSON.parse(txt);
    let { id, fromColumnIdx } = parsedObject;

    let project: any;
    columns[fromColumnIdx].projects.forEach((p: any) => {
      if (p.project_id == id) {
        project = p;
      }
    })
    console.log('project', project)

    let destinyColumnHasProject = false;
    columns[columnIdx].projects.forEach((p: any) => {
      if (p.project_id == id) {
        destinyColumnHasProject = true;
      }
    })

    if (fromColumnIdx === columnIdx) {
      return;
    }

    if (destinyColumnHasProject) {
      return;
    } else {

      let newObj = {
        ...project,
        [`position${columnIdx}`]: columns[columnIdx].projects.length,
        [`req${columnIdx}`]: project[`req${fromColumnIdx}`],
        [`req${fromColumnIdx}`]: null,
        [`position${fromColumnIdx}`]: null,
      }
      let temporalColumns: any = columns.map((c) => {
        return {
          ...c,
          projects: c.projects
          .filter((p: any, colIdx: number) => {
            if (colIdx == fromColumnIdx && p.project_id == id) {
              return false;
            }
            return true;
          })
          .map((p: any) => {
            if (p.project_id == id) {
              return newObj;
            }
            return p;
          })
        }
      })
      temporalColumns[columnIdx].projects.push(newObj);

      console.log('temporalColumns', temporalColumns);

      WsService.sendUpdate(temporalColumns);
      setColumns(temporalColumns);

    }

    console.log('fromColumnIdx', fromColumnIdx, 'columnIdx', columnIdx)



    // const newColumns = columns.map((c: any, i: number) => {
    //   if (i === fromColumnIdx) {
    //     return {
    //       ...c,
    //       projects: c.projects.filter((p: any) => p.projectid != id)
    //     }
    //   }
    //   if (i === columnIdx) {
    //     return {
    //       ...c,
    //       projects: [...c.projects, project]
    //     }
    //   }
    //   return c;
    // })

  }
  const priceFormatter = (value: any) => {
    return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const priceParser = (value: any) => {
    value = value.replace(/\$\s?|(,*)/g, '');
    if (value === '0') {
      return value;
    }
    while (value.length > 0 && value[0] === '0') {
      value = value.substr(1);
    }
    return value
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
    setZoomProject(undefined);
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
            setReqManager([
              board.reqmanager1, board.reqmanager2, board.reqmanager3, board.reqmanager4, board.reqmanager5
            ])
            let justProjects = projects.map((proj:any)=> {
              return proj.projectData.cartodb_id;
            });
            if(projects.length>0){
              setBoardProjects(justProjects);
            } else {
              setBoardProjects(['-1']);
            }

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
    WsService.receiveReqmanager((data: any) => {
      console.log('receiveReqmanager', data);
      setReqManager(data);
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
            if(r){
              let { board, projects } = r;
              if (board) {
                setNamespaceId(board._id)
                setReqManager([
                  board.reqmanager1, board.reqmanager2, board.reqmanager3, board.reqmanager4, board.reqmanager5
                ])
                let cols = generateColumns(projects, year, tabKey);
                setColumns(cols);
                let justProjects = projects.map((proj:any)=> {
                  return proj.projectData.cartodb_id;
                });
                if(projects.length>0){
                  setBoardProjects(justProjects);
                } else {
                  setBoardProjects(['-1']);
                }
              }
            }
          },
          (e) => {
            console.log('e', e);
          }
        )
    }, 5000);
    return () => clearInterval(interval);
  }, [namespaceId]);

  useEffect(() => {

    let allProjects = columns.reduce((acc: any[], cv: any) => {
      return [...acc, ...cv.projects]
    }, [])
    let ht: any = {};
    allProjects = allProjects.filter((p: any) => {
      if (!ht[p.project_id]) {
        ht[p.project_id] = p;
        return true;
      }
      return false;
    })

    let countyMap: any = {}
    allProjects.forEach((p: any) => {
      let county = p.projectData.county;
      if (!countyMap[county]) {
        countyMap[county] = {
          req1: 0, req2: 0, req3: 0, req4: 0, req5: 0,
          cnt1: 0, cnt2: 0, cnt3: 0, cnt4: 0, cnt5: 0,
          projects: [],
        }
      }
      countyMap[county].projects.push(p);
      for(var i = 1; i <= 5 ; i++) {
        countyMap[county][`req${i}`] += p[`req${i}`];
        if (p[`req${i}`]) {
          countyMap[county][`cnt${i}`]++;
        }
      }
    })
    let rows: any = [];
    let totals: any = { req1: 0, req2: 0, req3: 0, req4: 0, req5: 0 };
    Object.keys(countyMap).forEach((county: string) => {
      let obj: any = {
        county
      }
      for(var i = 1; i <= 5 ; i++) {
        let amount = countyMap[county][`req${i}`];
        obj[`req${i}`]= amount;
        obj[`cnt${i}`]= countyMap[county][`cnt${i}`];
        totals[`req${i}`] += amount;
      }
      rows.push(obj);
    });
    setSumTotal(totals);
    // console.log('rows', rows)
    setSumByCounty(rows);

  }, [columns]);

  useEffect(() => {
    let diffTmp = []
    for(var i = 1; i <= 5 ; i++) {
      let d = reqManager[i-1] - sumTotal[`req${i}`];
      diffTmp.push(d);
    }
    setDiff(diffTmp);

  }, [reqManager]);

  const saveData = (data: { projectId: any, amounts: any[] }) => {
    let projectData: any;
    columns.forEach(c => {
      c.projects.forEach((p: any) => {
        if (p.project_id == data.projectId) {
          projectData = p;
        }
      })
    })
    let hasData = data.amounts.some(r => !!r);
    if (hasData) {
      let newObj: any = {
        project_id: data.projectId,
        position0: null,
        position1: null, position2: null, position3: null, position4: null, position5: null,
        req1: data.amounts[0], req2: data.amounts[1], req3: data.amounts[2], req4: data.amounts[3], req5: data.amounts[4],
        projectData: projectData.projectData
      }
      let temporalColumns = columns.map(r => r);
      let positions = data.amounts.map((req: number, index: number) => {
        let column = temporalColumns[index + 1];
        let projects = column.projects;
        let pos = null;
        if (req) {
          projects.forEach((p: any, projectIndex: number) => {
            if (p.project_id == data.projectId) {
              pos = projectIndex;
            }
          })
          if (pos === null) {
            pos = projects.length;
          }
        }
        return pos;
      })
      positions.forEach((pos: any, posIdx: number) => {
        newObj[`position${posIdx+1}`] = pos;
      })

      // Remove old references to project
      temporalColumns = temporalColumns.map((tc: any) => {
        return {
          ...tc,
          projects: tc.projects.filter((p: any) => {
            return p.project_id != data.projectId;
          })
        }
      })
      positions.forEach((pos: any, posIdx: number) => {
        if (pos != null) {
          let ref: any = temporalColumns[posIdx+1].projects;
          ref.push(newObj)
        }
      })
      WsService.sendUpdate(temporalColumns)
      setColumns(temporalColumns)

    } else {
      let temporalColumns = columns.map((col: any, colIndex) => {
        return {
          ...col,
          projects: col.projects.filter((p: any) => {
            return p.project_id != data.projectId
          })
        }
      })
      let newProjectData = {
        project_id: data.projectId,
        position0: 0,
        position1: null, position2: null, position3: null, position4: null, position5: null,
        req1: null, req2: null, req3: null, req4: null, req5: null,
        projectData: projectData.projectData
      };
      temporalColumns[0].projects.push(newProjectData);
      WsService.sendUpdate(temporalColumns)
      setColumns(temporalColumns);
    }
  }

  return <>
    {
      <Analytics
        visible={showAnalytics}
        setVisible={setShowAnalytics}
        showYearDropdown={tabKey !== 'Maintenance'}
        data={sumByCounty}
        initialYear={year}
      />
    }
    <div>
      {
        visibleCreateProject &&
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={"no data"}
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
            <Col xs={{ span: 24 }} lg={{ span: leftWidth }} style={{transition:'all 0.7s ease'}}>
                <WorkRequestMap locality={locality}></WorkRequestMap>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: rightWidth }}>
            <Button onClick={updateWidth} className="btn-coll" >
              <img src="/Icons/icon-34.svg" alt="" width="18px" style={rotationStyle} />
            </Button>
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
                      onChange={setYear}
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
                      <Button className="btn-opacity" onClick={() => setShowAnalytics(true)}>
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
                              <div className="container-drag" key={columnIdx+Math.random()}>
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
                                      <TrelloLikeCard key={i} project={p} columnIdx={columnIdx} saveData={saveData} />
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
                            <Panel header="" key="1" extra={genExtra(sumTotal)}>
                              <div className="tab-body-project streams">
                                <Timeline>
                                  {
                                    sumByCounty.map((countySum) => (
                                      <Timeline.Item color="purple" key={Math.random()}>
                                        <div className="tab-body-line">
                                          <div>
                                            <label>
                                              {countySum.county}
                                              <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" style={{marginLeft:'4px'}} />
                                              </Popover>
                                            </label>
                                          </div>
                                          <div>{countySum.req1 ? formatter.format(countySum.req1) : `$0`}</div>
                                          <div>{countySum.req2 ? formatter.format(countySum.req2) : `$0`}</div>
                                          <div>{countySum.req3 ? formatter.format(countySum.req3) : `$0`}</div>
                                          <div>{countySum.req4 ? formatter.format(countySum.req4) : `$0`}</div>
                                          <div>{countySum.req5 ? formatter.format(countySum.req5) : `$0`}</div>
                                        </div>
                                      </Timeline.Item>
                                    ))
                                  }
                                </Timeline>
                              </div>
                            </Panel>
                          </Collapse>
                          <div className="col-bg">
                            <div><h5>Target Cost</h5></div>
                            {
                              reqManager.map((val: any, index: number) => (
                                <div key={index}>
                                  <InputNumber placeholder="Enter target cost"
                                      formatter={priceFormatter}
                                      parser={priceParser}
                                      value={val} onChange={(e: any) => {
                                    let v = e;
                                    let nv = reqManager.map((vl: any, i: number) => {
                                      if (i === index) {
                                        return v;
                                      }
                                      return vl;
                                    })
                                    WsService.sendReqmanager(nv);
                                    setReqManager(nv);
                                  }} />
                                </div>
                              ))
                            }
                          </div>
                          <div className="col-bg">
                            <div><h5>Differential</h5></div>
                            {
                              diff.map((d: any, i) => (
                                <div key={i}>{d ? formatter.format(d) : ''}</div>
                              ))
                            }
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

export default RequestView;
