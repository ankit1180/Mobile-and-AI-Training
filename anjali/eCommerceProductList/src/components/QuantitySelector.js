import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/css/quantitystyle';

const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
