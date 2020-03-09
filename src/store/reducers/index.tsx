import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
import userReducer from './userReducer';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  user: userReducer
});
