import { useSelector, useDispatch } from 'react-redux';
import {
  getColorsList,
  updateColorList,
  deleteColorList,
  createColorList,
  setIdsFilter
} from '../store/actions/colorListActions';

export const useColorListState = () => useSelector(
  (state: { colorList: any }) => state.colorList
);

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
  };
};
