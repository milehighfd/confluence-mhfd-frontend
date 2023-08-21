import { RightOutlined } from '@ant-design/icons';
import { Layout, Button, Row, Col, Tabs, Popover } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getBoardData3, getLocalitiesByBoardType } from 'dataFetching/workRequest';
import useFakeLoadingHook from 'hook/custom/useFakeLoadingHook';
import { useMyUser, useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { boardType } from 'Components/Work/Request/RequestTypes';
import { defaultColumns } from 'Components/Work/Request/RequestViewUtil';
import ColumsTrelloCard from 'Components/Work/Request/ColumsTrelloCard';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import Toolbar from 'routes/work-request/components/Toolbar';
import YearDropdown from 'routes/work-request/components/YearDropdown';
import RequestCostRows from 'routes/work-request/components/RequestCostRows';
import AutoCompleteDropdown from 'routes/work-request/components/AutoCompleteDropdown';

import '../../../index.scss';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import TableListView from './Toolbar/TableListView';

import { GOVERNMENT_STAFF, NEW_PROJECT_TYPES, WORK_REQUEST, YEAR_LOGIC_2024 } from 'constants/constants';
import MaintenanceTypesDropdown from '../../../routes/work-request/components/MaintenanceTypesDropdown';
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';
const { TabPane } = Tabs;

const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>R&D:</b> Research and Development projects include new stream/rain gages, research, data development, new education and outreach programming, and criteria or guidance development.</div>
]
const RequestView = ({ type, widthMap }: {
  type: boardType,
  widthMap?:any
}) => {
  const {
    showModalProject,
    locality,
    tabKeys,
    tabKey,
    year,
    sumTotal,
    localityType,
    reqManager,
    localityFilter,
    namespaceId
  } = useRequestState();
  
  const {
    setLocality,
    setTabKey,
    setYear,
    setNamespaceId,
    setBoardStatus,
    setBoardSubstatus,
    setBoardComment,
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
    setTotalCountyBudget,
    setIsListView,
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
  const { userInformation, groupOrganization, isLocalGovernment, locality: profileLocality } = useProfileState();
  const { saveBoardProjecttype } = useProfileDispatch();
  const users = useMyUser();
  const fakeLoading = useFakeLoadingHook(tabKey);
  const [selectView, setSelectView] = useState('card');
  const {status} = useProjectState();
  const { openNotification } = useNotifications();
  const [maintenanceSubType, setMaintenanceSubType] = useState<any>(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES.Debris_Management);


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
    // console.log('success---------------------------', status);
    if(status === 1){
      openNotification('Success! Your project was saved!', "success");
      console.log('success');
    }
  }, [status]);
  useEffect(() => {
    if (!showCreateProject) {
      resetOnClose();
    }
  }, [showCreateProject]);

  useEffect(() => {
    saveBoardProjecttype(tabKey);
  }, [tabKey]);

  useEffect(() => {
    const initLoading = async () => {
      let params = new URLSearchParams(history.location.search)
      let _year = params.get('year');
      let _locality: any; //= params.get('locality'); commented to avoid preserve the same locality for wr and wp
      let _tabKey: any = 'Capital';
      if(params.get('tabKey') !== null){
        _tabKey = params.get('tabKey');
      }
      if (type === WORK_REQUEST && (isLocalGovernment || userInformation.designation === GOVERNMENT_STAFF)) {
        if (isLocalGovernment) {
          _locality = profileLocality;
        } else if (userInformation.designation === GOVERNMENT_STAFF) {
          _locality = userInformation.zoomarea;
        }
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
          if(year < YEAR_LOGIC_2024){
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
          }else{
            displayedTabKey = tabKeys;
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
    setIsInitMap(true);
    return () => {
      setLocality(undefined);
      setIsInitMap(true);
    };
  }, [type]);

  useEffect(() => {
    if (!locality || !tabKey) {
      return;
    }
    const loadProjects = async () => {
      const boardKey = {
        type,
        year: `${year}`,
        locality: locality === 'Mile High Flood District' ? 'MHFD District Work Plan' : locality,
        projecttype: tabKey ? (tabKey === 'R&D' ? 'Special' : tabKey) : tabKeys[0],
      }
      setColumns(defaultColumns);
      let board;
      try {
        board = await getBoardData3(boardKey)
      } catch (e) {
        console.log('e', e)
      }

      setBoard(board);
      setNamespaceId(boardKey);
      loadColumns();     
      loadFilters();

      /* TODO: this should be replaced */
      setBoardStatus(board.status);
      setBoardSubstatus(board.substatus);
      setBoardComment(board.comment);
      
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

  const scrollToRight = () => {
    let element: any = wrtRef.current;
    let parent = element.parentElement;
    parent.scroll(parent.scrollWidth, 0);
  }
  useEffect(() => {
    console.log('Locality filter', localityFilter);
    if (localityFilter) {
      onSelect(localityFilter, isInitMap ? 'isinit' : undefined);
    }
  }, [localityFilter]);
  // useEffect(() => {
  //   console.log('Locality', locality);
  //   if (locality) {
  //     // reach on initLoading
  //     onSelect(locality, isInitMap ? 'isinit' : undefined);
  //   }
  // }, [locality]);

  const onSelect = (value: any, isSelect?: any) => {
    setAutocomplete(value);
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name === value)
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.table,
          coordinates: element.coordinates?.coordinates,
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
          coordinates: element.coordinates?.coordinates,
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

  const loadTabkeysDisplayed = () => {
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
        if (locality && locality === 'South Platte River Service Area') {
          displayedTabKey = ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D'];
        }
      }
      if (locality && (locality === 'MHFD District Work Plan' || locality === 'Mile High Flood District' || year >= 2024)) {
        displayedTabKey = tabKeys;
      }
  }
  loadTabkeysDisplayed();
  return (
    <Layout className="work">
      {(fakeLoading) && <LoadingViewOverall />}
      {
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <div className="work-head" >
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <AutoCompleteDropdown type={type} />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}
                  style={{ textAlign: 'right' }}>
                <div className='button-header-tab'>
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    {(selectView === 'list' && namespaceId?.projecttype === 'Maintenance') && <MaintenanceTypesDropdown 
                      setMaintenanceSubType={setMaintenanceSubType}
                      maintenanceSubType={maintenanceSubType}
                    />}
                    <YearDropdown />
                  </div>
                  
                  <div className='button-header'>
                    <Button id='buttons-header' style={selectView === 'card' && widthMap === 15 ? {display:'none'}:{}} className={selectView === 'list' ? 'ico-header-tab-active' : 'ico-header-tab'}
                    onClick={() => { 
                      setSelectView( 'list') 
                      setIsListView(true)
                    }}>
                      {selectView === 'list' ? <img src='Icons/ic-list-purple.svg' alt='ic-list-purple' /> : <img src='Icons/ic-list.svg' alt='ic-list' />}
                      List
                    </Button>
                    <Button id='buttons-header'  style={selectView === 'list' && widthMap === 15 ? {display:'none'}:{}} className={selectView === 'card' ? 'ico-header-tab-active' : 'ico-header-tab'} onClick={() => { 
                      setSelectView('card') 
                      setIsListView(false)
                    }}>
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
                {tabActiveNavbar !== 'MAP' && widthMap !== 15 && <Toolbar type={type} />}
              </div>
              <Tabs destroyInactiveTabPane={true}
                defaultActiveKey={displayedTabKey[0]}
                activeKey={tabKey}
                onChange={(key) => {
                  setTabKey(key);
                  setIsLocatedInSouthPlateRiverSelected([]);
                }} className="tabs-work">
                {
                  displayedTabKey.map((tk: string) => (
                    <TabPane tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style">{tk} </Popover> </span>} key={tk}>
                        { selectView === 'list' &&
                        <TableListView maintenanceSubType={maintenanceSubType} />
                        }{selectView === 'card' && <div><div className="work-table"
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
