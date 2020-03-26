import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import userReducer from './userReducer';
import users from './usersReducer';
import mapReducer from './mapReducer';
import filterReducer from './filterReducer';
import appUser from './appUser';
import debris from './debris';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  map: mapReducer,
  filter: filterReducer,
  appUser,
  debris,
  users
});
