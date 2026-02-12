/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import data from "./data.json";
import MaterialIcons from "@react-native-vector-icons/material-icons";


function App() {

  const [cartItems, setCartItems] = useState([])

  const toggleCart = (item) => {
    const exist = cartItems.find((i) => i.id === item.id);

    if (exist) {
      setCartItems(cartItems.filter((i) => i.id !== item.id));
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const renderItem = ({ item }) => {
    const inCart = cartItems.some(i => i.id === item.id);



    return (
      <>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: inCart ? "red" : "blue" }]}
            onPress={() => toggleCart(item)}>
            <Text style={styles.buttonText}>{inCart ? "Remove" : "Add to Cart"}</Text>
          </TouchableOpacity>

        </View>

      </>


    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>

      <View style={styles.header}>
        <MaterialIcons name="shopping-cart" size={30} />
        {cartItems.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center', marginTop: 30 }}>No products available</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-end",
    marginBottom: 10
  },

  badge: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6
  },

  badgeText: {
    color: "#fff",
    fontSize: 12
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    // marginBottom: 10,
    // margin: 5,
    borderRadius: 10,
    alignItems: "center",
    flex: 1
  },
  image: {
    width: 200,
    height: 170,
    marginBottom: 10
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  price: {
    fontSize: 16,
    color: "green",
    marginVertical: 5
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff"
  }
});

export default App;
