import { connect } from 'react-redux';

import App from './App';
import { bindActionCreators } from 'redux';
import { replaceAppUser } from './store/actions/appUser';
import { getUserInformation } from './store/actions/ProfileActions';
import { getCarouselImages } from './store/actions/carouselImagesActions';
import { getMapTables, getParamsFilter, setFilterProblemOptions, setFilterProjectOptions, setFilterComponentOptions } from './store/actions/mapActions';

const mapStateToProps = (state: any) => {
  return {
    appUser: state.appUser,
    filterProblemOptions: state.map.filterProblemOptions,
    filterProjectOptions: state.map.filterProjectOptions,
    filterComponentOptions: state.map.filterComponentOptions
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    getUserInformation,
    getCarouselImages,
    getMapTables,
    getParamsFilter,
    setFilterProblemOptions, 
    setFilterProjectOptions, 
    setFilterComponentOptions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
