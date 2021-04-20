import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Select, Tabs, Collapse, Timeline, AutoComplete, Icon, InputNumber, notification } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT } from "../../../constants/constants";
import WorkRequestMap from './../../WorkRequestMap/WorkRequestMap';
import '../../../index.scss';
import { getData, getToken, postData } from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { ModalProjectView } from '../../../Components/ProjectModal/ModalProjectView';
import TrelloLikeCard from "./TrelloLikeCard";
import { useProjectDispatch } from '../../../hook/projectHook';
import Analytics from "../Drawers/Analytics";
import { useHistory } from "react-router";
import { CSVLink } from 'react-csv';
import Status from "../Drawers/Status";
import ColorService from './ColorService';

import { compareArrays, compareColumns, defaultColumns, formatter, generateColumns, getCsv, getTotalsByProperty, onDropFn, priceFormatter, priceParser } from "./RequestViewUtil";
import { boardType } from "./RequestTypes";
import StatusPlan from "../Drawers/StatusPlan";
import StatusDistrict from "../Drawers/StatusDistrict";
import Filter from "../Drawers/Filter";
import TotalHeader from "./TotalHeader";
import CostTableBody from "./CostTableBody";

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;

let currentProject: any = {};

const openNotification = () => {
  notification.open({
    message: `Share URL Copied to clipboard`,
    duration: 5
  });
};
const tabKeys = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'Special'];

const RequestView = ({ type }: {
  type: boardType
}) => {
  const emptyStyle: React.CSSProperties = { transform: 'rotate(180deg)' };
  const [rotationStyle, setRotationStyle] = useState(emptyStyle );
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_RIGHT - 1);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_LEFT + 1);
  const [dataAutocomplete, setDataAutocomplete] = useState<string[]>([]);
  const years = [2021, 2020, 2019, 2018];
  const [locality, setLocality] = useState('');
  const [localityType, setLocalityType] = useState('');
  const [year, setYear] = useState<any>(years[0]);
  const [tabKey, setTabKey] = useState<any>(null);
  const [namespaceId, setNamespaceId] = useState<string>('');
  const [visibleCreateProject, setVisibleCreateProject] = useState(false);
  const [sumByCounty, setSumByCounty] = useState<any[]>([]);
  const [sumTotal, setSumTotal] = useState<any>({});
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showBoardStatus, setShowBoardStatus] = useState(false);
  const [diff, setDiff] = useState<any[]>([null, null, null, null, null]);
  const [reqManager, setReqManager] = useState<any[]>([null, null, null, null, null]);
  const [boardStatus, setBoardStatus] = useState<any>(null);
  const [boardComment, setBoardComment] = useState(null);
  const [showModalProject, setShowModalProject] = useState(false);
  const history = useHistory();
  const {setBoardProjects, setZoomProject} = useProjectDispatch();
  const [columns, setColumns] = useState(defaultColumns);
  const [projectsAmounts, setProjectAmounts] = useState([]);
  const [localities, setLocalities] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localityFilter, setLocalityFilter] = useState('');
  const [jurisdictionFilterList, setJurisdictionFilterList] = useState([]);
  const [csaFilterList, setCsaFilterList] = useState([]);
  const [jurisdictionSelected, setJurisdictionSelected] = useState<string[]>([]);
  const [csaSelected, setCsaSelected] = useState<string[]>([]);

  const onDragOver = (e: any) => {
    e.preventDefault();
  }

  const onDrop = (e: any, columnIdx: number) => {
    let txt = e.dataTransfer.getData("text");
    let cols = onDropFn(txt, columns, columnIdx, tabKey);
    if (cols) {
      WsService.sendUpdate(cols);
      setColumns(cols);
    }
  }

  const generateCSV = () => {
    let localityLabel = '';
    if (type === "WORK_REQUEST") {
      localityLabel = 'Jurisdiction';
    } else {
      let l = localities.find((p: any) => {
        return p.name === locality;
      })
      if (l) {
        if (l.type === 'COUNTY') {
          localityLabel = 'County';
        } else {
          localityLabel = 'Service Area';
        }
      }
    }
    return getCsv(columns, locality, year, tabKey, sumTotal, sumByCounty, reqManager, diff, localityLabel);
  }

  const onSelect = (value: any) => {
    setLocality(value);
    setLocalityFilter(value);
    let l = localities.find((p: any) => {
      return p.name === value;
    })
    if (l) {
      setLocalityType(l.type);
      if (type === 'WORK_PLAN') {
        let displayedTabKey: string[] = [];
        if (l.type === 'COUNTY') {
          displayedTabKey = ['Capital', 'Maintenance']
        } else if (l.type === 'SERVICE_AREA') {
          displayedTabKey = ['Study', 'Acquisition', 'Special'];
        }
        setTabKey(displayedTabKey[0]);
      } else {
        setTabKey(tabKeys[0]);
      }
    }
  };

  const onClickNewProject = () => {
    setVisibleCreateProject(true);
  }

  useEffect(() => {
    let params = new URLSearchParams(history.location.search)
    let _year = params.get('year');
    let _locality = params.get('locality');
    let _tabKey = params.get('tabKey');

    getData(`${SERVER.URL_BASE}/locality/${type}`, getToken())
    // getData(`${'http://localhost:3003'}/locality/${type}`, getToken())
      .then(
        (r: any) => {
          setLocalities(r.localities);
          setDataAutocomplete(r.localities.map((l: any) => l.name));
            if (_year) {
              setYear(_year)
            }
            if (_locality) {
              setLocality(_locality)
              setLocalityFilter(_locality)
            } else {
              if (r.localities.length > 0) {
                setLocality(r.localities[0].name)
                setLocalityFilter(r.localities[0].name)
                _locality = r.localities[0].name;
              }
            }
            let l = r.localities.find((p: any) => {
              return p.name === _locality;
            })
            if (l) {
              setLocalityType(l.type);
            }
            if (_tabKey) {
              setTabKey(_tabKey)
            } else {
              if (type === "WORK_REQUEST") {
                setTabKey(tabKeys[0])
              } else {
                if (l) {
                  let displayedTabKey: string[] = [];
                  if (l.type === 'COUNTY') {
                    displayedTabKey = ['Capital', 'Maintenance']
                  } else if (l.type === 'SERVICE_AREA') {
                    displayedTabKey = ['Study', 'Acquisition', 'Special'];
                  }
                  setTabKey(displayedTabKey[0]);
                }
              }
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
            setBoardStatus(board.status);
            setBoardComment(board.comment);
            setNamespaceId(board._id)
            setReqManager([
              board.reqmanager1, board.reqmanager2, board.reqmanager3, board.reqmanager4, board.reqmanager5
            ])
            let justProjects = projects.map((proj:any)=> {
              return proj.projectData?.cartodb_id;
            });
            let projectAmounts = projects.map((proj:any)=> {
              return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)), 
              cartodb_id: proj.projectData?.cartodb_id
              } 
            });
            console.log("WAHT", projectAmounts);
            setProjectAmounts(projectAmounts);
            if(projects.length>0){
              setBoardProjects(justProjects);
            } else {
              setBoardProjects(['-1']);
            }

            let cols = generateColumns(projects, year, tabKey);
            setColumns(cols);
            console.log('my cols ', cols);
          }
        },
        (e) => {
          console.log('e', e);
        }
      )
      let params = [
        ['year', year],
        ['locality', locality],
        ['tabKey', tabKey]
      ]
      history.push({
        pathname: type === "WORK_REQUEST" ? '/work-request' :  '/work-plan',
        search: `?${params.map(p => p.join('=')).join('&')}`
      })

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
      splitColumns(data);
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
    console.log("ON UPDATE COLUMN ? ", columns);
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
                if (board.status !== boardStatus) {
                  setBoardStatus(board.status);
                }
                if (board.comment !== boardComment) {
                  setBoardComment(board.comment);
                }
                if (board._id !== namespaceId) {
                  setNamespaceId(board._id)
                }
                let reqManagerEq = true;
                for (var i = 1 ; i <= 5; i++) {
                  if (board[`reqmanager${i}`] != reqManager[i-1]) {
                    reqManagerEq = false;
                  }
                }
                if (!reqManagerEq) {
                  setReqManager([
                    board.reqmanager1, board.reqmanager2, board.reqmanager3, board.reqmanager4, board.reqmanager5
                  ])
                }
              }
              if (projects) {
                let cols = generateColumns(projects, year, tabKey);
                let areEqual: boolean = compareColumns(columns, cols);
                if (!areEqual) {
                  setColumns(cols);
                  let justProjects = projects.map((proj:any)=> {
                    return proj.projectData.cartodb_id;
                  });
                  let projectAmounts = projects.map((proj:any)=> {
                    return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)), 
                    cartodb_id: proj.projectData?.cartodb_id
                    } 
                  });
                  console.log("WAHT2", projectAmounts);
                  setProjectAmounts(projectAmounts);
                  if(projects.length>0){
                    setBoardProjects(justProjects);
                  } else {
                    setBoardProjects(['-1']);
                  }
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
  }, [namespaceId, columns]);

  useEffect(() => {
    let [rows, totals] = getTotalsByProperty(columns, 'county');
    let [a, b] = getTotalsByProperty(columns, 'servicearea');
    let [c, d] = getTotalsByProperty(columns, 'jurisdiction');
    let uniqueServiceArea = a.map((p: any) => p.locality);
    let uniqueJurisdictions = c.map((p: any) => p.locality);
    let uniqueCounties = rows.map((p: any) => p.locality);
    setJurisdictionFilterList(uniqueJurisdictions);
    setJurisdictionSelected(uniqueJurisdictions);
    let l = localities.find((p: any) => {
      return p.name === locality;
    })
    if (l) {
      if (l.type === 'COUNTY') {
        setCsaFilterList(uniqueCounties);
        setCsaSelected(uniqueCounties)
      } else {
        setCsaFilterList(uniqueServiceArea);
        setCsaSelected(uniqueServiceArea)
      }
    }
    setSumTotal(totals);
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

  const splitColumns = (cols: any) => {
    let mySet:any = new Set();
    for(let c of cols){
      let projs = [...c.projects];
      for(let p of projs) {
        mySet.add(p);
      }
    }
    let newArray = [...mySet.values()];
    let projectAmounts:any = newArray.map((proj:any)=> {
      return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)), 
      cartodb_id: proj.projectData?.cartodb_id
      } 
    });
    setProjectAmounts(projectAmounts);
  }
  const openEdit = (project:any,event:any) => {
    // setShowModalProject(true);
    // setCurrentProject(project);
    console.log("REACHES OPEN EDIT", project );
    setShowModalEdit(project);
  }
  const setShowModalEdit = (project: any) => {
    let projectswithid: any = new Set();
    for(let col of columns) {
      let projectsFiltered = col.projects.filter((proj:any) => (proj.project_id == project.id.toString()));
      if(projectsFiltered.length>0){
        projectswithid.add(projectsFiltered[0]);
      }
    }
    console.log("PROJECT SHOW ", project.id, projectswithid);
    let newArray = [...projectswithid.values()];    
    if(newArray[0]){
      currentProject = {...newArray[0].projectData};
      setTimeout(()=>{
        setShowModalProject(true);
      },200);
    }
  }
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

  let displayedTabKey = tabKeys;
  if (type === "WORK_PLAN") {
    if (localityType === 'COUNTY') {
      displayedTabKey = ['Capital', 'Maintenance']
    } else if (localityType === 'SERVICE_AREA') {
      displayedTabKey = ['Study', 'Acquisition', 'Special'];
    }
  }

  let notIsFiltered = compareArrays(jurisdictionSelected, jurisdictionFilterList) && compareArrays(csaSelected, csaFilterList);

  return <>
    {  showModalProject &&
      <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={currentProject}
          showDefaultTab={true}
          locality={locality}
      />
    }
    {
      <Analytics
        visible={showAnalytics}
        setVisible={setShowAnalytics}
        showYearDropdown={tabKey !== 'Maintenance'}
        data={sumByCounty}
        initialYear={year}
      />
    }
    {
      showBoardStatus &&
      <Status
        boardId={namespaceId}
        visible={showBoardStatus}
        setVisible={setShowBoardStatus}
        status={boardStatus}
        comment={boardComment}
        type={type}
        />
    }
    {
      showFilters && <Filter
        visible={showFilters}
        setVisible={setShowFilters}
        data={sumByCounty}
        jurisdictionFilterList={jurisdictionFilterList}
        csaFilterList={csaFilterList}
        selJS={jurisdictionSelected}
        selCS={csaSelected}
        setJS={setJurisdictionSelected}
        setCS={setCsaSelected}
        l={localityType}
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
                <WorkRequestMap locality={locality} openEdit={openEdit} projectsAmounts={projectsAmounts}></WorkRequestMap>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: rightWidth }}>
              <div className="work-head">
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <div className="auto-complete-map">
                      <AutoComplete
                        className={'ant-select-1'}
                        dataSource={dataAutocomplete}
                        placeholder={localityFilter}
                        filterOption={(inputValue, option: any) => {
                          if (dataAutocomplete.includes(inputValue)) {
                            return true;
                          }
                          return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                        }}
                        onSelect={onSelect}
                        value={localityFilter}
                        onSearch={(input2: any) => {
                          setLocalityFilter(input2);
                          if (localities.map(r => r.name).indexOf(input2) !== -1) {
                            setLocality(input2)
                            let l = localities.find((p: any) => {
                              return p.name === locality;
                            })
                            if (l) {
                              setLocalityType(l.type);
                            }
                          }
                        }}
                      >
                        <Input className={boardStatus === 'Approved' ? 'approved' : 'not-approved'}
                          prefix={<i className="mdi mdi-circle"></i>}
                          suffix={<Icon type="down" className="certain-category-icon" />} />
                      </AutoComplete>
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
                    <Select
                      defaultValue={year}
                      value={`Year ${year}`}
                      onChange={setYear}
                      className={'ant-select-2'}>
                      {
                        years.map((y, i) => (
                          <Option key={i} value={y}>Year {y}</Option>
                        ))
                      }
                    </Select>

                     <ButtonGroup>
                     <Button className="btn-opacity" onClick={() => setShowBoardStatus(true) }>
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }} src="" />
                      </Button>
                      <Button className="btn-opacity" onClick={() => setShowAnalytics(true)}>
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }} src="" />
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup>
                    <Button className="btn-opacity">
                      <CSVLink filename={'' + new Date().getTime() + '.csv'} data={generateCSV()} className="btn-opacity">
                        <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-01.svg') no-repeat center" }} src="" />
                      </CSVLink>
                    </Button>
                    <Button className="btn-opacity" onClick={
                      () => {
                        navigator.clipboard.writeText(window.location.href);
                        openNotification();
                      }
                    }>
                      <img className="icon-bt" style={{ WebkitMask: "url('/Icons/ic_share1.svg') no-repeat center" }} src="" />
                    </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              <div className="work-body">
                { type === 'WORK_PLAN' &&
                  <Button className="btn-filter-d" onClick={() => setShowFilters(true)}>
                    <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }} src=""/>
                  </Button>
                }
                <Tabs defaultActiveKey={displayedTabKey[0]} 
                activeKey={tabKey}
                 onChange={(key) => setTabKey(key)} className="tabs-map">
                  {
                    displayedTabKey.map((tk: string) => (
                      <TabPane tab={tk} key={tk}>
                        <div className="work-table">
                          {
                            columns.map((column, columnIdx) => (
                              <div className="container-drag" key={columnIdx+Math.random()}>
                                <h3>{column.title}</h3>
                                <div className="col-wr droppable" onDragOver={onDragOver} onDrop={(e: any) => onDrop(e, columnIdx)}>
                                  {
                                    column.hasCreateOption &&
                                    <Button className="btn-transparent" onClick={onClickNewProject} >
                                      <img src="/Icons/icon-18.svg" alt=""/>
                                      Create Project
                                    </Button>
                                  }
                                  {
                                    column.projects
                                    .filter((p: any) => {
                                      return jurisdictionSelected.includes(p.projectData.jurisdiction) && (
                                        csaSelected.includes(p.projectData.county) ||
                                        csaSelected.includes(p.projectData.servicearea)
                                      );
                                    })
                                    .map((p: any, i: number, arr: any[]) => (
                                      <TrelloLikeCard key={i}
                                        project={p}
                                        columnIdx={columnIdx}
                                        rowIdx={i}
                                        saveData={saveData}
                                        tabKey={tabKey}
                                        editable={boardStatus !== 'Approved'}
                                        filtered={!notIsFiltered}
                                        locality={locality}
                                        borderColor={ColorService.getColor(type, p, arr)} />
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
                            <Panel header="" key="1" extra={
                                <TotalHeader
                                  columns={columns}
                                  jurisdictionSelected={jurisdictionSelected}
                                  csaSelected={csaSelected} />
                              }>
                              <div className="tab-body-project streams">
                                <Timeline>
                                  {
                                    sumByCounty.map((countySum) => (
                                      <Timeline.Item color="purple" key={Math.random()}>
                                        <CostTableBody countySum={countySum} isFiltered={!notIsFiltered}/>
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
                                      style={{opacity: !notIsFiltered ? 0.5 : 1 }}
                                      readOnly={!notIsFiltered}
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
                                <div key={i} style={{opacity: !notIsFiltered ? 0.5 : 1 }} >{d ? formatter.format(d) : ''}</div>
                              ))
                            }
                          </div>
                        </div>
                      </TabPane>
                    ))
                  }
                </Tabs>
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
