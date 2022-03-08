import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import debris from './debris';
import profile from './ProfileReducer'
import project from './ProjectReducer'

import mapReducer from './mapReducer';
import filterReducer from './filterReducer';
import panelReducer from './panelReducer';
import carouselImages from './carouselImagesReducer';
import uploadAttachment from './uploadAttachmentReducer';
import detailedReducer from './detailedReducer'; 
import notesReducer from './notesReducer';
import colorListReducer from './colorListReducer';

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
  project,
  notes: notesReducer,
  detailed: detailedReducer,
  colorList: colorListReducer
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;