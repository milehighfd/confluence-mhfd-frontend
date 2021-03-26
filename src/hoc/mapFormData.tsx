import React, { useState, useEffect, useRef } from 'react';

import Map from '../Components/Map/Map';
import Navbar from "../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../Components/Shared/Sidebar/SidebarView";
import LoadingView from '../Components/Loading/LoadingView';

import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN, MAP_RESIZABLE_TRANSITION, PROBLEMS_TRIGGER, PROJECTS_MAP_STYLES, MEDIUM_SCREEN_RIGHT, MEDIUM_SCREEN_LEFT } from "../constants/constants";
import { Redirect } from "react-router-dom";

import { Layout, Row, Col, Button, message, Spin } from 'antd';
import { MapHOCProps, ProjectTypes, MapLayersType } from '../Classes/MapTypes';
import { useMapState } from '../hook/mapHook';
import { useProjectDispatch, useProjectState} from '../hook/projectHook';
import { AlertViewSave } from '../Components/Alerts/AlertViewSave';

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
              latitude,
              longitude,
              clearErrorMessage,
              getProjectWithFilters,
              removeFilter,
              getMapTables,
              getDropdownFilters,
              getUserFilters,
              getPolygonStreams,
              saveDraftCard,
              getUserProjects,
              sortProjects,
              updateSelectedLayers,
              getGalleryProblems,
              getGalleryProjects,
              galleryProblems,
              saveUserInformation,
              polygon,
              selectedLayers,
              galleryProjects,
              getDetailedPageProblem,
              getDetailedPageProject,
              detailed,
              loaderDetailedPage,
              setFilterCoordinates,
              filterProblemOptions,
              filterProjectOptions,
              filterCoordinates,
              setFilterProblemOptions,
              setFilterProjectOptions,
              paramFilters,
              highlighted,
              setHighlighted,
              spinFilter,
              setFilterComponentOptions,
              filterComponentOptions,
              filterProblems,
              filterProjects,
              spinCardProblems,
              spinCardProjects,
              getComponentsByProblemId,
              filterComponents,
              componentsOfProblems,
              setProblemKeyword,
              setProjectKeyword,
              existDetailedPageProject,
              existDetailedPageProblem,
              displayModal,
              componentDetailIds,
              loaderTableCompoents,
              selectedOnMap,
              setSelectedOnMap,
              getParamsFilter,
              mapSearchQuery,
              mapSearch,
              groupOrganization,
              applyFilter,
              setApplyFilter,
              componentCounter,
              getComponentCounter,
              setZoomProjectOrProblem,
              zoom
             } : MapHOCProps) => {
        const emptyStyle: React.CSSProperties = {};
        const [rotationStyle, setRotationStyle] = useState(emptyStyle);
        const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN_LEFT);
        const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN_RIGHT);
        const [selectedItems, setSelectedItems] = useState([]);
        const [isPolygon, setIsPolygon] = useState(false);
        const [formatedProjects, setFormatedProjects] = useState<any>([]);
        const [spinValue, setSpinValue] = useState(true);
        const [isExtendedView, setCompleteView] = useState(false);
        const { tutorialStatus } =useMapState();
        const {status} = useProjectState(); 
        const [visibleSave, setVisibleSave] = useState(false);
        const [statusSave, setStatusSave] = useState(2);
        const {setSave} = useProjectDispatch();
        useEffect(()=>{
          console.log(status,"status++++")
          if(status === 1 || status ===0){
            setStatusSave(status);
            setVisibleSave(true);
            setSave(2);
          };
        },[status]);
        
        let markerRef = useRef<HTMLDivElement>(null);
        let polygonRef = useRef<HTMLDivElement>(null); 
        useEffect(() => {
          getProjectWithFilters();
        }, [getProjectWithFilters]);

        useEffect(() => {
          if(error) {
            message.error(error);
            clearErrorMessage();
          }
        }, [clearErrorMessage, error]);
        useEffect(() => {
          if (projectsByType.maintenance && projectsByType.maintenance.length) {
            const newProjects = projectsByType.maintenance.map((project : ProjectTypes) => {
              const newProject : ProjectTypes = { ...project };
              newProject.coordinates = JSON.parse(project.coordinates as string);
              return newProject;
            });
            setFormatedProjects(newProjects);
          }
        }, [projectsByType]);
        useEffect(() => {
          if (tutorialStatus) {
            setLeftWidth(MEDIUM_SCREEN_LEFT);
            setRightWitdh(MEDIUM_SCREEN_RIGHT);
            setRotationStyle(emptyStyle);
          }
        }, [tutorialStatus])
        const updateWidth = () => {
          if (leftWidth === MEDIUM_SCREEN_LEFT) {
            setLeftWidth(COMPLETE_SCREEN);
            setRightWitdh(EMPTY_SCREEN);
            setRotationStyle({transform: 'rotate(180deg)', marginRight:'-4px', right:'4px', position:'relative'});
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
            console.log('copyng layers ', copySelectedLayers, selectedLayers);
            updateSelectedLayers(copySelectedLayers);
          }
          console.log(selectedLayers);
          setCompleteView(!isExtendedView);
        }
        if(redirect) {
          setRouteRedirect(false);
          return <Redirect to='/map' />
        }
        return (
            <Layout>
            <Navbar/>
            
               
            <Layout>
              <SidebarView></SidebarView>
              {/*mostrar*/}
            {visibleSave && 
              <AlertViewSave
                statusSave= {statusSave}
                setStatusSave= {setStatusSave}
                setVisibleSave= {setVisibleSave}
              />
            }
              <Layout className="map-00">
                {!longitude && !latitude && <LoadingView />}
                { longitude && latitude &&  <Row>
                    <Col xs={{ span: 24 }} className="height-mobile" style={{transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's'}} lg={leftWidth}>{/*span={15}*/}
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
                            polygon={polygon}
                            selectedLayers={selectedLayers}
                            getPolygonStreams={getPolygonStreams}
                            updateSelectedLayers={updateSelectedLayers}
                            setFilterCoordinates={setFilterCoordinates}
                            highlighted={highlighted}
                            filterProblemOptions={filterProblemOptions}
                            filterProjectOptions={filterProjectOptions}
                            getGalleryProblems={getGalleryProblems}
                            getGalleryProjects={getGalleryProjects}
                            filterProblems={filterProblems}
                            filterProjects={filterProjects}
                            filterComponents={filterComponents}
                            setSpinValue={setSpinValue}
                            componentDetailIds={componentDetailIds}
                            isExtendedView={isExtendedView}
                            setSelectedOnMap={setSelectedOnMap}
                            getParamsFilter={getParamsFilter}
                            mapSearchQuery={mapSearchQuery}
                            mapSearch={mapSearch}
                            componentCounter={componentCounter}
                            getComponentCounter={getComponentCounter}
                            getDetailedPageProblem={getDetailedPageProblem}
                            getDetailedPageProject={getDetailedPageProject}
                            getComponentsByProblemId={getComponentsByProblemId}
                            loaderDetailedPage={loaderDetailedPage}
                            componentsOfProblems={componentsOfProblems}
                            loaderTableCompoents={loaderTableCompoents}
                            displayModal={displayModal}
                            detailed={detailed}
                            existDetailedPageProject={existDetailedPageProject}
                            existDetailedPageProblem={existDetailedPageProblem}
                            zoom={zoom}
                            applyFilter={applyFilter}
                            paramFilters={paramFilters}
                            filterComponentOptions={filterComponentOptions}
                            />

                        <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                            <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                        </Button>
                    </Col>
                    <Col xs={{ span: 24 }} className="menu-mobile" style={{transition: 'all ' + MAP_RESIZABLE_TRANSITION + 's'}} lg={rightWidth}>{/*span={9}*/}
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
                            getUserProjects={getUserProjects}
                            sortProjects={sortProjects}
                            getGalleryProblems={getGalleryProblems}
                            getGalleryProjects={getGalleryProjects}
                            galleryProblems={galleryProblems}
                            galleryProjects={galleryProjects}
                            saveUserInformation={saveUserInformation}
                            getDetailedPageProblem={getDetailedPageProblem}
                            getDetailedPageProject={getDetailedPageProject}
                            detailed={detailed}
                            loaderDetailedPage={loaderDetailedPage}
                            filterProblemOptions={filterProblemOptions}
                            filterProjectOptions={filterProjectOptions}
                            filterCoordinates={filterCoordinates}
                            setFilterProblemOptions={setFilterProblemOptions}
                            setFilterProjectOptions={setFilterProjectOptions}
                            paramFilters={paramFilters}
                            setHighlighted={setHighlighted}
                            setFilterComponentOptions={setFilterComponentOptions}
                            filterComponentOptions={filterComponentOptions}
                            getComponentsByProblemId={getComponentsByProblemId}
                            componentsOfProblems={componentsOfProblems}
                            setProblemKeyword={setProblemKeyword}
                            setProjectKeyword={setProjectKeyword}
                            existDetailedPageProject={existDetailedPageProject}
                            existDetailedPageProblem={existDetailedPageProblem}
                            displayModal={displayModal}
                            loaderTableCompoents={loaderTableCompoents}
                            selectedOnMap={selectedOnMap}
                            groupOrganization={groupOrganization}
                            applyFilter={applyFilter}
                            setApplyFilter={setApplyFilter}
                            componentCounter={componentCounter}
                            getComponentCounter={getComponentCounter}
                            setZoomProjectOrProblem={setZoomProjectOrProblem}
                            selectedLayers={selectedLayers}
                            updateSelectedLayers={updateSelectedLayers}
                            getParamsFilter={getParamsFilter}
                            spinFilter={spinFilter}
                      />
                    </Col>
                </Row>}
              </Layout>
            </Layout>
          </Layout>
        );
    }
}
