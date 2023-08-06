import {takeLatest} from 'redux-saga/effects';

import {handleAddItem} from './handleAddItem';
import {ToDoActions} from '@store/modules/ToDo/actions';
import {handleRemoveItem} from '@store/modules/ToDo/sagas/handleRemoveItem';
import {handleUpdateItem} from '@store/modules/ToDo/sagas/handleUpdateItem';

export const toDoWatchers = [
  takeLatest(ToDoActions.ADD_ITEM.START.type, handleAddItem),
  takeLatest(ToDoActions.REMOVE_ITEM.START.type, handleRemoveItem),
  takeLatest(ToDoActions.UPDATE_ITEM.START.type, handleUpdateItem),
];
