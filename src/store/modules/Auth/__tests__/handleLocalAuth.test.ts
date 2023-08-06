import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';
import {AuthActions} from '@store/modules/Auth/actions';
import {authenticateAsync} from '@services/local-auth';
import {handleLocalAuth} from '../sagas/handleLocalAuth';

describe('handleLocalAuth Saga', () => {
  let errorSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]],
    any
  >;

  beforeAll(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });
  it('should dispatch success action if authentication succeeds', () => {
    return expectSaga(handleLocalAuth)
      .provide([[matchers.call.fn(authenticateAsync), true]])
      .put(AuthActions.LOCAL_AUTH.SUCCESS.create())
      .returns(true)
      .run();
  });

  it('should dispatch failure action if result is false', () => {
    return expectSaga(handleLocalAuth)
      .provide([[matchers.call.fn(authenticateAsync), false]])
      .put(AuthActions.LOCAL_AUTH.FAILURE.create())
      .returns(false)
      .run();
  });

  it('should dispatch failure action if authentication throws an exception', () => {
    const error = new Error('Authentication error');

    return expectSaga(handleLocalAuth)
      .provide([[matchers.call.fn(authenticateAsync), throwError(error)]])
      .put(AuthActions.LOCAL_AUTH.FAILURE.create())
      .returns(false)
      .run();
  });
});
