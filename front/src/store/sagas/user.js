import { call, put } from 'redux-saga/effects';
import { api } from '@/services/api';

import UserActions from '@/store/ducks/user';

export function* getUserRequest() {
  try {
    yield put(UserActions.getUserRequest());

    let endpoint = '/users';

    let {
      data: { data },
    } = yield call(api.get, endpoint);

    console.log(data);

    yield put(UserActions.getUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(UserActions.getUserFailure());
  }
}
