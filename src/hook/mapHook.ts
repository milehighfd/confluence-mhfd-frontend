import {ParametricSelector, createSelector} from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleModalFilter, getParamFilterProjects, getParamFilterProblems,
         getParamFilterComponents, setTabCards, setFilterTabNumber } from '../store/actions/mapActions';

const selectMapStates: ParametricSelector<RootState, undefined, {
  toggleModalFilter: boolean,
  tabCards: number,
  filterTabNumber: number
}> =
  createSelector<any, boolean, number, number, 
    {
      toggleModalFilter: boolean,
      tabCards: number,
      filterTabNumber: number,
    }>
    (
      state => state.map.toggleModalFilter,
      state => state.map.tabCards,
      state => state.map.filterTabNumber,
      (toggleModalFilter, tabCards, filterTabNumber) => ({
        toggleModalFilter, tabCards, filterTabNumber
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
    setTabCards: (tab: number) => {
      dispatch(setTabCards(tab));
    },
    setFilterTabNumber: (tab: number) => {
      dispatch(setFilterTabNumber(tab));
    }
  }
}