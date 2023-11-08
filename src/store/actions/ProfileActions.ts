import * as types from '../types/ProfileTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { User } from '../../Classes/TypeList';
import { message } from 'antd';
import UnauthorizedError from 'Errors/UnauthorizedError';
import { push } from 'connected-react-router';

export const getUserInformation = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.ME, datasets.getToken())
      .then(user => {
        if (user?.user_id) {
          dispatch({ type: types.GET_USER_INFORMATION, user });
        }
      })
      .catch(err => {
        if (err instanceof UnauthorizedError) {
          dispatch(push('/'));
          message.error('Your session has expired, please login again!', 5);
        }
      });
  }
}

export const saveUserInformation = (user: User) => {
  return (dispatch: Function) => {
    dispatch({ type: types.GET_USER_INFORMATION, user });
  }
}

export const spinValue = (spin: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SPIN, spin })
  }
}
export const uploadImage = (files: Array<any>) => {
  return (dispatch: Function) => {
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.USER_UPLOAD_PHOTO, dataForm, datasets.getToken()).then(user => {
      if (user?.user_id) {
        dispatch({ type: types.GET_USER_INFORMATION, user });
      }
    })
  }
}

export const updateUserInformation = (user: User) => {
  return (dispatch: Function) => {
    datasets.putData(SERVER.UPDATE_USER_INFORMATION, user, datasets.getToken()).then(user => {
      if (user?.user_id) {
        message.success('your data was successfully updated!');
        dispatch(getUserInformation());
      }
    })
  }
}

export const getGroupOrganization = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GROUP_ORGANIZATION, datasets.getToken()).then(data => {
      dispatch({ type: types.GET_GROUP_ORGANIZATION, data });
    })
  }
}

export const getGroupOrganizationNoGeom = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GROUP_ORGANIZATION_NO_GEOM, datasets.getToken()).then(data => {
      dispatch({ type: types.GET_GROUP_ORGANIZATION, data });
    })
  }
}

export const resetProfile = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_PROFILE });
  }
}

// Values from user state

export const replaceAppUser = (appUser : User) => {
  return (dispatch : Function) => {
      dispatch({ type: types.REPLACE_USER, appUser });
  }
}

export const resetAppUser = () => {
  return (dispatch : Function) => {
      dispatch({ type: types.RESET_APP_USER, });
  }
}

export const addNotifications = (notifications : any) => {
  return (dispatch : Function) => {
    console.log('Here are the notification', notifications);
      dispatch({ type: types.ADD_NOTIFICATION, notifications });
  }
}

export const deleteNotification = (id : any) => {
  return (dispatch : Function) => {
      dispatch({ type: types.DELETE_NOTIFICATION, id });
  }
}

export const deleteAllNotifications = () => {
  return (dispatch : Function) => {
      dispatch({ type: types.DELETE_ALL_NOTIFICATIONS });
  }
}

export const openDiscussionTab = (value : boolean) => {
  return (dispatch : Function) => {
    dispatch({ type: types.OPEN_DISCUSSION_TAB, value });
  }
}