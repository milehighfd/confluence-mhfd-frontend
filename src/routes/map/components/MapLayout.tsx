import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, message } from 'antd';

import Map from './Map';
import MapView from './MapView';
import Navbar from "../../../routes/profile-view/components/NavbarContainer";
import SidebarView from "../../profile-view/components/SidebarView";
import LoadingView from '../../../Components/Loading/LoadingView';

import { COMPLETE_SCREEN, EMPTY_SCREEN, MAP_RESIZABLE_TRANSITION, PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MEDIUM_SCREEN_RIGHT, MEDIUM_SCREEN_LEFT } from "../constants/layout.constants";

import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';
import { useNotesState } from '../../../hook/notesHook';
import { useProfileState } from '../../../hook/profileHook';

const MapLayout = () => {
    const {
      clearErrorMessage,
      updateSelectedLayers,
    } = useMapDispatch();

    const {
      error,
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
    const [rotationStyle, setRotationStyle] = useState(emptyStyle);
    const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_LEFT);
    const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_RIGHT);
    const [isExtendedView, setCompleteView] = useState(false);
    const { tutorialStatus } = useMapState();
    const { status } = useProjectState();
    const { open } = useNotesState();
    const { setSave } = useProjectDispatch();
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
      if (error) {
        message.error(error);
        clearErrorMessage();
      }
    }, [clearErrorMessage, error]);
    useEffect(() => {
      if (tutorialStatus) {
        setLeftWidth(MEDIUM_SCREEN_LEFT);
        setRightWitdh(MEDIUM_SCREEN_RIGHT);
        setRotationStyle(emptyStyle);
      }
    }, [tutorialStatus])
    const closeWidth = () => {
      setLeftWidth(COMPLETE_SCREEN);
      setRightWitdh(EMPTY_SCREEN);
      setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
    }
    const openWidth = () => {
      setLeftWidth(MEDIUM_SCREEN_LEFT);
      setRightWitdh(MEDIUM_SCREEN_RIGHT);
      setRotationStyle(emptyStyle);
    }
    const updateWidth = () => {
      if (leftWidth === MEDIUM_SCREEN_LEFT) {
        setLeftWidth(COMPLETE_SCREEN);
        setRightWitdh(EMPTY_SCREEN);
        setRotationStyle({ transform: 'rotate(180deg)', marginRight: '-4px', right: '4px', position: 'relative' });
      } else {
        setLeftWidth(MEDIUM_SCREEN_LEFT);
        setRightWitdh(MEDIUM_SCREEN_RIGHT);
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
            {!longitude && !latitude && <LoadingView />}
            {longitude && latitude && <Row>
              <Col xs={{ span: 24 }} className={open ? "height-mobile padding-comment" : "height-mobile"} style={{ transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's' }} lg={leftWidth}>
                <Map
                  leftWidth={leftWidth}
                />
                <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} className="menu-mobile" style={{ transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's' }} lg={rightWidth}>
                <MapView />
              </Col>
            </Row>}
          </Layout>
        </Layout>
      </Layout>
    );
};

export default MapLayout;
