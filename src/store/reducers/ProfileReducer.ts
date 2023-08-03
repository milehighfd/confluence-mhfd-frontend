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
  allUserProjects: [],
  isLocalGovernment: false
}

const profile = (state = initProfile, action: any) => {
  switch (action.type) {
    case types.GET_USER_INFORMATION:
      let isLocalGovernment = false;
      const CODE_LOCAL_GOVERNMENT = 3;
      if (action.user) {
        if (action.user?.business_associate_contact?.business_address?.business_associate?.code_business_associates_type_id === CODE_LOCAL_GOVERNMENT) {
          if (action.user?.business_associate_contact?.business_address?.business_associate?.business_name) {
            isLocalGovernment = true;
          }
        }
      }
      return {
        ...state,
        userInformation: action.user,
        spin: false,
        isLocalGovernment: isLocalGovernment
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

