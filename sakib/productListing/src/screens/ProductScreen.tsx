import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context'
//import { FlatList } from 'react-native/types_generated/index'

import products from '../../products.json';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/counterSlice';

const ProductScreen = () => {

    const [productList, setProductList] = useState(products);

     const dispatch = useDispatch();
    
    

    

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
        
    }

    const handleAddToCart = (item) => {
      // setCartItems([...cartItems, item])
      dispatch(addToCart(item));
        Alert.alert(
            'Added to Cart',
            `${item.name} has been added to your cart`,
            [{ text: 'OK' }]
        );
    }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  productInfo: {
    padding: 14,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 20,
  },
  categoryContainer: {
    backgroundColor: '#e7f5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#1971c2',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2b8c3e',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1971c2',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#868e96',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#212529',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});