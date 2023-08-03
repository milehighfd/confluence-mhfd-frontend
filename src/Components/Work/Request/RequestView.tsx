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
import { defaultColumns } from 'Components/Work/Request/RequestViewUtil';
import WorkRequestMap from 'Components/WorkRequestMap/WorkRequestMap';
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
import { useMapDispatch, useMapState } from 'hook/mapHook';
import TableListView from './Toolbar/TableListView';

import { YEAR_LOGIC_2024, WORK_PLAN } from 'constants/constants';
const { TabPane } = Tabs;

const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>R&D:</b> Research and Development projects include new stream/rain gages, research, data development, new education and outreach programming, and criteria or guidance development.</div>
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
    sumTotal,
    localityType,
    leftWidth,
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
    setJurisdictionSelected,
    setCountiesSelected,
    setServiceAreasSelected,
    setProjectStatusesSelected,
    setIsLocatedInSouthPlateRiverSelected,
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
    loadFilters,
    setTotalCountyBudget
  } = useRequestDispatch();
  const {
    setOpacityLayer,
    setCoordinatesJurisdiction,
    setNameZoomArea,
    setAutocomplete,
    setBBOXComponents
  } = useMapDispatch();
  const [flagforScroll, setFlagforScroll] = useState(0);
  const [isInitMap, setIsInitMap] = useState(true);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const history = useHistory();
  const { setZoomProject, setComponentsFromMap, setStreamIntersected, setComponentIntersected } = useProjectDispatch();
  const wrtRef = useRef(null);
  const { userInformation, groupOrganization } = useProfileState();
  const { saveBoardProjecttype } = useProfileDispatch();
  const users = useMyUser();
  const fakeLoading = useFakeLoadingHook(tabKey);
  const [ListWork, setListWork] = useState(false);
  const [selectView, setSelectView] = useState('card');

  const {  
    tabActiveNavbar
  } = useMapState();

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

  const [changes, setChanges] = useState(0);
  useEffect(() => {
    setChanges(Math.random());
  }, [locality, tabKey, year]);

  useEffect(() => {
    console.log('is going to set init map true');
    saveBoardProjecttype(tabKey);
  }, [tabKey]);

  useEffect(() => {
    const initLoading = async () => {
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      let _locality: any; //= params.get('locality'); commented to avoid preserve the same locality for wr and wp
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
        setIsInitMap(true);
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
    if (!locality || !tabKey) {
      return;
    }
    const loadProjects = async () => {
      setColumns(defaultColumns);
      let board;
      console.log(type, year, locality, tabKey)
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
      loadFilters(board.board_id);
      
      /* TODO: this should be replaced */
      console.log('Sub status', board.substatus);
      setBoardStatus(board.status);
      setBoardSubstatus(board.substatus);
      setBoardComment(board.comment);
      setNamespaceId(board.board_id);
      setFlagforScroll(Math.random());
      setTotalCountyBudget(board.total_county_budget);
      setReqManager([
        board.targetcost1, board.targetcost2, board.targetcost3, board.targetcost4, board.targetcost5
      ]);
    }
    loadProjects();
    let params = [
      ['year', year],
      ['locality', locality],
      ['tabKey', encodeURIComponent(tabKey)]
    ]
    history.push({
      // pathname: type === "WORK_REQUEST" ? '/work-request' : '/work-plan',
      pathname: type === "WORK_REQUEST" ? '/map' : '/map',
      search: `?${params.map(p => p.join('=')).join('&')}`
    })
  }, [year, locality, tabKey, type]);


  useEffect(() => {
    let diffTmp = []
    for (var i = 1; i <= 5; i++) {
      let d = reqManager[i - 1] - sumTotal[`req${i}`];
      diffTmp.push(d);
    }
    setDiff(diffTmp);
  }, [reqManager, sumTotal]);

  const openEdit = (project: any) => {
    datasets.getData(
      SERVER.V2_DETAILED_PAGE(project.project_id),
      datasets.getToken()
    ).then((value: any) => {
      setCompleteProjectData({ ...value, tabKey });
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

  useEffect(() => {
    if (locality) {
      console.trace('Is Init map', isInitMap);
      // reach on initLoading
      onSelect(locality, isInitMap ? 'isinit' : undefined);
    }
  }, [locality]);

  const onSelect = (value: any, isSelect?: any) => {
    setAutocomplete(value);
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name === value)
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.table,
          coordinates: element.coordinates.coordinates,
        };
      });
    if (zoomareaSelected[0]) {
      changeCenter(value, zoomareaSelected[0].coordinates, isSelect ?? 'isSelect');
      setIsInitMap(false);
    }
    setBBOXComponents({ bbox: [], centroids: [] });
  };

  const changeCenter = (name: string, coordinates: any, isSelect?: any) => {
    const user = userInformation;
    user.polygon = coordinates;
    user.isSelect = isSelect;
    //saveUserInformation(user);
    setNameZoomArea(name);
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name === name)
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.table,
          coordinates: element.coordinates.coordinates,
        };
      });
    if (zoomareaSelected.length > 0) {
      switch (zoomareaSelected[0].filter) {
        case 'County':
        case 'CODE_STATE_COUNTY':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Jurisdiction':
        case 'CODE_LOCAL_GOVERNMENT':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        case 'Service Area':
        case 'CODE_SERVICE_AREA':
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
          break;
        default:
          setOpacityLayer(true);
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      }
    }
  };

  let displayedTabKey = tabKeys;

  useEffect(() => {
    loadTabkeysDisplayed();
  }, [localityType]);

  const loadTabkeysDisplayed = () => {
    if (type === "WORK_PLAN") {
      if (year < 2022) {
        if (localityType === 'CODE_STATE_COUNTY') {
          displayedTabKey = ['Capital', 'Maintenance']
        } else if (localityType === 'CODE_SERVICE_AREA') {
          displayedTabKey = ['Study', 'Acquisition', 'R&D'];
        }
      } else if (year < 2024){
        if (localityType === 'CODE_STATE_COUNTY') {
          displayedTabKey = ['Capital', 'Maintenance', 'Acquisition', 'R&D']
        } else if (localityType === 'CODE_SERVICE_AREA') {
          displayedTabKey = ['Study'];
        }
      }
      if (locality.name === 'MHFD District Work Plan' || locality.name === 'Mile High Flood District' || year >= 2024) {
        displayedTabKey = tabKeys;
      }
    }
  }
  loadTabkeysDisplayed();

const selectCard = (card: any, show:boolean) => {
  setSelectView(card);
setListWork(show)
}

return (
    <Layout className="work">
      {(fakeLoading) && <LoadingViewOverall />}
      {
        <Row>
          {/* <Col xs={{ span: 24 }}
            className={"height-mobile"}
            lg={{ span: leftWidth }}
            style={{ transition: 'all 0.7s ease' }}>
            <WorkRequestMap
              isFirstRendering={isFirstRendering}
              leftWidth={leftWidth}
              change={changes}
              locality={{ locality: locality, isOnSelected: isOnSelected }}
              setProblemId={setProblemId}
              openEdit={openEdit}
              currentTab={tabKey}
            />
            <ResizableButton />
          </Col> */}
          {/* <Col xs={{ span: 24 }} lg={{ span: 24 - leftWidth }}></Col> */}
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <div className="work-head" >
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <AutoCompleteDropdown type={type} />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}
                  style={{ textAlign: 'right' }}>
                <div className='button-header-tab'>
                  <YearDropdown />
                  <div className='button-header'>
                    <Button id='buttons-header' className={selectView === 'list' ? 'ico-header-tab-active' : 'ico-header-tab'} onClick={() => { selectCard('list', true) }}>
                      {selectView === 'list' ? <img src='Icons/ic-list-purple.svg' alt='ic-list-purple' /> : <img src='Icons/ic-list.svg' alt='ic-list' />}
                      List
                    </Button>
                    <Button id='buttons-header' className={selectView === 'card' ? 'ico-header-tab-active' : 'ico-header-tab'} onClick={() => { selectCard('card', false) }}>
                      {selectView === 'card' ? <img src='Icons/ic-card-purple.svg' alt='ic-card-purple' /> : <img src='Icons/ic-card.svg' alt='ic-card' />}
                      Card
                    </Button>
                  </div>
                </div>
                </Col>
              </Row>
            </div>
            <div className="work-body">
              <div className='btn-filter-d'>
                {tabActiveNavbar !== 'MAP' && <Toolbar type={type} />}
              </div>
              <Tabs destroyInactiveTabPane={true}
                defaultActiveKey={displayedTabKey[0]}
                activeKey={tabKey}
                onChange={(key) => {
                  setTabKey(key);
                  if(type === WORK_PLAN){
                    setPrioritySelected([]);
                    setJurisdictionSelected([]);
                    setProjectStatusesSelected([]);
                  }
                  setIsLocatedInSouthPlateRiverSelected([])
                  if (year < YEAR_LOGIC_2024) {
                    setCountiesSelected([]);
                    setServiceAreasSelected([]);
                  }
                }} className="tabs-work">
                {
                  displayedTabKey.map((tk: string) => (
                    <TabPane tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style">{tk} </Popover> </span>} key={tk}>
                        {ListWork &&
                        <TableListView />                          
                        }{!ListWork && <div><div className="work-table"
                        ref={wrtRef}>
                        <ColumsTrelloCard                         
                          flagforScroll={flagforScroll} 
                          type={type}/>                          
                      </div>
                      <RequestCostRows />
                      </div>}                     
                    </TabPane>
                  ))
                }
              </Tabs>
            </div>
            <Button className="btn-scroll"
              onClick={() => scrollToRight()}>
              <RightOutlined />
            </Button>
          </Col>
        </Row>
      }
    </Layout>
  )
}

export default RequestView;