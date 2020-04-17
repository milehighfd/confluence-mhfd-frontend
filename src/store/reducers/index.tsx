import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import appUser from './appUser';
import debris from './debris';

import mapReducer from './mapReducer';
import filterReducer from './filterReducer';
import panelReducer from './panelReducer';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  map: mapReducer,
  filter: filterReducer,
  panel: panelReducer,
  appUser,
  debris,
  users
});
