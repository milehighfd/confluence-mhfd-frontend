import { connect } from 'react-redux';

import App from './App';
import { bindActionCreators } from 'redux';
import { replaceAppUser } from './store/actions/appUser';
import { getUserInformation } from './store/actions/ProfileActions';

const mapStateToProps = (state: any) => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    getUserInformation,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
