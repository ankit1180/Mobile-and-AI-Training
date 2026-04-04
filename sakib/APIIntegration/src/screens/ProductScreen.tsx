import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import { fetchProducts } from "../API/ProductsAPI.tsx";

const ProductScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    try {
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts();
  }, []);

  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
     backgroundColor: "#fff"
  },
  card: {
    flexDirection: "row",
    padding: 12,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    fontWeight: "bold",
  },
});
