import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomHeader from '../Header/Header';
import Product from '../components/Product';
import LinearGradient from 'react-native-linear-gradient';

export default function ProductScreen() {
  return (
    <LinearGradient
      colors={['#4b77d5', '#113e98', '#4b69ab']}
      style={{ flex: 1 }}
    >
      <CustomHeader />
      <View style={styles.screenContainer}>
        <Product />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -5,
    padding: 15,
  },
});
