import { connect } from 'react-redux';

import ProjectAcquisitionView from './ProjectAcquisitionView';

const mapStateToProps = (state: any) => {
  return {
    problems: state.map.problems,
    components: state.map.components
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAcquisitionView);
