import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
    items: [],

}

export const CartItemSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const isPresent = state.items.find(item => item.id === action.payload.id);

            if (isPresent) {
                console.log("Item already added");
            } else {
                state.items.push(action.payload);
            }
        },

        removeItem: (state, action) => {

            state.items = state.items.filter((item) => item.id !== action.payload.id)

        },

        QuantityIncrease: (state, action) => {

            const item = state.items.find((item) => item.id === action.payload.id)

            if (item) {
                item.qty += 1
            }

        },
        QuantityDecrease: (state, action) => {

            const item = state.items.find((item) => item.id === action.payload.id)

            if (item) {
                item.qty -= 1

                if (item.qty <= 0) {

                    const index = state.items.findIndex((index) => index.id === action.payload.id)
                    state.items.splice(index, 1);



                }
            }

        },




    }

})

export const { addItem, removeItem, QuantityIncrease, QuantityDecrease } = CartItemSlice.actions;

export default CartItemSlice.reducer;