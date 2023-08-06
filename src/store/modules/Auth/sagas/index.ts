import {takeLatest} from 'redux-saga/effects';

import {handleLocalAuth} from './handleLocalAuth';
import {AuthActions} from '@store/modules/Auth/actions';

export const authWatchers = [
  takeLatest(AuthActions.LOCAL_AUTH.START.type, handleLocalAuth),
];
