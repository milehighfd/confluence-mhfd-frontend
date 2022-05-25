import { useSelector, useDispatch } from 'react-redux';
import {
  clear,
  deleteAttachment,
  getAllAttachment,
  getAttachment,
  getAttachmentByProject,
  toggleAttachment
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
    deleteAttachment: (index: number, _id: string) => {
      dispatch(deleteAttachment(index, _id));
    },
    toggleAttachment: (index: number, _id: string) => {
      dispatch(toggleAttachment(index, _id));
    },
    getAttachment: (projectid: any) => {
      dispatch(getAllAttachment(projectid));
    },
    getAttachmentByProject: (projectid: any) => {
      dispatch(getAttachmentByProject(projectid));
    }
  };
};
