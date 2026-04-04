import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../slice/counterSlice.js'
import cartReducer from '../slice/counterSlice.js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, cartReducer )

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        cart: persistedReducer,
    },

    middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware({
  serializableCheck: false,
})

})

 

export const persistor = persistStore(store);