import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import profile from './ProfileReducer'
import project from './ProjectReducer'

import mapReducer from './mapReducer';
import carouselImages from './carouselImagesReducer';
import uploadAttachment from './uploadAttachmentReducer';
import detailedReducer from './detailedReducer'; 
import notesReducer from './notesReducer';
import colorListReducer from './colorListReducer';

import boardReducer from './boardReducer';
const appReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  map: mapReducer,
  appUser,
  users,
  profile,
  carouselImages,
  uploadAttachment,
  project,
  notes: notesReducer,
  detailed: detailedReducer,
  colorList: colorListReducer,
  boardReducer: boardReducer
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;