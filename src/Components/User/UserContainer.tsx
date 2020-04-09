import { connect } from 'react-redux';

import UserView from './UserView';
import { bindActionCreators } from 'redux';
import { saveUserActivated, saveUserPending  } from '../../store/actions/usersActions';


const mapStateToProps = (state: any) => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = (dispatch: any): any => ({
  ...bindActionCreators({
    saveUserActivated,
    saveUserPending
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
