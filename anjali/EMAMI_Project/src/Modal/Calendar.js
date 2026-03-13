import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CalendarModal({
  visible,
  onClose,
  onSelectDate,
  initialDate,
}) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (visible && initialDate) {
      setSelectedDate(initialDate);
    }
  }, [visible, initialDate]);

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      style={{ justifyContent: 'center', margin: 20 }}
    >
      <View style={styles.calendarContainer}>
        <Calendar
          enableSwipeMonths
          current={selectedDate}
          renderArrow={direction => (
            <Ionicons
              name={direction === 'left' ? 'arrow-back' : 'arrow-forward'}
              size={20}
              color="#19bee3"
            />
          )}
          onDayPress={day => {
            setSelectedDate(day.dateString);
            onSelectDate(day.dateString);
            onClose();
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#22a3a1',
            },
          }}
        />

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  closeButton: {
    backgroundColor: '#2e86de',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
