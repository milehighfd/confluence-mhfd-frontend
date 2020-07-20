import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { bindActionCreators } from 'redux';
import { replaceAppUser } from '../../../store/actions/appUser';
import { updateUserInformation } from '../../../store/actions/ProfileActions';

const mapStateToProps = (state: any) => {
  return {
    user: state.profile.userInformation,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    updateUserInformation,
    }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
