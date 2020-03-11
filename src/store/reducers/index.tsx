import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import appUser from './appUser';
import debris from './debris';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  map: mapReducer,
  appUser,
  debris
});
