import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../assets/css/beatplan';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckInDrawer from '../Modal/CheckInDrawer';
import CheckoutDrawer from '../Modal/CheckoutDrawer';
import MapModel from '../Modal/MapModel';
import AdHocDrawer from '../Modal/AdHocDrawer';
import ChangeBeatDrawer from '../Modal/ChangeBeatDrawer';
import { Linking } from 'react-native';
import { fetchRecords, updateRecord } from '../config/ReusableApi';
import { useNavigation } from '@react-navigation/native';

export default function BeatPlan({ selectedDate }) {
  const navigation = useNavigation();

  // for checkin drawer visible
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkoutDrawerVisible, setCheckoutDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [visitList, setVisitList] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);

  // Check-in progress tracking
  const [checkedInIds, setCheckedInIds] = useState(new Set());
  const [completedIds, setCompletedIds] = useState(new Set());
  const [orderPlacedIds, setOrderPlacedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState('upcoming');
  const [successMessage, setSuccessMessage] = useState('');
  const [adHocDrawerVisible, setAdHocDrawerVisible] = useState(false);
  // adHoc visit store in array to show in each beat
  const [adHocVisitsByDate, setAdHocVisitsByDate] = useState({});
  // add in upcoming tab
  const [beatDay, setBeatDay] = useState(null);

  // change beat
  const [changeBeatDrawerVisible, setChangeBeatDrawerVisible] = useState(false);
  const [hasOrderForCheckout, setHasOrderForCheckout] = useState(false);

  //fetch the beat from the data according to the date
  useEffect(() => {
    setMapLocation(null);
    fetchRecords('beatday', data => {
      const beat = data.find(item => item.beat_day_date === selectedDate);
      setBeatDay(beat);
    });
  }, [selectedDate]);

  const filteredVisits = beatDay
    ? [
        ...visitList.filter(item => item.beat_day_id === beatDay.sf_id),
        ...(adHocVisitsByDate[selectedDate] || []),
      ]
    : [...(adHocVisitsByDate[selectedDate] || [])];

  // Split visits by status
  const upcomingVisits = filteredVisits.filter(
    item => !checkedInIds.has(item.id) && !completedIds.has(item.id),
  );

  console.log('upcomingVisits ---->', upcomingVisits);

  // by progress
  const inProgressVisits = filteredVisits.filter(
    item => checkedInIds.has(item.id) && !completedIds.has(item.id),
  );
  console.log('inProgressVisits ---->', inProgressVisits);

  // by completed
  const completedVisits = filteredVisits.filter(item =>
    completedIds.has(item.id),
  );

  console.log('completedVisits--->', completedVisits);

  // Compute Order Outlet and Non-Order Outlet counts
  const orderOutletCount = completedVisits.filter(v =>
    orderPlacedIds.has(v.id),
  ).length;
  const nonOrderOutletCount = completedVisits.filter(
    v => !orderPlacedIds.has(v.id),
  ).length;

  // Get the list for the active tab
  const activeVisits =
    activeTab === 'upcoming'
      ? upcomingVisits
      : activeTab === 'inprogress'
      ? inProgressVisits
      : completedVisits;

  // Handle check-in from drawer
  const handleCheckIn = () => {
    if (selectedStore) {
      setCheckedInIds(prev => new Set(prev).add(selectedStore.id));

      // Show success banner
      setSuccessMessage('Check-In Successful');
      setTimeout(() => setSuccessMessage(''), 2500);

      // Navigate to DetailsScreen after check-in
      navigation.navigate('Details', {
        store: selectedStore,
        visitStatus: 'inprogress',
        isToday,
        hasAnyCheckIn: true,
        onStatusChange: handleStatusChange,
        onOrderPlaced: id => {
          setOrderPlacedIds(prev => new Set(prev).add(id));
        },
      });
    }
    setDrawerVisible(false);
  };

  // Handle check-out via drawer
  const handleCheckOut = item => {
    setSelectedStore(item);
    setCheckoutDrawerVisible(true);
  };

  // Confirm check-out from drawer
  const confirmCheckOut = (hasOrder = false) => {
    if (selectedStore) {
      setCheckedInIds(prev => {
        const next = new Set(prev);
        next.delete(selectedStore.id);
        return next;
      });
      setCompletedIds(prev => new Set(prev).add(selectedStore.id));
      if (hasOrder) {
        setOrderPlacedIds(prev => new Set(prev).add(selectedStore.id));
      }
    }
    setCheckoutDrawerVisible(false);

    // Show success banner
    setSuccessMessage('Check-Out Successful');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  // for checkin button
  const hasAnyCheckIn = checkedInIds.size > 0;

  //for change beat button
  const hasAnyVisitStarted = checkedInIds.size > 0 || completedIds.size > 0;

  // const STORE_DATA = [
  //   {
  //     id: '1',
  //     storeName: 'Shrestha Enterprise',
  //     phoneNumber: '+91 98300 12345',
  //     channel: 'Retail',
  //     subChannel: 'Grocer / Kirana',
  //     class: 'B',
  //     address: 'Gariahat, South Kolkata, West Bengal, 700029, India',
  //   },
  //   {
  //     id: '2',
  //     storeName: 'Apex General Store',
  //     phoneNumber: '+91 98300 67890',
  //     channel: 'Wholesale',
  //     subChannel: 'Supermarket',
  //     class: 'A',
  //     address: 'Salt Lake Sector V, Kolkata, West Bengal, 700091, India',
  //   },
  //   {
  //     id: '3',
  //     storeName: 'City Mart',
  //     phoneNumber: '+91 98311 22334',
  //     channel: 'Retail',
  //     subChannel: 'Convenience Store',
  //     class: 'C',
  //     address: 'Park Street, Kolkata, West Bengal, 700016, India',
  //   },
  //   {
  //     id: '4',
  //     storeName: 'Reliable Traders',
  //     phoneNumber: '+91 98355 44332',
  //     channel: 'Distribution',
  //     subChannel: 'Pharma / Chemist',
  //     class: 'A',
  //     address: 'Howrah Maidan, Howrah, West Bengal, 711101, India',
  //   },
  //   {
  //     id: '5',
  //     storeName: 'Modern Groceries',
  //     phoneNumber: '+91 98366 77889',
  //     channel: 'Retail',
  //     subChannel: 'Grocer / Kirana',
  //     class: 'B',
  //     address: 'Behala Chowrasta, Kolkata, West Bengal, 700034, India',
  //   },
  // ];

  useEffect(() => {
    fetchRecords('visitdays', setVisitList);
  }, []);

  // call functions
  const callOwner = number => {
    Linking.openURL(`tel:${number}`);
  };

  const openMap = (lat, lng) => {
    setMapLocation({
      latitude: Number(lat),
      longitude: Number(lng),
    });
  };

  const getVisitStatus = item => {
    if (completedIds.has(item.id)) return 'completed';
    if (checkedInIds.has(item.id)) return 'inprogress';
    return 'upcoming';
  };

  const handleStatusChange = (id, action, hasOrder = false) => {
    if (action === 'checkin') {
      setCheckedInIds(prev => new Set(prev).add(id));
    } else if (action === 'checkout') {
      setCheckedInIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setCompletedIds(prev => new Set(prev).add(id));
      if (hasOrder) {
        setOrderPlacedIds(prev => new Set(prev).add(id));
      }
    }
  };

  const openDetails = item => {
    navigation.navigate('Details', {
      store: item,
      visitStatus: getVisitStatus(item),
      isToday,
      hasAnyCheckIn,
      onStatusChange: handleStatusChange,
      onOrderPlaced: id => {
        setOrderPlacedIds(prev => new Set(prev).add(id));
      },
    });
  };

  // Determine left border color based on visit status
  const getLeftBorderColor = item => {
    const isCompleted = completedIds.has(item.id);
    const isCheckedIn = checkedInIds.has(item.id);

    if (isCompleted) {
      return orderPlacedIds.has(item.id) ? '#4CAF50' : '#e53935'; // green if order placed, red otherwise
    }
    if (isCheckedIn) {
      return '#e53935'; // red for in progress
    }
    return '#000'; // black for upcoming
  };

  const renderItem = ({ item }) => {
    const isCheckedIn = checkedInIds.has(item.id);
    const isCompleted = completedIds.has(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.storeCard,
          { borderLeftWidth: 4, borderLeftColor: getLeftBorderColor(item) },
        ]}
        activeOpacity={0.7}
        onPress={() => openDetails(item)}
      >
        <View style={styles.storeHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.storeName}>{item.visit_store_name}</Text>

            {(isCheckedIn || isCompleted) && (
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={isCompleted ? '#4CAF50' : '#76e7a5'}
                style={{ marginLeft: 5 }}
              />
            )}
          </View>

          <View style={styles.iconRow}>
            <Ionicons
              name="location"
              size={20}
              color="#1E5ACD"
              backgroundColor="#f1f9faff"
              borderRadius={15}
              padding={2}
              onPress={() => openMap(item.visit_latitude, item.visit_longitude)}
            />

            <Ionicons
              name="call"
              size={20}
              color="#1E5ACD"
              backgroundColor="#f1f9faff"
              borderRadius={15}
              padding={2}
              onPress={() => callOwner(item.visit_owner_number)}
            />
          </View>
        </View>

        <View style={styles.channelRow}>
          <View>
            <Text style={styles.label}>Class</Text>
            <Text style={styles.value}>{item.visit_class}</Text>
          </View>

          <View>
            <Text style={styles.label}>Channel</Text>
            <Text style={styles.value}>{item.visit_channel}</Text>
          </View>

          <View>
            <Text style={styles.label}>Sub Channel</Text>
            <Text style={styles.value}>{item.visit_sub_channel}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.address}>{item.visit_address}</Text>

          {/* Upcoming tab Check In enabled or disabled */}
          {isToday &&
            activeTab === 'upcoming' &&
            !isCompleted &&
            (hasAnyCheckIn ? (
              <Text style={styles.checkBtnDisabled}>Check In</Text>
            ) : (
              <Text
                style={styles.checkBtn}
                onPress={() => {
                  setSelectedStore(item);
                  setDrawerVisible(true);
                }}
              >
                Check In
              </Text>
            ))}

          {/* In Progress tab Check Out */}
          {isToday &&
            activeTab === 'inprogress' &&
            isCheckedIn &&
            !isCompleted && (
              <Text
                style={styles.checkOutBtn}
                onPress={() => handleCheckOut(item)}
              >
                Check Out
              </Text>
            )}
        </View>
      </TouchableOpacity>
    );
  };

  const now = new Date();
  const todayStr =
    now.getFullYear() +
    '-' +
    String(now.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(now.getDate()).padStart(2, '0');
  const isToday = selectedDate === todayStr;

  return (
    <View style={styles.container}>
      {successMessage !== '' && (
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" />
          <Text style={styles.successBannerText}>{successMessage}</Text>
          <TouchableOpacity onPress={() => setSuccessMessage('')}>
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonChange}>
        <TouchableOpacity
          style={[
            styles.button,
            (!isToday || hasAnyVisitStarted) && styles.buttonDisabled,
          ]}
          disabled={!isToday || hasAnyVisitStarted}
          onPress={() => setChangeBeatDrawerVisible(true)}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Change Beat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !isToday && styles.buttonDisabled]}
          disabled={!isToday}
          onPress={() => setAdHocDrawerVisible(true)}
        >
          <Text
            style={{ color: !isToday ? '#fff' : '#fff', fontWeight: '600' }}
          >
            Ad-Hoc Visit
          </Text>
        </TouchableOpacity>
      </View>

      <MapModel
        location={
          mapLocation
            ? mapLocation
            : filteredVisits.length > 0
            ? {
                latitude: Number(filteredVisits[0].visit_latitude),
                longitude: Number(filteredVisits[0].visit_longitude),
              }
            : null
        }
      />

      <View>
        <View style={styles.statusMapContainer}>
          <View style={styles.headerDetails}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {beatDay?.beat_day_name || 'No Beat Planned'}
            </Text>
            <Text
              style={{
                color: '#a10a0a',
                borderRadius: 14,
                backgroundColor: '#f5c2c2',
                paddingHorizontal: 12,
                paddingVertical: 2,
              }}
            >
              Live
            </Text>
          </View>

          <View style={styles.statusShow}>
            <View>
              <Text style={{ color: '#4a81e9', fontWeight: 'bold' }}>
                {filteredVisits.length}
              </Text>
              <Text style={{ color: '#888' }}>outlets</Text>
            </View>
            <View>
              <Text style={{ color: '#4a81e9', fontWeight: 'bold' }}>
                {orderOutletCount}
              </Text>
              <Text style={{ color: '#888' }}>Order Outlet</Text>
            </View>
            <View>
              <Text style={{ color: '#4a81e9', fontWeight: 'bold' }}>
                {nonOrderOutletCount}
              </Text>
              <Text style={{ color: '#888' }}>Non-Order Outlet</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Progress tabs */}
      <View style={styles.progressStyle}>
        <TouchableOpacity onPress={() => setActiveTab('upcoming')}>
          <Text
            style={
              activeTab === 'upcoming'
                ? styles.progressBtn
                : styles.progressDisable
            }
          >
            {' '}
            Upcoming({upcomingVisits.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('inprogress')}>
          <Text
            style={
              activeTab === 'inprogress'
                ? styles.progressBtn
                : styles.progressDisable
            }
          >
            {' '}
            In Progress({inProgressVisits.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('completed')}>
          <Text
            style={
              activeTab === 'completed'
                ? styles.progressBtn
                : styles.progressDisable
            }
          >
            {' '}
            Completed({completedVisits.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeVisits.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          {activeTab === 'upcoming'
            ? 'No Upcoming Visits'
            : activeTab === 'inprogress'
            ? 'No In-Progress Visits'
            : 'No Completed Visits'}
        </Text>
      ) : (
        <FlatList
          data={activeVisits}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <CheckInDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        store={selectedStore}
        onCheckIn={handleCheckIn}
      />
      <CheckoutDrawer
        visible={checkoutDrawerVisible}
        onClose={() => setCheckoutDrawerVisible(false)}
        onCheckOut={confirmCheckOut}
      />
      <AdHocDrawer
        visible={adHocDrawerVisible}
        onClose={() => setAdHocDrawerVisible(false)}
        currentVisitIds={filteredVisits.map(v => v.id)}
        onSubmit={selectedVisits => {
          setAdHocVisitsByDate(prev => {
            const updated = { ...prev };

            const startDate = new Date(todayStr);
            const endDate = new Date(selectedDate);

            for (
              let d = new Date(startDate);
              d <= endDate;
              d.setDate(d.getDate() + 1)
            ) {
              const key =
                d.getFullYear() +
                '-' +
                String(d.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(d.getDate()).padStart(2, '0');

              const existing = updated[key] || [];

              const newVisits = selectedVisits.filter(
                v => !existing.some(e => e.id === v.id),
              );

              updated[key] = [...existing, ...newVisits];
            }

            return updated;
          });
        }}
      />
      <ChangeBeatDrawer
        visible={changeBeatDrawerVisible}
        onClose={() => setChangeBeatDrawerVisible(false)}
        currentBeatId={beatDay?.id}
        onSubmit={selectedBeat => {
          fetchRecords('beatday', beats => {
            const currentBeat = beats.find(
              b => b.beat_day_date === selectedDate,
            );

            const targetBeat = beats.find(b => b.id === selectedBeat.id);

            if (!currentBeat || !targetBeat) return;

            const currentDate = currentBeat.beat_day_date;
            const targetDate = targetBeat.beat_day_date;

            setBeatDay({
              ...targetBeat,
              beat_day_date: currentDate,
            });

            // temp date
            const tempDate = '2099-12-31';

            updateRecord('beatday', currentBeat.id, {
              beat_day_date: tempDate,
            });

            updateRecord('beatday', targetBeat.id, {
              beat_day_date: currentDate,
            });

            updateRecord('beatday', currentBeat.id, {
              beat_day_date: targetDate,
            });
          });
        }}
      />
    </View>
  );
}
