import { ParametricSelector, createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { saveAcquisition, saveCapital, saveMaintenance, saveSpecial, saveStudy, saveSpecialLocation, saveAcquisitionLocation, getStreamIntersection } from '../store/actions/ProjectActions';
import { RootState } from '../store/reducers';

interface selectProjectState {
  specialLocation: any,
  acquisitionLocation: any,
  streamIntersected: any
}

let createSelectorHack: any = createSelector;

const selectProjectStates: ParametricSelector<RootState, undefined, selectProjectState> =
createSelectorHack(
  (state: any) => state.project.specialLocation,
  (state: any) => state.project.acquisitionLocation,
  (state: any) => state.project.streamIntersected,
  (specialLocation: any, acquisitionLocation: any, streamIntersected: any) => ({
    specialLocation, acquisitionLocation, streamIntersected
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
      },
      saveAcquisitionLocation: (location: any) => {
        dispatch(saveAcquisitionLocation(location))
      },
      getStreamIntersectionSave: (geom: any) => {
        dispatch(getStreamIntersection(geom));
      },
      getStreamIntersectionPolygon: (geom: any) => {
        dispatch(getStreamIntersection(geom));
      }
   }
}