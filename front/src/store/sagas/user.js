import { call, put } from 'redux-saga/effects';
import api from '@/services/api';

import UserActions from '@/store/ducks/user';

export function* getUserRequest() {
  try {
    const endpoint = '/user';
    const { data } = yield call(api.get, endpoint);
    yield put(UserActions.getUserSuccess(data));
  } catch (error) {
    // console.log(error);
    yield put(UserActions.getUserFailure());
  }
}