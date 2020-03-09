import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import userReducer from './userReducer';
import mapReducer from './mapReducer';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  map: mapReducer
});
