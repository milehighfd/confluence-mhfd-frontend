import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { bindActionCreators } from 'redux';
import { updateUserInformation, getGroupOrganization, replaceAppUser } from '../../../store/actions/ProfileActions';

const mapStateToProps = (state: any) => {
  return {
    user: state.profile.userInformation,
    groupOrganization: state.profile.groupOrganization
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators ({
    replaceAppUser,
    updateUserInformation,
    getGroupOrganization,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarView);
