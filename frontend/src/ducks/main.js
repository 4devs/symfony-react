import { all } from 'redux-saga/effects';
import { actionCreator, asyncActionCreators, createAxiosSaga } from './utils';
import { appName } from '../config';

/**
 * Constants
 * */

export const moduleName = 'main';
const prefix = `${appName}/${moduleName}`;

export const CONST_EXAMPLE = `${prefix}/CONST_EXAMPLE`;

/**
 * Reducer
 * */

export default (state = {}, action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const exampleAction = actionCreator(CONST_EXAMPLE);
export const exampleAsyncAction = asyncActionCreators(CONST_EXAMPLE);

/**
 * Sagas
 * */
export const exampleSaga = createAxiosSaga(exampleAsyncAction);

export const saga = function*() {
  yield all([exampleSaga()]);
};
