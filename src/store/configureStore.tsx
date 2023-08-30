import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers';
import thunk from "redux-thunk";
import abortMiddleware from 'store/middlewares/abortMiddleware';

export const history = createBrowserHistory();

const logger = (store: any) => (next: any) => (action: any) => {
  // console.log('dispatching', action);
  let result = next(action);
  // console.log('next state', store.getState());
  return result;
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(config: any) {
  const store = createStore(
    createRootReducer(history, config), // root reducer with router state
    undefined,
    // compose(
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        logger,
        thunk,
        abortMiddleware
      ),
    )
  );
  return store
}
