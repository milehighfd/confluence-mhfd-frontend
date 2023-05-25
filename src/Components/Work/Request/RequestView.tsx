import { RightOutlined } from '@ant-design/icons';
import { Layout, Button, Row, Col, Tabs, Popover } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { GOVERNMENT_STAFF } from 'constants/constants';
import { getBoardData3, getLocalitiesByBoardType } from 'dataFetching/workRequest';
import useFakeLoadingHook from 'hook/custom/useFakeLoadingHook';
import { useMyUser, useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useProjectDispatch } from 'hook/projectHook';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { boardType } from 'Components/Work/Request/RequestTypes';
import { compareArrays, defaultColumns } from 'Components/Work/Request/RequestViewUtil';
import WorkRequestMap from 'Components/WorkRequestMap/WorkRequestMap';
import WsService from 'Components/Work/Request/WsService';
import ColumsTrelloCard from 'Components/Work/Request/ColumsTrelloCard';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import Toolbar from 'routes/work-request/components/Toolbar';
import YearDropdown from 'routes/work-request/components/YearDropdown';
import ResizableButton from 'routes/work-request/components/ResizableButton';
import RequestCostRows from 'routes/work-request/components/RequestCostRows';
import AutoCompleteDropdown from 'routes/work-request/components/AutoCompleteDropdown';

import '../../../index.scss';

const { TabPane } = Tabs;

const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>R&D:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const RequestView = ({ type, isFirstRendering }: {
  type: boardType,
  isFirstRendering: boolean
}) => {
  const {
    showModalProject,
    locality,
    tabKeys,
    tabKey,
    year,
    yearList,
    sumTotal,
    namespaceId,
    jurisdictionFilterList,
    csaFilterList,
    jurisdictionSelected,
    csaSelected,
    localityType,
    leftWidth,
    columns,
    reqManager,
    isOnSelected,
  } = useRequestState();
  const {
    setShowModalProject,
    setCompleteProjectData,
    setLocality,
    setTabKey,
    setYear,
    setProblemId,
    setNamespaceId,
    setBoardStatus,
    setBoardSubstatus,
    setBoardComment,
    setShowFilters,
    setPrioritySelected,
    setLocalityType,
    setLocalities,
    setColumns,
    setDiff,
    setReqManager,
    loadColumns,
    setBoard,
    setLocalityFilter,
    setIsOnSelected,
    setDataAutocomplete,
  } = useRequestDispatch();
  const [flagforScroll, setFlagforScroll] = useState(0);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const history = useHistory();
  const { setBoardProjects, setZoomProject, setComponentsFromMap, setStreamIntersected, setComponentIntersected } = useProjectDispatch();
  const [projectsAmounts, setProjectAmounts] = useState([]);
  const wrtRef = useRef(null);
  const { userInformation } = useProfileState();
  const { saveBoardProjecttype } = useProfileDispatch();
  const users = useMyUser();
  const fakeLoading = useFakeLoadingHook(tabKey);

  const resetOnClose = () => {
    setStreamIntersected([]);
    setComponentIntersected([]);
    setComponentsFromMap([]);
  }
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
        })
      }
    });
    let idsProjects = array.map((proj: any) => {
      return proj.projectData?.projectid;
    });
    if (array.length > 0) {
      setBoardProjects({ ids: idsProjects });
    } else {
      setBoardProjects(['-8886']);
    }
    setColumns(newcols);
  }

  const [changes, setChanges] = useState(0);
  useEffect(() => {
    setChanges(Math.random());
  }, [locality, tabKey, year]);

  useEffect(() => {
    saveBoardProjecttype(tabKey);
  }, [tabKey]);

  useEffect(() => {
    const initLoading = async () => {
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      let _locality = params.get('locality');
      let _tabKey = params.get('tabKey') || users.projecttype;
      if (_locality !== userInformation.organization && userInformation.designation === GOVERNMENT_STAFF) {
        _locality = userInformation.organization;
      }
      let r;
      try {
        r = await getLocalitiesByBoardType(type);
      } catch (e) {
        console.log('e', e)
      };
      setLocalities(r.localities);
      setDataAutocomplete(r.localities.map((l: any) => l.name));
      if (_year) {
        setYear(_year)
      }
      if (!_locality && r.localities.length > 0) {
        _locality = r.localities[0].name;
      }
      if (_locality) {
        setLocality(_locality)
        setIsOnSelected(false);
        setLocalityFilter(_locality)
      }
      let l = r.localities.find((p: any) => {
        return p.name === _locality;
      })
      if (l) {
        setLocalityType(l.table);
      }
      if (_tabKey) {
        let displayedTabKey: string[] = [];
        if (type === "WORK_REQUEST") {
          displayedTabKey = tabKeys;
        } else {
          if (l) {
            if (l.table === 'CODE_STATE_COUNTY') {
              displayedTabKey = ['Capital', 'Maintenance']
            } else if (l.table === 'CODE_SERVICE_AREA') {
              displayedTabKey = ['Study', 'Acquisition', 'R&D'];
            }
            if (l.name === 'MHFD District Work Plan' || l.name === 'Mile High Flood District') {
              displayedTabKey = tabKeys;
            }
          }
        }
        if (displayedTabKey.includes(_tabKey)) {
          setTabKey(_tabKey)
        } else {
          setTabKey(displayedTabKey[0]);
        }
      } else {
        if (type === "WORK_REQUEST") {
          setTabKey(tabKeys[0])
        } else {
          if (l) {
            let displayedTabKey: string[] = [];
            if (l.type === 'COUNTY') {
              displayedTabKey = ['Capital', 'Maintenance']
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

    }
    initLoading();
    setZoomProject(undefined);
  }, []);

  useEffect(() => {
    console.log(`SHOULD BE CALLED ONCE WITH year = ${year} locality = ${locality} tabKey = ${tabKey}`);
    if (!locality || !tabKey) {
      return;
    }
    const loadProjects = async () => {
      setColumns(defaultColumns);
      let board;
      try {
        board = await getBoardData3({
          type,
          year: `${year}`,
          locality: locality === 'Mile High Flood District' ? 'MHFD District Work Plan' : locality,
          projecttype: tabKey ? (tabKey === 'R&D' ? 'Special' : tabKey) : tabKeys[0],
        })
      } catch (e) {
        console.log('e', e)
      }
      setBoard(board);
      loadColumns(board.board_id);
      /* TODO: this should be replaced */
      setBoardStatus(board.status);
      setBoardSubstatus(board.substatus);
      setBoardComment(board.comment);
      setNamespaceId(board.board_id);
      setFlagforScroll(Math.random());
      
      
    }
    loadProjects();

    // getBoardData2(currentDataForBoard)
    //   .then(
    //     (r: any) => {
    //       console.log(r);
    //       if (!r) return;
    //       let { board, projects } = r;
    //       if (board) {
    //         setTotalCountyBudget(board.total_county_budget || 0);
    //         setBoardStatus(board.status);
    //         setBoardSubstatus(board.substatus);
    //         setBoardComment(board.comment);
    //         setNamespaceId(board.board_id)
    //         setReqManager([
    //           board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
    //         ])
    //         let idsProjects = projects.map((proj: any) => {
    //           return proj.projectData?.project_id;
    //         });
    //         let projectAmounts = projects.map((proj: any) => {
    //           return {
    //             totalAmount: ((proj['req1'] ? proj['req1'] : 0) + (proj['req2'] ? proj['req2'] : 0) + (proj['req3'] ? proj['req3'] : 0) + (proj['req4'] ? proj['req4'] : 0) + (proj['req5'] ? proj['req5'] : 0)),
    //             cartodb_id: proj.projectData?.cartodb_id
    //           }
    //         });
    //         const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(projects);
    //         const geojson: any = buildGeojsonForLabelsProjectsInBoards(projects);
    //         setProjectAmounts(projectAmounts);
    //         if (projects.length > 0) {
    //           setBoardProjects({ ids: idsProjects, groupedIds: groupedIdsByStatusId, geojsonData: geojson });
    //         } else {
    //           setBoardProjects(['-8885']);
    //         }

    //         let cols = generateColumns(projects, year, tabKey);
    //         setColumns(cols);
    //       }
    //     },
    //     (e) => {
    //       console.log('e', e);
    //     }
    //   )
    let params = [
      ['year', year],
      ['locality', locality],
      ['tabKey', tabKey]
    ]
    history.push({
      pathname: type === "WORK_REQUEST" ? '/work-request' : '/work-plan',
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
      console.log('This is the data after ws', data);
    });
    WsService.receiveReqmanager((data: any) => {
      console.log('receiveReqmanager', data);
      setReqManager(data);
    })
    return () => {
      WsService.disconnect();
    }
  }, [namespaceId])

  // getBoardData2({
  //     type,
  //     year: `${year}`,
  //     locality,
  //     // the next condition should be removed once all Special element would have been replace by R&D in DB
  //     projecttype: tabKey ? (tabKey === 'R&D' ? 'Special' : tabKey) : tabKeys[0],
  //     position: ''
  //   })
  //       .then(
  //         (r: any) => {
  //           if (!r) return;
  //           if(r){
  //             let { board, projects } = r;
  //             // console.log('board', board, 'proj', projects);
  //             if (board) {
  //               if (board.status !== boardStatus) {
  //                 setBoardStatus(board.status);
  //               }
  //               if (board.substatus !== boardSubstatus) {
  //                 setBoardSubstatus(board.substatus);
  //               }
  //               if (board.comment !== boardComment) {
  //                 setBoardComment(board.comment);
  //               }
  //               if (board._id !== namespaceId) {
  //                 setNamespaceId(board.board_id)
  //               }
  //               let reqManagerEq = true;
  //               for (var i = 1 ; i <= 5; i++) {
  //                 if (board[`targetcost${i}`] != reqManager[i-1]) {
  //                   reqManagerEq = false;
  //                 }
  //               }
  //               if (!reqManagerEq) {
  //                 setReqManager([
  //                   board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
  //                 ])
  //               }
  //             }
  //             // if (projects) {
  //             //   let cols = generateColumns(projects, year, tabKey);
  //             //   let areEqual: boolean = compareColumns(columns, cols);
  //             //   setFlagforScroll(Math.random());
  //             //   // if (!areEqual) {
  //             //     setColumns(cols);
  //             //     let idsProjects = projects.map((proj:any)=> {
  //             //       return proj.projectData?.project_id;
  //             //     });
  //             //     let projectAmounts = projects.map((proj:any)=> {
  //             //       return { totalAmount: ((proj['req1']?proj['req1']:0) + (proj['req2']?proj['req2']:0) + (proj['req3']?proj['req3']:0) + (proj['req4']?proj['req4']:0) + (proj['req5']?proj['req5']:0)),
  //             //       cartodb_id: proj.projectData?.cartodb_id
  //             //       }
  //             //     });
  //             //     const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(projects);
  //             //     const geojson: any = buildGeojsonForLabelsProjectsInBoards(projects);
  //             //     buildGeojsonForLabelsProjectsInBoards(projects);
  //             //     setProjectAmounts(projectAmounts);
  //             //     if(projects.length>0){
  //             //       setBoardProjects({ ids: idsProjects, groupedIds: groupedIdsByStatusId, geojsonData: geojson});
  //             //     } else {
  //             //       setBoardProjects(['-8887']);
  //             //     }
  //             //   // }
  //             // }
  //           }
  //         },
  //         (e) => {
  //           console.log('e', e);
  //         }
  //       )
  // }, [namespaceId]);

  useEffect(() => {
    // let [rows, totals] = getTotalsByPropertyV2(columns, 'project_counties');
    // let [a] = getTotalsByPropertyV2(columns, 'project_service_areas');
    // let [c] = getTotalsByPropertyV2(columns, 'project_local_governments');
    // let uniqueServiceArea = a.map((p: any) => p.locality);
    // let uniqueJurisdictions = c.map((p: any) => p.locality).filter((p: any) => p.length > 0);
    // let uniqueCounties = rows.map((p: any) => p.locality);
    // setJurisdictionFilterList(uniqueJurisdictions);
    // setJurisdictionSelected(uniqueJurisdictions);
    // let l = localities.find((p: any) => {
    //   return p.name === locality;
    // })
    // if (l) {
    //   if (l.type === 'COUNTY') {
    //     setCsaFilterList(uniqueCounties);
    //     setCsaSelected(uniqueCounties)
    //   } else {
    //     setCsaFilterList(uniqueServiceArea);
    //     setCsaSelected(uniqueServiceArea)
    //   }
    // }
    // setSumTotal(totals);
    // if (type === 'WORK_REQUEST') {
    //   if (['Capital', 'Maintenance'].includes(tabKey)) {
    //     setSumByCounty(rows);
    //   } else {
    //     setSumByCounty(a);
    //   }
    // } else {
    //   setSumByCounty(c);
    // }
  }, [columns, tabKey]);

  useEffect(() => {
    let diffTmp = []
    for (var i = 1; i <= 5; i++) {
      let d = reqManager[i - 1] - sumTotal[`req${i}`];
      diffTmp.push(d);
    }
    setDiff(diffTmp);

  }, [reqManager, sumTotal]);

  const openEdit = (project: any, event: any) => {
    datasets.getData(
      SERVER.V2_DETAILED_PAGE(project.project_id),
      datasets.getToken()
    ).then((value: any) => {
      setCompleteProjectData({...value, tabKey});
      setTimeout(() => {
        setShowModalProject(true);
      }, 200);
    });
  }

  const scrollToRight = () => {
    let element: any = wrtRef.current;
    let parent = element.parentElement;
    parent.scroll(parent.scrollWidth, 0);
  }

  let displayedTabKey = tabKeys;
  if (type === "WORK_PLAN") {
    if (localityType === 'CODE_STATE_COUNTY') {
      displayedTabKey = ['Capital', 'Maintenance']
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

  let notIsFiltered = compareArrays(jurisdictionSelected, jurisdictionFilterList) && compareArrays(csaSelected, csaFilterList);

  console.log('Rendering Request View');
  return (
    <Layout className="work">
      {(fakeLoading) && <LoadingViewOverall />}
      {
        <Row>
          <Col xs={{ span: 24 }} className={"height-mobile"} lg={{ span: leftWidth }} style={{ transition: 'all 0.7s ease' }}>
            <WorkRequestMap
              isFirstRendering={isFirstRendering}
              leftWidth={leftWidth}
              change={changes}
              locality={{ locality: locality, isOnSelected: isOnSelected }}
              setProblemId={setProblemId}
              openModal={setShowCreateProject}
              openEdit={openEdit}
              currentTab={tabKey}
              projectsAmounts={projectsAmounts}
            />
            <ResizableButton />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 24 - leftWidth }}>
            <div className="work-head" >
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <AutoCompleteDropdown />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ textAlign: 'right' }}>
                  <YearDropdown />
                  <Toolbar />
                </Col>
              </Row>
            </div>
            <div className="work-body">
              {type === 'WORK_PLAN' &&
                <Button className="btn-filter-d" onClick={() => setShowFilters(true)}>
                  <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }} src="" />
                </Button>
              }
              <Tabs destroyInactiveTabPane={true} defaultActiveKey={displayedTabKey[0]}
                activeKey={tabKey}
                onChange={(key) => {
                  setTabKey(key);
                  setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
                }} className="tabs-map">
                {
                  displayedTabKey.map((tk: string) => (
                    <TabPane tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style">{tk} </Popover> </span>} key={tk}>
                      <div className="work-table" ref={wrtRef}>
                        <ColumsTrelloCard
                          deleteProject={deleteProject}
                          notIsFiltered={notIsFiltered}
                          flagforScroll={flagforScroll}
                        />
                      </div>
                      <RequestCostRows />
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
  )
}

export default RequestView;
