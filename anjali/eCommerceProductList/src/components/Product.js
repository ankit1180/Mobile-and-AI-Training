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
import { styles } from '../assets/css/productstyle';
import QuantitySelector from './QuantitySelector';

function Product({ route, navigation }) {
  const [message, setMessage] = useState('');
  //productDetails routes
  const handleProductPress = item => {
    navigation.navigate('ProductDetails', {
      product: item,
      title: 'Product Details',
    });
  };
  //show message
  const showToast = () => {
    setMessage('Product added successfully');
    setTimeout(() => setMessage(''), 1000);
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
        <View pointerEvents="box-none">
          <QuantitySelector product={item} onAdd={showToast} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
