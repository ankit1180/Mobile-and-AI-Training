import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/actions';
import { styles } from '../assets/css/productScreenStyle';
import QuantitySelector from './QuantitySelector';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  //get the cart data
  const cartData = useSelector(state => state.cart.cartItems);
  const cartItem = cartData.find(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setMessage('Added to Cart!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.price}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a premium high-quality product.
          </Text>
          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            {/* Add product from the product details page */}
            {cartItem ? (
              <View style={{ marginBottom: 15 }}>
                <QuantitySelector product={product} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            )}

            {/* Go To Cart */}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.addToCartText}>Go To Cart</Text>
            </TouchableOpacity>
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
