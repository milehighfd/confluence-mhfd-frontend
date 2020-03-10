import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import appUser from './appUser';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  map: mapReducer,
  appUser
});
