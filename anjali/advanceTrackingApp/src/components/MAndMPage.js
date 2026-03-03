import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/style';
import { data } from '../Data/data';
// import { Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { phoneCall } from '../helper/util';

export default function MAndMPage({
  searchText = '',
  selectedFilters = {},
  type = 'MM',
}) {
  const navigation = useNavigation();

  const searchFilter = (item, searchText) => {
    const searchValue = searchText?.toLowerCase() || '';

    if (!searchValue) return true;

    return (
      (item?.name || '').toLowerCase().includes(searchValue) ||
      (item?.mobile || '').toLowerCase().includes(searchValue)
    );
  };

  const dropdownFilter = (item, selectedFilters = {}) => {
    const { tehsil, ageing, paymentType, salesman, retailStatus } =
      selectedFilters;

    if (!tehsil && !ageing && !paymentType && !salesman && !retailStatus) {
      return true;
    }

    return (
      (tehsil && item.tehsil === tehsil) ||
      (ageing && item.ageing === ageing) ||
      (paymentType && item.paymentType === paymentType) ||
      (salesman && item.Salesman === salesman) ||
      (retailStatus && item.RetailStatus === retailStatus)
    );
  };

  const filteredData = data.filter(
    item =>
      searchFilter(item, searchText) && dropdownFilter(item, selectedFilters),
  );

  // phone call function
  // const phoneCall = phone => {
  //   if (!phone) return;
  //   const phoneNumber =
  //     Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  //   console.log('phone.....', phone);
  //   Linking.openURL(phoneNumber).catch(err => {
  //     console.log('Error', err);
  //   });
  // };

  // show date action in card
  const getFollowDays = followUpDate => {
    const currentDate = new Date();
    const dueDate = new Date(followUpDate);
    const diffTime = currentDate - dueDate;
    const diffDays = 1000 * 60 * 60 * 24;
    const diffODays = Math.floor(diffTime / diffDays);
    return diffODays;
  };

  const renderItem = ({ item }) => {
    // days show on card header
    const days = getFollowDays(item.followUpDueDate);
    let canBadge = true;

    if (days < 0) {
      canBadge = false;
    }

    return (
      <TouchableOpacity
        // pass value in detailsScreen
        style={styles.card}
        onPress={() =>
          navigation.navigate('DetailsScreen', {
            item: item,
            type: type,
          })
        }
      >
        {/* Time Badge Shows */}
        {canBadge && (
          <View style={styles.daysBadge}>
            <Text style={styles.daysBadgeText}>{`O/D-${days} Days`}</Text>
          </View>
        )}

        <View style={styles.cardHeading}>
          <Text style={styles.name}>{item.name}</Text>

          <TouchableOpacity
            style={styles.callButton}
            onPress={() => phoneCall(item.mobile)}
          >
            <Ionicons name="call-outline" size={16} color="#e60023" />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          Village: <Text style={styles.value}>{item.village}</Text>
        </Text>

        <Text style={styles.text}>
          S.No.: <Text style={styles.value}>{item.serialNumber}</Text>
        </Text>

        <Text style={styles.text}>
          Financier Name: <Text style={styles.value}>{item.financierName}</Text>
        </Text>

        <Text style={styles.text}>
          Expected Retail Date:{' '}
          <Text style={styles.value}>{item.expectedRetailDate}</Text>
        </Text>

        <Text style={styles.text}>
          Delivery Date: <Text style={styles.value}>{item.deliveryDate}</Text>
        </Text>

        <View style={styles.divider} />

        <Text style={styles.text}>
          Ageing: <Text style={[styles.days, styles.value]}>{item.ageing}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ color: '#888' }}>No Data Found</Text>
        </View>
      )}
    />
  );
}
