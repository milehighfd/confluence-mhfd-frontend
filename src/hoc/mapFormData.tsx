import React, { useState, useEffect, useRef } from 'react';

import Map from '../Components/Map/Map';
import NavbarView from "../Components/Shared/Navbar/NavbarView";
import SidebarView from "../Components/Shared/Sidebar/SidebarView";

import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../constants/constants";
import { Redirect } from "react-router-dom";

import { Layout, Row, Col, Button, message } from 'antd';
import { MapHOCProps, ProjectTypes, MapLayersType } from '../Classes/MapTypes';

export default function (WrappedComponent : any, layers : MapLayersType) {
    return ({ problems, 
              projects, 
              projectsByType,
              components, 
              filters,
              panel,
              dropdowns,
              userFiltered,
              layerFilters,
              saveNewCapitalForm, 
              saveNewStudyForm, 
              createNewProjectForm, 
              getReverseGeocode, 
              savePolygonCoordinates, 
              saveMarkerCoordinates, 
              redirect, 
              setRouteRedirect, 
              error, 
              clearErrorMessage, 
              getProjectWithFilters, 
              removeFilter, 
              getMapTables, 
              getDropdownFilters, 
              getUserFilters, 
              getPolygonStreams, saveDraftCard, getUserProjects } : MapHOCProps) => {

        const emptyStyle: React.CSSProperties = {};
        const [rotationStyle, setRotationStyle] = useState(emptyStyle);
        const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
        const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
        const [selectedItems, setSelectedItems] = useState([]);
        const [isPolygon, setIsPolygon] = useState(false);
        const [formatedProjects, setFormatedProjects] = useState<any>([]);

        let markerRef = useRef<HTMLDivElement>(null);
        let polygonRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if(error) {
            message.error(error);
            clearErrorMessage();
          }
        }, [clearErrorMessage, error]);

        useEffect(() => {
          const newProjects = projectsByType.maintenance.map((project : ProjectTypes) => {
            const newProject : ProjectTypes = { ...project };
            newProject.coordinates = JSON.parse(project.coordinates as string);
            return newProject;
          });
          setFormatedProjects(newProjects);
        }, [projectsByType]);

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
                            projects={formatedProjects}
                            components={components}
                            layerFilters={layerFilters}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            setIsPolygon={setIsPolygon}
                            getReverseGeocode={getReverseGeocode}
                            savePolygonCoordinates={savePolygonCoordinates}
                            saveMarkerCoordinates={saveMarkerCoordinates}
                            getMapTables={getMapTables}
                            markerRef={markerRef}
                            polygonRef={polygonRef}
                            getPolygonStreams={getPolygonStreams} />

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
                            createNewProjectForm={createNewProjectForm}
                            getProjectWithFilters={getProjectWithFilters}
                            getDropdownFilters={getDropdownFilters}
                            filters={filters}
                            panel={panel}
                            saveDraftCard={saveDraftCard}
                            dropdowns={dropdowns}
                            userFiltered={userFiltered}
                            getUserFilters={getUserFilters}
                            removeFilter={removeFilter} 
                            projects={projects}
                            projectsByType={projectsByType}
                            markerRef={markerRef}
                            polygonRef={polygonRef}
                            getUserProjects={getUserProjects} />
                    </Col>
                </Row>
              </Layout>
            </Layout>
          </Layout>
        );
    }
} 
