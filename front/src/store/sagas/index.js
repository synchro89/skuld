import { all, takeLatest } from 'redux-saga/effects';

import { UserTypes } from '../ducks/user';
import { getUserRequest } from './user';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.GET_USER_REQUEST, getUserRequest)]);
}
