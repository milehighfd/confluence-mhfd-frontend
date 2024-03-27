import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import LoadingView from 'Components/Loading/LoadingView';
import {
  COMPLETE_SCREEN,
  PROJECTS_MAP_STYLES,
  MEDIUM_SCREEN_LEFT,
} from 'routes/map/constants/layout.constants';
import { MAP_TAB, MAP, MEDIUM_SCREEN_RIGHT, PROBLEMS_TRIGGER, WORK_PLAN, WORK_REQUEST } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useNotesState } from 'hook/notesHook';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { SELECT_ALL_FILTERS } from 'constants/constants';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { FiltersContext } from 'utils/filterContext';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { BoardDataRequest } from 'Components/Work/Request/RequestTypes';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';
import Analytics from 'Components/Work/Drawers/Analytics';
import Status from 'Components/Work/Drawers/Status';
import Filter from 'Components/Work/Drawers/Filter';
import NavbarView from 'Components/Shared/Navbar/NavbarView';
import RequestView from 'Components/Work/Request/RequestView';
import Map from 'routes/map/components/Map';
import MapView from 'routes/map/components/MapView';
import ModalProjectsCreate from 'Components/ProjectModal/ModalProjectsCreate';

const MapLayout = () => {
  const {
    updateSelectedLayers,
    getMapWithSublayers,
    getMapLayers,
  } = useMapDispatch();

  const {
    selectedLayers,
    galleryProjectsV2,
    tabActiveNavbar,
  } = useMapState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {
    userInformation: {
      coordinates
    }
  } = useProfileState();
  useEffect(() => {
    if (coordinates) {
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);
    }
  }, [coordinates]);
  const emptyStyle: React.CSSProperties = {};
  const [loaded, setLoaded] = useState(false);
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidthMap, setLeftWidthMap] = useState(MEDIUM_SCREEN_LEFT);
  const [isExtendedView, setCompleteView] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false); // is set on open notes sidebar
  const { tutorialStatus } = useMapState();
  const { status } = useProjectState();
  const { open } = useNotesState();
  const { setSave } = useProjectDispatch();
  const { getUserInformation } = useProfileDispatch();
  const [safeLoading, setSafeLoading] = useState(false);

  const {
    showModalProject,
    completeProjectData,
    locality,
    year,
    tabKey,
    tabKeys,
    showCreateProject,
    problemId,
    showBoardStatus,
    leftWidth,
    showFilters,
    visibleCreateProject,
    visibleCreateOrImport
  } = useRequestState();
  const {
    setShowModalProject,
    setShowCreateProject,
    setShowBoardStatus,
    setVisibleCreateProject,
    setVisibleCreateOrImport,
    setLeftWidth,
    setShowFilters,
  } = useRequestDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const currentDataForBoard: BoardDataRequest = {
    type: tabActiveNavbar === WORK_REQUEST ? WORK_REQUEST: WORK_PLAN,
    year: `${year}`,
    locality,
    projecttype: tabKey ? tabKey : tabKeys[0],
    position: ''
  };
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

  // useEffect(() => {
  //   // getUserInformation();
  //   const promises: Promise<any>[] = [];
  //   const controllers: AbortController[] = [];
  //   const stringTables: string[] = [];
  //   SELECT_ALL_FILTERS.forEach((layer) => {
  //     if (typeof layer === 'object') {
  //       layer.tiles.forEach((subKey: string) => {
  //         const [controller, promise] = loadData(subKey, layer.name);
  //         stringTables.push(subKey);
  //         promises.push(promise);
  //         controllers.push(controller);
  //       });
  //     } else {
  //       const [controller, promise] = loadData(layer);
  //       stringTables.push(layer);
  //       promises.push(promise);
  //       controllers.push(controller);
  //     }
  //   });
  //   //ALL_MAP_TABLES
  //   if (stringTables.length > 0) {
  //     datasets.postData(
  //       SERVER.ALL_MAP_TABLES,
  //       { tables: stringTables },
  //       datasets.getToken()
  //     ).then((res: any): void => {
  //       console.log('res', res)
  //     });
  //   }
  //   console.log('stringTables', stringTables)
  //   Promise.all(promises)
  //     .then(() => {
  //       setLoaded(true);
  //       setSafeLoading(true);
  //       setTimeout(() =>{
  //         setSafeLoading(false);
  //       }, 10000);
  //     })
  //   return () => {
  //     controllers.forEach((controller) => {
  //       controller.abort();
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const initialTables = SELECT_ALL_FILTERS.flatMap(layer =>
      typeof layer === 'object' ? layer.tiles : [layer]
    );

    const filteredTables = initialTables.filter(table => !table.includes('milehighfd'));

    if (filteredTables.length > 0) {
      datasets.postData(
        SERVER.ALL_MAP_TABLES,
        { tables: filteredTables },
        datasets.getToken()
      ).then((response) => {
        SELECT_ALL_FILTERS.forEach(filter => {
          if (typeof filter === 'object' && filter.tiles) {
            filter.tiles.forEach(subKey => {
              const tableData = response.find((table: any) => table.table === subKey);
              if (tableData) {
                getMapWithSublayers(subKey, tableData.data, filter.name);
              }
            });
          } else {
            const tableData = response.find((table: any) => table.table === filter);
            if (tableData) {
              getMapLayers(filter, tableData.data);
            }
          }
        });

        setLoaded(true);
        setSafeLoading(true);
        setTimeout(() => {
          setSafeLoading(false);
        }, 10000);
      }).catch(error => console.error('Error fetching map tables:', error));
    }
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
  }, [tutorialStatus,visibleCreateProject, visibleCreateOrImport])
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
    setShowBoardStatus(false);
    setShowFilters(false);
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
      { <Analytics /> }
      {
        showBoardStatus && <Status />
      }
      {
        showFilters && <Filter origin="MAPLAYOUT"/>
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
      {
        visibleCreateOrImport && <ModalProjectsCreate
        visible= {visibleCreateOrImport}
        setVisible= {setVisibleCreateOrImport}
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
                    lg={tabActiveNavbar === MAP ? (screenWidth > 2500 ? leftWidthMap + 1 : leftWidthMap): { span: screenWidth > 2500 ? leftWidth + 1: leftWidth }}
                  >
                    <Map
                      leftWidth={tabActiveNavbar === MAP ? (screenWidth > 2500 ? leftWidthMap + 1 : leftWidthMap) : (screenWidth > 2500 ? leftWidth + 1: leftWidth)}
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
                    lg={24 - (tabActiveNavbar === MAP ? (screenWidth > 2500 ? leftWidthMap + 1 : leftWidthMap) : (screenWidth > 2500 ? leftWidth + 1: leftWidth))}
                  >
                   {tabActiveNavbar === MAP && <MapView />}
                   {(tabActiveNavbar === WORK_REQUEST || tabActiveNavbar === WORK_PLAN) && <RequestView
                      type={tabActiveNavbar}
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
