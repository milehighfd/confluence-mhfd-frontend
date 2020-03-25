import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { User } from '../../../Classes/User';
import { replaceAppUser } from '../../../store/actions/appUser';
const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    replaceAppUser(appUser: User) {
      dispatch(replaceAppUser(appUser))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
