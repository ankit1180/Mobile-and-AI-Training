import reducer from './reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//cart reducer
const rootReducer = combineReducers({
  cart: reducer,
});

//add persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
