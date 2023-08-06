import {call, put, SagaReturnType} from 'redux-saga/effects';
import {AuthActions} from '@store/modules/Auth/actions';
import {authenticateAsync} from '@services/local-auth';

export function* handleLocalAuth() {
  try {
    const result: SagaReturnType<typeof authenticateAsync> = yield call(
      authenticateAsync,
    );
    if (result) {
      yield put(AuthActions.LOCAL_AUTH.SUCCESS.create());
      return true;
    } else {
      yield put(AuthActions.LOCAL_AUTH.FAILURE.create());
    }
  } catch (e) {
    console.error(e);
    yield put(AuthActions.LOCAL_AUTH.FAILURE.create());
  }
  return false;
}
