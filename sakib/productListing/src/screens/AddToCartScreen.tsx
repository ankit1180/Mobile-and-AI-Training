import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/slice/counterSlice'; */

const AddToCartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    state => state.cart,
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />

      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>

      
        
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  cartList: {
    padding: 16,
    paddingBottom: 200,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#2b8c3e',
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#e9ecef',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  cartItemTotal: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  removeText: {
    fontSize: 20,
    color: '#dc3545',
    padding: 4,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  emptyCartSubText: {
    fontSize: 14,
    color: '#868e96',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2b8c3e',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  clearButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#1971c2',
    marginLeft: 8,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddToCartScreen;
