import {SagaIterator} from 'redux-saga';
import {all, call, spawn} from 'redux-saga/effects';
import {authWatchers} from '@store/modules/Auth/sagas';
import {toDoWatchers} from '@store/modules/ToDo/sagas';

export function* rootSaga(): SagaIterator {
  yield all([
    ...[...authWatchers, ...toDoWatchers].map(watcher => {
      return spawn(function* () {
        while (true) {
          try {
            yield call(function* () {
              yield watcher;
            });
            break;
          } catch (error) {
            console.error(error);
          }
        }
      });
    }),
  ]);
}
