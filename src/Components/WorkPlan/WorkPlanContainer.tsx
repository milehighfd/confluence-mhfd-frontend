import { connect } from 'react-redux';

import WorkPlanView from './WorkPlanView';
import { bindActionCreators } from 'redux';

import { getProjectWithFilters } from '../../store/actions/filterActions';
import { saveDraftCard, getUserProjects } from '../../store/actions/panelActions';

const mapStateToProps = (state: any) => {
  return {
    projectsByType: state.map.projectsByType,
    panel: state.panel.projects,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
    saveDraftCard,
    getUserProjects,
    getProjectWithFilters
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkPlanView);
