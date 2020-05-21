import { connect } from 'react-redux';

import UploadAttachmentView from './UploadAttachmentView';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAttachmentView);
