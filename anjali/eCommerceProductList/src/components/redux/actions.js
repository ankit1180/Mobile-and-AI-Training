import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './constants';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
}

export function incrementQuantity(id) {
  return {
    type: INCREMENT_QUANTITY,
    data: id,
  };
}

export function decrementQuantity(id) {
  return {
    type: DECREMENT_QUANTITY,
    data: id,
  };
}
