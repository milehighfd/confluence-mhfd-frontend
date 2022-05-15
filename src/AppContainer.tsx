import { connect } from 'react-redux';

import App from './App';
import { bindActionCreators } from 'redux';
import { getGroupOrganization } from './store/actions/ProfileActions';
import { getCarouselImages } from './store/actions/carouselImagesActions';
import { getMapTables } from './store/actions/mapActions';

const mapStateToProps = (state: any) => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    getCarouselImages,
    getMapTables,
    getGroupOrganization
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
