import { connect } from 'react-redux';

import App from './App';
import { bindActionCreators } from 'redux';

import { replaceAppUser } from './store/actions/appUser';
import { getProjectWithFilters } from './store/actions/filterActions';

const mapStateToProps = (state: any) => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    getProjectWithFilters
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
