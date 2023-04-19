import { DownCircleTwoTone, DownOutlined, DownSquareOutlined, RightOutlined, UpOutlined, UpSquareOutlined } from '@ant-design/icons';
import { Layout, Button, Input, Row, Col, Select, Tabs, Collapse, Timeline, AutoComplete, InputNumber, Popover } from 'antd';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { MEDIUM_SCREEN_LEFT, MEDIUM_SCREEN_RIGHT, GOVERNMENT_STAFF } from 'constants/constants';
import { getBoardData, getBoardData2, getLocalitiesByBoardType } from 'dataFetching/workRequest';
import useFakeLoadingHook from 'hook/custom/useFakeLoadingHook';
import { useAttachmentDispatch } from 'hook/attachmentHook';
import { useMyUser, useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useBoardState } from 'hook/boardHook';
import { useProjectDispatch } from 'hook/projectHook';
import ConfigurationService from 'services/ConfigurationService';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { ModalProjectView } from 'Components/ProjectModal/ModalProjectView';
import Navbar from 'Components/Shared/Navbar/NavbarContainer';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import Filter from 'Components/Work/Drawers/Filter';
import Analytics from 'Components/Work/Drawers/Analytics';
import Status from 'Components/Work/Drawers/Status';
import { AlertStatus } from 'Components/Work/Request/AlertStatus';
import ColorService from 'Components/Work/Request/ColorService';
import CostTableBody from 'Components/Work/Request/CostTableBody';
import DownloadCSV from 'Components/Work/Request/Toolbar/DownloadCSV';
import ProjectEditService from 'Components/Work/Request/ProjectEditService';
import { BoardDataRequest, boardType } from 'Components/Work/Request/RequestTypes';
import {
  compareArrays,
  compareColumns,
  defaultColumns,
  filterByJurisdictionAndCsaSelected,
  formatter,
  generateColumns,
  getTotalsByProperty,
  getTotalsByPropertyV2,
  onDropFn,
  priceFormatter,
  priceParser,
} from 'Components/Work/Request/RequestViewUtil';
import TotalHeader from 'Components/Work/Request/TotalHeader';
import ShareURL from 'Components/Work/Request/Toolbar/ShareURL';
import TrelloLikeCard from 'Components/Work/Request/TrelloLikeCard';
import WorkRequestMap from 'Components/WorkRequestMap/WorkRequestMap';
import WsService from 'Components/Work/Request/WsService';

import '../../../index.scss';
import ColumsTrelloCard from './ColumsTrelloCard';
import { SERVER } from 'Config/Server.config';
import { postData } from '../../../Config/datasets';

const { Option } = Select;
const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Panel } = Collapse;
let currentProject: any = {};
let columDragAction = [false, 0, 0];
let counterBoardsCalls = 0;
const tabKeys = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D'];
const popovers: any = [
  <div className="popoveer-00">
    <b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.
  </div>,
  <div className="popoveer-00">
    <b>Study:</b> Master plans that identify problems and recommend improvements.
  </div>,
  <div className="popoveer-00">
    <b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.
  </div>,
  <div className="popoveer-00">
    <b>Acquisition:</b> Property with high flood risk or needed for improvements.
  </div>,
  <div className="popoveer-00">
    <b>R&D:</b> Any other effort for which MHFD funds or staff time is requested.
  </div>,
];
const RequestView = ({ type, isFirstRendering }: { type: boardType; isFirstRendering: boolean }) => {
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
  const [callBoard, setCallBoard] = useState(0);
  const [callProjects, setCallProjects] = useState(0);
  const [flagforScroll, setFlagforScroll] = useState(0);
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
  const [totalCountyBudget, setTotalCountyBudget] = useState(0);
  const history = useHistory();
  const {
    setBoardProjects,
    setZoomProject,
    setStreamsIds,
    setComponentsFromMap,
    setStreamIntersected,
    setComponentIntersected,
  } = useProjectDispatch();
  const [columns, setColumns] = useState(defaultColumns);
  const [projectsAmounts, setProjectAmounts] = useState([]);
  const [localities, setLocalities] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localityFilter, setLocalityFilter] = useState('');
  const [jurisdictionFilterList, setJurisdictionFilterList] = useState([]);
  const [csaFilterList, setCsaFilterList] = useState([]);
  const [jurisdictionSelected, setJurisdictionSelected] = useState<string[]>([]);
  const [csaSelected, setCsaSelected] = useState<string[]>([]);
  const [prioritySelected, setPrioritySelected] = useState<string[]>(['1', '2', '3', 'Over 3', 'Work Plan']);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { clear } = useAttachmentDispatch();
  const [openYearDropdown, setOpenYearDropdown] = useState(false);
  const wrtRef = useRef(null);
  const ref = useRef<any>(null);
  const [problemid, setProblemId] = useState<any>(undefined);
  const [currentDataForBoard, setCurrentDataForBoard] = useState({});
  const { userInformation } = useProfileState();
  // TODO: openmodal
  // const { isOpenModal } = useBoardState();
  const { saveBoardProjecttype } = useProfileDispatch();
  const users = useMyUser();
  const fakeLoading = useFakeLoadingHook(tabKey);
  const [boardFlag, setBoardFlag] = useState(0);
  const [completeProjectData, setCompleteProjectData] = useState<any>(null);
  const updateWidth = () => {
    if (leftWidth === MEDIUM_SCREEN_RIGHT - 1) {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRightWitdh(MEDIUM_SCREEN_RIGHT);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    } else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRightWitdh(MEDIUM_SCREEN_LEFT + 1);
      setRotationStyle(emptyStyle);
    }
    setTimeout(() => {
      setChanges(Math.random());
    }, 1000);
  };

  const resetOnClose = () => {
    setStreamIntersected([]);
    setComponentIntersected([]);
    setComponentsFromMap([]);
  };
  useEffect(() => {
    if (!showModalProject) {
      resetOnClose();
    }
  }, [showModalProject]);
  useEffect(() => {
    if (!showCreateProject) {
      resetOnClose();
    }
  }, [showCreateProject]);

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
        }),
      };
    });
    let justProjects = array.map((proj: any) => {
      return proj.projectData?.cartodb_id;
    });
    let idsProjects = array.map((proj: any) => {
      return proj.projectData?.projectid;
    });
    if (array.length > 0) {
      setBoardProjects({ cartoids: justProjects, ids: idsProjects });
    } else {
      setBoardProjects(['-8886']);
    }
    setColumns(newcols);
  };
  // useEffect(() => {
  //   console.log('isOpenModal', isOpenModal);
  // }, [isOpenModal]);

  const [isOnSelected, setIsOnSelected] = useState(false);
  const onSelect = (value: any) => {
    setLoading(true);
    setShowAnalytics(false);
    setShowBoardStatus(false);
    setLocality(value);
    setIsOnSelected(true);
    setLocalityFilter(value);
    setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
    let l = localities.find((p: any) => {
      return p.name === value;
    });
    console.log('Locality', l);
    if (l) {
      setLocalityType(l.table);
      if (type === 'WORK_PLAN') {
        let displayedTabKey: string[] = [];

        if (year < 2022) {
          if (l.table === 'CODE_STATE_COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance'];
          } else if (l.table === 'CODE_SERVICE_AREA') {
            displayedTabKey = ['Study', 'Acquisition', 'R&D'];
          }
        } else {
          if (l.table === 'CODE_STATE_COUNTY') {
            displayedTabKey = ['Capital', 'Maintenance', 'Acquisition', 'R&D'];
          } else if (l.table === 'CODE_SERVICE_AREA') {
            displayedTabKey = ['Study'];
          }
        }
        if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
          displayedTabKey = tabKeys;
        }
        if (l.name.includes('South Platte River County')) {
          displayedTabKey = tabKeys;
          setTabKey(displayedTabKey[0]);
        }

        if (!displayedTabKey.includes(tabKey)) {
          setTabKey(displayedTabKey[0]);
        }
      } else {
        if (!tabKeys.includes(tabKey)) {
          setTabKey(tabKeys[0]);
        }
      }
    }
  };
  const [changes, setChanges] = useState(0);
  useEffect(() => {
    setChanges(Math.random());
  }, [locality, tabKey, year]);

  useEffect(() => {
    saveBoardProjecttype(tabKey);
  }, [tabKey]);

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
      for (var i = 0; i < 5; i++) {
        array.push(boardYearLimit - i);
      }
      setYears(array);
      let params = new URLSearchParams(history.location.search);
      let _year = params.get('year');
      let _locality = params.get('locality');
      let _tabKey = params.get('tabKey') || users.projecttype;
      if (_locality != userInformation.organization && userInformation.designation == GOVERNMENT_STAFF) {
        _locality = userInformation.organization;
      }
      getLocalitiesByBoardType(type).then(
        (r: any) => {
          setLocalities(r.localities);
          let localitiesData = r.localities.map((l: any) => l.name);
          /*            localitiesData.push(localitiesData.splice(localitiesData.indexOf('MHFD District Work Plan'), 1)[0]);
            localitiesData.push('月');
             */

          setDataAutocomplete(localitiesData);
          if (_year) {
            setYear(_year);
          } else {
            setYear(boardYearLimit);
          }
          if (_locality) {
            setLocality(_locality);
            setIsOnSelected(false);
            setLocalityFilter(_locality);
          } else {
            if (r.localities.length > 0) {
              setLocality(r.localities[0].name);
              setIsOnSelected(false);
              setLocalityFilter(r.localities[0].name);
              _locality = r.localities[0].name;
            }
          }
          let l = r.localities.find((p: any) => {
            return p.name === _locality;
          });
          if (l) {
            setLocalityType(l.table);
          }
          if (_tabKey) {
            let displayedTabKey: string[] = [];
            if (type === 'WORK_REQUEST') {
              displayedTabKey = tabKeys;
            } else {
              if (l) {
                if (l.table === 'CODE_STATE_COUNTY') {
                  displayedTabKey = ['Capital', 'Maintenance'];
                } else if (l.table === 'CODE_SERVICE_AREA') {
                  displayedTabKey = ['Study', 'Acquisition', 'R&D'];
                }
                if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
                  displayedTabKey = tabKeys;
                }
                if (l.name.includes('South Platte River County')) {
                  displayedTabKey = tabKeys;
                }
              }
            }
            if (displayedTabKey.includes(_tabKey)) {
              setTabKey(_tabKey);
            } else {
              setTabKey(displayedTabKey[0]);
            }
          } else {
            if (type === 'WORK_REQUEST') {
              setTabKey(tabKeys[0]);
            } else {
              if (l) {
                let displayedTabKey: string[] = [];
                if (l.type === 'COUNTY') {
                  displayedTabKey = ['Capital', 'Maintenance'];
                } else if (l.type === 'SERVICE_AREA') {
                  displayedTabKey = ['Study', 'Acquisition', 'R&D'];
                }
                if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
                  displayedTabKey = tabKeys;
                }
                if (l.name.includes('South Platte River County')) {
                  displayedTabKey = tabKeys;
                }
                setTabKey(displayedTabKey[0]);
              }
            }
          }
        },
        e => {
          console.log('e', e);
        },
      );
    };
    initLoading();
    setZoomProject(undefined);
  }, []);

  // 1	Draft
  // 2	Requested
  // 3	Approved
  // 4	Initiated
  // 5	Active
  // 6	Completed
  // 7	Inactive
  // 8	Cancelled
  // 9	Closed
  // 10	Closeout
  const groupBy = (arr: any, keyGetter: any) => {
    const out: any = {};
    for (let item of arr) {
      const key = keyGetter(item);
      if (!out[key]) {
        out[key] = [];
      }
      out[key].push(item);
    }
    return out;
  };

  const buildGeojsonForLabelsProjectsInBoards = (projects: any) => {
    const geojsonData = {
      type: 'FeatureCollection',
      features: [],
    };
    console.log('Projects in labels ', projects);
    const projectsRData = projects.map((p: any) => {
      const currentPS = p.projectData?.project_statuses?.filter((ps: any, index: number) => {
        if (p.projectData?.current_project_status_id) {
          return ps?.project_status_id == p.projectData?.current_project_status_id;
        } else {
          // IF NO CURRENT STATUS PICK FIRST ONE
          return index === 0;
        }
      });
      const centroid = p?.projectData?.centroid;
      return {
        project_id: p.projectData?.project_id,
        current_project_status: currentPS ? currentPS[0]?.code_phase_type?.code_status_type?.code_status_type_id : null,
        project_name: p?.projectData?.project_name,
        centroid: centroid ? centroid[0]?.centroid : null,
      };
    });
    geojsonData.features = projectsRData.map((p: any) => {
      return {
        type: 'Feature',
        properties: {
          project_name: p.project_name,
          project_status: p.current_project_status,
          project_id: p.project_id,
        },
        geometry: p.centroid ? JSON.parse(p.centroid) : '',
      };
    });
    return geojsonData;
  };

  const splitProjectsIdsByStatuses = (projects: any) => {
    const projectsRelevantData = projects.map((p: any) => {
      return {
        // current_project_status_id: p.projectData?.current_project_status_id,
        statuses: p.projectData?.project_statuses,
        current_project_status: p.projectData?.project_statuses?.filter((ps: any, index: number) => {
          if (p.projectData?.current_project_status_id) {
            return ps?.project_status_id == p.projectData?.current_project_status_id;
          } else {
            // IF NO CURRENT STATUS PICK FIRST ONE
            return index === 0;
          }
        })[0]?.code_phase_type?.code_status_type,
        project_id: p.projectData?.project_id,
      };
    });
    const grouped = groupBy(projectsRelevantData, (item: any) =>
      item.current_project_status
        ? item.current_project_status?.code_status_type_id
        : item.statuses[0]?.code_phase_type?.code_status_type?.code_status_type_id,
    );
    for (let key in grouped) {
      let uniqueIds: any = [];
      grouped[key]
        .map((values: any) => values.project_id)
        .forEach((element: any) => {
          if (!uniqueIds.includes(element)) {
            uniqueIds.push(element);
          }
        });
      grouped[key] = uniqueIds;
    }
    return grouped;
  };
  useEffect(() => {
    if (!locality || !tabKey) {
      return;
    }
    let data: BoardDataRequest = {
      type,
      year: `${year}`,
      locality,
      projecttype: tabKey ? tabKey : tabKeys[0],
    };
    setCurrentDataForBoard(data);
    setColumns(defaultColumns);
    getBoardData2(data).then(
      (r: any) => {
        console.log(r);
        /* 
         let { boardProject , projects } = r;
         ProjectEditService.setProjects(boardProject);
         if (board) {
            setTotalCountyBudget(board.total_county_budget || 0);
            setBoardStatus(board.status);
            setBoardSubstatus(board.substatus);
            setBoardComment(board.comment);
            setNamespaceId(board.board_id)
            setReqManager([
              board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
            ])
            let justProjects = projects.map((proj:any)=> {
              return proj.projectData?.cartodb_id;
            });
            let idsProjects = projects.map((proj:any)=> {
              return proj.projectData?.project_id;
            });
            let projectAmounts = projects.map((proj:any)=> {
              return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
              cartodb_id: proj.projectData?.cartodb_id
              }
            });
            const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(projects);
            //const geojson: any = buildGeojsonForLabelsProjectsInBoards(projects);
            //setProjectAmounts(projectAmounts);
            //if(projects.length>0){
            //  setBoardProjects({cartoids:justProjects, ids: idsProjects, groupedIds: groupedIdsByStatusId, geojsonData: geojson});
            //} else {
            //  setBoardProjects(['-8885']);
            //}

            let cols = generateColumns(projects, year, tabKey);
            setColumns(cols);
          }
        */
        /*         if (!r) return;
          let { board, projects } = r;
          ProjectEditService.setProjects(projects);
          if (board) {
            setTotalCountyBudget(board.total_county_budget || 0);
            setBoardStatus(board.status);
            setBoardSubstatus(board.substatus);
            setBoardComment(board.comment);
            setNamespaceId(board.board_id)
            setReqManager([
              board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
            ])
            let justProjects = projects.map((proj:any)=> {
              return proj.projectData?.cartodb_id;
            });
            let idsProjects = projects.map((proj:any)=> {
              return proj.projectData?.project_id;
            });
            let projectAmounts = projects.map((proj:any)=> {
              return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
              cartodb_id: proj.projectData?.cartodb_id
              }
            });
            const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(projects);
            const geojson: any = buildGeojsonForLabelsProjectsInBoards(projects);
            setProjectAmounts(projectAmounts);
            if(projects.length>0){
              setBoardProjects({cartoids:justProjects, ids: idsProjects, groupedIds: groupedIdsByStatusId, geojsonData: geojson});
            } else {
              setBoardProjects(['-8885']);
            }

            let cols = generateColumns(projects, year, tabKey);
            setColumns(cols);
          } */
      },
      e => {
        console.log('e', e);
      },
    );
    let params = [
      ['year', year],
      ['locality', locality],
      ['tabKey', tabKey],
    ];
    history.push({
      pathname: type === 'WORK_REQUEST' ? '/work-request' : '/work-plan',
      search: `?${params.map(p => p.join('=')).join('&')}`,
    });
  }, [year, locality, tabKey, callProjects]);

  useEffect(() => {
    if (!namespaceId) {
      return;
    }
    WsService.connect(namespaceId, (socket: any) => {
      console.log('connected', socket.id);
    });
    WsService.receiveUpdate((data: any) => {
      // setColumns(data);
      // splitColumns(data);
      // setTimeout(() => {
      console.log('This is the data after ws', data);
      setLoading(true);
      setCallBoard(Math.random());
      // }, 2400);
    });
    WsService.receiveReqmanager((data: any) => {
      console.log('receiveReqmanager', data);
      setReqManager(data);
    });
    return () => {
      WsService.disconnect();
    };
  }, [namespaceId]);

  // const getBoardD = () => {
  //   counterBoardsCalls++;
  //   getBoardData({
  //     type,
  //     year: `${year}`,
  //     locality,
  //     projecttype: tabKey
  //   })
  //   .then(
  //     (r: any) => {
  //       if (!r) return;
  //       if ( r === 'error') {
  //         setTimeout(() => {
  //           setBoardFlag((oldBoardFlag) =>  oldBoardFlag + 1);
  //           counterBoardsCalls--;
  //         }, 8000);
  //       } else if(r){
  //         let { board, projects } = r;
  //         ProjectEditService.setProjects(projects);
  //         if (board) {
  //           if (board.status !== boardStatus) {
  //             setBoardStatus(board.status);
  //           }
  //           if (board.substatus !== boardSubstatus) {
  //             setBoardSubstatus(board.substatus);
  //           }
  //           if (board.comment !== boardComment) {
  //             setBoardComment(board.comment);
  //           }
  //           if (board._id !== namespaceId) {
  //             setNamespaceId(board._id)
  //           }
  //           let reqManagerEq = true;
  //           for (var i = 1 ; i <= 5; i++) {
  //             if (board[`targetcost${i}`] != reqManager[i-1]) {
  //               reqManagerEq = false;
  //             }
  //           }
  //           if (!reqManagerEq) {
  //             setReqManager([
  //               board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
  //             ])
  //           }
  //         }
  //         if (projects) {
  //           let cols = generateColumns(projects, year, tabKey);
  //           let areEqual: boolean = compareColumns(columns, cols);
  //           if (!areEqual) {
  //             setColumns(cols);
  //             let justProjects = projects.map((proj:any)=> {
  //               return proj.projectData.cartodb_id;
  //             });
  //             let idsProjects = projects.map((proj:any)=> {
  //               return proj.projectData?.projectid;
  //             });
  //             let projectAmounts = projects.map((proj:any)=> {
  //               return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
  //               cartodb_id: proj.projectData?.cartodb_id
  //               }
  //             });
  //             setProjectAmounts(projectAmounts);
  //             if(projects.length>0){
  //               setBoardProjects({cartoids:justProjects, ids: idsProjects});
  //             } else {
  //               setBoardProjects(['-8887']);
  //             }
  //           }
  //         }
  //       }
  //       setTimeout(() => {
  //         setBoardFlag((oldBoardFlag) =>  oldBoardFlag + 1);
  //         counterBoardsCalls--;
  //       }, 5700);

  //     },
  //     (e) => {
  //       console.log('e', e);
  //     }
  //   )
  // };

  useEffect(() => {
    // WsService.receiveUpdate(() => {
    //   console.log('just edited call board');
    // });
    // const interval = setInterval(() => {
    // if ( counterBoardsCalls < 2) {
    // counterBoardsCalls++;
    console.log('Get Board now...', tabKey);
    if (!locality || !tabKey) {
      return;
    }
    getBoardData({
      type,
      year: `${year}`,
      locality,
      // the next condition should be removed once all Special element would have been replace by R&D in DB
      projecttype: tabKey ? (tabKey === 'R&D' ? 'Special' : tabKey) : tabKeys[0],
    }).then(
      (r: any) => {
        counterBoardsCalls--;
        if (!r) return;
        if (r) {
          let { board, projects } = r;
          // console.log('board', board, 'proj', projects);
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
              setNamespaceId(board.board_id);
            }
            let reqManagerEq = true;
            for (var i = 1; i <= 5; i++) {
              if (board[`targetcost${i}`] != reqManager[i - 1]) {
                reqManagerEq = false;
              }
            }
            if (!reqManagerEq) {
              setReqManager([
                board.targetcost1,
                board.targetcost2,
                board.targetcost3,
                board.targetcost4,
                board.targetcost5,
              ]);
            }
          }
          if (projects) {
            let cols = generateColumns(projects, year, tabKey);
            let areEqual: boolean = compareColumns(columns, cols);
            setFlagforScroll(Math.random());
            // if (!areEqual) {
            setColumns(cols);
            let justProjects = projects.map((proj: any) => {
              return proj.projectData?.cartodb_id;
            });
            let idsProjects = projects.map((proj: any) => {
              return proj.projectData?.project_id;
            });
            let projectAmounts = projects.map((proj: any) => {
              return {
                totalAmount:
                  (proj['req1'] ? proj['req1'] : 0) +
                  (proj['req2'] ? proj['req2'] : 0) +
                  (proj['req3'] ? proj['req3'] : 0) +
                  (proj['req4'] ? proj['req4'] : 0) +
                  (proj['req5'] ? proj['req5'] : 0),
                cartodb_id: proj.projectData?.cartodb_id,
              };
            });
            const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(projects);
            const geojson: any = buildGeojsonForLabelsProjectsInBoards(projects);
            buildGeojsonForLabelsProjectsInBoards(projects);
            setProjectAmounts(projectAmounts);
            if (projects.length > 0) {
              setBoardProjects({
                cartoids: justProjects,
                ids: idsProjects,
                groupedIds: groupedIdsByStatusId,
                geojsonData: geojson,
              });
            } else {
              setBoardProjects(['-8887']);
            }
            // }
          }
        }
        setLoading(false);
      },
      e => {
        console.log('e', e);
        counterBoardsCalls--;
      },
    );
    // }

    // }, 5000);
    // return () => clearInterval(interval);
  }, [namespaceId, callBoard]);

  useEffect(() => {
    let [rows, totals] = getTotalsByPropertyV2(columns, 'project_counties');
    let [a] = getTotalsByPropertyV2(columns, 'project_service_areas');
    let [c] = getTotalsByPropertyV2(columns, 'project_local_governments');
    let uniqueServiceArea = a.map((p: any) => p.locality);
    let uniqueJurisdictions = c.map((p: any) => p.locality).filter((p: any) => p.length > 0);
    let uniqueCounties = rows.map((p: any) => p.locality);
    setJurisdictionFilterList(uniqueJurisdictions);
    setJurisdictionSelected(uniqueJurisdictions);
    let l = localities.find((p: any) => {
      return p.name === locality;
    });
    if (l) {
      if (l.type === 'COUNTY') {
        setCsaFilterList(uniqueCounties);
        setCsaSelected(uniqueCounties);
      } else {
        setCsaFilterList(uniqueServiceArea);
        setCsaSelected(uniqueServiceArea);
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
    let diffTmp = [];
    for (var i = 1; i <= 5; i++) {
      let d = reqManager[i - 1] - sumTotal[`req${i}`];
      diffTmp.push(d);
    }
    setDiff(diffTmp);
  }, [reqManager, sumTotal]);

  const splitColumns = (cols: any) => {
    let mySet: any = new Set();
    for (let c of cols) {
      let projs = [...c.projects];
      for (let p of projs) {
        mySet.add(p);
      }
    }
    let newArray = [...mySet.values()];
    let projectAmounts: any = newArray.map((proj: any) => {
      return {
        totalAmount:
          (proj['req1'] ? proj['req1'] : 0) +
          (proj['req2'] ? proj['req2'] : 0) +
          (proj['req3'] ? proj['req3'] : 0) +
          (proj['req4'] ? proj['req4'] : 0) +
          (proj['req5'] ? proj['req5'] : 0),
        cartodb_id: proj.projectData?.cartodb_id,
      };
    });
    setProjectAmounts(projectAmounts);
  };
  const openEdit = (project: any, event: any) => {
    setShowModalEdit(project);
  };
  const getCompleteProjectData = async (data: any) => {
    let dataForBoard = { ...data };
    const newDataComplete = await postData(`${SERVER.URL_BASE}/board/projectdata`, dataForBoard).then((value: any) => {
      console.log('value', value);

      // next line was commented cause endpoint returns 404, it should be a comparison between data gotten from endpoint and the data currently received
      // setCompleteProjectData(value);
      setCompleteProjectData(data);
      setTimeout(() => {
        setShowModalProject(true);
      }, 200);
    });
  };
  const setShowModalEdit = (project: any) => {
    let projectswithid: any = new Set();
    let projectsFiltered = ProjectEditService.getProjects().filter(
      (proj: any) => proj.project_id == project.id.toString(),
    );
    if (projectsFiltered.length > 0) {
      projectswithid.add(projectsFiltered[0]);
    }
    let newArray = [...projectswithid.values()];
    if (newArray[0]) {
      currentProject = { ...newArray[0].projectData };
      getCompleteProjectData(currentProject);
      // setTimeout(()=>{
      //   setShowModalProject(true);
      // },200);
    }
  };
  const saveData = ({ projectId, amounts, years }: { projectId: any; amounts: any[]; years: any[] }) => {
    let projectData: any;
    columns.forEach(c => {
      c.projects.forEach((p: any) => {
        if (p.project_id == projectId) {
          projectData = p;
        }
      });
    });
    let hasData = amounts.some(r => !!r) || years.some(r => !!r);
    if (hasData) {
      let newObj: any = {
        origin: projectData.origin,
        project_id: projectId,
        position0: null,
        originPosition0: projectData.originPosition0,
        originPosition1: projectData.originPosition1,
        originPosition2: projectData.originPosition2,
        originPosition3: projectData.originPosition3,
        originPosition4: projectData.originPosition4,
        originPosition5: projectData.originPosition5,
        position1: null,
        position2: null,
        position3: null,
        position4: null,
        position5: null,
        req1: amounts[0],
        req2: amounts[1],
        req3: amounts[2],
        req4: amounts[3],
        req5: amounts[4],
        year1: years[0],
        year2: years[1],
        projectData: projectData.projectData,
      };
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
          });
          if (pos === null) {
            pos = projects.length;
          }
        }
        return pos;
      });
      positions.forEach((pos: any, posIdx: number) => {
        newObj[`position${posIdx + 1}`] = pos;
      });

      temporalColumns = temporalColumns.map((tc: any) => {
        return {
          ...tc,
          projects: tc.projects.filter((p: any) => {
            return p.project_id != projectId;
          }),
        };
      });
      positions.forEach((pos: any, posIdx: number) => {
        if (pos != null) {
          let ref: any = temporalColumns[posIdx + 1].projects;
          ref.splice(pos, 0, newObj);
        }
      });
      WsService.sendUpdate(temporalColumns);
      setColumns(temporalColumns);
    } else {
      let temporalColumns = columns.map((col: any, colIndex) => {
        return {
          ...col,
          projects: col.projects.filter((p: any) => {
            return p.project_id != projectId;
          }),
        };
      });
      let newProjectData = {
        origin: projectData.origin,
        project_id: projectId,
        position0: 0,
        position1: null,
        position2: null,
        position3: null,
        position4: null,
        position5: null,
        originPosition0: projectData.originPosition0,
        originPosition1: projectData.originPosition1,
        originPosition2: projectData.originPosition2,
        originPosition3: projectData.originPosition3,
        originPosition4: projectData.originPosition4,
        originPosition5: projectData.originPosition5,
        req1: null,
        req2: null,
        req3: null,
        req4: null,
        req5: null,
        projectData: projectData.projectData,
      };
      console.log('new Project Data', newProjectData);
      temporalColumns[0].projects.push(newProjectData);
      WsService.sendUpdate(temporalColumns);
      setColumns(temporalColumns);
    }
  };

  const scrollToRight = () => {
    let element: any = wrtRef.current;
    let parent = element.parentElement;
    parent.scroll(parent.scrollWidth, 0);
  };

  let displayedTabKey = tabKeys;
  if (type === 'WORK_PLAN') {
    if (localityType === 'CODE_STATE_COUNTY') {
      displayedTabKey = ['Capital', 'Maintenance'];
    } else if (localityType === 'CODE_SERVICE_AREA') {
      displayedTabKey = ['Study', 'Acquisition', 'R&D'];
    }
    if (locality === 'MHFD District Work Plan' || locality === 'Mile High Flood District') {
      displayedTabKey = tabKeys;
    }
    if (locality.includes('South Platte River County')) {
      displayedTabKey = tabKeys;
    }
  }

  let notIsFiltered =
    compareArrays(jurisdictionSelected, jurisdictionFilterList) && compareArrays(csaSelected, csaFilterList);

  const onUpdateBoard = () => {
    setCallProjects(Math.random());
  };
  const renderOption = (item: string) => {
    return {
      key: `${item}|${item}`,
      value: item,
      label: item,
    };
  };
  return (
    <>
      {showModalProject && (
        <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={completeProjectData}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          currentData={currentDataForBoard}
          year={year}
        />
      )}
      {showCreateProject && (
        <ModalProjectView
          visible={showCreateProject}
          setVisible={setShowCreateProject}
          data={'no data'}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          problemId={problemid}
          currentData={currentDataForBoard}
          year={year}
        />
      )}
      {
        <Analytics
          type={type}
          visible={showAnalytics}
          setVisible={setShowAnalytics}
          tabKey={tabKey}
          data={sumByCounty}
          totals={sumTotal}
          initialYear={year}
          totalCountyBudget={totalCountyBudget}
          boardId={namespaceId}
        />
      }
      {showBoardStatus && (
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
          onUpdateHandler={onUpdateBoard}
        />
      )}
      {showFilters && (
        <Filter
          visible={showFilters}
          setVisible={setShowFilters}
          jurisdictionFilterList={jurisdictionFilterList}
          csaFilterList={csaFilterList}
          selPS={prioritySelected}
          selJS={jurisdictionSelected}
          selCS={csaSelected}
          setJS={setJurisdictionSelected}
          setCS={setCsaSelected}
          setPS={setPrioritySelected}
          l={localityType}
        />
      )}
      {visibleCreateProject && (
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={'no data'}
          defaultTab={tabKey}
          locality={locality}
          editable={true}
          currentData={currentDataForBoard}
          year={year}
        />
      )}
      <Layout>
        <Navbar />
        <Layout>
          <SidebarView></SidebarView>
          {showAlert && <AlertStatus type={alertStatus.type} message={alertStatus.message} />}
          <Layout className="work">
            {(fakeLoading || loading) && <LoadingViewOverall />}
            {
              <Row>
                <Col
                  xs={{ span: 24 }}
                  className={'height-mobile'}
                  lg={{ span: leftWidth }}
                  style={{ transition: 'all 0.7s ease' }}
                >
                  <WorkRequestMap
                    isFirstRendering={isFirstRendering}
                    locality={{ locality: locality, isOnSelected: isOnSelected }}
                    openEdit={openEdit}
                    projectsAmounts={projectsAmounts}
                    currentTab={tabKey}
                    change={changes}
                    openModal={setShowCreateProject}
                    setProblemId={setProblemId}
                    leftWidth={leftWidth}
                  />
                  <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                    <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
                  </Button>
                </Col>

                <Col xs={{ span: 24 }} lg={{ span: rightWidth }}>
                  <div className="work-head">
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <div className="auto-complete-map">
                          {userInformation.designation !== GOVERNMENT_STAFF ? (
                            <AutoComplete
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
                                  setLocality(input2);
                                  setIsOnSelected(false);
                                  let l = localities.find((p: any) => {
                                    return p.name === locality;
                                  });
                                  if (l) {
                                    setLocalityType(l.table);
                                  }
                                }
                              }}
                              open={dropdownIsOpen}
                              onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                              onBlur={() => setDropdownIsOpen(false)}
                            >
                              <Input
                                ref={ref}
                                className={boardStatus === 'Approved' ? 'approved' : 'not-approved'}
                                prefix={<i className="mdi mdi-circle" style={{ marginLeft: '-6px', zIndex: '3' }}></i>}
                                suffix={
                                  dropdownIsOpen ? (
                                    <UpOutlined style={{ marginRight: '-18px' }} />
                                  ) : (
                                    <DownOutlined style={{ marginRight: '-18px' }} />
                                  )
                                }
                                style={{
                                  border: 'none',
                                  boxShadow: 'none',
                                  borderBottom: '1px solid rgba(37, 24, 99, 0.3)',
                                  marginRight: '-18px',
                                  marginLeft: '-6px',
                                }}
                              />
                            </AutoComplete>
                          ) : (
                            <Input
                              style={{ border: 'none' }}
                              className={boardStatus === 'Approved' ? 'approved' : 'not-approved'}
                              value={localityFilter}
                              readOnly={true}
                              prefix={<i className="mdi mdi-circle" style={{ marginLeft: '-6px', zIndex: '3' }}></i>}
                            />
                          )}
                        </div>
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
                        <Select
                          defaultValue={year}
                          value={`Year ${year}`}
                          suffixIcon={openYearDropdown ? <DownOutlined /> : <UpOutlined />}
                          onClick={() => setOpenYearDropdown(!openYearDropdown)}
                          onChange={(y: any) => {
                            setYear(y);
                            setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
                          }}
                          className={'ant-select-2'}
                        >
                          {years.map((y, i) => (
                            <Option key={i} value={y}>
                              Year {y}
                            </Option>
                          ))}
                        </Select>

                        <ButtonGroup>
                          {(locality === 'Mile High Flood District' || type === 'WORK_REQUEST') && (
                            <Button className="btn-opacity" onClick={() => setShowBoardStatus(true)}>
                              <img
                                className="icon-bt"
                                style={{ WebkitMask: "url('/Icons/icon-88.svg') no-repeat center" }}
                                src=""
                              />
                            </Button>
                          )}
                          <Button className="btn-opacity" onClick={() => setShowAnalytics(true)}>
                            <img
                              className="icon-bt"
                              style={{ WebkitMask: "url('/Icons/icon-89.svg') no-repeat center" }}
                              src=""
                            />
                          </Button>
                        </ButtonGroup>

                        <ButtonGroup className={leftWidth === MEDIUM_SCREEN_RIGHT - 1 ? '' : 'hide-when-1'}>
                          <DownloadCSV
                            type={type}
                            localities={localities}
                            columns={columns}
                            locality={locality}
                            year={year}
                            tabKey={tabKey}
                            sumTotal={sumTotal}
                            sumByCounty={sumByCounty}
                            reqManager={reqManager}
                            diff={diff}
                          />
                          <ShareURL />
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="work-body">
                    {type === 'WORK_PLAN' && (
                      <Button className="btn-filter-d" onClick={() => setShowFilters(true)}>
                        <img
                          className="icon-bt"
                          style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }}
                          src=""
                        />
                      </Button>
                    )}
                    <Tabs
                      destroyInactiveTabPane={true}
                      defaultActiveKey={displayedTabKey[0]}
                      activeKey={tabKey}
                      onChange={key => {
                        setTabKey(key);
                        setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
                      }}
                      className="tabs-map"
                    >
                      {displayedTabKey.map((tk: string) => (
                        <TabPane
                          tab={
                            <span>
                              <Popover
                                content={popovers[tabKeys.indexOf(tk)]}
                                placement="topLeft"
                                overlayClassName="tabs-style"
                              >
                                {tk}{' '}
                              </Popover>{' '}
                            </span>
                          }
                          key={tk}
                        >
                          <div className="work-table" ref={wrtRef}>
                            <ColumsTrelloCard
                              columns={columns}
                              setColumns={setColumns}
                              tabKey={tabKey}
                              locality={locality}
                              setVisibleCreateProject={setVisibleCreateProject}
                              jurisdictionSelected={jurisdictionSelected}
                              csaSelected={csaSelected}
                              jurisdictionFilterList={jurisdictionFilterList}
                              csaFilterList={csaFilterList}
                              prioritySelected={prioritySelected}
                              year={year}
                              type={type}
                              setLoading={setLoading}
                              deleteProject={deleteProject}
                              namespaceId={namespaceId}
                              saveData={saveData}
                              boardStatus={boardStatus}
                              notIsFiltered={notIsFiltered}
                              ColorService={ColorService}
                              userDesignation={userInformation.designation}
                              flagforScroll={flagforScroll}
                            />
                          </div>

                          <div className="cost-wr">
                            <Collapse collapsible="header">
                              <Panel
                                disabled={sumByCounty.length === 0}
                                header={
                                  tabKey !== 'Maintenance' ? (
                                    !openCollaps ? (
                                      <a
                                        href="#openCost"
                                        style={{ padding: '10px 0px' }}
                                        onClick={() =>
                                          setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)
                                        }
                                      >
                                        <DownSquareOutlined
                                          style={{ height: '16px', width: '16px', color: '#251863' }}
                                          onClick={() =>
                                            setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)
                                          }
                                        />
                                      </a>
                                    ) : (
                                      <a
                                        href="#openCost"
                                        style={{ padding: '10px 0px' }}
                                        onClick={() =>
                                          setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)
                                        }
                                      >
                                        <UpSquareOutlined
                                          style={{ height: '16px', width: '16px', color: '#251863' }}
                                          onClick={() =>
                                            setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)
                                          }
                                        />
                                      </a>
                                    )
                                  ) : null
                                }
                                key="1"
                                style={{ backgroundColor: '#F5F7FF' }}
                                extra={
                                  <TotalHeader
                                    columns={columns}
                                    jurisdictionSelected={jurisdictionSelected}
                                    csaSelected={csaSelected}
                                    jurisdictionFilterList={jurisdictionFilterList}
                                    csaFilterList={csaFilterList}
                                  />
                                }
                              >
                                <div className="tab-body-project streams" style={{ backgroundColor: '#f9faff' }}>
                                  <Timeline>
                                    {tabKey !== 'Maintenance' &&
                                      sumByCounty.map(countySum => (
                                        <Timeline.Item color="purple" key={Math.random()}>
                                          <CostTableBody
                                            type={type}
                                            countySum={countySum}
                                            isFiltered={!notIsFiltered}
                                            tabKey={tabKey}
                                          />
                                        </Timeline.Item>
                                      ))}
                                  </Timeline>
                                </div>
                              </Panel>
                            </Collapse>
                            {openCollaps && tabKey !== 'Maintenance' && (
                              <>
                                <div className="col-bg">
                                  <div>
                                    <h5>Target Cost</h5>
                                  </div>
                                  {reqManager.map((val: any, index: number) => (
                                    <div key={index}>
                                      <InputNumber
                                        placeholder="Enter target cost"
                                        style={{ opacity: !notIsFiltered ? 0.5 : 1 }}
                                        readOnly={!notIsFiltered}
                                        formatter={priceFormatter}
                                        parser={priceParser}
                                        value={val}
                                        onChange={(e: any) => {
                                          let v = e;
                                          let nv = reqManager.map((vl: any, i: number) => {
                                            if (i === index) {
                                              return v;
                                            }
                                            return vl;
                                          });
                                          WsService.sendReqmanager(nv);
                                          setReqManager(nv);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div className="col-bg">
                                  <div>
                                    <h5>Contingency</h5>
                                  </div>
                                  {diff.map((d: any, i) => (
                                    <div key={i} style={{ opacity: !notIsFiltered ? 0.5 : 1 }} className="differential">
                                      {d ? formatter.format(Math.floor(d)) : ''}
                                    </div>
                                  ))}
                                </div>
                                <div style={{ height: '5px' }}></div>
                                <div id="openCost"></div>
                              </>
                            )}
                          </div>
                        </TabPane>
                      ))}
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
  );
};

export default RequestView;
