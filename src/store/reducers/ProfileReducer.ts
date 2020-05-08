import * as types from '../types/ProfileTypes';

const initProfile = {
  userInformation: {},
  userProjects: [],
  userImage: '',
  countProjects: [],
  spin: false
}

const profile = (state = initProfile, action: any) => {
  switch (action.type) {
    case types.GET_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.user,
        spin: false
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
    case types.GET_PHOTO:
      return {
        ...state,
        userImage: action.userImage
      }
    case types.SPIN:
      return {
        ...state,
        spin: action.spin
      }
    default:
      return state;
  }
}

export default profile;

