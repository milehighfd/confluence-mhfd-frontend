import { connect } from 'react-redux';

import LoginView from './LoginView';
import { replaceAppUser } from '../../store/actions/appUser';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    replaceAppUser(appUser: any) {
      dispatch(replaceAppUser(appUser))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
