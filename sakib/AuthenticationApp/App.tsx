/*
import React from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/Navigations/navigator.tsx';
import { store } from './src/redux/store/store.js';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </>
  );
} */



import React from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/Navigations/navigator';
import { store, persistor } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoute />
      </PersistGate>
    </Provider>
  );
}

