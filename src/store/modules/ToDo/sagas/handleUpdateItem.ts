import {call, put} from 'redux-saga/effects';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleIsLocalAuthenticated} from '@store/modules/Auth/sagas/handleIsLocalAuthenticated';

type Actions = ReturnType<typeof ToDoActions.UPDATE_ITEM.START.create>;

export function* handleUpdateItem(action: Actions) {
  try {
    const success: ReturnType<typeof handleIsLocalAuthenticated> = yield call(
      handleIsLocalAuthenticated,
    );
    if (success) {
      yield put(ToDoActions.UPDATE_ITEM.SUCCESS.create(action.payload));
    }
  } catch (e) {
    console.error(e);
  }
}
