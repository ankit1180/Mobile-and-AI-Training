/*
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice.js'

export const store = configureStore({
    reducer: {
        userAuth: authSlice
    },
}) */




import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    userAuth: persistedReducer,
  },
   middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware({
  serializableCheck: false,
})
});

export const persistor = persistStore(store);


