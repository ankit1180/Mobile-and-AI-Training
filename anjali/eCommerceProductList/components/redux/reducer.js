import { ADD_TO_CART } from './constants';

const initialState = {
  itemsCount: 0,
  cartItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        itemsCount: state.itemsCount + 1,
        cartItems: [...state.cartItems, action.data],
      };

    default:
      return state;
  }
};

export default reducer;
