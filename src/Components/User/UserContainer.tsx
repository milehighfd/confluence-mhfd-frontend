import { connect } from 'react-redux';

import UserView from './UserView';
import { bindActionCreators } from 'redux';

import { saveUserState, deleteUser } from '../../store/actions/userActions';

const mapStateToProps = (state: any) => {
  return {
    users: state.user.users
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  ...bindActionCreators({
    saveUserState,
    deleteUser
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
