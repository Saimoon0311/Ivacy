import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import auth from './auth';
import isApplunchFirst from './isApplunchFirst';
import pendingPackages from './pendingPackages';

const persistConfig1 = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: 'userData',
};

const persistConfig2 = {
  key: 'isApplunchFirst',
  storage: AsyncStorage,
  whitelist: 'IsApplunchFirst',
};

const persistConfig3 = {
  key: 'pendingPackages',
  storage: AsyncStorage,
  whitelist: 'PendingPackages',
};

// const rootReducer = combineReducers({
//   userData: persistReducer(persistConfig1, auth),
// });

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, auth),
    IsApplunchFirst: persistReducer(persistConfig2, isApplunchFirst),
    PendingPackages: persistReducer(persistConfig3, pendingPackages),
  },
});
export const persistor = persistStore(store);
