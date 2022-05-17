import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import { getCountProjects, uploadImage, getUserInformation, spinValue, updateUserInformation,
   getUserProblem, getUserProject, getGroupOrganization, getAllUserProjects } from '../../store/actions/ProfileActions';
import { User } from '../../Classes/TypeList';
import { getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId, getComponentCounter } from '../../store/actions/mapActions';
const mapStateToProps = (state: any): any => {
  return {
    projects: state.profile.userProjects,
    problems: state.profile.userProblems,
    loaderCardProblems: state.profile.loaderCardProjects,
    loaderCardProjects: state.profile.loaderCardProjects,
    user: state.profile.userInformation,
    countProjects: state.profile.countProjects,
    userImage: state.profile.userImage,
    spinImage: state.profile.spin,
    displayModal: state.detailed.displayModal,
    detailed: state.detailed.detailed,
    loaderDetailedPage: state.detailed.spin,
    componentsOfProblems: state.map.componentsByProblemId,
    loaderTableCompoents: state.map.loaderTableCompoents,
    groupOrganization: state.profile.groupOrganization,
    componentCounter: state.map.componentCounter
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
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
    },
    getDetailedPageProblem(id: string) {
      dispatch(getDetailedPageProblem(id))
    },
    getDetailedPageProject(id: number, type: string) {
      dispatch(getDetailedPageProject(id, type))
    },
    getComponentsByProblemId(data: any) {
      dispatch(getComponentsByProblemId(data))
    },
    getGroupOrganization() {
      dispatch(getGroupOrganization());
    },
    getAllUserProjects() {
      dispatch(getAllUserProjects());
    },
    getComponentCounter(id: number, type: string, setCounterComponents: Function) {
      dispatch(getComponentCounter(id, type, setCounterComponents));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
