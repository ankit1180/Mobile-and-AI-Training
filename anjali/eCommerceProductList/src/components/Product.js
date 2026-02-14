import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { data } from '../Data/product';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/actions';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../assets/css/productstyle';

function Product() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = item => {
    dispatch(addToCart(item));
    setMessage('Product added successfully');
    setTimeout(() => setMessage(''), 1000);
  };

  //productDetails
  const handleProductPress = item => {
    navigation.navigate('ProductDetails', { product: item });
  };

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.9}
      >
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>₹ {item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.cartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Product</Text>
        <Header />
      </View>

      <FlatList
        data={data}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centerEmpty}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Product;
