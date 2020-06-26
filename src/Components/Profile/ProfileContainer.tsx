import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import { getUserProjects, getCountProjects, uploadImage, getUserInformation, spinValue, updateUserInformation, getUserProblem, getUserProject } from '../../store/actions/ProfileActions';
import { User } from '../../Classes/TypeList';

const mapStateToProps = (state: any): any => {
  return {
    projects: state.profile.userProjects,
    problems: state.profile.userProblems,
    loaderCardProblems: state.profile.loaderCardProjects,
    loaderCardProjects: state.profile.loaderCardProjects,
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
    getUserProblem(options: { keyword: string, column: string, order: string }) {
      dispatch(getUserProblem(options))
    },
    getUserProject(options: { keyword: string, column: string, order: string }) {
      dispatch(getUserProject(options))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
