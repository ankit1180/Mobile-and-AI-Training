import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ProductCartDetails() {
  // get the cart data from the store
  const cartData = useSelector(state => state.cart.cartItems);
  console.warn('cartData', cartData);

  return (
    <View style={styles.container}>
      {cartData.length === 0 ? (
        <Text style={styles.emptyText}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cartData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹ {item.price}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
