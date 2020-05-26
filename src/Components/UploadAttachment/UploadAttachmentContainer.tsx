import { connect } from 'react-redux';

import UploadAttachmentView from './UploadAttachmentView';
import { getAllAttachment, uploadFile } from '../../store/actions/uploadAttachmentActions';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample,
    user: state.profile.userInformation,
    attachments: state.uploadAttachment.attachments
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    getAllAttachment(url: string) {
      dispatch(getAllAttachment(url))
    },
    uploadFile(files: any, url: string) {
      dispatch(uploadFile(files, url))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAttachmentView);
