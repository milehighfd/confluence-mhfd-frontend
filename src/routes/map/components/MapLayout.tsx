import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import Map from './Map';
import MapView from './MapView';
import Navbar from "../../../../src/Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../../../src/Components/Shared/Sidebar/SidebarView";
import LoadingView from '../../../Components/Loading/LoadingView';
import {
  COMPLETE_SCREEN,
  MAP_RESIZABLE_TRANSITION,
  PROBLEMS_TRIGGER,
  PROJECTS_MAP_STYLES,
  MEDIUM_SCREEN_LEFT
} from "../constants/layout.constants";
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';
import { useNotesState } from '../../../hook/notesHook';
import { useProfileState } from '../../../hook/profileHook';
import { useAppUserDispatch } from '../../../hook/useAppUser';
import { SELECT_ALL_FILTERS } from '../../../constants/constants';
import { SERVER } from "../../../Config/Server.config";
import * as datasets from "../../../Config/datasets";

const MapLayout = () => {
  const {
    updateSelectedLayers,
    getMapWithSublayers,
    getMapLayers
  } = useMapDispatch();

  const {
    selectedLayers
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

  const loadData = (trigger: any, name?: string) => {
    return new Promise((resolve) => {
      const requestData = { table: trigger };
      datasets.postData(SERVER.MAP_TABLES, requestData, datasets.getToken())
        .then(tiles => {
          resolve(true);
          if (name) getMapWithSublayers(trigger, tiles, name);
          else getMapLayers(trigger, tiles);
        });
    });
  }

  useEffect(() => {
    getUserInformation();
    const promises: Promise<any>[] = [];
    SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          promises.push(loadData(subKey, layer.name));
        });
      } else {
        promises.push(loadData(layer));
      }
    });
    Promise.all(promises)
      .then(() => {
        setLoaded(true);
      })
  }, []);

  useEffect(() => {
    if (open) {
      closeWidth();
    } else {
      openWidth();
    }
  }, [open]);
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
        <Layout className="map-00">
          {
            (longitude && latitude && loaded) ? (
              <Row>
                <Col
                  xs={{ span: 24 }}
                  className={open ? "height-mobile padding-comment" : "height-mobile"}
                  style={{ transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's' }}
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
                  style={{ transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's' }}
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
