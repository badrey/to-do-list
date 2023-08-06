import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

export const storage = new MMKV();

export const MmkvReduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};