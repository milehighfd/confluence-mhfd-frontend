import { connect } from 'react-redux';

import UploadAttachmentView from './UploadAttachmentView';
import { getAllAttachment, uploadFile, removeAttachment, setLoading } from '../../store/actions/uploadAttachmentActions';

const mapStateToProps = (state: any): any => {
  return {
    attachments: state.uploadAttachment.attachments,
    loading: state.uploadAttachment.loading
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    getAllAttachment(url: string) {
      dispatch(getAllAttachment(url))
    },
    uploadFile(files: any, url: string) {
      dispatch(uploadFile(files, url))
    },
    removeAttachment(id: string, url: string) {
      dispatch(removeAttachment(id, url))
    },
    setLoading(loading: boolean) {
      dispatch(setLoading(loading))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAttachmentView);
