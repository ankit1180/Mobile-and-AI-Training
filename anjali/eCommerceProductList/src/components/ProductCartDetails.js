import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './redux/actions';
import QuantitySelector from './QuantitySelector';
import { styles } from '../assets/css/productdetailsStyle';

export default function ProductCartDetails() {
  const cartData = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrement = item => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = item => {
    dispatch(decrementQuantity(item));
  };

  const handleRemove = item => {
    dispatch(removeFromCart(item));
  };

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your Cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>₹ {item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrement={() => handleIncrement(item)}
                      onDecrement={() => handleDecrement(item)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemove(item)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>₹ {totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
