import { useSelector, useDispatch } from 'react-redux';

import {
  setToggleModalFilter, getParamFilterProjects, getParamFilterProblems,
  getParamFilterComponents, setTabCards, setFilterTabNumber, setBoundMap,
  getZoomAreaFilter, setOpacityLayer, setCoordinatesJurisdiction,
  setFilterProblemOptions, setFilterProjectOptions, setNameZoomArea,
  setLabelFilterProblems, setLabelFilterProjects, setSpinMapLoaded,
  getParamFilterProblemsAsync, getParamFilterComponentsAsync,
  setAutocomplete, getBBOXComponents, updateSelectedLayers, setLabelFilterComponents,
  addFavorite, deleteFavorite, favoriteList, changeTutorialStatus, favoriteCards, 
  setBBOXComponents, getGalleryProblems, getGalleryProjects, setApplyFilter, setHighlighted, 
  setFilterComponentOptions, setZoomProjectOrProblem, setSelectedPopup, getComponentCounter, 
  getComponentsCounter, getProjectCounter, getProblemCounter, mapSearchQuery, setSelectedOnMap, 
  existDetailedPageProblem, existDetailedPageProject, getDetailedPageProblem, getDetailedPageProject,
  getComponentsByProblemId,getMapTables,
  getComponentsByProjid, getPlaceOnCenter, replaceFilterCoordinates, resetMap, getReverseGeocode, savePolygonCoordinates,
  saveMarkerCoordinates,
  clearErrorMessage,
  setFilterCoordinates,
  setProblemKeyword,
  setProjectKeyword,
  getParamsFilter
} from '../store/actions/mapActions';

import { OptionProblems, OptionProjects } from '../Classes/MapTypes';

export const useMapState = () => useSelector(
  (state: { map: any }) => state.map
);

export const useMapDispatch = () => {
  const dispatch = useDispatch();
  return {
    setToggleModalFilter: (toggle: boolean) => {
      dispatch(setToggleModalFilter(toggle));
    },
    getParamFilterProjects: (bounds: string, data?: any) => {
      if (!bounds) return;
      dispatch(getParamFilterProjects(bounds, data));
      dispatch(getProjectCounter(bounds, data));
    },
    getTabCounters: (bounds: string, problemsOpts: any, projectsOpts: any, componentOpts: any) => {
      dispatch(getProblemCounter(bounds, problemsOpts));
      dispatch(getProjectCounter(bounds, projectsOpts));
      dispatch(getComponentsCounter(bounds, componentOpts));
    },
    getParamFilterProblems: (bounds: string, data?: any) => {
      dispatch(getParamFilterProblems(bounds, data));
      dispatch(getProblemCounter(bounds, data));
    },
    getParamFilterComponents: (bounds: string, data?: any) => {
      dispatch(getParamFilterComponents(bounds, data));
      dispatch(getComponentsCounter(bounds, data));
    },
    setTabCards: (tab: string) => {
      dispatch(setTabCards(tab));
    },
    setFilterTabNumber: (tab: string) => {
      dispatch(setFilterTabNumber(tab));
    },
    setBoundMap: (bounds: string) => {
      dispatch(setBoundMap(bounds));
    },
    getZoomAreaFilter: () => {
      dispatch(getZoomAreaFilter());
    },
    setOpacityLayer: (value: boolean) => {
      dispatch(setOpacityLayer(value));
    },
    setCoordinatesJurisdiction: (coordinates: any[]) => {
      dispatch(setCoordinatesJurisdiction(coordinates));
    },
    setFilterProjectOptions: (filters: OptionProjects) => {
      dispatch(setFilterProjectOptions(filters));
    },
    setFilterProblemOptions: (filters: OptionProblems) => {
      dispatch(setFilterProblemOptions(filters));
    },
    setNameZoomArea: (name: string) => {
      dispatch(setNameZoomArea(name));
    },
    setAutocomplete: (autocomplete: string) => {
      dispatch(setAutocomplete(autocomplete));
    },
    setLabelFilterProjects: (filters: any) => {
      dispatch(setLabelFilterProjects(filters));
    },
    setLabelFilterProblems: (filters: any) => {
      dispatch(setLabelFilterProblems(filters));
    },
    setLabelFilterComponents: (filters: any) => {
      dispatch(setLabelFilterComponents(filters));
    },
    setSpinMapLoaded: (spin: boolean) => {
      dispatch(setSpinMapLoaded(spin));
    },
    getParamFilterComponentsAsync: (bounds: string) => {
      dispatch(getParamFilterComponentsAsync(bounds));
    },
    getParamFilterProblemsAsync: (bounds: string) => {
      dispatch(getParamFilterProblemsAsync(bounds));
    },
    setBBOXComponents: (bboxComponents: any) => {
      dispatch(setBBOXComponents(bboxComponents))
    },
    getBBOXComponents: (table: string, id: number) => {
      dispatch(getBBOXComponents(table, id));
    },
    updateSelectedLayers: (selectedLayer: any) => {
      dispatch(updateSelectedLayers(selectedLayer))
    },
    addFavorite: (email: string, id: number, table: string) => {
      dispatch(addFavorite(email, id, table));
    },
    deleteFavorite: (email: string, id: number, table: string) => {
      dispatch(deleteFavorite(email, id, table));
    }, 
    favoriteList: (email: string) => {
      dispatch(favoriteList(email));
    },
    changeTutorialStatus: (status: boolean) => {
      dispatch(changeTutorialStatus(status));
    },
    favoriteCards: (email: string, isproblem: boolean, extraOptions?: any) => {
      if (extraOptions) {
        dispatch(favoriteCards(email, isproblem, extraOptions))
      } else {
        dispatch(favoriteCards(email, isproblem));
      }
    },
    getGalleryProblems: () => {
      dispatch(getGalleryProblems());
    },
    getGalleryProjects: () => {
      dispatch(getGalleryProjects());
    },
    setApplyFilter: (value: boolean) => {
      dispatch(setApplyFilter(value));
    },
    setHighlighted: (data: any) => {
      dispatch(setHighlighted(data));
    },
    setFilterComponentOptions: (data: any) => {
      dispatch(setFilterComponentOptions(data));
    },
    setZoomProjectOrProblem: (zoom: any) => {
      dispatch(setZoomProjectOrProblem(zoom));
    },
    setSelectedPopup: (popupId: number) => {
      dispatch(setSelectedPopup(popupId));
    },
    mapSearchQuery: (query: any) => {
      dispatch(mapSearchQuery(query));
    },
    getComponentCounter: (id: any,type: any, setCountComponents: any) => {
      dispatch(getComponentCounter(id, type, setCountComponents));
    },
    setSelectedOnMap: (number: any, tab: any) => {
      dispatch(setSelectedOnMap(number, tab));
    },
    existDetailedPageProblem: (url: any) => {
      dispatch(existDetailedPageProblem(url));
    },
    existDetailedPageProject: (url: any) => {
      dispatch(existDetailedPageProject(url));
    },
    getDetailedPageProblem: (id: string ) => {
      dispatch(getDetailedPageProblem(id));
    },
    getDetailedPageProject: (id:number, type: string) => {
      dispatch(getDetailedPageProject(id, type));
    },
    getComponentsByProblemId: (data:any) => {
      dispatch(getComponentsByProblemId(data));
    },
    getMapTables: (trigger: any, name?: any) => {
      dispatch(getMapTables(trigger,name));
    },
    getPlaceOnCenter: (center: any) => {
      dispatch(getPlaceOnCenter(center));
    },
    getComponentsByProjid: (projectid: any, setCounter: Function) => {
      dispatch(getComponentsByProjid(projectid, setCounter));
    },
    replaceFilterCoordinates: (coordinates: string) => {
      dispatch(replaceFilterCoordinates(coordinates));
    },
    resetMap: () => {
      dispatch(resetMap());
    },
    getReverseGeocode: (lat: number, lng: number, accessToken: string) => {
      dispatch(getReverseGeocode(lat, lng, accessToken));
    },
    savePolygonCoordinates: (polygon : Array<[]>) => {
      dispatch(savePolygonCoordinates(polygon));
    },
    saveMarkerCoordinates: (marker : Array<[]>) => {
      dispatch(saveMarkerCoordinates(marker))
    },
    clearErrorMessage: () => {
      dispatch(clearErrorMessage());
    },
    setFilterCoordinates: (coordinates: string, tab: string) => {
      dispatch(setFilterCoordinates(coordinates, tab));
    },
    setProblemKeyword: (keyword: string) => {
      dispatch(setProblemKeyword(keyword));
    },
    setProjectKeyword: (keyword: string) => {
      dispatch(setProjectKeyword(keyword));
    },
    getParamsFilter: (bounds: string) => {
      dispatch(getParamsFilter(bounds));
    }
  }
}