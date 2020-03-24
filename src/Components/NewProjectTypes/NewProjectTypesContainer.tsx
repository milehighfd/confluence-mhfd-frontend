import { connect } from 'react-redux';

import NewProjectTypesView from './NewProjectTypesView';

import { clearCoordinates } from '../../store/actions/mapActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
    clearCoordinates
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectTypesView);
