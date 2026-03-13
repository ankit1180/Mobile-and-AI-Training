import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../Data/database';
import { Q } from '@nozbe/watermelondb';
import OrderDetailsDrawer from '../Modal/OrderDetailsDrawer';

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const [searchText, setSearchText] = useState('');

  // Search function
  const searchOrder = orders.filter(item => {
    // this id came from database for order search
    const order = item.sf_id || '';
    return order.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    loadOrders();
  }, []);

  // place order details comes from the order and order item
  const loadOrders = async () => {
    const orderCollection = database.get('order');
    const orderItemCollection = database.get('orderitem');

    const result = await orderCollection.query().fetch();

    const ordersWithQty = await Promise.all(
      result.map(async order => {
        // get quantity from the order item
        const items = await orderItemCollection
          .query(Q.where('order_id', order.id))
          .fetch();

        const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
        console.log('totalQty ---->', totalQty);

        return {
          ...order._raw,
          totalQty,
        };
      }),
    );

    setOrders(ordersWithQty);
  };

  // Load order items with product details for the drawer
  const loadOrderItems = async orderId => {
    const orderItemCollection = database.get('orderitem');
    const productCollection = database.get('products');

    const items = await orderItemCollection
      .query(Q.where('order_id', orderId))
      .fetch();

    const itemsWithProduct = await Promise.all(
      items.map(async item => {
        let product = null;
        try {
          product = await productCollection.find(item.productId);
        } catch (e) {
          console.log('Product not found:', item.productId);
        }

        return {
          id: item.id,
          productName: product?.productName || 'Unknown Product',
          image: product?.image || null,
          price: product?.price || 0,
          quantity: item.quantity,
        };
      }),
    );

    setSelectedOrderItems(itemsWithProduct);
    setDrawerVisible(true);
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.order_date).toDateString();

    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardHeader}>Draft on {date}</Text>

        <View style={styles.cardBody}>
          <View style={styles.iconBox}>
            <Ionicons name="receipt" size={22} color="#ff8c00" />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.label}>Order No.</Text>
                <Text style={styles.value}>{item.sf_id}</Text>
              </View>

              <View>
                <Text style={styles.label}>Order Date</Text>
                <Text style={styles.value}>{date}</Text>
              </View>
            </View>

            <View style={[styles.rowBetween, { marginTop: 10 }]}>
              <View>
                <Text style={styles.label}>Total Order Qty</Text>
                <Text style={styles.value}>{item.totalQty}</Text>
              </View>

              <View>
                <Text style={styles.label}>Total Net Amount</Text>
                <Text style={styles.value}>₹{item.total_amount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => loadOrderItems(item.id)}
          >
            <Text style={styles.viewText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.invoiceBtn}>
            <Text style={styles.invoiceText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <LinearGradient
        colors={['#4b77d5', '#113e98']}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order History</Text>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={{ flex: 1 }}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={20} color="#999" />
        </View>

        <Text style={styles.subtitle}>Orders from last 1 month</Text>

        <View style={styles.categorySection}>
          {['All', 'Draft', 'Fulfilled', 'Rejected'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab} ({tab === 'All' ? orders.length : 0})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order List */}
        {activeTab === 'All' ? (
          <FlatList
            data={searchOrder}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Orders Found</Text>
          </View>
        )}
      </View>

      <OrderDetailsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        orderItems={selectedOrderItems}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
    padding: 15,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  subtitle: {
    marginTop: 15,
    color: '#888',
  },

  categorySection: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 8,
  },

  tabBtn: {
    borderWidth: 1,
    borderColor: '#dbebe7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e9f6f7',
    borderWidth: 1.5,
    borderColor: '#4cd2d7',
  },

  activeTab: {
    backgroundColor: '#1E5ACD',
    borderColor: '#1E5ACD',
  },

  tabText: {
    fontSize: 12,
    color: '#555',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },

  cardHeader: {
    fontWeight: '600',
    marginBottom: 10,
  },

  cardBody: {
    flexDirection: 'row',
    gap: 10,
  },

  iconBox: {
    width: 45,
    height: 55,
    backgroundColor: '#fff3e6',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f7d16a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 12,
    color: '#888',
  },

  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },

  viewBtn: {
    flex: 1,
    backgroundColor: '#e9f6f7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  invoiceBtn: {
    flex: 1,
    backgroundColor: '#e9f6f7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  viewText: {
    color: '#7accf3',
    fontWeight: '600',
  },

  invoiceText: {
    color: '#777',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    marginTop: 10,
    color: '#aaa',
  },
});
