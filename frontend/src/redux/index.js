import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import creacteSagaMiddleware from 'redux-saga';
import history from '../history';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = creacteSagaMiddleware();
const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger,
);

const reduxDevTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = window[reduxDevTools] || compose;

const store = createStore(reducer, composeEnhancers(enhancer));
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
