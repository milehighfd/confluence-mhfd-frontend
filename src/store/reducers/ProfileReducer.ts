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
    polygon: [],
    isSelect: 'beggining'
  },
  userProjects: [],
  userProblems: [],
  loaderCardProjects: false,
  loaderCardProblems: false,
  laoderAllProjects: false,
  userImage: '',
  countProjects: [],
  spin: false,
  groupOrganization: [],
  allUserProjects: []
}

const profile = (state = initProfile, action: any) => {
  switch (action.type) {
    case types.GET_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.user,
        spin: false
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
    case types.UPDATE_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.user
      }
    case types.RESET_PROFILE:
      return {
        ...initProfile
      }
    case types.GET_GROUP_ORGANIZATION:
      return {
        ...state,
        groupOrganization: action.data
      }
    case types.GET_GUEST_USER:
      return {
        ...state,
        userInformation: action.user
      }
    default:
      return state;
  }
}

export default profile;

