import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import { getUserProjects, getCountProjects, uploadImage, getUserInformation, spinValue } from '../../store/actions/ProfileActions';

const mapStateToProps = (state: any): any => {
  return {
    projects: state.profile.userProjects,
    user: state.profile.userInformation,
    countProjects: state.profile.countProjects,
    userImage: state.profile.userImage,
    spinImage: state.profile.spin
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    getUserProjects(options: { requestName?: string, status?: string }) {
      dispatch(getUserProjects(options))
    },
    getCountProjects() {
      dispatch(getCountProjects())
    },
    uploadImage(files: Array<any>) {
      dispatch(uploadImage(files))
    },
    getUserInformation() {
      dispatch(getUserInformation())
    },
    spinValue(spin: boolean) {
      dispatch(spinValue(spin))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
