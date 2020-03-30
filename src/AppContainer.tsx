import { connect } from 'react-redux';

import App from './App';
import { replaceAppUser } from './store/actions/appUser';
import { User } from './Classes/TypeList';
const mapStateToProps = (state: any): any => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    replaceAppUser(appUser: User) {
      dispatch(replaceAppUser(appUser))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
