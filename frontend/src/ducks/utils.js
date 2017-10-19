import axios from 'axios';
import queryString from 'query-string';
import { put, call, take } from 'redux-saga/effects';
import ErrorStackParser from 'error-stack-parser';

function getStackTrace(offset = 2) {
  try {
    return ErrorStackParser.parse(new Error())
      .slice(offset)
      .map(frame => {
        const location = [
          frame.fileName,
          frame.lineNumber,
          frame.columnNumber,
        ].join(':');
        return `${frame.functionName} (${location})`;
      });
  } catch (e) {}
}

const actionTypes = {};
export function actionCreator(type, commonMeta, error) {
  if (actionTypes[type]) throw new Error(`Duplicate action type: ${type}`);
  actionTypes[type] = true;
  return Object.assign(
    (payload, meta) => {
      const action = {
        type,
        payload,
        meta: Object.assign({}, commonMeta, meta, {
          stack: getStackTrace(),
        }),
      };
      if (error) action.error = error;
      return action;
    },
    { type },
  );
}
export function asyncActionCreators(type, commonMeta) {
  return {
    request: actionCreator(`${type}_REQUEST`, commonMeta),
    started: actionCreator(`${type}_STARTED`, commonMeta),
    done: actionCreator(`${type}_DONE`, commonMeta),
    failed: actionCreator(`${type}_FAILED`, commonMeta, true),
  };
}

export function createAxiosSaga(asyncAction, axiosParams) {
  return function* asyncSagaRequest() {
    while (true) {
      const { payload, meta } = yield take(asyncAction.request.type);

      yield put(asyncAction.started(payload, meta));
      try {
        const response = yield call(axios, {
          ...axiosParams,
          ...payload.axiosParams,
        });

        yield put(
          asyncAction.done(
            {
              ...payload,
              response: response.data || {},
            },
            meta,
          ),
        );
      } catch (error) {
        if (error.response.status === 500) {
          console.log(error);
        }
        yield put(asyncAction.failed({ ...payload, error }, meta));
      }
    }
  };
}
