import { useSelector, useDispatch } from 'react-redux';
import {
  saveAcquisition,
  saveCapital,
  saveMaintenance,
  saveSpecial,
  saveStudy,
  saveSpecialLocation,
  saveAcquisitionLocation,
  getStreamIntersection,
  changeDrawState,
  changeDrawStateCapital,
  getStreamIntersectionPolygon,
  getStreamsIntersectedPolygon,
  changeAddLocationState,
  setSave,
  getComponentsIntersected,
  setComponentIntersected,
  getServiceAreaPoint,
  getServiceAreaStreams,
  getStreamsList,
  setStreamsList,
  setUserPolygon,
  getListComponentsByComponentsAndPolygon,
  getStreamsByComponentsList,
  getAllComponentsByProblemId,
  setStreamIntersected,
  setComponentsFromMap,
  updateSelectedLayers,
  setHighlightedComponent,
  updateSelectedLayersWR,
  updateSelectedLayersCP,
  setBoardProjects,
  setBoardProjectsCreate,
  setZoomProject,
  setStreamsIds,
  editSpecial,
  editAcquisition,
  setEditLocation,
  editMaintenance,
  getStreamsByProjectId,
  getIndependentComponentsByProjectId,
  getComponentsByProjectId,
  setIndComponents,
  getGEOMByProjectId,
  editCapital,
  editStudy,
  setServiceAreaCounty,
  getJurisdictionPolygon,
  getServiceAreaPolygonofStreams,
  setJurisdictionSponsor,
  getComponentGeom,
  getZoomGeomComp,
  getZoomGeomProblem,
  setZoomGeom,
  setHighlightedProblem,
  setComponentGeom,
  setHighlightedStream,
  setHighlightedStreams,
  saveOverheadCost,
  setNextPageOfCards,
  resetNextPageOfCards,
  setInfiniteScrollItems,
  resetInfiniteScrollItems,
  setInfiniteScrollHasMoreItems,
  resetInfiniteScrollHasMoreItems,
  setIsEdit,
  setDeleteAttachmentsIds,
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
    saveProjectSpecial: (special: any) => {
      dispatch(saveSpecial(special));
    },
    saveProjectAcquisition: (acquisition: any) => {
      dispatch(saveAcquisition(acquisition));
    },
    saveProjectMaintenance: (maintenance: any) => {
      dispatch(saveMaintenance(maintenance));
    },
    saveOverheadCost: (cost: any) => {
      dispatch(saveOverheadCost(cost));
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
    updateSelectedLayersCP: (selectedLayerWR: any) => {
      dispatch(updateSelectedLayersCP(selectedLayerWR))
    },
    setHighlightedComponent: (highlightedComponent: any) => {
      dispatch(setHighlightedComponent(highlightedComponent));
    },
    setBoardProjects: (boardProjects: any) => {
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
    editProjectSpecial: (data: any) => {
      dispatch(editSpecial(data));
    },
    editProjectAcquisition: (data: any) => {
      dispatch(editAcquisition(data));
    },
    editProjectMainetnance: (data: any) => {
      dispatch(editMaintenance(data));
    },
    editProjectCapital: (data: any) => {
      dispatch(editCapital(data));
    },
    editProjectStudy: (data: any) => {
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
    setZoomGeom: (zoomGeom: any) => {
      dispatch(setZoomGeom(zoomGeom));
    },
    setHighlightedProblem: (highlightedProblem: any) => {
      dispatch(setHighlightedProblem(highlightedProblem));
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
    }
  };
};
