import { connect } from 'react-redux';
import ConfirmPasswordView from './ConfirmPasswordView';
import { changeToFor } from '../../store/actions/sample';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample,
    images: state.carouselImages.images
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    coso() {
      dispatch(changeToFor());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordView);
