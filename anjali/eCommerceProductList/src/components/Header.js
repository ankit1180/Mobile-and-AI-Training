import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../assets/css/headerStyle';

export default function Header() {
  // State to show the count of items in the cart
  const [cartCountShow, setCartCountShow] = useState(0);

  const navigation = useNavigation();

  const cartData = useSelector(state => state.cart.cartItems);

  console.warn('cartItems', cartData);

  useEffect(() => {
    setCartCountShow(cartData.length);
  }, [cartData]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductCartDetails')}>
      <View style={styles.container}>
        <Image
          style={styles.cartImage}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png',
          }}
        />
        <Text style={styles.cartCountText}>{cartCountShow}</Text>
      </View>
    </TouchableOpacity>
  );
}
