import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {isAuthenticatedSelector} from '@store/modules/Auth/selectors';
import {AuthActions} from '@store/modules/Auth/actions';
import {handleIsLocalAuthenticated} from '../sagas/handleIsLocalAuthenticated';

describe('handleIsLocalAuthenticated Saga', () => {
  it('should return true if already authenticated', () => {
    return expectSaga(handleIsLocalAuthenticated)
      .provide([[matchers.select(isAuthenticatedSelector), true]])
      .returns(true)
      .run();
  });

  it('should trigger local auth and return true if authentication succeeds', () => {
    return expectSaga(handleIsLocalAuthenticated)
      .provide([
        [matchers.select(isAuthenticatedSelector), false],
        [
          matchers.take([
            AuthActions.LOCAL_AUTH.SUCCESS.type,
            AuthActions.LOCAL_AUTH.FAILURE.type,
          ]),
          {type: AuthActions.LOCAL_AUTH.SUCCESS.type},
        ],
      ])
      .put(AuthActions.LOCAL_AUTH.START.create())
      .returns(true)
      .run();
  });

  it('should trigger local auth and return false if authentication fails', () => {
    return expectSaga(handleIsLocalAuthenticated)
      .provide([
        [matchers.select(isAuthenticatedSelector), false],
        [
          matchers.take([
            AuthActions.LOCAL_AUTH.SUCCESS.type,
            AuthActions.LOCAL_AUTH.FAILURE.type,
          ]),
          {type: AuthActions.LOCAL_AUTH.FAILURE.type},
        ],
      ])
      .put(AuthActions.LOCAL_AUTH.START.create())
      .returns(false)
      .run();
  });
});
