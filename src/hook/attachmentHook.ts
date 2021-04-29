import { AnyLayer } from 'mapbox-gl';
import { dispatch } from 'd3';
import { ParametricSelector, createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers';
import { getAllAttachment, getAttachment, getAttachmentByProject } from '../store/actions/uploadAttachmentActions';

interface selectAttachmentState {
  attachments: any,
  uploadAttachment: any
}

let createSelectorHack: any = createSelector;

const selectAttachmentStates: ParametricSelector<RootState, undefined, selectAttachmentState> =
createSelectorHack(
  (state: any) => state.uploadAttachment.attachments.data,
  (state: any) => state.uploadAttachment,
  (attachments: any, uploadAttachment:any) => ({
    attachments, uploadAttachment
  })
);

export const useAttachmentState = () => {
  return useSelector((state: RootState) => selectAttachmentStates(state, undefined));
}

export const useAttachmentDispatch = () => {
   const dispatch = useDispatch();
   return {
      getAttachmentProjectId: (projectid: any) => {
        dispatch(getAttachment(projectid));
      },
      getAttachment: (projectid: any) => {
        dispatch(getAllAttachment(projectid));
      },
      getAttachmentByProject: (projectid:any) =>{
        dispatch(getAttachmentByProject(projectid));
      }
   }
}