import { ParametricSelector, createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { saveAcquisition, saveCapital, saveMaintenance, saveSpecial, saveStudy, saveSpecialLocation } from '../store/actions/ProjectActions';
import { RootState } from '../store/reducers';

interface selectProjectState {
  specialLocation: any
}

let createSelectorHack: any = createSelector;

const selectProjectStates: ParametricSelector<RootState, undefined, selectProjectState> =
createSelectorHack(
  (state: any) => state.project.specialLocation,
  (specialLocation: any) => ({
    specialLocation
  })
);


export const useProjectState = () => {
  return useSelector((state: RootState) => selectProjectStates(state, undefined));
}

 
export const useProjectDispatch = () => {
   const dispatch = useDispatch();
   return {
      saveProjectSpecial: (special: any) => {
        dispatch(saveSpecial(special));
      },
      saveProjectAcquisition: (acquisition: any) => {
        dispatch(saveAcquisition(acquisition));
      },
      saveProjectMaintenance: (maintenance: any) => {
        dispatch(saveMaintenance(maintenance));
      },
      saveProjectStudy: (study: any) => {
        dispatch(saveStudy(study));
      },
      saveProjectCapital: (capital: any) => {
        dispatch(saveCapital(capital));
      },
      saveSpecialLocation: (location: any) => {
        dispatch(saveSpecialLocation(location));
      }
   }
}