import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import profile from './ProfileReducer'
import project from './ProjectReducer'

import mapReducer from './mapReducer';
import filterReducer from './filterReducer';
import carouselImages from './carouselImagesReducer';
import uploadAttachment from './uploadAttachmentReducer';
import detailedReducer from './detailedReducer'; 
import notesReducer from './notesReducer';
import colorListReducer from './colorListReducer';

const appReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  map: mapReducer,
  filter: filterReducer,
  appUser,
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