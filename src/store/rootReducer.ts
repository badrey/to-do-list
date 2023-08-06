import {combineReducers} from 'redux';
import {toDoReducer} from '@store/modules/ToDo/reducer';
import {authReducer} from '@store/modules/Auth/reducer';

export const rootReducer = combineReducers({
  toDo: toDoReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
