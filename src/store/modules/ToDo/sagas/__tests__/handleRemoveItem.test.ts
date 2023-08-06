import {expectSaga} from 'redux-saga-test-plan';
import {call} from 'redux-saga/effects';
import {handleIsLocalAuthenticated} from '@store/modules/Auth/sagas/handleIsLocalAuthenticated';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleRemoveItem} from '@store/modules/ToDo/sagas/handleRemoveItem';

describe('handleRemoveItem Saga', () => {
  const testPayload = {id: 'testId'};
  const testAction = ToDoActions.REMOVE_ITEM.START.create(testPayload);

  it('should dispatch REMOVE_ITEM.SUCCESS when authentication succeeds', () => {
    return expectSaga(handleRemoveItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), true]])
      .put(ToDoActions.REMOVE_ITEM.SUCCESS.create(testPayload))
      .run();
  });

  it('should not dispatch REMOVE_ITEM.SUCCESS when authentication fails', () => {
    return expectSaga(handleRemoveItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), false]])
      .not.put(ToDoActions.REMOVE_ITEM.SUCCESS.create(testPayload))
      .run();
  });
});
