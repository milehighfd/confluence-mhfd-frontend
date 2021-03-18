import { ParametricSelector, createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { saveAcquisition, saveCapital, saveMaintenance, saveSpecial, saveStudy, saveSpecialLocation, saveAcquisitionLocation, getStreamIntersection, changeDrawState, getStreamIntersectionPolygon, getStreamsIntersectedPolygon, changeAddLocationState, setSave } from '../store/actions/ProjectActions';
import { RootState } from '../store/reducers';

interface selectProjectState {
  specialLocation: any,
  acquisitionLocation: any,
  streamIntersected: any,
  isDraw: boolean,
  streamsIntersectedIds: any,
  isAddLocation: boolean
}

let createSelectorHack: any = createSelector;

const selectProjectStates: ParametricSelector<RootState, undefined, selectProjectState> =
createSelectorHack(
  (state: any) => state.project.specialLocation,
  (state: any) => state.project.acquisitionLocation,
  (state: any) => state.project.streamIntersected,
  (state: any) => state.project.isDraw,
  (state: any) => state.project.streamsIntersectedIds,
  (state: any) => state.project.isAddLocation,
  (specialLocation: any, acquisitionLocation: any, streamIntersected: any, isDraw: boolean, streamsIntersectedIds: any, isAddLocation:any) => ({
    specialLocation, acquisitionLocation, streamIntersected, isDraw, streamsIntersectedIds, isAddLocation
  })
);

export const useProjectState = () => {
  return useSelector((state: RootState) => selectProjectStates(state, undefined));
}
 
export const useProjectDispatch = () => {
   const dispatch = useDispatch();
   return {
      setSave: (status: number) => {
        dispatch(setSave(status));//save project
      },
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
        dispatch(getStreamIntersectionPolygon(geom));
      },
      //get the ids of streams 
      getStreamsIntersectedPolygon: (geom: any) => {
        dispatch(getStreamsIntersectedPolygon(geom));
      },
      changeDrawState: (isDraw: boolean) => {
        dispatch(changeDrawState(isDraw));
      },
      changeAddLocationState: (isAddLocation: boolean) => {
        dispatch(changeAddLocationState(isAddLocation));
      }
   }
}