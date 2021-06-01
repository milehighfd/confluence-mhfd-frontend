import { AnyLayer } from 'mapbox-gl';
import { dispatch } from 'd3';
import { ParametricSelector, createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { saveAcquisition, saveCapital, saveMaintenance, saveSpecial, saveStudy, saveSpecialLocation, saveAcquisitionLocation, getStreamIntersection, changeDrawState, changeDrawStateCapital, getStreamIntersectionPolygon, getStreamsIntersectedPolygon, changeAddLocationState, setSave, getComponentsIntersected, setComponentIntersected, getServiceAreaPoint, getServiceAreaStreams, getStreamsList, setStreamsList, setUserPolygon, getListComponentsByComponentsAndPolygon, getStreamsByComponentsList, getAllComponentsByProblemId, setStreamIntersected, setComponentsFromMap, updateSelectedLayers, setHighlightedComponent, updateSelectedLayersWR, setBoardProjects, setBoardProjectsCreate, setZoomProject, setStreamsIds, editSpecial, editAcquisition ,setEditLocation, editMaintenance, getStreamsByProjectId, getIndependentComponentsByProjectId, getComponentsByProjectId, setIndComponents, getGEOMByProjectId, editCapital, editStudy, setServiceAreaCounty, getJurisdictionPolygon, getServiceAreaPolygonofStreams, setJurisdictionSponsor, getComponentGeom, getZoomGeomComp, getZoomGeomProblem, setZoomGeom, setHighlightedProblem, setComponentGeom, setHighlightedStream} from '../store/actions/ProjectActions';

import { RootState } from '../store/reducers';

interface selectProjectState {
  specialLocation: any,
  acquisitionLocation: any,
  streamIntersected: any,
  isDraw: boolean,
  streamsIntersectedIds: any,
  isAddLocation: boolean,
  listComponents: any,
  currentServiceAreaCounty: any,
  listStreams: any,
  userPolygon: any,
  componentsFromMap: any,
  status: number ,
  selectedLayers: any,
  highlightedComponent: any,
  selectedLayersWR: any,
  boardProjects: any,
  boardProjectsCreate: any,
  zoomProject: any,
  editLocation: any,
  independentComponents: any,
  jurisdiction: any,
  componentGeom: any,
  zoomGeom: any,
  highlightedProblem: any,
  highlightedStream: any,
  isDrawCapital: any
}

let createSelectorHack: any = createSelector;

const selectProjectStates: ParametricSelector<RootState, undefined, selectProjectState> =
createSelectorHack(
  (state: any) => state.project.specialLocation,
  (state: any) => state.project.acquisitionLocation,
  (state: any) => state.project.streamIntersected,
  (state: any) => state.project.isDraw,
  (state: any) => state.project.streamsIntersectedIds,
  (state: any) => state.project.isAddLocation,
  (state: any) => state.project.listComponents,
  (state: any) => state.project.currentServiceAreaCounty,
  (state: any) => state.project.listStreams,
  (state: any) => state.project.userPolygon,
  (state: any) => state.project.componentsFromMap, 
  (state: any) => state.project.status,
  (state: any) => state.project.selectedLayers,
  (state: any) => state.project.selectedLayersWR,
  (state: any) => state.project.highlightedComponent,
  (state: any) => state.project.boardProjects,
  (state: any) => state.project.zoomProject, 
  (state: any) => state.project.editLocation,
  (state: any) => state.project.independentComponents,
  (state: any) => state.project.jurisdiction,
  (state: any) => state.project.componentGeom,
  (state: any) => state.project.zoomGeom,
  (state: any) => state.project.highlightedProblem,
  (state: any) => state.project.highlightedStream,
  (state: any) => state.project.boardProjectsCreate,
  (state: any) => state.project.isDrawCapital,
  (specialLocation: any, acquisitionLocation: any, streamIntersected: any, isDraw: boolean, streamsIntersectedIds: any, isAddLocation:any, listComponents: any, currentServiceAreaCounty:any, listStreams: any, userPolygon: any, componentsFromMap: any, status: number, selectedLayers: any, selectedLayersWR: any, highlightedComponent:any, boardProjects:any, zoomProject: any, editLocation:any, independentComponents: any, jurisdiction:any, componentGeom:any, zoomGeom:any, highlightedProblem:any, highlightedStream:any, boardProjectsCreate:any, isDrawCapital:any) => ({
    specialLocation, acquisitionLocation, streamIntersected, isDraw, streamsIntersectedIds, isAddLocation,listComponents, currentServiceAreaCounty, listStreams, userPolygon, componentsFromMap, status, selectedLayers, highlightedComponent, selectedLayersWR, boardProjects, zoomProject, editLocation, independentComponents, jurisdiction,componentGeom, zoomGeom, highlightedProblem, highlightedStream, boardProjectsCreate, isDrawCapital
  })
);

export const useProjectState = () => {
  return useSelector((state: RootState) => selectProjectStates(state, undefined));
}


export const useProjectDispatch = () => {
   const dispatch = useDispatch();
   return {
      setSave: (status: number) => {
        dispatch(setSave(status));//save project
      },
      saveProjectSpecial: (special: any) => {
        dispatch(saveSpecial(special));
      },
      saveProjectAcquisition: (acquisition: any) => {
        dispatch(saveAcquisition(acquisition));
      },
      saveProjectMaintenance: (maintenance: any) => {
        dispatch(saveMaintenance(maintenance));
      },
      saveProjectStudy: (study: any) => {
        dispatch(saveStudy(study));
      },
      saveProjectCapital: (capital: any) => {
        dispatch(saveCapital(capital));
      },
      saveSpecialLocation: (location: any) => {
        dispatch(saveSpecialLocation(location));
      },
      saveAcquisitionLocation: (location: any) => {
        dispatch(saveAcquisitionLocation(location))
      },
      getStreamIntersectionSave: (geom: any) => {
        dispatch(getStreamIntersection(geom));
      },
      getStreamIntersectionPolygon: (geom: any) => {
        dispatch(getStreamIntersectionPolygon(geom));
      },
      //get the ids of streams 
      getStreamsIntersectedPolygon: (geom: any) => {
        dispatch(getStreamsIntersectedPolygon(geom));
      },
      changeDrawState: (isDraw: boolean) => {
        dispatch(changeDrawState(isDraw));
      },
      changeDrawStateCapital: (isDrawCapital: boolean) => {
        dispatch(changeDrawStateCapital(isDrawCapital));
      },
      changeAddLocationState: (isAddLocation: boolean) => {
        dispatch(changeAddLocationState(isAddLocation));
      },
      getListComponentsIntersected: (geom: any) => {
        dispatch(getComponentsIntersected(geom));
      },
      setComponentIntersected: (listComponents:any) => {
        dispatch(setComponentIntersected(listComponents));
      },
      getServiceAreaPoint: (geom: any) => {
        dispatch(getServiceAreaPoint(geom));
      },
      getServiceAreaStreams: (geom: any) => {
        dispatch(getServiceAreaStreams(geom));
      },
      getStreamsList: ( geom: any) => {
        dispatch(getStreamsList(geom));
      },
      setStreamsList: ( listStreams: any) => {
        dispatch(setStreamsList(listStreams));
      },
      setUserPolygon: (userPolygon: any) => {
        dispatch(setUserPolygon(userPolygon));
      },
      getStreamsByComponentsList: (components: any) => {
        dispatch(getStreamsByComponentsList(components));
      },
      getListComponentsByComponentsAndPolygon: (components: any, geom: any) => {
        dispatch(getListComponentsByComponentsAndPolygon(components, geom));
      },
      getAllComponentsByProblemId: (problemId: any) => {
        dispatch(getAllComponentsByProblemId(problemId));
      },
      setStreamIntersected: (streamIntersected: any) => {
        dispatch(setStreamIntersected(streamIntersected));
      },
      setComponentsFromMap: (componentsFromMap: any) => {
        dispatch(setComponentsFromMap(componentsFromMap));
      },
      updateSelectedLayers: (selectedLayer: any) => {
        dispatch(updateSelectedLayers(selectedLayer))
      },
      updateSelectedLayersWR: (selectedLayerWR: any) => {
        dispatch(updateSelectedLayersWR(selectedLayerWR))
      },
      setHighlightedComponent: (highlightedComponent: any) => {
        dispatch(setHighlightedComponent(highlightedComponent));
      },
      setBoardProjects:( boardProjects: any) => {
        dispatch(setBoardProjects(boardProjects));
      },
      setBoardProjectsCreate: (boardProjectsCreate: any) => {
        dispatch(setBoardProjectsCreate(boardProjectsCreate));
      },
      setZoomProject: (zoomProject: any) => {
        dispatch(setZoomProject(zoomProject));
      },
      setStreamsIds: (streamsIntersectedIds: any) => {
        dispatch(setStreamsIds(streamsIntersectedIds));
      },
      editProjectSpecial:(data:any) => {
        dispatch(editSpecial(data));
      },
      editProjectAcquisition:(data:any) => {
        dispatch(editAcquisition(data));
      },
      editProjectMainetnance:(data:any) => {
        dispatch(editMaintenance(data));
      },
      editProjectCapital:(data:any) => {
        dispatch(editCapital(data));
      },
      editProjectStudy:(data:any) => {
        dispatch(editStudy(data));
      },
      setEditLocation: (editLocation: any) => {
        dispatch(setEditLocation(editLocation));
      },
      getStreamsByProjectId: (projectId: any) => {
        dispatch(getStreamsByProjectId(projectId))
      },
      getIndependentComponentsByProjectId: (projectId: any) => {
        dispatch(getIndependentComponentsByProjectId(projectId))
      },
      getComponentsByProjectId: (projectId: any) => {
        dispatch(getComponentsByProjectId(projectId))
      },
      setIndComponents: (independentComponents: any) => {
        dispatch(setIndComponents(independentComponents));
      },
      getGEOMByProjectId: (projectid: any) => {
        dispatch(getGEOMByProjectId(projectid));
      },
      setServiceAreaCounty: (currentServiceAreaCounty:any) => {
        dispatch(setServiceAreaCounty(currentServiceAreaCounty));
      },
      getJurisdictionPolygon: (geom: any) => {
        dispatch(getJurisdictionPolygon(geom));
      },
      getServiceAreaPolygonofStreams: (geom: any) => {
        dispatch(getServiceAreaPolygonofStreams(geom));
      },
      setJurisdictionSponsor: (jurisdiction:any) => {
        dispatch(setJurisdictionSponsor(jurisdiction))
      },
      getComponentGeom:( table:any, objectid: any) => {
        dispatch(getComponentGeom(table,objectid));
      },
      getZoomGeomComp: (table:any, objectid: any) => {
        dispatch(getZoomGeomComp(table,objectid))
      },
      getZoomGeomProblem: (problemid: any) => {
        dispatch(getZoomGeomProblem(problemid))
      },
      setZoomGeom: (zoomGeom: any) => {
        dispatch(setZoomGeom(zoomGeom));
      },
      setHighlightedProblem: (highlightedProblem: any) => {
        dispatch(setHighlightedProblem(highlightedProblem));
      },
      setHighlightedStream: (highlightedStream: any) => {
        dispatch(setHighlightedStream(highlightedStream));
      },
      setComponentGeom: (componentGeom: any) => {
        dispatch(setComponentGeom(componentGeom))
      }
   }
}