import produce from 'immer';
import {AuthActions} from '@store/modules/Auth/actions';
import {MmkvReduxStorage} from '@store/reduxStorage';
import {persistReducer} from 'redux-persist';

export interface State {
  isAuthenticated: boolean;
}

type Actions = ReturnType<typeof AuthActions.LOCAL_AUTH.SUCCESS.create>;

const INITIAL_STATE: State = {
  isAuthenticated: false,
};

export function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.LOCAL_AUTH.SUCCESS.type: {
        draft.isAuthenticated = true;
        break;
      }
    }
  });
}
export const authReducer = persistReducer(
  {
    key: 'toDo',
    storage: MmkvReduxStorage,
    whitelist: [],
  },
  reducer,
);
