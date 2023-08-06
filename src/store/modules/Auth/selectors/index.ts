import {RootState} from '@store/rootReducer';

export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.isAuthenticated;
