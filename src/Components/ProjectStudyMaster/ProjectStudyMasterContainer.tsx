import { connect } from 'react-redux';

import ProjectStudyMasterView from './ProjectStudyMasterView';

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStudyMasterView);
