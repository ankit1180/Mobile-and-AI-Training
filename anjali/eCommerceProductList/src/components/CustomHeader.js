import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../assets/css/headerStyle';

export default function CustomHeader({ navigation, back, route }) {
  const title = route?.params?.title || route.name;
  const cartData = useSelector(state => state.cart.cartItems);
  const cartCount = cartData.length;
  //show cart icon only on default screen
  const showCartIcon = route.name === 'Product';
  return (
    <View style={styles.container}>
      <View style={styles.leftText}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.arrowStyle}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.leftTextTitle}>{title}</Text>
      </View>
      {showCartIcon && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', { title: 'Cart' })}
          style={styles.title}
        >
          <Image
            style={styles.cartImage}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
            }}
          />
          {cartCount > 0 && (
            <View style={styles.cartCountArea}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
