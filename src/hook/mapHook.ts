import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
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
  getComponentsByProjid, getPlaceOnCenter
} from '../store/actions/mapActions';

import { OptionProblems, OptionProjects, LabelFilter } from '../Classes/MapTypes';
import { AnyLayer } from 'mapbox-gl';

interface selectMapState {
  toggleModalFilter: boolean,
  tabCards: string,
  filterTabNumber: string,
  boundsMap: string,
  opacityLayer: boolean,
  coordinatesJurisdiction: any[],
  nameZoomArea: string,
  labelsFiltersProjects: LabelFilter[],
  labelsFiltersProblems: LabelFilter[],
  labelsFiltersComponents: LabelFilter[],
  spinFilters: boolean,
  spinCardProblems: boolean,
  spinCardProjects: boolean,
  favoriteProblemCards: any,
  favoriteProjectCards: any,
  favorites: any,
  bboxComponents: any,
  tutorialStatus: boolean,
  galleryProblems: any,
  galleryProjects: any,
  selectedOnMap: any,
  autocomplete: any,
  currentPopup: number,
  totals: any,
  favoritesLoader: number,
  layers: any,
  selectedLayers: any,
  mapSearch: any,
  componentDetailIds: any,
  filterProjects: any, 
  filterProblems: any,
  filterComponents: any,
  detailed: any,
  loaderDetailedPage: any,
  componentsByProblemId: any,
  loaderTableCompoents: any,
  componentCounter: any,
  spinMapLoaded: any,
  places: any
}

/* Commented because typescript doesn't support that many arguments
createSelector<any, boolean, string, string, string, boolean, any[], string, LabelFilter[], LabelFilter[], boolean, boolean, boolean, //any,
  {
    toggleModalFilter: boolean,
    tabCards: string,
    filterTabNumber: string,
    boundsMap: string,
    opacityLayer: boolean,
    coordinatesJurisdiction: any[],
    nameZoomArea: string,
    labelsFiltersProjects: any[],
    labelsFiltersProblems: any[],
    spinFilters: boolean,
    spinCardProblems: boolean,
    spinCardProjects: boolean//,
    //paramFilters: any
  }>
  (
    state => state.map.toggleModalFilter,
    state => state.map.tabCards,
    state => state.map.filterTabNumber,
    state => state.map.boundsMap,
    state => state.map.opacityLayer,
    state => state.map.coordinatesJurisdiction,
    state => state.map.nameZoomArea,
    state => state.map.labelsFiltersProjects,
    state => state.map.labelsFiltersProblems,
    state => state.map.spinFilters,
    state => state.map.spinCardProblems,
    state => state.map.spinCardProjects,
*/

let createSelectorHack: any = createSelector;

const selectMapStates: ParametricSelector<RootState, undefined, selectMapState> =
  createSelectorHack(
      (state: any) => state.map.toggleModalFilter,
      (state: any) => state.map.tabCards,
      (state: any) => state.map.filterTabNumber,
      (state: any) => state.map.boundsMap,
      (state: any) => state.map.opacityLayer,
      (state: any) => state.map.coordinatesJurisdiction,
      (state: any) => state.map.nameZoomArea,
      (state: any) => state.map.labelsFiltersProjects,
      (state: any) => state.map.labelsFiltersProblems,
      (state: any) => state.map.labelsFiltersComponents,
      (state: any) => state.map.spinFilters,
      (state: any) => state.map.spinCardProblems,
      (state: any) => state.map.spinCardProjects,
      (state: any) => state.map.favoriteProblemCards,
      (state: any) => state.map.favoriteProjectCards,
      (state: any) => state.map.favorites,
      (state: any) => state.map.bboxComponents,
      (state: any) => state.map.tutorialStatus,
      (state: any) => state.map.galleryProblems,
      (state: any) => state.map.galleryProjects,
      (state: any) => state.map.selectedOnMap,
      (state: any) => state.map.autocomplete,
      (state: any) => state.map.currentPopup,
      (state: any) => state.map.totals,
      (state: any) => state.map.favoritesLoader,
      (state: any) => state.map.layers,
      (state: any) => state.map.selectedLayers,
      (state: any) => state.map.mapSearch,
      (state: any) => state.map.componentDetailIds,
      (state: any) => state.map.filterProblems,
      (state: any) => state.map.filterProjects,
      (state: any) => state.map.filterComponents,
      (state: any) => state.detailed.detailed,
      (state: any) => state.detailed.spin,
      (state: any) => state.map.componentsByProblemId,
      (state: any) => state.map.loaderTableCompoents,
      (state: any) => state.map.componentCounter,
      (state: any) => state.map.spinMapLoaded,
      (state: any) => state.map.places,
      //state => state.map.paramFilters,
      (toggleModalFilter: any, tabCards: any, filterTabNumber: any, boundsMap: any, opacityLayer: any, coordinatesJurisdiction: any, 
        nameZoomArea: any, labelsFiltersProjects: any, labelsFiltersProblems: any, labelsFiltersComponents: any,
        spinFilters: any, spinCardProblems: any, spinCardProjects: any,//, paramFilters
        favoriteProblemCards: any,favoriteProjectCards: any, favorites: any, bboxComponents: any, tutorialStatus: boolean,
        galleryProblems: any, galleryProjects: any, selectedOnMap: any, autocomplete: any, currentPopup: number, totals: any, favoritesLoader: number, 
        layers: any, selectedLayers: any, mapSearch: any, componentDetailIds: any, filterProblems: any, filterProjects: any, filterComponents: any,
        detailed: any,loaderDetailedPage: any, componentsByProblemId:any, loaderTableCompoents: any, componentCounter:any, spinMapLoaded: any, places: any
        ) => ({
          toggleModalFilter, tabCards, filterTabNumber, boundsMap, opacityLayer, coordinatesJurisdiction, 
          nameZoomArea, labelsFiltersProjects, labelsFiltersProblems, labelsFiltersComponents,
          spinFilters, spinCardProblems, spinCardProjects, favoriteProblemCards, favoriteProjectCards, favorites, bboxComponents, tutorialStatus,
          galleryProblems, galleryProjects, selectedOnMap, autocomplete, currentPopup, totals, favoritesLoader, layers, selectedLayers, mapSearch,
          componentDetailIds, filterProblems, filterProjects, filterComponents, detailed, loaderDetailedPage, componentsByProblemId,
          loaderTableCompoents, componentCounter, spinMapLoaded, places
        })
    );

export const useMapState = () => {
  return useSelector((state: RootState) => selectMapStates(state, undefined));
}

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
    }
  }
}