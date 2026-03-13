import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Linking } from 'react-native';
import CheckInDrawer from '../Modal/CheckInDrawer';
import CheckoutDrawer from '../Modal/CheckoutDrawer';

// new fields
import { database } from '../Data/database';
import { Q } from '@nozbe/watermelondb';

export default function DetailsScreen({ route, navigation }) {
  const params = route.params || {};

  const { store = {}, orderSuccess } = route.params || {};

  console.log('store', store);
  const [status, setStatus] = useState(params.visitStatus || 'upcoming');

  const isToday = params.isToday;
  const hasAnyCheckIn = params.hasAnyCheckIn;
  console.log('store---->', store);

  console.log('store fd id--->', store?.sf_id);
  console.log('store id---->', store?.id);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkoutDrawerVisible, setCheckoutDrawerVisible] = useState(false);

  //   placed order message shows on details screen
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasOrderPlaced, setHasOrderPlaced] = useState(
    params.orderSuccess === true,
  );
  const [statusMessage, setStatusMessage] = useState('');

  // new sets
  const [lastOrderDate, setLastOrderDate] = useState(null);

  // for last order dates update
  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const orderCollection = database.get('order');

        const orders = await orderCollection
          .query(Q.where('visit_id', store?.id))
          .fetch();

        if (orders.length > 0) {
          const sorted = orders.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
          );

          setLastOrderDate(sorted[0].orderDate);
        }
      } catch (e) {
        console.log('Last order fetch error:', e);
      }
    };

    if (store?.id) {
      fetchLastOrder();
    }
  }, [store]);

  const handleCheckIn = () => {
    setStatus('inprogress');
    setDrawerVisible(false);
    // Sync back to BeatPlan via callback
    route.params?.onStatusChange?.(store.id, 'checkin', false);
    // Show success banner
    setStatusMessage('Check-In Successful');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleCheckOut = () => {
    setCheckoutDrawerVisible(true);
  };

  const confirmCheckOut = () => {
    setStatus('completed');
    setCheckoutDrawerVisible(false);
    // Sync back to BeatPlan via callback
    console.log(
      'confirmCheckOut -> hasOrderPlaced:',
      hasOrderPlaced,
      'onStatusChange:',
      !!route.params?.onStatusChange,
    );
    route.params?.onStatusChange?.(store.id, 'checkout', hasOrderPlaced);
    // Show success banner
    setStatusMessage('Check-Out Successful');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // phone call function
  const callOwner = number => {
    Linking.openURL(`tel:${number}`);
  };

  //   pop-up message set time-out
  useEffect(() => {
    if (route.params?.orderSuccess) {
      setShowSuccess(true);
      setHasOrderPlaced(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigation.setParams({ orderSuccess: undefined });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [route.params?.orderSuccess, route.params?.timestamp]);

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
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#d3d0d0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Outlets</Text>
        </View>
      </LinearGradient>

      {statusMessage !== '' && (
        <View style={styles.statusBanner}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" />
          <Text style={styles.statusBannerText}>{statusMessage}</Text>
          <TouchableOpacity onPress={() => setStatusMessage('')}>
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {showSuccess && (
        <View style={styles.successPopup}>
          <Text style={styles.successText}>Order Successfully Placed</Text>
        </View>
      )}

      {/* container of details */}
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.storeHeader}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.storeName}>{store?.visit_store_name}</Text>
                {(status === 'inprogress' || status === 'completed') && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={status === 'completed' ? '#4CAF50' : '#76e7a5'}
                    style={{ marginLeft: 5 }}
                  />
                )}
              </View>
              {/* store sf id shows */}
              <Text style={styles.storeId}>(#{store?.sf_id})</Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              {/* Check In / Check Out button */}
              {isToday && status === 'upcoming' && (
                <TouchableOpacity
                  style={[
                    styles.checkInBtn,
                    hasAnyCheckIn && styles.checkInDisabled,
                  ]}
                  disabled={hasAnyCheckIn}
                  onPress={() => setDrawerVisible(true)}
                >
                  <Text style={styles.checkInText}>Check In</Text>
                </TouchableOpacity>
              )}

              {isToday && status === 'inprogress' && (
                <TouchableOpacity
                  style={styles.checkOutBtn}
                  onPress={handleCheckOut}
                >
                  <Text style={styles.checkInText}>Check Out</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => callOwner(store?.visit_owner_number)}
              >
                <Ionicons
                  name="call"
                  size={15}
                  color="#1E5ACD"
                  backgroundColor="#defaf6"
                  padding={5}
                  borderRadius={15}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>
                Class:{' '}
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {store?.visit_class || ''}
                </Text>
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusBadgeText}>
                Status:{' '}
                {status === 'upcoming'
                  ? 'Planned'
                  : status === 'inprogress'
                  ? 'In Progress'
                  : 'Completed'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="card" size={20} color="gray" marginTop={22} />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Credit Limit</Text>
              <Text style={styles.infoValue}>
                ₹{store?.credit_limit?.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Credit Days</Text>
              <Text style={styles.infoValue}>{store?.credit_days}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="gray" marginTop={22} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{store?.visit_address}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time" size={20} color="gray" marginTop={22} />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Last Ordered</Text>
              <Text style={styles.infoValue}>
                {lastOrderDate
                  ? new Date(lastOrderDate).toLocaleString()
                  : 'No Orders Yet'}
              </Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Distributor</Text>
              <Text style={styles.infoValue}>
                {store?.distributor} (#100631)
              </Text>
            </View>
          </View>

          <View style={styles.storeDetailsRow}>
            <Ionicons name="storefront" size={20} color="gray" marginTop={18} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Store Details</Text>
              <Text style={styles.infoValue}>Tap to see more details</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#1E5ACD"
              backgroundColor="#defaf6"
              padding={6}
              borderRadius={15}
            />
          </View>
        </View>

        {/* Action Cards */}
        <View style={styles.actionGrid}>
          {/* take order card for enable only checkout */}
          <TouchableOpacity
            style={[
              styles.actionCard,
              status !== 'inprogress' && styles.actionCardDisabled,
            ]}
            disabled={status !== 'inprogress'}
            onPress={() =>
              navigation.navigate('TakeOrder', {
                visit: store,
                onStatusChange: route.params?.onStatusChange,
              })
            }
          >
            <Ionicons
              name="cart-outline"
              size={28}
              color={status === 'inprogress' ? '#1E5ACD' : '#999'}
            />
            <Text
              style={[
                styles.actionText,
                status !== 'inprogress' && styles.actionTextDisabled,
              ]}
            >
              Take Order
            </Text>
          </TouchableOpacity>

          {/* all placed order history shows here */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('OrderHistoryScreen')}
          >
            <Ionicons name="time-outline" size={28} color="#1E5ACD" />
            <Text style={styles.actionText}>Order History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CheckInDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        store={store}
        onCheckIn={handleCheckIn}
      />
      <CheckoutDrawer
        visible={checkoutDrawerVisible}
        onClose={() => setCheckoutDrawerVisible(false)}
        onCheckOut={confirmCheckOut}
        hasOrder={hasOrderPlaced}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  headerRow: {
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  backBtn: {
    width: 30,
  },

  headerTitle: {
    color: '#d3d0d0',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },

  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
    backgroundColor: '#fff',
  },

  statusBanner: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: -5,
    zIndex: 10,
  },

  statusBannerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
  },

  //  message shows
  successPopup: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    zIndex: 10,
  },

  successText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  card: {
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },

  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  storeId: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 15,
  },

  classBadge: {
    borderRadius: 6,
  },

  classBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#dededeff',
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  statusContainer: {
    backgroundColor: '#d8f3db',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },

  divider: {
    height: 2,
    backgroundColor: '#dededeff',
    marginVertical: 15,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  infoCol: {
    flex: 1,
    gap: 5,
  },

  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 16,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  storeDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  actionCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e8eef5',
  },

  actionText: {
    fontSize: 11,
    color: '#444',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },

  checkInBtn: {
    backgroundColor: '#1E5ACD',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },

  checkOutBtn: {
    backgroundColor: '#1E5ACD',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 15,
  },

  checkInText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  //   disable checkin
  checkInDisabled: {
    backgroundColor: '#B0B0B0',
  },

  actionCardDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },

  actionTextDisabled: {
    color: '#999',
  },
});
