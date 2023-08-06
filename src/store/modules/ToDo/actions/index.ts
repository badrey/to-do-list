import {createAction} from '@store/utils/actions/createAction';
import {ToDoItemData} from '@store/modules/ToDo/types';

const ADD_ITEM = createAction('ADD_ITEM', {
  START: (payload: {content: string; previousItemId: string | null}) => payload,
  SUCCESS: (payload: {content: string; previousItemId: string | null}) =>
    payload,
});
const REMOVE_ITEM = createAction('REMOVE_ITEM', {
  START: (payload: {id: string}) => payload,
  SUCCESS: (payload: {id: string}) => payload,
});
const UPDATE_ITEM = createAction('UPDATE_ITEM', {
  START: (payload: {item: ToDoItemData}) => payload,
  SUCCESS: (payload: {item: ToDoItemData}) => payload,
});

export const ToDoActions = Object.freeze({
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
});
