import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import Navbar from 'Components/Shared/Navbar/NavbarContainer';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import LoadingView from 'Components/Loading/LoadingView';
import {
  COMPLETE_SCREEN,
  PROJECTS_MAP_STYLES,
  MEDIUM_SCREEN_LEFT
} from 'routes/map/constants/layout.constants';
import { MAP, MEDIUM_SCREEN_RIGHT, PROBLEMS_TRIGGER, WORK_PLAN, WORK_REQUEST } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useNotesState } from 'hook/notesHook';
import { useProfileState } from 'hook/profileHook';
import { useAppUserDispatch } from 'hook/useAppUser';
import { SELECT_ALL_FILTERS } from 'constants/constants';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { FiltersContext } from 'utils/filterContext';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import ConfigurationService from 'services/ConfigurationService';
import { BoardDataRequest } from 'Components/Work/Request/RequestTypes';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';
import Analytics from 'Components/Work/Drawers/Analytics';
import Status from 'Components/Work/Drawers/Status';
import Filter from 'Components/Work/Drawers/Filter';
import NavbarView from 'Components/Shared/Navbar/NavbarView';
import RequestView from 'Components/Work/Request/RequestView';
import { setBoardStatus } from 'store/actions/requestActions';

const Map = React.lazy(() => import('routes/map/components/Map'));
const MapView = React.lazy(() => import('routes/map/components/MapView'));

const MapLayout = () => {
  const {
    updateSelectedLayers,
    getMapWithSublayers,
    getMapLayers,
    setTabActiveNavbar
  } = useMapDispatch();

  const {
    selectedLayers,
    galleryProjectsV2,
    tabActiveNavbar
  } = useMapState();
  const {
    userInformation: {
      coordinates: {
        latitude,
        longitude
      }
    }
  } = useProfileState();
  const emptyStyle: React.CSSProperties = {};
  const [loaded, setLoaded] = useState(false);
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidthMap, setLeftWidthMap] = useState(MEDIUM_SCREEN_LEFT);
  const [isExtendedView, setCompleteView] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false); // is set on open notes sidebar
  const { tutorialStatus } = useMapState();
  const { status } = useProjectState();
  const { open } = useNotesState();
  // const [tabMapActive, setOptionSelect] = useState(MAP);
  const { setSave } = useProjectDispatch();
  const { getUserInformation } = useAppUserDispatch();
  const [safeLoading, setSafeLoading] = useState(false);
//WORK REQUEST-WORK-PLAN
  const {
    showModalProject,
    completeProjectData,
    locality,
    year,
    tabKey,
    tabKeys,
    showCreateProject,
    problemId,
    namespaceId,
    showBoardStatus,
    boardStatus,
    boardSubstatus,
    boardComment,
    leftWidth,
    showFilters,
    visibleCreateProject,
    showAlert,
    alertStatus,
  } = useRequestState();
  const {
    setShowModalProject,
    setShowCreateProject,
    setShowBoardStatus,
    setAlertStatus,
    setShowAlert,
    setVisibleCreateProject,
    setYearList,
    setLeftWidth,
    setShowFilters,
  } = useRequestDispatch();
  const currentDataForBoard: BoardDataRequest = {
    type: tabActiveNavbar === WORK_REQUEST ? WORK_REQUEST: WORK_PLAN,
    year: `${year}`,
    locality,
    projecttype: tabKey ? tabKey : tabKeys[0],
    position: ''
  };

  const onUpdateBoard = () => {
    //This fn is intented to be used to reload getBoardData2
  }

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
      setYearList(array);
    }
    initLoading();
  }, [setYearList]);

  // END WORK REQUEST-WORK-PLAN

  const loadData = (trigger: any, name?: string): any => {
    const controller = new AbortController();
    return [controller, new Promise((resolve) => {
      const requestData = { table: trigger };
      if (!trigger.includes('milehighfd')) {
        datasets.postData(
          SERVER.MAP_TABLES,
          requestData,
          datasets.getToken(),
          controller.signal
        ).then(tiles => {
            resolve(true);
            if (tiles.length > 0) {
              if (name) getMapWithSublayers(trigger, tiles, name);
              else getMapLayers(trigger, tiles);
            }
        });
      } else {
        resolve(true);
      }
    })];
  }

  useEffect(() => {
    getUserInformation();
    const promises: Promise<any>[] = [];
    const controllers: AbortController[] = [];
    SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          const [controller, promise] = loadData(subKey, layer.name);
          promises.push(promise);
          controllers.push(controller);
        });
      } else {
        const [controller, promise] = loadData(layer);
        promises.push(promise);
        controllers.push(controller);
      }
    });
    Promise.all(promises)
      .then(() => {
        setLoaded(true);
        setSafeLoading(true);
        setTimeout(() =>{
          setSafeLoading(false);
        }, 10000);
      })
    return () => {
      controllers.forEach((controller) => {
        controller.abort();
      });
    };
  }, []);

  useEffect(() => {
    if (open) {
      closeWidth();
    } else {
      openWidth();
    }
  }, [open]);
  useEffect(() => {
    if(galleryProjectsV2.length === 0){
      setLoaded(false);
    }else{
      setLoaded(true);
    }
  },[galleryProjectsV2])
  useEffect(() => {
    if (status === 1 || status === 0) {
      setSave(2);
    };
  }, [status]);

  useEffect(() => {
    if (tutorialStatus) {
      setLeftWidthMap(MEDIUM_SCREEN_LEFT);
      setRotationStyle(emptyStyle);
    }
  }, [tutorialStatus])
  const closeWidth = () => {
    setLeftWidthMap(COMPLETE_SCREEN);
    setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
  }
  const openWidth = () => {
    setLeftWidthMap(MEDIUM_SCREEN_LEFT);
    setRotationStyle(emptyStyle);
  }
  const updateWidth = () => {
    if(tabActiveNavbar === MAP){
      if (leftWidthMap === MEDIUM_SCREEN_LEFT) {
        setLeftWidthMap(COMPLETE_SCREEN);
        setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
      } else {
        setLeftWidthMap(MEDIUM_SCREEN_LEFT);
        setRotationStyle(emptyStyle);
        const copySelectedLayers = [...selectedLayers];
        if (!copySelectedLayers.includes(PROBLEMS_TRIGGER)) {
          copySelectedLayers.push(PROBLEMS_TRIGGER);
        }
        if (!copySelectedLayers.includes(PROJECTS_MAP_STYLES)) {
          copySelectedLayers.push(PROJECTS_MAP_STYLES);
        }
        updateSelectedLayers(copySelectedLayers);
      }
    }else{
      if (leftWidth === (MEDIUM_SCREEN_RIGHT - 1)) {
        setLeftWidth(MEDIUM_SCREEN_LEFT);
        setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
      } else {
        setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
        setRotationStyle(emptyStyle);
      }
    }
    setCompleteView(!isExtendedView);
  }
  useEffect(() => {
    if(commentVisible && leftWidth === (MEDIUM_SCREEN_RIGHT - 1)){
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    }else {
      setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
      setRotationStyle(emptyStyle);
    }
  }, [commentVisible]);

  useEffect(() => {
    setLeftWidthMap(MEDIUM_SCREEN_LEFT);
    setLeftWidth(MEDIUM_SCREEN_RIGHT - 1);
    setRotationStyle(emptyStyle);
    if(commentVisible){      
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    }
    setBoardStatus(false)
    setShowFilters(false)
  },[tabActiveNavbar])
  return (
    <>
    {/* WORK-PLAN-ComPONMENTS */}
      {
        showModalProject &&
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
      }
      {
        showCreateProject &&
        <ModalProjectView
          visible={showCreateProject}
          setVisible={setShowCreateProject}
          data={"no data"}
          showDefaultTab={true}
          locality={locality}
          editable={true}
          problemId={problemId}
          currentData={currentDataForBoard}
          year={year}
        />
      }
      {
        <Analytics
          type={tabActiveNavbar === WORK_REQUEST ? WORK_REQUEST: WORK_PLAN}
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
          type={tabActiveNavbar === WORK_REQUEST ? WORK_REQUEST: WORK_PLAN}
          setAlertStatus={setAlertStatus}
          setShowAlert={setShowAlert}
          onUpdateHandler={onUpdateBoard}
        />
      }
      {
        showFilters && <Filter/>
      }
      {
        visibleCreateProject &&
        <ModalProjectView
          visible={visibleCreateProject}
          setVisible={setVisibleCreateProject}
          data={"no data"}
          defaultTab={tabKey}
          locality={locality}
          editable={true}
          currentData={currentDataForBoard}
          year={year}
        />
      }
     {/* END-WORK-PLAN-ComPONMENTS */}
      <Layout key={'main-map'}>
        <NavbarView />
        <FiltersContext>
        <Layout>
          <SidebarView></SidebarView>
          {safeLoading && <LoadingViewOverall />}
          <Layout className="map-00">
            {
              !!(longitude && latitude && loaded) ? (
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    className={open ? "padding-comment transition-map" : "transition-map"}
                    lg={tabActiveNavbar === MAP ? leftWidthMap: { span: leftWidth }}
                  >
                    <Map
                      leftWidth={tabActiveNavbar === MAP ? leftWidthMap : leftWidth}
                      commentVisible={commentVisible}
                      setCommentVisible={setCommentVisible}
                    />
                    <Button className="btn-coll" onClick={updateWidth} disabled={tabActiveNavbar!==MAP && commentVisible}>
                      <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
                    </Button>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    className="menu-mobile"
                    lg={24 - (tabActiveNavbar === MAP ? leftWidthMap : leftWidth)}
                  >
                   {tabActiveNavbar === MAP && <MapView />}
                   {tabActiveNavbar === WORK_REQUEST && <RequestView
                      type={tabActiveNavbar}
                      isFirstRendering={true}
                      widthMap={leftWidth}
                    />}
                   {tabActiveNavbar === WORK_PLAN && <RequestView
                      type={tabActiveNavbar}
                      isFirstRendering={true}
                      widthMap={leftWidth}
                    />}
                  </Col>
                </Row>
            ) : <LoadingView />
            }
          </Layout>
        </Layout>
        </FiltersContext>
      </Layout>
    </>
  );
};

export default MapLayout;
