import { connect } from 'react-redux';

import UserView from './UserView';
import { bindActionCreators } from 'redux';
import { saveUserActivated, saveUserPending, getUserActivity, getAllUserActivity } from '../../store/actions/usersActions';
import { getUserInformation } from '../../store/actions/ProfileActions';


const mapStateToProps = (state: any) => {
  return {
    users: state.users.users,
    user: state.profile.userInformation,
    userActivity: state.users.userActivity
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  ...bindActionCreators({
    saveUserActivated,
    saveUserPending,
    getUserActivity,
    getAllUserActivity,
    getUserInformation
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
