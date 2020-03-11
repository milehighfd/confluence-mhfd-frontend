import { connect } from 'react-redux';

import NewProjectDebrisView from './NewProjectDebrisView';

const mapStateToProps = (state: any) => {
  return {
    polygons: state.map.polygons,
    components: state.map.components
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDebrisView);
