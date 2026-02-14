import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './constants';

const initialState = {
  cartItems: [],
};

//create reducer
const reducer = createReducer(initialState, builder => {
  //add to cart
  builder.addCase(ADD_TO_CART, (state, action) => {
    const itemPresent = state.cartItems.find(
      item => item.id === action.data.id,
    );
    if (itemPresent) {
      itemPresent.quantity++;
    } else {
      state.cartItems.push({ ...action.data, quantity: 1 });
    }
  });

  //remove to cart
  builder.addCase(REMOVE_FROM_CART, (state, action) => {
    state.cartItems = state.cartItems.filter(
      item => item.id !== action.data.id,
    );
  });

  //increment to cart
  builder.addCase(INCREMENT_QUANTITY, (state, action) => {
    const itemPresent = state.cartItems.find(
      item => item.id === action.data.id,
    );
    if (itemPresent) {
      itemPresent.quantity++;
    }
  });

  //decrement to cart
  builder.addCase(DECREMENT_QUANTITY, (state, action) => {
    const itemPresent = state.cartItems.find(
      item => item.id === action.data.id,
    );
    if (itemPresent) {
      if (itemPresent.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          item => item.id !== action.data.id,
        );
      } else {
        itemPresent.quantity--;
      }
    }
  });
});

export default reducer;
