import { connect } from 'react-redux';

import App from './App';
import { bindActionCreators } from 'redux';

import { replaceAppUser } from './store/actions/appUser';

const mapStateToProps = (state: any) => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
