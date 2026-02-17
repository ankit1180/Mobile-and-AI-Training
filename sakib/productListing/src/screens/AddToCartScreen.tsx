import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/slice/counterSlice'; */

import { styles } from '../asset/css/AddToCartScreenCss.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types/navigation.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { decrementQty, incrementQty } from '../redux/slice/counterSlice.js';

const AddToCartScreen = () => {
  const dispatch = useDispatch();

  //const navigation = useNavigation()

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    state => state.cart,
  );

  console.log('cartItems in cart screen ====>>>> ', cartItems);
  console.log('totalQuantity in cart screen ====>>>> ', totalQuantity);
  console.log('totalAmount in cart screen ====>>>> ', totalAmount);


  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.cartItemImage} />

      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductsDetail', { product: item })}
      >
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.qtyContainer}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => dispatch(decrementQty(item.id))}
        >
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyNumber}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => dispatch(incrementQty(item.id))}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubText}>
            Add some products to get started
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.checkoutContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Items:</Text>
              <Text style={styles.totalValue}>{totalQuantity}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default AddToCartScreen;
