import { connect } from 'react-redux';

import UserView from './UserView';
import { bindActionCreators } from 'redux';
import { saveUserActivated, saveUserPending, getUserActivity } from '../../store/actions/usersActions';


const mapStateToProps = (state: any) => {
  return {
    users: state.users.users,
    userActivity: state.users.userActivity
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  ...bindActionCreators({
    saveUserActivated,
    saveUserPending,
    getUserActivity
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
