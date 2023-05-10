import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setToggleModalFilter,
  getParamFilterProjects,
  getParamFilterProblems,
  getParamFilterProjectsNoBounds,
  getParamFilterComponents,
  setTabCards,
  setFilterTabNumber,
  setBoundMap,
  setOpacityLayer,
  setCoordinatesJurisdiction,
  setFilterProblemOptions,
  setFilterProjectOptions,
  resetFiltercomponentOptions,
  setNameZoomArea,
  setLabelFilterProblems,
  setLabelFilterProjects,
  setSpinMapLoaded,
  setAutocomplete,
  getBBOXComponents,
  updateSelectedLayers,
  addFavorite,
  deleteFavorite,
  favoriteList,
  changeTutorialStatus,
  favoriteCards,
  setBBOXComponents,
  getGalleryProblems,
  getGalleryProjects,
  getProjectsFilteredIds,
  setApplyFilter,
  setHighlighted,
  setFilterComponentOptions,
  setZoomProjectOrProblem,
  setSelectedPopup,
  getComponentCounter,
  mapSearchQuery,
  setSelectedOnMap,
  existDetailedPageProblem,
  existDetailedPageProject,
  getDetailedPageProblem,
  getDetailedPageProject,
  resetDetailed,
  getComponentsByProblemId,
  getMapTables,
  getComponentsByProjid,
  replaceFilterCoordinates,
  resetMap,
  setFilterCoordinates,
  setProblemKeyword,
  setProjectKeyword,
  getParamsFilter,
  getMapWithSublayers,
  getMapLayers,
  getComponentsCounter,
  getProjectCounter,
  getProblemCounter,
  resetFilterProjectOptionsEmpty,
  getExtraGalleryProjects,
} from 'store/actions/mapActions';

import { OptionProblems, OptionProjects } from 'Classes/MapTypes';

export const useMapState = () => useSelector((state: { map: any }) => state.map);

export const useMapDispatch = () => {
  const dispatch = useDispatch();

  const _resetMap = useCallback(() => {
    dispatch(resetMap());
  }, [dispatch]);
  const _replaceFilterCoordinates = useCallback((coordinates: string) => {
    dispatch(replaceFilterCoordinates(coordinates));
  }, [dispatch]);

  return {
    resetMap: _resetMap,
    replaceFilterCoordinates: _replaceFilterCoordinates,
    setToggleModalFilter: (toggle: boolean) => {
      dispatch(setToggleModalFilter(toggle));
    },
    getParamFilterProjects: (bounds: string, data?: any) => {
      if (!bounds) return;
      dispatch(getParamFilterProjects(bounds, data));
    },
    getParamFilterProjectsNoBounds: (data?: any) => {
      dispatch(getParamFilterProjectsNoBounds(data));
    },
    getTabCounters: (bounds: string, problemsOpts: any, projectsOpts: any, componentOpts: any) => {
      dispatch(getProblemCounter(bounds, problemsOpts));
      dispatch(getProjectCounter(bounds, projectsOpts));
      dispatch(getComponentsCounter(bounds, componentOpts));
    },
    getComponentsCounter: (bounds: string, data?: any) => {
      dispatch(getComponentsCounter(bounds, data));
    },
    getProjectCounter: (bounds: string, data?: any) => {
      dispatch(getProjectCounter(bounds, data));
    },
    getProblemCounter: (bounds: string, data?: any) => {
      dispatch(getProblemCounter(bounds, data));
    },
    getParamFilterProblems: (bounds: string, data?: any) => {
      dispatch(getParamFilterProblems(bounds, data));
    },
    getParamFilterComponents: (bounds: string, data?: any) => {
      dispatch(getParamFilterComponents(bounds, data));
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
    setOpacityLayer: (value: boolean) => {
      dispatch(setOpacityLayer(value));
    },
    setCoordinatesJurisdiction: (coordinates: any[]) => {
      dispatch(setCoordinatesJurisdiction(coordinates));
    },
    resetFiltercomponentOptions: () => {
      dispatch(resetFiltercomponentOptions());
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
    setSpinMapLoaded: (spin: boolean) => {
      dispatch(setSpinMapLoaded(spin));
    },
    setBBOXComponents: (bboxComponents: any) => {
      dispatch(setBBOXComponents(bboxComponents));
    },
    getBBOXComponents: (table: string, id: number) => {
      dispatch(getBBOXComponents(table, id));
    },
    updateSelectedLayers: (selectedLayer: any) => {
      dispatch(updateSelectedLayers(selectedLayer));
    },
    addFavorite: (email: string, id: number, isProblem: boolean) => {
      dispatch(addFavorite(email, id, isProblem));
    },
    deleteFavorite: (email: string, id: number, table: string) => {
      dispatch(deleteFavorite(email, id, table));
    },
    favoriteList: (isProblem: boolean) => {
      dispatch(favoriteList(isProblem));
    },
    changeTutorialStatus: (status: boolean) => {
      dispatch(changeTutorialStatus(status));
    },
    favoriteCards: (email: string, isproblem: boolean, extraOptions?: any) => {
      if (extraOptions) {
        dispatch(favoriteCards(email, isproblem, extraOptions));
      } else {
        dispatch(favoriteCards(email, isproblem));
      }
    },
    getGalleryProblems: () => {
      dispatch(getGalleryProblems());
    },
    getGalleryProjects: () => {
      dispatch(getGalleryProjects(null, 0));
    },
    getProjectsFilteredIds: () => {
      dispatch(getProjectsFilteredIds());
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
    getComponentCounter: (id: any, type: any, setCountComponents: any) => {
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
    getDetailedPageProblem: (id: string) => {
      dispatch(getDetailedPageProblem(id));
    },
    resetDetailed: () => {
      dispatch(resetDetailed());
    },
    getDetailedPageProject: (id: number) => {
      dispatch(getDetailedPageProject(id));
    },
    getComponentsByProblemId: (data: any) => {
      dispatch(getComponentsByProblemId(data));
    },
    getMapTables: (trigger: any, name?: any) => {
      dispatch(getMapTables(trigger, name));
    },
    getComponentsByProjid: (projectid: any, setCounter: Function) => {
      dispatch(getComponentsByProjid(projectid, setCounter));
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
    },
    getMapWithSublayers: (trigger: any, tiles: any, name: any) => {
      dispatch(getMapWithSublayers(trigger, tiles, name));
    },
    getMapLayers: (trigger: any, tiles: any) => {
      dispatch(getMapLayers(trigger, tiles));
    },
    resetFilterProjectOptionsEmpty: () => {
      dispatch(resetFilterProjectOptionsEmpty());
    },
    getExtraProjects: (data: any) => {
      dispatch(getExtraGalleryProjects(data));
    },
  };
};
