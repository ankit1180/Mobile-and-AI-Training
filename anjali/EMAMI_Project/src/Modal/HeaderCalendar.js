import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HeaderCalendar({ onDateChange }) {
  const today = new Date();
  const currentDate = today.getDate();

  const [selectedDate, setSelectedDate] = useState(today);

  const flatListRef = useRef(null);

  // Generate current month dates
  const dates = useMemo(() => {
    const arr = [];
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(new Date(year, month, i));
    }

    return arr;
  }, []);

  // Scroll to today when component loads
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: currentDate - 1,
        animated: false,
        viewPosition: 0.5,
      });
    }, 100);
  }, []);

  const handleSelect = (item, index) => {
    setSelectedDate(item);

    const formatted =
      item.getFullYear() +
      '-' +
      String(item.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(item.getDate()).padStart(2, '0');

    onDateChange && onDateChange(formatted);

    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const renderItem = ({ item, index }) => {
    const isSelected = item.toDateString() === selectedDate.toDateString();

    const day = item.toLocaleDateString('en-US', { weekday: 'short' });
    const date = item.getDate();

    return (
      <TouchableOpacity
        style={[styles.dayCard, isSelected && styles.selectedDay]}
        onPress={() => handleSelect(item, index)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>
          {day}
        </Text>

        <Text style={[styles.dateText, isSelected && styles.selectedText]}>
          {date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>

        <TouchableOpacity style={styles.bellContainer}>
          <Ionicons name="notifications" size={22} color="blue" />

          {/* notification badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        renderItem={renderItem}
        keyExtractor={item => item.toISOString()}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 46,
          offset: 46 * index,
          index,
        })}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dayCard: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    alignItems: 'center',
    width: 40,
    marginTop: 13,
  },

  selectedDay: {
    backgroundColor: '#fff',
  },

  dayText: {
    color: '#fff',
    fontSize: 10,
  },

  dateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  selectedText: {
    color: '#1E5ACD',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    flex: 1,
  },

  searchInput: {
    marginLeft: 6,
    flex: 1,
    color: '#333',
  },

  bellContainer: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
  },

  badge: {
    position: 'absolute',
    right: 1,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
