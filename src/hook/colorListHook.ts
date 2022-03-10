import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { getColorsList, updateColorList,deleteColorList, createColorList, setIdsFilter } from '../store/actions/colorListActions';

interface colorListState {
  colorsList: any
} 
 
let createSelectorHack: any = createSelector;
 
const selectcolorList: ParametricSelector<RootState, undefined, colorListState> =
  createSelectorHack(
      (state: any) => state.colorList.colorsList,
      (state: any) => state.colorList.idsToFilter,
      (colorsList: any, idsToFilter: any) => ({
        colorsList, idsToFilter
    })
  );
 
export const useColorListState = () => {
  return useSelector((state: RootState) => selectcolorList(state, undefined));
}; 


export const useColorListDispatch = () => {
   const dispatch = useDispatch();
   return {
      getColorsList: () => {
         dispatch(getColorsList());
      },
      createColorList: () => {
        dispatch(createColorList());
      },
      updateColorList: (colorList: any) => {
        dispatch(updateColorList(colorList));
      },
      deleteColorList: (id: any) => {
        dispatch(deleteColorList(id));
      },
      setIdsFilter: (idsToFilter: any) => {
        dispatch(setIdsFilter(idsToFilter));
      }
   }
};