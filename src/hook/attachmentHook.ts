import { useSelector, useDispatch } from 'react-redux';
import {
  clear,
  getAllAttachment,
  getAttachment,
  removeAttachment,
  toggleAttachmentCover,
  setProjectId
} from '../store/actions/uploadAttachmentActions';

export const useAttachmentState = () => useSelector(
  (state: { uploadAttachment: any }) => state.uploadAttachment
);

export const useAttachmentDispatch = () => {
  const dispatch = useDispatch();
  return {
    clear: () => {
      dispatch(clear())
    },
    getAttachmentProjectId: (projectid: any) => {
      dispatch(getAttachment(projectid));
    },
    getAttachment: (projectid: any) => {
      dispatch(getAllAttachment(projectid));
    },
    toggleAttachmentCover: (index:number, id: string, value: boolean) => {
      dispatch(toggleAttachmentCover(index, id, value));
    },
    getAllAttachment: (projectid: any) => {
      dispatch(getAllAttachment(projectid));
    },
    removeAttachment(ids: Array<any>) {
      dispatch(removeAttachment(ids))
    },
    setProjectId(project_id: any) {
      dispatch(setProjectId(project_id))
    }
  };
};
