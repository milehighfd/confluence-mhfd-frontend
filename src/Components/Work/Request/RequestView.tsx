import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Row, Col, Popover, Select, Tabs, Collapse, Timeline, AutoComplete, Icon, InputNumber, notification } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from "../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { COMPLETE_SCREEN, EMPTY_SCREEN, MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT } from "../../../constants/constants";
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

import CardStatService from './CardService';
import { compareColumns, defaultColumns, formatter, generateColumns, priceFormatter, priceParser } from "./RequestViewUtil";

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>);

const type = 'WORK_REQUEST';
let currentProject: any = {};

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

const openNotification = () => {
  notification.open({
    message: `Share URL Copied to clipboard`,
    duration: 5
  });
};

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
  const [showBoardStatus, setShowBoardStatus] = useState(false);
  const [diff, setDiff] = useState<any[]>([null, null, null, null, null]);
  const [reqManager, setReqManager] = useState<any[]>([null, null, null, null, null]);
  const [boardStatus, setBoardStatus] = useState(null);
  const [boardComment, setBoardComment] = useState(null);
  const [showModalProject, setShowModalProject] = useState(false);
  const history = useHistory();
  const {setBoardProjects, setZoomProject} = useProjectDispatch();
  const [columns, setColumns] = useState(defaultColumns);
  const [projectsAmounts, setProjectAmounts] = useState([]);
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
    let newCardPos = CardStatService.getPosition();
    if (fromColumnIdx === columnIdx) {
      let beforePos = -1;
      columns[columnIdx].projects.forEach((p: any, posBef: number) => {
        if (p.project_id == id) {
          beforePos = posBef;
        }
      })
      let projects: any[] = [];
      if (newCardPos === -1) {
        projects = [].concat(columns[columnIdx].projects);
        projects.splice(beforePos, 1);
        projects.push(project);
      } else {
        if (beforePos === newCardPos) {
          return;
        } else {
          columns[columnIdx].projects.forEach((p: any, pos: number) => {
            if (pos === newCardPos) {
              projects.push(project);
            }
            projects.push(p);
          })
          if (newCardPos === columns[columnIdx].projects.length) {
            projects.push(project);
          }
          projects.splice(newCardPos > beforePos ? beforePos : beforePos + 1, 1);
        }
      }
      let temporalColumns: any = columns.map((c, colIdx: number) => {
        return {
          ...c,
          projects: colIdx === fromColumnIdx ? projects: c.projects
        }
      });
      WsService.sendUpdate(temporalColumns);
      setColumns(temporalColumns);
      return;
    }
    if (destinyColumnHasProject || tabKey === 'Maintenance') {
      return;
    } else {
      let newObj = {
        ...project,
        [`position${columnIdx}`]: newCardPos === -1 ? columns[columnIdx].projects.length : newCardPos,
        [`req${columnIdx}`]: project[`req${fromColumnIdx}`],
        [`req${fromColumnIdx}`]: null,
        [`position${fromColumnIdx}`]: null,
      }

      let temporalColumns: any = columns.map((c, colIdx: number) => {
        return {
          ...c,
          projects: c.projects
          .filter((p: any) => {
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
      
      if (newCardPos === -1) {
        temporalColumns[columnIdx].projects.push(newObj);
      } else {
        let arr = [];
        for (var i = 0 ; i < temporalColumns[columnIdx].projects.length ; i++) {
          let p = temporalColumns[columnIdx].projects[i];
          if (newCardPos === i) {
            arr.push(newObj);
          }
          arr.push(p)
        }
        temporalColumns[columnIdx].projects = arr;
      }
      WsService.sendUpdate(temporalColumns);
      setColumns(temporalColumns);

    }
  }

  const generateCSV = () => {
    // console.log('generando');
    const date = new Date();
    const csvData = [['Exported on ' + date],
    ['Jurisdiction:', locality ],
    // [],
    ['Year:', year],
    // [],
    ['Project Type:' , tabKey],
    []
    ];
    const row: any = [];
    const row2: any = [];
    const dataByYear: any = {};
    let maxSize = 0;
    const years: any = [];
    for (let i = 1; i < columns.length; i++) {
      row.push(columns[i]['title']);
      years.push(columns[i]['title']);
      row.push('');
      row.push('');
      row.push('');
      row2.push('Project Name');
      row2.push('Jurisdiction');
      row2.push('Status');
      row2.push('Cost');
      dataByYear[i] = [];
      let project: any = null;
      maxSize = Math.max(maxSize, columns[i].projects.length);
      for (project of columns[i].projects) {
        if (!project.projectData) {
          continue;
        }
        dataByYear[i].push([project.projectData.projectname,
          project.projectData.jurisdiction,
          project.projectData.status,
          formatter.format(project['req' + i])]);
      }
    }
    csvData.push(row);
    csvData.push(row2);
    for (let i = 0; i < maxSize; i++) {
      let aux: any = [];
      for (let j = 1; j < columns.length; j++) {
        if (dataByYear[j].length > i) {
          aux = aux.concat(dataByYear[j][i]);
        } else {
          aux = aux.concat('', '', '', '');
        }
      }
      csvData.push(aux);
    }
//    console.log(csvData);
    let sum: any = ['Sum:'];
    let first = false;
    for (let i = 0; i < years.length; i++) {
      if (!first) {
        sum = sum.concat(['', '', formatter.format(sumTotal['req' + (i + 1)])]);
      } else {
        sum = sum.concat(['', '', '', formatter.format(sumTotal['req' + (i + 1)])]);
      }
      first = true;
    }
    csvData.push(sum);
    csvData.push([]);
    csvData.push([]);
    const yearRow = ['Year'];
    for (const currentYear of years) {
     //console.log(currentYear, "year",years)
      yearRow.push(currentYear);
    }
    csvData.push(yearRow);
    const totalCost = ['Total Cost'];
    for (let i = 0; i < years.length; i++) {
      totalCost.push(formatter.format(sumTotal['req' + (i + 1)]));
    }
    csvData.push(totalCost);
    let county: any;
    for (county of sumByCounty) {
      const auxArray = [county.county];
      for (let i = 0; i < years.length; i++) {
        auxArray.push(formatter.format(county['req' + (i + 1)]));
      }
      csvData.push(auxArray);
    }
    const targetCost: any = ['Target Cost'];
    for (const target of reqManager) {
      if (target == null) {
        targetCost.push(formatter.format(0));
      } else {
        targetCost.push(formatter.format(target));
      }
    }
    csvData.push(targetCost);
    const differental: any = ['Differential'];
    for (const value of diff) {
      differental.push(formatter.format(value));
    }
    csvData.push(differental);
    return csvData;
  }
  const onSelect = (value: any) => {
    setLocality(value);
  };

  const onClickNewProject = () => {
    setVisibleCreateProject(true);
  }

  useEffect(() => {
    let params = new URLSearchParams(history.location.search)
    let _year = params.get('year');
    let _locality = params.get('locality');
    let _tabKey = params.get('tabKey');
    if (_locality) {
      if (_year) {
        setYear(_year)
      }
      if (_locality) {
        setLocality(_locality)
      }
      if (_tabKey) {
        setTabKey(_tabKey)
      }
      console.log('params', year, locality, tabKey)
    } else {
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
    }
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
        pathname: '/work-request',
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
    console.log("Do I have it here Columns?", columns);
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

  return <>
    {  showModalProject &&
      <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={currentProject}
          showDefaultTab={true}
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
                <Tabs defaultActiveKey={tabKey}
                activeKey={tabKey}
                 onChange={(key) => setTabKey(key)} className="tabs-map">
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
                                      <TrelloLikeCard key={i} project={p} columnIdx={columnIdx} rowIdx={i} saveData={saveData} tabKey={tabKey} />
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
