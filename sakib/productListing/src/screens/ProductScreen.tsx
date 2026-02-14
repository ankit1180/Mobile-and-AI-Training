import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context'
//import { FlatList } from 'react-native/types_generated/index'

import products from '../../products.json';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,incrementQty, decrementQty } from '../redux/slice/counterSlice';
import {styles} from '../asset/css/ProductScreenCss.js'

const ProductScreen = () => {

  const cartItems = useSelector(state => state.cart.cartItems);

  console.log('cartItems =====>>>> ',cartItems);


   const dispatch = useDispatch();

   console.log('dispatch =====>>>> ',dispatch);
   

    const [productList, setProductList] = useState(products);

  const getItemQuantity = (id) => {
  const item = cartItems.find(i => i.id === id);

  console.log('item =====>>>>> ', item);
  
  return item ? item.quantity : 0;
};

    
    
     /*
    const renderProductItem = ({item}) => {

      return(
        <View style={styles.productCard}>
            <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
        </View>
      )
        
    } */

      const renderProductItem = ({ item }) => {

  const quantity = getItemQuantity(item.id);

  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(decrementQty(item.id))}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(incrementQty(item.id))}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </View>
  );
};


    /*

    const handleAddToCart = (item) => {
      // setCartItems([...cartItems, item])
      dispatch(addToCart(item));

        Alert.alert(
            'Added to Cart',
            `${item.name} has been added to your cart`,
            [{ text: 'OK' }]
        );
    } */

    const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>E-Commerce Store</Text>
      <Text style={styles.headerSubtitle}>
        {productList.length} products available
      </Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products available</Text>
     <Text style={styles.emptySubText}>Check back later for new items</Text>
    </View>
  );

    console.log('Products loaded:', productList?.length || 0);
  return (
    <View style={styles.container}>
   <FlatList
        data={productList}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

export default ProductScreen
