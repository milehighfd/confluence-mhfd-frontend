import * as types from '../types/ProfileTypes';

const initProfile = {
  userInformation: {
    activated: false,
    firstName: "",
    lastName: "",
    designation: "",
    _id: "",
    email: "",
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    polygon: []
  },
  userProjects: [],
  userProblems: [],
  loaderCardProjects: false,
  loaderCardProblems: false,
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
        userProjects: action.projects,
        loaderCardProjects: false
      }
    case types.GET_USER_PROBLEMS:
      return {
        ...state,
        userProblems: action.problems,
        loaderCardProblems: false
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
    case types.SET_VALUE_LOADER_PROJECT:
      return {
        ...state,
        loaderCardProjects: action.spin
      }
    case types.SET_VALUE_LOADER_PROBLEM:
      return {
        ...state,
        loaderCardProblems: action.spin
      }
    case types.UPDATE_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.user
      }
    case types.RESET_PROFILE:
      return {
        ...initProfile
      }
    default:
      return state;
  }
}

export default profile;

