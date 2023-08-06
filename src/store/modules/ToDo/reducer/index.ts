import produce from 'immer';
import {persistReducer} from 'redux-persist';
import {MmkvReduxStorage} from '@store/reduxStorage';
import {ToDoItemData} from '@store/modules/ToDo/types';
import {ToDoActions} from '@store/modules/ToDo/actions';
import uuid from 'react-native-uuid';

export interface State {
  items: ToDoItemData[];
}

type Actions = ReturnType<
  | typeof ToDoActions.ADD_ITEM.SUCCESS.create
  | typeof ToDoActions.REMOVE_ITEM.SUCCESS.create
  | typeof ToDoActions.UPDATE_ITEM.SUCCESS.create
>;

const INITIAL_STATE: State = {
  items: [],
};

export function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ToDoActions.ADD_ITEM.SUCCESS.type: {
        const id = uuid.v4().toString();
        const newItem: ToDoItemData = {
          id,
          content: action.payload.content,
        };

        const index = draft.items.findIndex(
          (item: ToDoItemData) => item.id === action.payload.previousItemId,
        );
        // If previousItemId is not specified or can't find an item with such ID then add to the end
        if (index < 0) {
          draft.items.push(newItem);
        } else {
          draft.items = [
            ...draft.items.slice(0, index + 1),
            newItem,
            ...draft.items.slice(index + 1),
          ];
        }
        break;
      }
      case ToDoActions.REMOVE_ITEM.SUCCESS.type: {
        const index = draft.items.findIndex(
          (item: ToDoItemData) => item.id === action.payload.id,
        );
        if (index >= 0) {
          draft.items = [
            ...draft.items.slice(0, index),
            ...draft.items.slice(index + 1),
          ];
        }
        break;
      }
      case ToDoActions.UPDATE_ITEM.SUCCESS.type: {
        const index = draft.items.findIndex(
          (item: ToDoItemData) => item.id === action.payload.item.id,
        );
        if (index >= 0) {
          draft.items[index] = action.payload.item;
        }
        break;
      }
    }
  });
}

export const toDoReducer = persistReducer(
  {
    key: 'toDo',
    storage: MmkvReduxStorage,
  },
  reducer,
);
