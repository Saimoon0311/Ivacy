import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import auth from './auth';
import isApplunchFirst from './isApplunchFirst';

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

// const rootReducer = combineReducers({
//   userData: persistReducer(persistConfig1, auth),
// });

export const store = configureStore({
  reducer: {
    userData: persistReducer(persistConfig1, auth),
    IsApplunchFirst: persistReducer(persistConfig2, isApplunchFirst),
  },
});
export const persistor = persistStore(store);
