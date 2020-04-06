import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import users from './usersReducer';
import mapReducer from './mapReducer';
import appUser from './appUser';
import debris from './debris';
import filterReducer from './filterReducer';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  map: mapReducer,
  filter: filterReducer,
  appUser,
  debris,
  users
});
