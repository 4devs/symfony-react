import { all } from 'redux-saga/effects';
import { saga as mainSaga } from '../ducks/main';

export default function* rootSaga() {
  yield all([mainSaga()]);
}
