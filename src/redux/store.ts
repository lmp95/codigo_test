import AsyncStorage from '@react-native-async-storage/async-storage';
import { signUpReducer } from './signUpSlice.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { appApi } from '../apis/index.ts';
import { moviesReducer } from './moviesSlice.ts';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = combineReducers({
  signUp: signUpReducer,
  movies: moviesReducer,
  [appApi.reducerPath]: appApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appApi.middleware),
});

export const persist = persistStore(store);
