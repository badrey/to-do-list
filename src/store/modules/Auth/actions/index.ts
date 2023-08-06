import {createAction} from '@store/utils/actions/createAction';

const LOCAL_AUTH = createAction('LOCAL_AUTH', {
  START: true,
  SUCCESS: true,
  FAILURE: true,
});

export const AuthActions = Object.freeze({
  LOCAL_AUTH,
});
