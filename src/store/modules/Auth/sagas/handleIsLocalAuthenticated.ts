import {isAuthenticatedSelector} from '@store/modules/Auth/selectors';
import {put, select, take} from 'redux-saga/effects';
import {AuthActions} from '@store/modules/Auth/actions';

export function* handleIsLocalAuthenticated() {
  const isAuthenticated: ReturnType<typeof isAuthenticatedSelector> =
    yield select(isAuthenticatedSelector);
  if (!isAuthenticated) {
    yield put(AuthActions.LOCAL_AUTH.START.create());
    const resultAction: ReturnType<
      | typeof AuthActions.LOCAL_AUTH.SUCCESS.create
      | typeof AuthActions.LOCAL_AUTH.FAILURE.create
    > = yield take([
      AuthActions.LOCAL_AUTH.SUCCESS.type,
      AuthActions.LOCAL_AUTH.FAILURE.type,
    ]);
    if (resultAction.type === AuthActions.LOCAL_AUTH.SUCCESS.type) {
      return true; // Authentication succeeded
    }
    return false; // Authentication failed
  }
  return true; // Already authenticated
}
