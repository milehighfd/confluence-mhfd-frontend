import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import profile from './ProfileReducer'
import project from './ProjectReducer'

import mapReducer from './mapReducer';
import uploadAttachment from './uploadAttachmentReducer';
import detailedReducer from './detailedReducer'; 
import notesReducer from './notesReducer';
import colorListReducer from './colorListReducer';
import portfolioReducer from './portfolioReducer';
import getRequestReducer from './requestReducer';
import financialReducer from './financialReducer';
const appReducer = (history: any, config: any) => {
  return combineReducers({
    router: connectRouter(history),
    map: mapReducer,
    appUser,
    users,
    profile,
    uploadAttachment,
    project,
    notes: notesReducer,
    detailed: detailedReducer,
    colorList: colorListReducer,
    portfolio: portfolioReducer,
    request: getRequestReducer(config.year),
    financial: financialReducer
  })
};

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
