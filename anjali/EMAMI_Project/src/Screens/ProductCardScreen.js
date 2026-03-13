import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { fetchRecords } from '../config/ReusableApi';

export default function ProductCardScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchRecords('products', setProducts);
  }, []);

  // Get unique categories
  const categories = [
    'All',
    ...new Set(products.map(p => p.category).filter(Boolean)),
  ];

  //  send back updated quantity
  useEffect(() => {
    if (route.params?.updatedQuantities) {
      setQuantities(route.params.updatedQuantities);
    }
  }, [route.params?.updatedQuantities]);

  // Filter products
  const filtered = products.filter(item => {
    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.product_name
      ?.toLowerCase()
      .includes(searchTxt.toLowerCase());
    return matchCategory && matchSearch;
  });

  //   quantity increases
  const updateQty = (item, delta) => {
    setQuantities(prev => {
      const current = prev[item.id] || 0;
      const newVal = current + delta;

      if (newVal > item.stock_qty) {
        Alert.alert('Stock Limit end');
        return prev;
      }

      if (newVal < 0) return prev;

      return { ...prev, [item.id]: newVal };
    });
  };

  //   cart quantity increase store
  const cartCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const renderProduct = ({ item }) => {
    const qty = quantities[item.id] || 0;

    return (
      <View style={styles.productCard}>
        {/* Product Image */}

        <View style={styles.productContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, styles.noImage]}>
              <Ionicons name="cube-outline" size={24} color="#ccc" />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.product_name}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>₹{item.price}</Text>
              <Text style={styles.stockText}> • Stock {item.stock_qty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>PTR</Text>
            <TextInput
              style={styles.ptrInput}
              value={String(item.price)}
              editable={false}
            />
          </View>
        </View>

        {/* Quantity Controls */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item, -1)}
          >
            <Ionicons name="remove" size={18} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item, 1)}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={['#4b77d5', '#113e98', '#4b69ab']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Outlets</Text>
          <View>
            <Ionicons name="cart" size={24} color="#fff" />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchTxt}
              onChangeText={setSearchTxt}
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>

          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="pricetag" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryCard,
                selectedCategory === cat && styles.categoryCardActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View
          style={{
            height: 2,
            marginTop: 10,
            backgroundColor: '#dededeff',
            marginVertical: 15,
            marginHorizontal: 10,
          }}
        />

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <Text style={styles.emptyText}>No products found</Text>
        ) : (
          <FlatList
            data={filtered}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProduct}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.gridRow}
          />
        )}
      </View>

      {/* view cart appear after added quantity */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.viewCart}
          onPress={() => {
            const cartItems = products
              .filter(p => quantities[p.id] > 0)
              .map(p => ({
                ...p,
                qty: quantities[p.id],
              }));

            navigation.navigate('CartScreen', {
              cartItems,
              quantities,
              visit: route.params?.visit,
              onStatusChange: route.params?.onStatusChange,
            });
          }}
        >
          <Ionicons name="cart" color="white" size={20} />

          <Text style={styles.viewCartText}>View Cart</Text>

          <View style={styles.viewCartBadge}>
            <Text style={styles.viewCartBadgeText}>{cartCount}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    padding: 45,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backBtn: {
    width: 30,
  },

  headerTitle: {
    color: '#d3d0d0',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    flex: 1,
  },

  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
    backgroundColor: '#f5f6fa',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 12,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#eee',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  iconContainer: {
    backgroundColor: '#003399',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryScroll: {
    maxHeight: 38,
    marginTop: 10,
  },

  categoryContent: {
    paddingHorizontal: 10,
    gap: 8,
  },

  categoryCard: {
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#e9f6f7',
    borderWidth: 1.5,
    borderColor: '#4cd2d7',
  },

  categoryCardActive: {
    backgroundColor: '#1E5ACD',
    borderWidth: 0,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },

  categoryTextActive: {
    color: '#fff',
  },

  gridContainer: {
    padding: 10,
    paddingBottom: 30,
  },

  gridRow: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e8eef5',
  },

  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },

  productImage: {
    width: 50,
    height: 50,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  priceText: {
    fontSize: 13,
    color: '#1E5ACD',
    fontWeight: '600',
  },

  stockText: {
    fontSize: 12,
    color: '#888',
  },

  infoRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  infoLabel: {
    fontSize: 10,
    color: '#888',
  },

  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },

  ptrInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    color: '#333',
    minWidth: 50,
    textAlign: 'center',
  },

  toggleRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 6,
  },

  toggleActive: {
    backgroundColor: '#1E5ACD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  toggleActiveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  toggleInactive: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E5ACD',
  },

  toggleInactiveText: {
    color: '#1E5ACD',
    fontSize: 11,
    fontWeight: '600',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 15,
    borderRadius: 10,
    backgroundColor: '#eaf6f3',

    marginHorizontal: -5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  qtyBtn: {
    backgroundColor: '#1E5ACD',
    borderRadius: 17,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    borderWidth: 1,
    borderColor: '#888',
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 10,
    textAlign: 'center',
  },

  viewCart: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E5ACD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    gap: 8,
  },

  viewCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  viewCartBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
  },

  viewCartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
