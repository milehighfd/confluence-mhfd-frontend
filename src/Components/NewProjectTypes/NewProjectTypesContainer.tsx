import { connect } from 'react-redux';

import NewProjectTypesView from './NewProjectTypesView';

import { clearCoordinates } from '../../store/actions/mapActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any) => {
  return {
    coordinates: state.map.newProject.coordinates
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
    clearCoordinates
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectTypesView);
