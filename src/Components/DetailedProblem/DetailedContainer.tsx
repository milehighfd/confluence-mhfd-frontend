import { connect } from 'react-redux';

import DetailedView from './DetailedView';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
