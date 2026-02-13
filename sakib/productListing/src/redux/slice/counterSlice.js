//Action, reducer, store

//Action ====>>> which type of action is going  to be performed..........it is object

//Action ====>>> it has two values first is type===>> tells type of action to be pertformed and second is payload ====>>> it come in works when that action comes with some extra values , data etc

//reducer ====>>>> it is  a function which tells which type of function is coming and related to that function what updation or chnages need to be performed

//reducer ====>>> it takes two values , first is current state value and type of action


//store ====>>>> globally store of values

// slice =====>>>> combination of action and reducer

/*
import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        },

        reset: (state) => {
            state.value = 0;
        }
    }
})

export const {increment, decrement, reset} = counterSlice.actions;
export default counterSlice.reducer;
*/




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log('newItem =====>>>>> ',newItem)
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      console.log('existingItem =======>>>>> ',existingItem);
      
      
      if (existingItem) {
        
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
     
      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    },
    
   
  },
});

export const { addToCart} = counterSlice.actions;

export default counterSlice.reducer;