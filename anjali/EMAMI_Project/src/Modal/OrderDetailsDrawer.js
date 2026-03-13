import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrderDetailsDrawer({ visible, onClose, orderItems }) {
  const renderItem = ({ item }) => {
    const grossAmount = (item.price * item.quantity * 0.95).toFixed(2);
    const netAmount = (item.price * item.quantity).toFixed(2);

    return (
      <View style={styles.itemCard}>
        <Text style={styles.productName}>{item.productName}</Text>

        <View style={styles.itemRow}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, styles.noImage]}>
              <Ionicons name="cube-outline" size={28} color="#ccc" />
            </View>
          )}

          <View style={styles.detailsGrid}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>PTR</Text>
              <Text style={styles.detailValue}>₹{item.price}</Text>
            </View>

            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Gross Amount</Text>
              <Text style={styles.detailValue}>₹{grossAmount}</Text>
            </View>

            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>QTY</Text>
              <Text style={styles.detailValue}>{item.quantity} (Pcs)</Text>
            </View>

            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Net Amount</Text>
              <Text style={styles.detailValue}>₹{netAmount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Order Details</Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#777" />
            </TouchableOpacity>
          </View>

          {orderItems && orderItems.length > 0 ? (
            <FlatList
              data={orderItems}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text style={styles.emptyText}>No items found</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '80%',
    minHeight: '70%',
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  productImage: {
    width: 65,
    height: 75,
    borderRadius: 8,
  },

  noImage: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },

  detailsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },

  detailCol: {
    width: '46%',
    marginBottom: 6,
  },

  detailLabel: {
    fontSize: 11,
    color: '#888',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },

  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 30,
    marginBottom: 30,
  },
});
