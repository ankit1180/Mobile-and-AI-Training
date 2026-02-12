import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { data } from '../Data/product';
import Header from './Header';
import { useDispatch } from 'react-redux';
import addToCart from './redux/actions';

function Product() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const renderProduct = ({ item }) => {
    return (
      // Product information
      <View style={styles.card}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹ {item.price}</Text>
        {/* Add to cart button*/}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            setMessage('Product added successfully');
            // Clear message
            setTimeout(() => setMessage(''), 1000);
          }}
          onPressIn={() => handleAddToCart(item)}
        >
          <Text style={styles.cartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        MyProduct
        <Header />
      </Text>

      {/* Product List using FlatList */}
      <FlatList
        data={data}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        // it shows when no data in the list
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products available</Text>
        }
        showsVerticalScrollIndicator={false}
      />
      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  card: {
    backgroundColor: '#c9efe4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  productPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },

  cartButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
  },

  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
    fontSize: 16,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default Product;
