import {expectSaga} from 'redux-saga-test-plan';
import {call} from 'redux-saga/effects';
import {handleIsLocalAuthenticated} from '@store/modules/Auth/sagas/handleIsLocalAuthenticated';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleUpdateItem} from '@store/modules/ToDo/sagas/handleUpdateItem';

describe('handleUpdateItem Saga', () => {
  const testPayload = {item: {id: 'testId', content: 'test content'}};
  const testAction = ToDoActions.UPDATE_ITEM.START.create(testPayload);

  it('should dispatch UPDATE_ITEM.SUCCESS when authentication succeeds', () => {
    return expectSaga(handleUpdateItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), true]])
      .put(ToDoActions.UPDATE_ITEM.SUCCESS.create(testPayload))
      .run();
  });

  it('should not dispatch UPDATE_ITEM.SUCCESS when authentication fails', () => {
    return expectSaga(handleUpdateItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), false]])
      .not.put(ToDoActions.UPDATE_ITEM.SUCCESS.create(testPayload))
      .run();
  });
});
