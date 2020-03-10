import { connect } from 'react-redux';

import MapView from './MapView';

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

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
