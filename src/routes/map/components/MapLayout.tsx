import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Button } from 'antd';
import {
  COMPLETE_SCREEN,
  PROJECTS_MAP_STYLES,
  MEDIUM_SCREEN_LEFT
} from 'routes/map/constants/layout.constants';
import { GOVERNMENT_STAFF, MAP, MEDIUM_SCREEN_RIGHT, PROBLEMS_TRIGGER, WORK_PLAN, WORK_REQUEST } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useNotesState } from 'hook/notesHook';
import { useProfileState } from 'hook/profileHook';
import { useAppUserDispatch } from 'hook/useAppUser';
import { SELECT_ALL_FILTERS } from 'constants/constants';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import ConfigurationService from 'services/ConfigurationService';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import RequestView from 'Components/Work/Request/RequestView';
import Map from 'routes/map/components/Map';
import MapView from 'routes/map/components/MapView';

const MapLayout = () => {
  const {
    updateSelectedLayers,
    getMapWithSublayers,
    getMapLayers,
  } = useMapDispatch();

  const {
    selectedLayers,
    galleryProjectsV2,
    tabActiveNavbar
  } = useMapState();
  const {
    isLocalGovernment,
    userInformation: {
      designation,
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
  const { setSave } = useProjectDispatch();
  const { getUserInformation } = useAppUserDispatch();
  const [safeLoading, setSafeLoading] = useState(false);

  const { leftWidth } = useRequestState();
  const {
    setShowBoardStatus,
    setYearList,
    setLeftWidth,
    setShowFilters,
    setConfiguredYear,
  } = useRequestDispatch();

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
        if (i === 0 && (isLocalGovernment || designation === GOVERNMENT_STAFF) && tabActiveNavbar === WORK_PLAN) {
          continue;
        }
        array.push(boardYearLimit - i);
      }
      setConfiguredYear(boardYearLimit);
      setYearList(array);
    }
    initLoading();
  }, [isLocalGovernment, setYearList, tabActiveNavbar]);

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
    setShowBoardStatus(false);
    setShowFilters(false);
  },[tabActiveNavbar]);

  return (
    <Fragment>
      {safeLoading && <LoadingViewOverall />}
      {
        !!(longitude && latitude && loaded) && (
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
              {(tabActiveNavbar === WORK_REQUEST || tabActiveNavbar === WORK_PLAN) && <RequestView
                type={tabActiveNavbar}
                widthMap={leftWidth}
              />}
            </Col>
          </Row>
        )
      }
    </Fragment>
  );
};

export default MapLayout;
