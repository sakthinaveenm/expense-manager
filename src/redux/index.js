import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducers} from './AuthSlice';
import {GlobalReducers} from './GlobalSlice';
import {combineReducers, applyMiddleware} from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

const AuthpersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(AuthpersistConfig, AuthReducers),
  global: GlobalReducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //   devTools: process.env.NODE_ENV !== 'production',
  //   middleware: applyMiddleware(thunk),
});

export const persistor = persistStore(store);

export default store;
