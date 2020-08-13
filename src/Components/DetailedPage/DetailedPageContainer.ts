import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailedPageView from './DetailedPageView';
import { existDetailedPageProblem,
        existDetailedPageProject,
        getDetailedPageProblem,
        getDetailedPageProject,
        getComponentsByProblemId,
        getComponentCounter
     } from '../../store/actions/mapActions';

const mapStateToProps = (state: any): any => {
  return {
    displayModal: state.detailed.displayModal,
    detailed: state.detailed.detailed,
    loaderDetailedPage: state.detailed.spin,
    componentsOfProblems: state.map.componentsByProblemId,
    loaderTableCompoents: state.map.loaderTableCompoents,
    componentCounter: state.map.componentCounter
  };
};

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({
        getDetailedPageProblem,
        getDetailedPageProject,
        getComponentsByProblemId,
        existDetailedPageProject,
        existDetailedPageProblem,
        getComponentCounter
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPageView);