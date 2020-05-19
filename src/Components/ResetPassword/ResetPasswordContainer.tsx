import { connect } from 'react-redux';

import ResetPasswordView from './ResetPasswordView';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample,
    images: state.carouselImages.images
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordView);
