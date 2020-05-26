import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import { getUserProjects, getCountProjects, uploadImage, getUserInformation, spinValue, updateUserInformation } from '../../store/actions/ProfileActions';
import { User } from '../../Classes/TypeList';
import { getInitialMapView } from '../../store/actions/mapActions';

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
    },
    updateUserInformation(user: User) {
      dispatch(updateUserInformation(user))
    },
    getInitialMapView() {
      dispatch(getInitialMapView())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
