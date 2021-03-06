import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import debris from './debris';
import profile from './ProfileReducer'

import mapReducer from './mapReducer';
import filterReducer from './filterReducer';
import panelReducer from './panelReducer';
import carouselImages from './carouselImagesReducer';
import uploadAttachment from './uploadAttachmentReducer';
import detailedReducer from './detailedReducer';

const appReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  map: mapReducer,
  filter: filterReducer,
  panel: panelReducer,
  appUser,
  debris,
  users,
  profile,
  carouselImages,
  uploadAttachment,
  detailed: detailedReducer
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;