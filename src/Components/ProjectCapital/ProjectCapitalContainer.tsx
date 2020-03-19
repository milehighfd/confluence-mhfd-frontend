import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectCapitalView from './ProjectCapitalView';
import { getReverseGeocode, savePolygonCoordinates, saveNewProjectForm } from '../../store/actions/mapActions';

const mapStateToProps = (state: any) => {
  return {
    problems: state.map.problems,
    projects: state.map.projects,
    components: state.map.components,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
    getReverseGeocode,
    savePolygonCoordinates,
    saveNewProjectForm
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCapitalView);
