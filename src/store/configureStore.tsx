import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers';
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const logger = (store: any) => (next: any) => (action: any) => {
  // console.log('dispatching', action);
  let result = next(action);
  // console.log('next state', store.getState());
  return result;
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    // compose(
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        logger,
        thunk
      ),
    )
  );
  return store
}
