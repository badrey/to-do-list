import {call, put} from 'redux-saga/effects';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleIsLocalAuthenticated} from '@store/modules/Auth/sagas/handleIsLocalAuthenticated';

type Actions = ReturnType<typeof ToDoActions.REMOVE_ITEM.START.create>;

export function* handleRemoveItem(action: Actions) {
  try {
    const success: ReturnType<typeof handleIsLocalAuthenticated> = yield call(
      handleIsLocalAuthenticated,
    );
    if (success) {
      yield put(ToDoActions.REMOVE_ITEM.SUCCESS.create(action.payload));
    }
  } catch (e) {
    console.error(e);
  }
}
