import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, Input, Row, Col, Select, Tabs, Collapse, Timeline, AutoComplete, InputNumber, notification, Popover } from 'antd';
import { DownOutlined, DownSquareOutlined, RightOutlined, UpOutlined, UpSquareOutlined } from '@ant-design/icons';
import Navbar from "../../Shared/Navbar/NavbarContainer";
import SidebarView from"../../Shared/Sidebar/SidebarView";
import WsService from "./WsService";
import { MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT, GOVERNMENT_STAFF } from "../../../constants/constants";
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
import ProjectEditService from './ProjectEditService';
import store from '../../../store';
import { compareArrays, compareColumns, csvFileName, defaultColumns, filterByJurisdictionAndCsaSelected, formatter, generateColumns, getCsv, getTotalsByProperty, onDropFn, priceFormatter, priceParser } from "./RequestViewUtil";
import { boardType } from "./RequestTypes";
import Filter from "../Drawers/Filter";
import TotalHeader from "./TotalHeader";
import CostTableBody from "./CostTableBody";
import { useAttachmentDispatch } from "../../../hook/attachmentHook";
import { AlertStatus } from "./AlertStatus";
import LoadingViewOverall from '../../Loading-overall/LoadingViewOverall';
import ConfigurationService from '../../../services/ConfigurationService';


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
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const RequestView = ({ type, isFirstRendering }: {
  type: boardType,
  isFirstRendering: boolean
}) => {
  const emptyStyle: React.CSSProperties = {};
  const [openCollaps, setOpenCollaps] = useState(false);
  const [rotationStyle, setRotationStyle] = useState<any>(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_RIGHT - 1);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_LEFT + 1);
  const [dataAutocomplete, setDataAutocomplete] = useState<string[]>([]);
  const [years, setYears] = useState([2022, 2021, 2020, 2019, 2018]);
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
  const [boardSubstatus, setBoardSubstatus] = useState<any>(null);
  const [boardComment, setBoardComment] = useState(null);
  const [showModalProject, setShowModalProject] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const history = useHistory();
  const {setBoardProjects, setZoomProject, setStreamsIds, setComponentsFromMap, setStreamIntersected, setComponentIntersected} = useProjectDispatch();
  const [columns, setColumns] = useState(defaultColumns);
  const [projectsAmounts, setProjectAmounts] = useState([]);
  const [localities, setLocalities] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localityFilter, setLocalityFilter] = useState('');
  const [jurisdictionFilterList, setJurisdictionFilterList] = useState([]);
  const [csaFilterList, setCsaFilterList] = useState([]);
  const [jurisdictionSelected, setJurisdictionSelected] = useState<string[]>([]);
  const [csaSelected, setCsaSelected] = useState<string[]>([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const {clear} = useAttachmentDispatch();
  const wrtRef = useRef(null);
  const ref = useRef<any>(null);
  const [problemid, setProblemId ] = useState<any>(undefined);
  const [currentDataForBoard, setCurrentDataForBoard] = useState({});
  const user = store.getState().profile.userInformation;
  const updateWidth = () => {
    if (leftWidth === (MEDIUM_SCREEN_RIGHT - 1)) {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRightWitdh(MEDIUM_SCREEN_RIGHT);
      setRotationStyle({transform: 'rotate(180deg)', marginRight:'-4px', right:'4px', position:'relative'});
    } else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRightWitdh(MEDIUM_SCREEN_LEFT + 1);
      setRotationStyle(emptyStyle);
    }
    setTimeout( () => {
      setChanges(Math.random())
    }, 1000)
  }
 
  const resetOnClose = () => {
    setStreamIntersected([]);
    setComponentIntersected([]);
    setComponentsFromMap([]);
  }
  useEffect(()=>{
    if(!showModalProject){
     resetOnClose();
    }
  },[showModalProject]);
  useEffect(()=>{
    if(!showCreateProject){
      resetOnClose();
    }
  },[showCreateProject]);
  const onDragOver = (e: any) => {
    e.preventDefault();
  }

  const deleteProject = (pid: string) => {
    let array: any[] = [];
    let newcols = columns.map((col: any) => {
      return {
        ...col,
        projects: col.projects.filter((p: any) => {
          if (!array.map((x: any) => x.project_id).includes(p.project_id) && p.project_id != pid) {
            array.push(p);
          }
          return p.project_id != pid;
        })
      }
    });
    let justProjects = array.map((proj:any)=> {
      return proj.projectData?.cartodb_id;
    });
    let idsProjects = array.map((proj:any)=> {
      return proj.projectData?.projectid;
    });
    if(array.length>0){
      setBoardProjects({cartoids:justProjects, ids: idsProjects});
    } else {
      setBoardProjects(['-8886']);
    }
    setColumns(newcols);
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

  const [isOnSelected,setIsOnSelected]= useState(false);
  const onSelect = (value: any) => {
    setShowAnalytics(false);
    setShowBoardStatus(false);
    setLocality(value);
    setIsOnSelected(true);
    setLocalityFilter(value);
    let l = localities.find((p: any) => {
      return p.name === value;
    })
    if (l) {
      setLocalityType(l.type);
      if (type === 'WORK_PLAN') {
        let displayedTabKey: string[] = [];
        if (year < 2022) {
          if (l.type === 'COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance']
          } else if (l.type === 'SERVICE_AREA') {
            displayedTabKey = ['Study', 'Acquisition', 'Special'];
          }
        } else {
          if (l.type === 'COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance', 'Acquisition', 'Special']
          } else if (l.type === 'SERVICE_AREA') {
            displayedTabKey = ['Study'];
          }
        }
        if (l.name === 'MHFD District Work Plan') {
          displayedTabKey = tabKeys;
        }
        setTabKey(displayedTabKey[0]);
      } else {
        setTabKey(tabKeys[0]);
      }
    }
  };
  const onClickNewProject = () => {
    if (locality === 'MHFD District Work Plan') return;
    clear();
    setVisibleCreateProject(true);
    setStreamsIds([]);
    setComponentsFromMap([]);
  }
  const [changes, setChanges] = useState(0);
  useEffect(()=>{
    setChanges(Math.random());
  },[locality, tabKey,year]);

  useEffect(() => {
    const initLoading = async () => {
    let config;
    try {
      config = await ConfigurationService.getConfiguration('BOARD_YEAR');
    } catch (e) {
      console.log(e);
    }
    let boardYearLimit = +config.value;
    let array = [];
    for (var i = 0 ; i < 5 ; i++) {
      array.push(boardYearLimit - i);
    }
    setYears(array);
    let params = new URLSearchParams(history.location.search)
    let _year = params.get('year');
    let _locality = params.get('locality');
    let _tabKey = params.get('tabKey');
    getData(SERVER.ME, getToken()).then( userResponse => {
      if( _locality != userResponse.organization && userResponse.designation == GOVERNMENT_STAFF) {
        _locality = userResponse.organization;
      }
      getData(`${SERVER.URL_BASE}/locality/${type}`, getToken())
        .then(
          (r: any) => {
            setLocalities(r.localities);
            let localitiesData = r.localities.map((l: any) => l.name);
            localitiesData.push(localitiesData.splice(localitiesData.indexOf('MHFD District Work Plan'), 1)[0]);
            setDataAutocomplete(localitiesData);
              if (_year) {
                setYear(_year)
              } else {
                setYear(boardYearLimit);
              }
              if (_locality) {
                setLocality(_locality)
                setIsOnSelected(false);
                setLocalityFilter(_locality)
              } else {
                if (r.localities.length > 0) {
                  setLocality(r.localities[0].name);
                  setIsOnSelected(false);
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
                    if (l.name === 'MHFD District Work Plan') {
                      displayedTabKey = tabKeys;
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
    })
    }
    initLoading();
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
    setCurrentDataForBoard(data);
    setColumns(defaultColumns);
    postData(`${SERVER.URL_BASE}/board/`, data)
      .then(
        (r: any) => {
          if (!r) return;
          let { board, projects } = r;
          ProjectEditService.setProjects(projects);
          if (board) {
            setBoardStatus(board.status);
            setBoardSubstatus(board.substatus);
            setBoardComment(board.comment);
            setNamespaceId(board._id)
            setReqManager([
              board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
            ])
            let justProjects = projects.map((proj:any)=> {
              return proj.projectData?.cartodb_id;
            });
            let idsProjects = projects.map((proj:any)=> {
              return proj.projectData?.projectid;
            });
            let projectAmounts = projects.map((proj:any)=> {
              return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
              cartodb_id: proj.projectData?.cartodb_id
              }
            });
            setProjectAmounts(projectAmounts);
            if(projects.length>0){
              setBoardProjects({cartoids:justProjects, ids: idsProjects});
            } else {
              setBoardProjects(['-8885']);
            }

            let cols = generateColumns(projects, year, tabKey);
            setColumns(cols);
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
  const [loadingTransp, setLoadingT] = useState(false);
  useEffect(()=>{
    setLoadingT(true);
    setTimeout(()=>{
      setLoadingT(false);
    },5000);
  },[tabKey]);
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
    const interval = setInterval(() => {
      let data = {
        type,
        year: `${year}`,
        locality,
        projecttype: tabKey
      }
      postData(`${SERVER.URL_BASE}/board/`, data)
        .then(
          (r: any) => {
            if (!r) return;
            if(r){
              let { board, projects } = r;
              ProjectEditService.setProjects(projects);
              if (board) {
                if (board.status !== boardStatus) {
                  setBoardStatus(board.status);
                }
                if (board.substatus !== boardSubstatus) {
                  setBoardSubstatus(board.substatus);
                }
                if (board.comment !== boardComment) {
                  setBoardComment(board.comment);
                }
                if (board._id !== namespaceId) {
                  setNamespaceId(board._id)
                }
                let reqManagerEq = true;
                for (var i = 1 ; i <= 5; i++) {
                  if (board[`targetcost${i}`] != reqManager[i-1]) {
                    reqManagerEq = false;
                  }
                }
                if (!reqManagerEq) {
                  setReqManager([
                    board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
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
                  let idsProjects = projects.map((proj:any)=> {
                    return proj.projectData?.projectid;
                  });
                  let projectAmounts = projects.map((proj:any)=> {
                    return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
                    cartodb_id: proj.projectData?.cartodb_id
                    }
                  });
                  setProjectAmounts(projectAmounts);
                  if(projects.length>0){
                    setBoardProjects({cartoids:justProjects, ids: idsProjects});
                  } else {
                    setBoardProjects(['-8887']);
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
    let [a] = getTotalsByProperty(columns, 'servicearea');
    let [c] = getTotalsByProperty(columns, 'jurisdiction');
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
    if (type === 'WORK_REQUEST') {
      if (['Capital', 'Maintenance'].includes(tabKey)) {
        setSumByCounty(rows);
      } else {
        setSumByCounty(a);
      }
    } else {
      setSumByCounty(c);
    }
  }, [columns, tabKey]);

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
    setShowModalEdit(project);
  }
  const setShowModalEdit = (project: any) => {
    let projectswithid: any = new Set();
    let projectsFiltered = ProjectEditService.getProjects().filter((proj:any) => (proj.project_id == project.id.toString()));
    if(projectsFiltered.length>0){
      projectswithid.add(projectsFiltered[0]);
    }
    let newArray = [...projectswithid.values()];
    if(newArray[0]){
      currentProject = {...newArray[0].projectData};
      setTimeout(()=>{
        setShowModalProject(true);
      },200);
    }
  }
  const saveData = ({ projectId, amounts, years }:{ projectId: any, amounts: any[], years: any[] }) => {
    let projectData: any;
    columns.forEach(c => {
      c.projects.forEach((p: any) => {
        if (p.project_id == projectId) {
          projectData = p;
        }
      })
    })
    let hasData = amounts.some(r => !!r) || years.some(r => !!r);
    if (hasData) {
      let newObj: any = {
        origin: projectData.origin,
        project_id: projectId,
        position0: null,
        position1: null, position2: null, position3: null, position4: null, position5: null,
        req1: amounts[0], req2: amounts[1], req3: amounts[2], req4: amounts[3], req5: amounts[4],
        year1: years[0], year2: years[1],
        projectData: projectData.projectData
      }
      let temporalColumns = columns.map(r => r);
      let positions = amounts.map((req: number, index: number) => {
        let column = temporalColumns[index + 1];
        let projects = column.projects;
        let pos = null;
        if (req) {
          projects.forEach((p: any, projectIndex: number) => {
            if (p.project_id == projectId) {
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

      temporalColumns = temporalColumns.map((tc: any) => {
        return {
          ...tc,
          projects: tc.projects.filter((p: any) => {
            return p.project_id != projectId;
          })
        }
      })
      positions.forEach((pos: any, posIdx: number) => {
        if (pos != null) {
          let ref: any = temporalColumns[posIdx+1].projects;
          ref.splice(pos, 0, newObj);
        }
      })
      WsService.sendUpdate(temporalColumns)
      setColumns(temporalColumns)

    } else {
      let temporalColumns = columns.map((col: any, colIndex) => {
        return {
          ...col,
          projects: col.projects.filter((p: any) => {
            return p.project_id != projectId
          })
        }
      })
      let newProjectData = {
        origin: projectData.origin,
        project_id: projectId,
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

  const scrollToRight = () => {
    let element: any = wrtRef.current;
    let parent = element.parentElement;
    parent.scroll(parent.scrollWidth, 0);
  }

  let displayedTabKey = tabKeys;
  if (type === "WORK_PLAN") {
    if (localityType === 'COUNTY') {
      displayedTabKey = ['Capital', 'Maintenance']
    } else if (localityType === 'SERVICE_AREA') {
      displayedTabKey = ['Study', 'Acquisition', 'Special'];
    }
    if (locality === 'MHFD District Work Plan') {
      displayedTabKey = tabKeys;
    }
  }

  let notIsFiltered = compareArrays(jurisdictionSelected, jurisdictionFilterList) && compareArrays(csaSelected, csaFilterList);
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item
    };
  };
  return <>
    {  showModalProject &&
      <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={currentProject}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          currentData={currentDataForBoard}
      />
    }{  showCreateProject &&
      <ModalProjectView
          visible={showCreateProject}
          setVisible={setShowCreateProject}
          data={"no data"}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          problemId= {problemid}
          currentData={currentDataForBoard}
      />
    }
    {
      <Analytics
        type={type}
        visible={showAnalytics}
        setVisible={setShowAnalytics}
        tabKey={tabKey}
        data={sumByCounty}
        initialYear={year}
      />
    }
    {
      showBoardStatus &&
      <Status
        locality={locality}
        boardId={namespaceId}
        visible={showBoardStatus}
        setVisible={setShowBoardStatus}
        status={boardStatus}
        substatus={boardSubstatus}
        comment={boardComment}
        type={type}
        setAlertStatus={setAlertStatus}
        setShowAlert={setShowAlert}
        />
    }
    {
      showFilters && <Filter
        visible={showFilters}
        setVisible={setShowFilters}
        jurisdictionFilterList={jurisdictionFilterList}
        csaFilterList={csaFilterList}
        selJS={jurisdictionSelected}
        selCS={csaSelected}
        setJS={setJurisdictionSelected}
        setCS={setCsaSelected}
        l={localityType}
        />
    }
      {
        visibleCreateProject &&
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={"no data"}
          defaultTab={tabKey}
          locality={locality}
          editable = {true}
          currentData={currentDataForBoard}
        />
      }
    <Layout>
      <Navbar />
      <Layout>
        <SidebarView></SidebarView>
        {
          showAlert &&
          <AlertStatus type={alertStatus.type} message={alertStatus.message} />
        }
        <Layout className="work">
          { (loadingTransp || loading ) &&<LoadingViewOverall></LoadingViewOverall>}
          {
            <Row>
            <Col xs={{ span: 24 }} className={"height-mobile"} lg={{ span: leftWidth }} style={{transition:'all 0.7s ease'}}>
                <WorkRequestMap isFirstRendering={isFirstRendering} locality={{locality: locality, isOnSelected: isOnSelected}} openEdit={openEdit} projectsAmounts={projectsAmounts} currentTab={tabKey} change={changes} openModal={setShowCreateProject} setProblemId={setProblemId} leftWidth={leftWidth}/>
                <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                </Button>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: rightWidth }}>
              <div className="work-head" >
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <div className="auto-complete-map">
                      {
                        user.designation !== GOVERNMENT_STAFF ?
                        <AutoComplete
                        //onDropdownVisibleChange={setDropdownIsOpen}
                        className={'ant-select-1'}
                        options={dataAutocomplete.map(renderOption)}
                        placeholder={localityFilter}
                        filterOption={(inputValue, option: any) => {
                          if (dataAutocomplete.includes(inputValue)) {
                            return true;
                          }
                          return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                        }}
                        onSelect={onSelect}
                        value={localityFilter}
                        onSearch={(input2: any) => {
                          setLocalityFilter(input2);
                          if (localities.map(r => r.name).indexOf(input2) !== -1) {
                            setLocality(input2)
                            setIsOnSelected(false);
                            let l = localities.find((p: any) => {
                              return p.name === locality;
                            })
                            if (l) {
                              setLocalityType(l.type);
                            }
                          }
                        }}
                        open={dropdownIsOpen}
                        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                        onBlur={() => setDropdownIsOpen(false)}
                      >
                        <Input ref={ref} className={boardStatus === 'Approved' ? 'approved' : 'not-approved'}
                          prefix={<i className="mdi mdi-circle" style={{marginLeft: '-6px', zIndex: '999'}}></i>}
                          suffix={dropdownIsOpen ? <UpOutlined style={{marginRight: '-18px'}}/> : <DownOutlined style={{marginRight: '-18px'}}/>} style={{border: 'none', boxShadow: 'none', borderBottom: '1px solid rgba(37, 24, 99, 0.3)', marginRight: '-18px', marginLeft: '-6px' }}/>
                      </AutoComplete> : <Input style={{border:'none'}} className={boardStatus === 'Approved' ? 'approved' : 'not-approved'} value={localityFilter}
                          readOnly={true} prefix={<i className="mdi mdi-circle" style={{marginLeft: '-6px', zIndex: '999'}}></i>}/>
                      }
                      
                    </div>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
                    <Select
                      defaultValue={year}
                      value={`Year ${year}`}
                      onChange={setYear}
                      className={'ant-select-2'} >
                      {
                        years.map((y, i) => (
                          <Option key={i} value={y} style={{marginRight: '10px', marginLeft: '10px'}}>Year {y}</Option>
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

                    <ButtonGroup className={leftWidth === (MEDIUM_SCREEN_RIGHT - 1) ? '' : 'hide-when-1' }>
                    <Button className="btn-opacity">
                      <CSVLink filename={csvFileName(year, locality, type)} data={generateCSV()} className="btn-opacity" style={{padding:'0px'}}>
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
                      <TabPane tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
                        <div className="work-table" ref={wrtRef}>
                          {
                            columns.map((column, columnIdx) => (
                              <div className="container-drag" key={columnIdx+Math.random()}>
                                <h3 className="title-panel">{column.title == 'Debris Management' ? 'Trash & Debris mngt' : column.title}</h3>
                                <div className={column.hasCreateOption ? "col-wr droppable colum-hascreate":"col-wr droppable"} onDragOver={onDragOver} onDrop={(e: any) => onDrop(e, columnIdx)}>
                                  {
                                    column.hasCreateOption &&
                                    <Button className="btn-transparent button-createProject " onClick={onClickNewProject} >
                                      {locality === 'MHFD District Work Plan' ? <img src="/Icons/icon-18-gray.svg" style={{marginBottom:'2px'}} alt=""/>: <img src="/Icons/icon-18.svg" style={{marginBottom:'2px'}} alt=""/>}
                                      Create Project
                                    </Button>
                                  }
                                  {
                                    column.projects
                                    .filter((p: any) => filterByJurisdictionAndCsaSelected(jurisdictionSelected, csaSelected, jurisdictionFilterList, csaFilterList, p))
                                    .map((p: any, i: number, arr: any[]) => (
                                      <TrelloLikeCard key={i}
                                        year={year}
                                        type={type}
                                        setLoading={setLoading}
                                        delProject={deleteProject}
                                        namespaceId={namespaceId}
                                        project={p}
                                        columnIdx={columnIdx}
                                        rowIdx={i}
                                        saveData={saveData}
                                        tabKey={tabKey}
                                        editable={boardStatus !== 'Approved'}
                                        filtered={!notIsFiltered}
                                        locality={locality}
                                        borderColor={ColorService.getColor(type, p, arr, year, columnIdx, boardStatus !== 'Approved')} />
                                    ))
                                  }
                                </div>
                              </div>
                            ))
                          }
                        </div>

                        <div className="cost-wr">
                          <Collapse
                            // defaultActiveKey={['1']}
                            // expandIconPosition="start"
                            collapsible="header"
                          >
                            <Panel
                              disabled={sumByCounty.length === 0}
                              header={!openCollaps
                                ? <a href="#openCost"><DownSquareOutlined style={{height:'16px', width:'16px', color: '#251863'}} onClick={() => (setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps))}/></a>
                                : <a href="#openCost"><UpSquareOutlined style={{height:'16px', width:'16px', color: '#251863'}} onClick={() => (setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps))}/></a>}
                              key="1"
                              style={{backgroundColor: '#F5F7FF'}}
                              extra={
                                <TotalHeader
                                  columns={columns}
                                  jurisdictionSelected={jurisdictionSelected}
                                  csaSelected={csaSelected}
                                  jurisdictionFilterList={jurisdictionFilterList}
                                  csaFilterList={csaFilterList}
                                   />
                              }>
                              <div className="tab-body-project streams" style={{backgroundColor: '#f9faff'}}>
                                <Timeline>
                                  {
                                    sumByCounty.map((countySum) => (
                                      <Timeline.Item color="purple" key={Math.random()}>
                                        <CostTableBody type={type} countySum={countySum} isFiltered={!notIsFiltered} tabKey={tabKey}/>
                                      </Timeline.Item>
                                    ))
                                  }
                                </Timeline>
                              </div>
                            </Panel>
                          </Collapse>
                          {openCollaps && <>
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
                                <div key={i} style={{opacity: !notIsFiltered ? 0.5 : 1 }} className="differential">
                                  {d ? formatter.format(Math.floor(d)) : ''}
                                </div>
                              ))
                            }
                          </div>
                          <div style={{height:'5px'}}></div>
                          <div id="openCost"></div>
                          </>}
                        </div>
                      </TabPane>
                    ))
                  }
                </Tabs>
              </div>
              <Button className="btn-scroll" onClick={() => scrollToRight()}>
                <RightOutlined />
              </Button>
            </Col>
          </Row>
          }
        </Layout>
      </Layout>
    </Layout>
  </>
}

export default RequestView;
