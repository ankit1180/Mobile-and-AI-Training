import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from './redux/actions';
import { styles } from '../assets/css/quantitystyle';

//onAdd  passed the message
const QuantitySelector = ({ product, onAdd }) => {
  const dispatch = useDispatch();

  const cartData = useSelector(state => state.cart.cartItems);

  //to get id of product data
  const cartItem = cartData.find(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    if (onAdd) onAdd();
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  if (!cartItem) {
    return (
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.cartButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{cartItem.quantity}</Text>

      <TouchableOpacity onPress={handleIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
