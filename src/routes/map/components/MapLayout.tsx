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
import { PROBLEMS_TRIGGER } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useNotesState } from 'hook/notesHook';
import { useProfileState } from 'hook/profileHook';
import { useAppUserDispatch } from 'hook/useAppUser';
import { SELECT_ALL_FILTERS } from 'constants/constants';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';

const Map = React.lazy(() => import('routes/map/components/Map'));
const MapView = React.lazy(() => import('routes/map/components/MapView'));

const MapLayout = () => {
  const {
    updateSelectedLayers,
    getMapWithSublayers,
    getMapLayers
  } = useMapDispatch();

  const {
    selectedLayers,
    galleryProjectsV2,
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
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_LEFT);
  const [isExtendedView, setCompleteView] = useState(false);
  const { tutorialStatus } = useMapState();
  const { status } = useProjectState();
  const { open } = useNotesState();
  const { setSave } = useProjectDispatch();
  const { getUserInformation } = useAppUserDispatch();
  const [safeLoading, setSafeLoading] = useState(false);

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
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRotationStyle(emptyStyle);
    }
  }, [tutorialStatus])
  const closeWidth = () => {
    setLeftWidth(COMPLETE_SCREEN);
    setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
  }
  const openWidth = () => {
    setLeftWidth(MEDIUM_SCREEN_LEFT);
    setRotationStyle(emptyStyle);
  }
  const updateWidth = () => {
    if (leftWidth === MEDIUM_SCREEN_LEFT) {
      setLeftWidth(COMPLETE_SCREEN);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    } else {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
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
    setCompleteView(!isExtendedView);
  }

  return (
    <Layout>
      <Navbar />
      <Layout>
        <SidebarView></SidebarView>
        {safeLoading && <LoadingViewOverall />}
        <Layout className="map-00">
          {
            (longitude && latitude && loaded) ? (
              <Row>
                <Col
                  xs={{ span: 24 }}
                  className={open ? "height-mobile padding-comment" : "height-mobile"}
                  style={{ transition: 'all 0.7s' , zIndex:1, background:'white'}}
                  lg={leftWidth}
                >
                  <Map
                    leftWidth={leftWidth}
                  />
                  <Button className="btn-coll" onClick={updateWidth}>
                    <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
                  </Button>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  className="menu-mobile"
                  style={{ transition: 'all 0.7s' }}
                  lg={24 - leftWidth}
                >
                  <MapView />
                </Col>
              </Row>
           ) : <LoadingView />
          }
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MapLayout;
