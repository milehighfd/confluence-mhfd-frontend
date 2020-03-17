import { connect } from 'react-redux';

import NewProjectFormView from './NewProjectFormView';

const mapStateToProps = (state: any) => {
  return {
    problems: state.map.problems,
    projects: state.map.projects,
    components: state.map.components
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectFormView);
