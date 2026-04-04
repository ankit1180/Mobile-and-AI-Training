/*

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../utils/types/navigation'
import { RouteProp, useRoute } from '@react-navigation/native'

type ProductsDetailProp = RouteProp<RootStackParamList, 'ProductsDetail'>

const ProductDetailsScreen = () => {

    const route = useRoute<ProductsDetailProp>();

  const { product } = route.params; 

    console.log('product in product details screen =====>>>>> ', product);
    
  return (
    <View>
      <Text>ProductDetailsScreen</Text>
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({}) */









/*

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from '../utils/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQty,
  decrementQty,
} from '../redux/slice/counterSlice';

type ProductsDetailProp = RouteProp<
  RootStackParamList,
  'ProductsDetail'
>;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductsDetailProp>();
  const { product } = route.params;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const cartItem = cartItems.find((i: any) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Image source={{ uri: product.image }} style={styles.image} />

      
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.price}>${product.price}</Text>

      
      <Text style={styles.description}>
        This is a high-quality product designed to meet your daily needs.
        Durable, stylish, and affordable.
      </Text>

      
      {quantity === 0 ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => dispatch(addToCart(product))}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(decrementQty(product.id))}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyNumber}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(incrementQty(product.id))}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },

  category: {
    fontSize: 16,
    color: '#777',
    marginVertical: 6,
  },

  price: {
    fontSize: 22,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginVertical: 10,
  },

  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 8,
  },

  qtyButton: {
    paddingHorizontal: 20,
  },

  qtyText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  qtyNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
}); */









import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQty, decrementQty } from '../redux/slice/counterSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from '../asset/css/ProductDetailsScreenCss.ts'

type ProductsDetailProp = RouteProp<RootStackParamList, 'ProductsDetail'>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductsDetailProp>();
  const { product } = route.params;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const cartItem = cartItems.find((i: any) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useLayoutEffect(() => {
  navigation.setOptions({
    title: product.name,
  });
}, [navigation, product.name]);

  return (
    <View style={styles.screen}>
      
        <TouchableOpacity
                   style={styles.backBtn}
                   onPress={() => navigation.goBack()}
                 >
                   <Ionicons name="arrow-back" size={22} color="#000" />
                 </TouchableOpacity>
      

      <ScrollView contentContainerStyle={styles.container}>
        
       
        <View style={styles.imageCard}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>${product.price}</Text>

        <Text style={styles.description}>
          This is a high-quality product designed to meet your daily needs.
          Durable, stylish, and affordable.
        </Text>
      </ScrollView>

      
      <View style={styles.bottomBar}>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyWrapper}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => dispatch(decrementQty(product.id))}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{quantity}</Text>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => dispatch(incrementQty(product.id))}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => {
                navigation.navigate('Main', {
                screen: 'WatchList',
                });
              }}
            >
              <Text style={styles.cartButtonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductDetailsScreen;


