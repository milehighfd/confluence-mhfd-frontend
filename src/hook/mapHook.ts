import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';

import {
  setToggleModalFilter, getParamFilterProjects, getParamFilterProblems,
  getParamFilterComponents, setTabCards, setFilterTabNumber, setBoundMap,
  getZoomAreaFilter, setOpacityLayer, setCoordinatesJurisdiction,
  setFilterProblemOptions, setFilterProjectOptions, setNameZoomArea,
  setLabelFilterProblems, setLabelFilterProjects, setSpinMapLoaded,
  getParamFilterProjectsAsync, getParamFilterProblemsAsync, getParamFilterComponentsAsync,
  setAutocomplete, getBBOXComponents, updateSelectedLayers, setLabelFilterComponents,
  addFavorite, deleteFavorite, favoriteList, changeTutorialStatus, favoriteCards, setBBOXComponents, getGalleryProblems, getGalleryProjects, setApplyFilter, setHighlighted, setFilterComponentOptions, setZoomProjectOrProblem, setSelectedPopup, getComponentCounter, getComponentsCounter, getProjectCounter, getProblemCounter
} from '../store/actions/mapActions';

import { OptionProblems, OptionProjects, LabelFilter } from '../Classes/MapTypes';

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
      (state: any) => state.map.totals
  ,
      //state => state.map.paramFilters,
      (toggleModalFilter: any, tabCards: any, filterTabNumber: any, boundsMap: any, opacityLayer: any, coordinatesJurisdiction: any, 
        nameZoomArea: any, labelsFiltersProjects: any, labelsFiltersProblems: any, labelsFiltersComponents: any,
        spinFilters: any, spinCardProblems: any, spinCardProjects: any,//, paramFilters
        favoriteProblemCards: any,favoriteProjectCards: any, favorites: any, bboxComponents: any, tutorialStatus: boolean,
        galleryProblems: any, galleryProjects: any, selectedOnMap: any, autocomplete: any, currentPopup: number, totals: any
        ) => ({
          toggleModalFilter, tabCards, filterTabNumber, boundsMap, opacityLayer, coordinatesJurisdiction, 
          nameZoomArea, labelsFiltersProjects, labelsFiltersProblems, labelsFiltersComponents,
          spinFilters, spinCardProblems, spinCardProjects, favoriteProblemCards, favoriteProjectCards, favorites, bboxComponents, tutorialStatus,
          galleryProblems, galleryProjects, selectedOnMap, autocomplete, currentPopup, totals
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
    getParamFilterProjectsAsync: (bounds: string) => {
      dispatch(getParamFilterProjectsAsync(bounds));
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
    addFavorite: (email: string, cartodb_id: number, table: string) => {
      dispatch(addFavorite(email, cartodb_id, table));
    },
    deleteFavorite: (email: string, cartodb_id: number, table: string) => {
      dispatch(deleteFavorite(email, cartodb_id, table));
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
    }
  }
}