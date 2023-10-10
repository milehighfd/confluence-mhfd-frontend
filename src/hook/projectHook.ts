import { useSelector, useDispatch } from 'react-redux';
import {
  saveCapital,
  saveSpecialLocation,
  saveAcquisitionLocation,
  changeDrawState,
  changeDrawStateCapital,
  getStreamIntersectionPolygon,
  getStreamsIntersectedPolygon,
  changeAddLocationState,
  setSave,
  setComponentIntersected,
  getServiceAreaPoint,
  getServiceAreaStreams,
  getStreamsList,
  setStreamsList,
  setUserPolygon,
  setIsGeomDrawn,
  getListComponentsByComponentsAndPolygon,
  getAllComponentsByProblemId,
  setStreamIntersected,
  setComponentsFromMap,
  updateSelectedLayers,
  setHighlightedComponent,
  updateSelectedLayersWR,
  updateSelectedLayersCP,
  setBoardProjectsCreate,
  setZoomProject,
  setStreamsIds,
  setEditLocation,
  getStreamsByProjectId,
  getIndependentComponentsByProjectId,
  getComponentsByProjectId,
  setIndComponents,
  getGEOMByProjectId,
  editCapital,
  setServiceAreaCounty,
  getJurisdictionPolygon,
  getServiceAreaPolygonofStreams,
  setJurisdictionSponsor,
  getComponentGeom,
  getZoomGeomComp,
  getZoomGeomProblem,
  setZoomGeom,
  setComponentGeom,
  setHighlightedStream,
  setHighlightedStreams,
  setNextPageOfCards,
  resetNextPageOfCards,
  setInfiniteScrollItems,
  resetInfiniteScrollItems,
  setInfiniteScrollHasMoreItems,
  resetInfiniteScrollHasMoreItems,
  setIsEdit,
  setDeleteAttachmentsIds,
  setZoomGeomCreateMap,
  archiveProject,
  setDisableFieldsForLg,
  setGlobalSearch,
  setGlobalProjectId,
  setGlobalStatusId,
  setGlobalLocality,
  setCreatedProject,
  sendProjectToBoardYear,
  setGlobalSearchValue
} from '../store/actions/ProjectActions';

export const useProjectState = () => useSelector(
  (state: { project: any }) => state.project
);

export const useProjectDispatch = () => {
  const dispatch = useDispatch();
  return {
    setSave: (status: number) => {
      dispatch(setSave(status));
    },
    setIsEdit: (isEdit: boolean) => {
      dispatch(setIsEdit(isEdit));
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
    getStreamIntersectionPolygon: (geom: any) => {
      dispatch(getStreamIntersectionPolygon(geom));
    },
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
    setComponentIntersected: (listComponents: any) => {
      dispatch(setComponentIntersected(listComponents));
    },
    getServiceAreaPoint: (geom: any) => {
      dispatch(getServiceAreaPoint(geom));
    },
    getServiceAreaStreams: (geom: any) => {
      dispatch(getServiceAreaStreams(geom));
    },
    getStreamsList: (geom: any, projecttype: any) => {
      dispatch(getStreamsList(geom, projecttype));
    },
    setStreamsList: (listStreams: any) => {
      dispatch(setStreamsList(listStreams));
    },
    setUserPolygon: (userPolygon: any) => {
      dispatch(setUserPolygon(userPolygon));
    },
    setIsGeomDrawn: (isGeomDrawn: boolean) => {
      dispatch(setIsGeomDrawn(isGeomDrawn));
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
    updateSelectedLayersCP: (selectedLayerWR: any) => {
      dispatch(updateSelectedLayersCP(selectedLayerWR))
    },
    setHighlightedComponent: (highlightedComponent: any) => {
      dispatch(setHighlightedComponent(highlightedComponent));
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
    editProjectCapital: (data: any) => {
      dispatch(editCapital(data));
    },
    setEditLocation: (editLocation: any) => {
      dispatch(setEditLocation(editLocation));
    },
    getStreamsByProjectId: (projectId: any, typeProjectId: any) => {
      dispatch(getStreamsByProjectId(projectId, typeProjectId))
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
    setServiceAreaCounty: (currentServiceAreaCounty: any) => {
      dispatch(setServiceAreaCounty(currentServiceAreaCounty));
    },
    getJurisdictionPolygon: (geom: any) => {
      dispatch(getJurisdictionPolygon(geom));
    },
    getServiceAreaPolygonofStreams: (geom: any) => {
      dispatch(getServiceAreaPolygonofStreams(geom));
    },
    setJurisdictionSponsor: (jurisdiction: any) => {
      dispatch(setJurisdictionSponsor(jurisdiction))
    },
    getComponentGeom: (table: any, objectid: any) => {
      dispatch(getComponentGeom(table, objectid));
    },
    getZoomGeomComp: (table: any, objectid: any) => {
      dispatch(getZoomGeomComp(table, objectid))
    },
    getZoomGeomProblem: (problemid: any) => {
      dispatch(getZoomGeomProblem(problemid))
    },
    setZoomGeomCreateMap: (geomCreateMap: any) => {
      dispatch(setZoomGeomCreateMap(geomCreateMap));
    },
    setZoomGeom: (zoomGeom: any) => {
      dispatch(setZoomGeom(zoomGeom));
    },
    setHighlightedStream: (highlightedStream: any) => {
      dispatch(setHighlightedStream(highlightedStream));
    },
    setHighlightedStreams: (highlightedStreams: any) => {
      dispatch(setHighlightedStreams(highlightedStreams));
    },
    setComponentGeom: (componentGeom: any) => {
      dispatch(setComponentGeom(componentGeom))
    },
    setNextPageOfCards: (page: number) => {
      dispatch(setNextPageOfCards(page))
    },
    resetNextPageOfCards: () => {
      dispatch(resetNextPageOfCards())
    },
    setInfiniteScrollItems: (infiniteScrollItems: any) => {
      dispatch(setInfiniteScrollItems(infiniteScrollItems))
    },
    resetInfiniteScrollItems: () => {
      dispatch(resetInfiniteScrollItems())
    },
    setInfiniteScrollHasMoreItems: (infiniteScrollHasMoreItems: boolean) => {
      dispatch(setInfiniteScrollHasMoreItems(infiniteScrollHasMoreItems))
    },
    resetInfiniteScrollHasMoreItems: () => {
      dispatch(resetInfiniteScrollHasMoreItems())
    },
    setDeleteAttachmentsIds: (deleteAttachmentsIds: Array<any>) => {
      dispatch(setDeleteAttachmentsIds(deleteAttachmentsIds))
    },
    archiveProject: (projectId: any) => {
      dispatch(archiveProject(projectId))
    },
    setDisableFieldsForLg: (disableFieldsForLG: boolean) => {
      dispatch(setDisableFieldsForLg(disableFieldsForLG))
    },
    setGlobalSearch: (globalSearch: boolean) => {
      dispatch(setGlobalSearch(globalSearch))
    },
    setGlobalProjectId: (globalProjectId: any) => {
      dispatch(setGlobalProjectId(globalProjectId))
    },
    setGlobalStatusId: (globalStatusId: any) => {
      dispatch(setGlobalStatusId(globalStatusId))
    },
    setGlobalLocality: (globalLocality: any) => {
      dispatch(setGlobalLocality(globalLocality))
    },
    setCreatedProject: (createdProject: any) => {
      dispatch(setCreatedProject(createdProject))
    },
    sendProjectToBoardYear: (project_id: number, year: number, extraYears: Array<number>, sponsor: string, project_type: string, extraYearsAmounts: Array<number>, subtype: string) => {
      dispatch(sendProjectToBoardYear(project_id, year, extraYears, sponsor, project_type, extraYearsAmounts, subtype))
    },
    setGlobalSearchValue: (globalSearchValue: string) => {
      dispatch(setGlobalSearchValue(globalSearchValue))
    }
  };
};
