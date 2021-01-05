import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';

import {
  setToggleModalFilter, getParamFilterProjects, getParamFilterProblems,
  getParamFilterComponents, setTabCards, setFilterTabNumber, setBoundMap,
  getZoomAreaFilter, setOpacityLayer, setCoordinatesJurisdiction,
  setFilterProblemOptions, setFilterProjectOptions, setNameZoomArea,
  setLabelFilterProblems, setLabelFilterProjects, setSpinMapLoaded,
  getParamFilterProjectsAsync, getParamFilterProblemsAsync, getParamFilterComponentsAsync, setAutocomplete, getBBOXComponents, updateSelectedLayers, setLabelFilterComponents
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
  spinCardProjects: boolean//,
  //paramFilters: any
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
      //state => state.map.paramFilters,
      (toggleModalFilter: any, tabCards: any, filterTabNumber: any, boundsMap: any, opacityLayer: any, coordinatesJurisdiction: any, 
        nameZoomArea: any, labelsFiltersProjects: any, labelsFiltersProblems: any, labelsFiltersComponents: any,
        spinFilters: any, spinCardProblems: any, spinCardProjects: any//, paramFilters
        ) => ({
          toggleModalFilter, tabCards, filterTabNumber, boundsMap, opacityLayer, coordinatesJurisdiction, 
          nameZoomArea, labelsFiltersProjects, labelsFiltersProblems, labelsFiltersComponents,
          spinFilters, spinCardProblems, spinCardProjects//, paramFilters
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
    getBBOXComponents: (table: string, id: number) => {
      dispatch(getBBOXComponents(table, id));
    },
    updateSelectedLayers: (selectedLayer: any) => {
      dispatch(updateSelectedLayers(selectedLayer))
    }
  }
}