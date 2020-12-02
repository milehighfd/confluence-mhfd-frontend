import {ParametricSelector, createSelector} from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleModalFilter, getParamFilterProjects, getParamFilterProblems,
         getParamFilterComponents, setTabCards, setFilterTabNumber, setBoundMap,
         getZoomAreaFilter, setOpacityLayer, setCoordinatesJurisdiction,
         setFilterProblemOptions, setFilterProjectOptions, setNameZoomArea,
         setLabelFilterProblems, setLabelFilterProjects } from '../store/actions/mapActions';
import { OptionProblems, OptionProjects, LabelFilter } from '../Classes/MapTypes';

const selectMapStates: ParametricSelector<RootState, undefined, {
  toggleModalFilter: boolean,
  tabCards: string,
  filterTabNumber: string,
  boundsMap: string,
  opacityLayer: boolean,
  coordinatesJurisdiction: any[],
  nameZoomArea: string,
  labelsFiltersProjects: LabelFilter[],
  labelsFiltersProblems: LabelFilter[]
}> =
  createSelector<any, boolean, string, string, string, boolean, any[],string, LabelFilter[], LabelFilter[],
    {
      toggleModalFilter: boolean,
      tabCards: string,
      filterTabNumber: string,
      boundsMap: string,
      opacityLayer: boolean,
      coordinatesJurisdiction: any[],
      nameZoomArea: string,
      labelsFiltersProjects: LabelFilter[],
      labelsFiltersProblems: LabelFilter[]
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
      (toggleModalFilter, tabCards, filterTabNumber, boundsMap, opacityLayer, coordinatesJurisdiction, nameZoomArea, labelsFiltersProjects, labelsFiltersProblems) => ({
        toggleModalFilter, tabCards, filterTabNumber, boundsMap, opacityLayer, coordinatesJurisdiction,nameZoomArea, labelsFiltersProjects, labelsFiltersProblems
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
    getParamFilterProjects: (bounds: string) => {
      dispatch(getParamFilterProjects(bounds));
    },
    getParamFilterProblems: (bounds: string) => {
      dispatch(getParamFilterProblems(bounds));
    },
    getParamFilterComponents: (bounds: string) => {
      dispatch(getParamFilterComponents(bounds));
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
    setLabelFilterProjects: (filters: any) => {
      dispatch(setLabelFilterProjects(filters));
    },
    setLabelFilterProblems: (filters: any) => {
      dispatch(setLabelFilterProblems(filters));
    }
  }
}