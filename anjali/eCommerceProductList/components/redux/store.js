import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//Create Store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
