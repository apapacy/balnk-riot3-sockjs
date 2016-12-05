import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {persist, deserialize} from './persist';

export default function configureStore(initialState) {
  const state = deserialize();
  console.log(initialState);
  if (state) {
    initialState = {...{},...initialState, ...state};
  }
  console.log('++++++++++')
  console.log(state);
  const logger = createLogger()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, persist))
  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
