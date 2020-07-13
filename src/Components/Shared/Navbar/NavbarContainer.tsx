import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { bindActionCreators } from 'redux';
import { replaceAppUser } from '../../../store/actions/appUser';

const mapStateToProps = (state: any) => {
  return {
    user: state.profile.userInformation,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
