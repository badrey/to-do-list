import {RootState} from '@store/rootReducer';

export const toDoItemsSelector = (state: RootState) => state.toDo.items;
