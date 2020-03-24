import React, { useState, useEffect } from 'react';

import Map from '../Components/Map/Map';
import NavbarView from "../Components/Shared/Navbar/NavbarView";
import SidebarView from "../Components/Shared/Sidebar/SidebarView";

import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../constants/constants";
import { Redirect } from "react-router-dom";

import { Layout, Row, Col, Button, message } from 'antd';
import { MapHOCProps } from '../Classes/MapTypes';

export default function (WrappedComponent : any, layers : any) {
    return ({ problems, projects, components, saveNewCapitalForm, saveNewStudyForm, createNewProjectForm, getReverseGeocode, savePolygonCoordinates, saveMarkerCoordinates, redirect, setRouteRedirect, error, clearErrorMessage } : MapHOCProps) => {

        const emptyStyle: React.CSSProperties = {};
        const [rotationStyle, setRotationStyle] = useState(emptyStyle);
        const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
        const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
        const [selectedItems, setSelectedItems] = useState([]);
        const [isPolygon, setIsPolygon] = useState(false);

        useEffect(() => {
          if(error) {
            message.error(error);
            clearErrorMessage();
          }
        }, [error]);

        const updateWidth = () => {
          if (leftWidth === MEDIUM_SCREEN) {
            setLeftWidth(COMPLETE_SCREEN);
            setRightWitdh(EMPTY_SCREEN);
            setRotationStyle({transform: 'rotate(180deg)'});
          } else {
            setLeftWidth(MEDIUM_SCREEN);
            setRightWitdh(MEDIUM_SCREEN);
            setRotationStyle(emptyStyle);
          }
        }

        if(redirect) { 
          setRouteRedirect(false);
          return <Redirect to='/map' />
        }
      
        return (
            <Layout>
            <NavbarView></NavbarView>
            <Layout>
              <SidebarView></SidebarView>
              <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
                <Row>
                    <Col span={leftWidth}>
                        <Map
                            leftWidth={leftWidth}
                            layers={layers}
                            problems={problems}
                            projects={projects}
                            components={components}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            setIsPolygon={setIsPolygon}
                            getReverseGeocode={getReverseGeocode}
                            savePolygonCoordinates={savePolygonCoordinates}
                            saveMarkerCoordinates={saveMarkerCoordinates} />

                        <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                            <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                        </Button>
                    </Col>
                    <Col span={rightWidth}>
                        <WrappedComponent 
                            selectedItems={selectedItems}
                            isPolygon={isPolygon}
                            setSelectedItems={setSelectedItems}
                            saveNewCapitalForm={saveNewCapitalForm}
                            saveNewStudyForm={saveNewStudyForm}
                            createNewProjectForm={createNewProjectForm} />
                    </Col>
                </Row>
              </Layout>
            </Layout>
          </Layout>
        );
    }
} 
