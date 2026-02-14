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
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/actions';
import { styles } from '../assets/css/productDetailScreenStyle';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

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
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
