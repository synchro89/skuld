import { all, fork, takeLatest } from 'redux-saga/effects';

import { getUserRequest } from './user';

export default function* rootSaga() {
  yield all([
    all([fork(getUserRequest)]),
    // takeLatest(CategoryTypes.GET_CATEGORY_REQUEST, getCategoryRequest),
  ]);
}
