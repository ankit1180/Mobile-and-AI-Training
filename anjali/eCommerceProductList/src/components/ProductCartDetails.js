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
import QuantitySelector from './QuantitySelector';
import { styles } from '../assets/css/productCartStyle';
import { removeFromCart } from './redux/actions';

export default function ProductCartDetails({ route, navigation }) {
  const cartData = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //navigate on productDetails
  const handleProductPress = item => {
    navigation.navigate('ProductDetails', {
      product: item,
      title: 'Product Details',
    });
  };

  //remove cart totally
  const handleRemove = item => {
    dispatch(removeFromCart(item));
  };

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
                <TouchableOpacity
                  onPress={() => handleProductPress(item)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.details}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>₹ {item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <QuantitySelector product={item} />
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
