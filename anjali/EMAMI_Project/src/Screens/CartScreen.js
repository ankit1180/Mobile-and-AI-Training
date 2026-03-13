import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../Data/database';

export default function CartScreen({ route, navigation }) {
  const { cartItems, quantities, visit, onOrderPlaced } = route.params;
  console.log('Cart received visit info:', route.params?.visit);
  const [cart, setCart] = useState(cartItems);
  const [searchTxt, setSearchText] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  // search product
  const filtered = cart.filter(item => {
    const productName =
      item.product_name?.product_name || item.product_name || '';
    return productName.toLowerCase().includes(searchTxt.toLowerCase());
  });

  // Update quantity
  const updateQty = (item, delta) => {
    setCart(prev =>
      prev.map(p => {
        if (p.id !== item.id) return p;

        const newQty = p.qty + delta;

        if (newQty > p.stock_qty) {
          Alert.alert('Stock Limit', 'Cannot exceed stock quantity');
          return p;
        }

        if (newQty < 1) return p;

        return { ...p, qty: newQty };
      }),
    );
  };

  // Delete product
  const deleteItem = id => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  };

  // Totals
  const totalQty = cart.reduce((a, b) => a + b.qty, 0);
  const totalPTR = cart.reduce((a, b) => a + b.qty * b.price, 0);

  //   cart screen
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty');
      return;
    }

    setIsPlacing(true);

    try {
      const totalAmount = totalPTR;
      const now = Date.now();
      const sfId = 'ORD' + now.toString().slice(-8);

      await database.write(async () => {
        const orderCollection = database.get('order');
        const orderItemCollection = database.get('orderitem');

        // create order place
        const newOrder = await orderCollection.create(record => {
          record.sfId = sfId;
          record.visitId = visit?.id || '';
          record.orderDate = new Date().toISOString();
          record.totalAmount = totalAmount;
        });

        console.log('newOrder--------->', newOrder);

        // create order item
        for (const item of cart) {
          const orderItemData = await orderItemCollection.create(record => {
            record.sfId = 'ITEM' + Date.now() + item.id;
            record.orderId = newOrder.id;
            record.productId = item.id;
            record.quantity = item.qty;
          });

          console.log('orderItemData----->', orderItemData);
        }
      });

      setIsPlacing(false);

      onOrderPlaced?.(visit.id);

      navigation.navigate('Details', {
        orderSuccess: true,
        store: visit,
        timestamp: Date.now(),
        isToday: true,
        visitStatus: 'inprogress',
        hasAnyCheckIn: true,
        onStatusChange: route.params?.onStatusChange,
        onOrderPlaced: route.params?.onOrderPlaced,
      });
    } catch (e) {
      setIsPlacing(false);
      console.error('Place order error:', e);
      Alert.alert('Error', 'Could not place order.');
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteItem(item.id)}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Image
            source={item.image ? { uri: item.image } : null}
            style={styles.image}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.product_name}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.small}>PTR: ₹{item.price}</Text>
              <Text style={styles.small}>
                Qty × PTR: ₹{item.price * item.qty}
              </Text>
            </View>

            <Text style={styles.net}>Net: ₹{item.price * item.qty}</Text>
          </View>
        </View>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item, -1)}
          >
            <Ionicons name="remove" size={16} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item, 1)}
          >
            <Ionicons name="add" size={16} color="#fff" />
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

      <LinearGradient colors={['#4b77d5', '#113e98']} style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            const updatedQuantities = {};

            cart.forEach(item => {
              updatedQuantities[item.id] = item.qty;
            });

            navigation.navigate({
              name: 'TakeOrder',
              params: { updatedQuantities },
              //   post: postText,
              merge: true,
            });
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart</Text>
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchTxt}
              onChangeText={setSearchText}
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        <TouchableOpacity
          style={[styles.placeOrder, isPlacing && { opacity: 0.7 }]}
          onPress={handlePlaceOrder}
          disabled={isPlacing}
        >
          {isPlacing ? (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <ActivityIndicator size="small" color="#fff" />
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Placing Order...
              </Text>
            </View>
          ) : (
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Place Order
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>Total Qty</Text>
          <Text style={styles.summaryValue}>{totalQty}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total PTR</Text>
          <Text style={styles.summaryValue}>₹{totalPTR.toFixed(2)}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Gross Amount</Text>
          <Text style={styles.summaryValue}>₹{totalPTR.toFixed(2)}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Net Amount</Text>
          <Text style={styles.summaryValue}>₹{totalPTR.toFixed(2)}</Text>
        </View>
      </View>

      {isPlacing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E5ACD" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerTitle: {
    color: '#d3d0d0',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    borderWidth: 2,
    borderColor: '#e9e9e9',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#eee',
  },

  deleteBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  image: {
    width: 50,
    height: 65,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  detailRow: {
    flexDirection: 'row',
    gap: 20,
  },

  small: {
    fontSize: 12,
    color: '#555',
  },

  net: {
    fontWeight: 'bold',
  },

  caseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  caseBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  unitBtn: {
    backgroundColor: '#1E5ACD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 5,
  },

  caseText: { color: '#555' },
  unitText: { color: '#fff' },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 8,
  },

  qtyBtn: {
    backgroundColor: '#1E5ACD',
    padding: 6,
    borderRadius: 15,
  },

  qtyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  caseInfo: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  placeOrder: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#1E5ACD',
    padding: 8,
    borderRadius: 10,
  },

  summary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E5ACD',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  summaryLabel: {
    color: '#fff',
    fontSize: 11,
  },

  summaryValue: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
