import {expectSaga} from 'redux-saga-test-plan';
import {call} from 'redux-saga/effects';
import {handleIsLocalAuthenticated} from '@store/modules/Auth/sagas/handleIsLocalAuthenticated';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleAddItem} from '@store/modules/ToDo/sagas/handleAddItem';

describe('handleAddItem Saga', () => {
  const testPayload = {content: 'test content', previousItemId: 'testId'};
  const testAction = ToDoActions.ADD_ITEM.START.create(testPayload);

  it('should dispatch ADD_ITEM.SUCCESS when authentication succeeds', () => {
    return expectSaga(handleAddItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), true]])
      .put(ToDoActions.ADD_ITEM.SUCCESS.create(testPayload))
      .run();
  });

  it('should not dispatch ADD_ITEM.SUCCESS when authentication fails', () => {
    return expectSaga(handleAddItem, testAction)
      .provide([[call(handleIsLocalAuthenticated), false]])
      .not.put(ToDoActions.ADD_ITEM.SUCCESS.create(testPayload))
      .run();
  });
});
