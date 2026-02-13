import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import cartItemreducer from "../features/CartItemSlice";
import loginreducer from "../features/loginSlice";


import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";



//configuring persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

//Combinig the reducers

const RootReducer = combineReducers({
    Cart: cartItemreducer,
    Login: loginreducer
});

//creating persistreducer

const persistedReducer = persistReducer(persistConfig, RootReducer)


export const Store = configureStore({

   
    reducer: persistedReducer,
    

    //setting middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

//exporting the persister to bind it on components
export const persistor = persistStore(Store);



