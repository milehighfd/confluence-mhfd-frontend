import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import { getUserProjects } from '../../store/actions/ProfileActions';

const mapStateToProps = (state: any): any => {
  return {
    projects: state.profile.userProjects,
    user: state.appUser
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    getUserProjects(options: { requestName?: string, status?: string }) {
      dispatch(getUserProjects(options))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
