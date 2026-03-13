import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import {
  createRecord,
  fetchRecords,
  deleteRecord,
} from '../config/ReusableApi';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarModal from '../Modal/Calendar';
import { styles } from '../assets/css/beatday';

export default function BeatDay() {
  const [showForm, setShowForm] = useState(false);
  const [beats, setBeats] = useState([]);

  const [beatName, setBeatName] = useState('');
  const [beatDate, setBeatDate] = useState('');

  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    fetchRecords('beatday', setBeats);
    console.log('get All beats', setBeats);
  }, []);

  // id convert to string
  const generateSfId = () => Date.now().toString();

  // form reset for added
  const resetForm = () => {
    setBeatName('');
    setBeatDate('');
  };

  // add beat function
  const addBeatDay = async () => {
    if (!beatName || !beatDate) {
      Alert.alert('Validation', 'Enter Beat Name and Date');
      return;
    }

    const alreadyExists = beats.find(item => item.beat_day_date === beatDate);

    if (alreadyExists) {
      Alert.alert('A Beat Day already exists for this date');
      return;
    }

    const data = await createRecord('beatday', {
      sf_id: generateSfId(),
      beat_day_name: beatName,
      beat_day_date: beatDate,
    });

    console.log('data----->', data);

    Alert.alert('Success', 'Beat Day Created');

    resetForm();
    setShowForm(false);
  };

  const removeBeat = async item => {
    console.log('remove beat');
    await deleteRecord('beatday', item.id);
    fetchRecords('beatday', setBeats);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.beat_day_name}</Text>
        <Text style={styles.date}>Date: {item.beat_day_date}</Text>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeBeat(item)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // form card

  if (showForm) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Beat Name<Text style={{ color: 'red' }}> *</Text>
        </Text>

        <TextInput
          style={styles.input}
          value={beatName}
          onChangeText={setBeatName}
          placeholder="Enter beat name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Beat Date<Text style={{ color: 'red' }}> *</Text>
        </Text>

        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setCalendarVisible(true)}
        >
          <TextInput
            style={styles.dateInput}
            value={beatDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#888"
            editable={false}
          />

          <Ionicons name="calendar-outline" size={22} color="#2e86de" />
        </TouchableOpacity>

        <View style={styles.onAddStyle}>
          <TouchableOpacity style={styles.button} onPress={addBeatDay}>
            <Text style={styles.buttonText}>Create Beat Day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              resetForm();
              setShowForm(false);
            }}
          >
            <Text style={{ color: '#fff' }}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <CalendarModal
          visible={calendarVisible}
          initialDate={beatDate || new Date().toISOString().split('T')[0]}
          onClose={() => setCalendarVisible(false)}
          onSelectDate={date => setBeatDate(date)}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {beats.length > 0 ? (
        <FlatList
          data={beats}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No Beat Day Available
        </Text>
      )}

      <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
        <Text style={{ color: '#fff', alignSelf: 'center' }}>Add Beat Day</Text>
      </TouchableOpacity>
    </View>
  );
}
