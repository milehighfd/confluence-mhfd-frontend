import * as types from '../types/ProfileTypes';

const initProfile = {
  userInformation: Object,
  userProjects: [],
  userImage: '',
  countProjects: []
}

const profile = (state = initProfile, action: any) => {
  switch (action.type) {
    case types.GET_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.user
      }
    case types.GET_USER_PROJECTS:
      return {
        ...state,
        userProjects: action.projects
      }
    case types.UPLOAD_PHOTO:
      return {
        ...state,
        userImage: action.imageUrl
      }
    case types.COUNT_PROJECTS:
      return {
        ...state,
        countProjects: action.countProjects
      }
    default:
      return state;
  }
}

export default profile;

