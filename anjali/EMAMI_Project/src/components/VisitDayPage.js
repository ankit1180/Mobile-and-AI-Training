import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { styles } from '../assets/css/visitday';

import { Dropdown } from 'react-native-element-dropdown';

import {
  createRecord,
  fetchRecords,
  updateRecord,
  deleteRecord,
} from '../config/ReusableApi';

export default function VisitDayPage() {
  const [showForm, setShowForm] = useState(false);

  const [visitList, setVisitList] = useState([]);
  const [beatList, setBeatList] = useState([]);

  const [selectedBeat, setSelectedBeat] = useState(null);

  const [visitName, setVisitName] = useState('');

  const [ownerNumber, setOwnerNumber] = useState('');

  const [storeName, setStoreName] = useState('');
  const [visitAddress, setVisitAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [visitClass, setVisitClass] = useState('');
  const [visitChannel, setVisitChannel] = useState('');
  const [visitSubChannel, setVisitSubChannel] = useState('');

  // new field
  const [creditLimit, setCreditLimit] = useState('');
  const [creditDays, setCreditDays] = useState('');
  const [distributor, setDistributor] = useState('');

  const [editingId, setEditingId] = useState(null);

  // get beat
  useEffect(() => {
    fetchRecords('visitdays', setVisitList);
    fetchRecords('beatday', setBeatList);
  }, []);

  const generateSfId = () => Date.now().toString();

  const resetForm = () => {
    setSelectedBeat(null);
    setVisitName('');
    setOwnerNumber('');
    setStoreName('');
    setVisitAddress('');
    setLatitude('');
    setLongitude('');
    setVisitClass('');
    setVisitChannel('');
    setVisitSubChannel('');

    setCreditLimit('');
    setCreditDays('');
    setDistributor('');
    setEditingId(null);
  };

  // validation function

  const validateForm = () => {
    if (!selectedBeat) {
      Alert.alert('Please select Beat Day');
      return false;
    }

    if (!visitName.trim()) {
      Alert.alert('Visit Name is required');
      return false;
    }

    if (!ownerNumber.trim()) {
      Alert.alert('Owner Phone Number is required');
      return false;
    }

    if (!/^[0-9]{10}$/.test(ownerNumber)) {
      Alert.alert('Phone number must be 10 digits');
      return false;
    }

    if (!storeName.trim()) {
      Alert.alert('Store Name is required');
      return false;
    }

    if (!visitAddress.trim()) {
      Alert.alert('Visit Address is required');
      return false;
    }

    if (!latitude.trim() || isNaN(latitude)) {
      Alert.alert('Latitude is required and must be numeric');
      return false;
    }

    if (!longitude.trim() || isNaN(longitude)) {
      Alert.alert('Longitude is required and must be numeric');
      return false;
    }

    return true;
  };

  const addVisit = async () => {
    if (!validateForm()) {
      return;
    }

    const data = await createRecord('visitdays', {
      sf_id: generateSfId(),
      beat_day_id: selectedBeat,
      visit_name: visitName,
      visit_owner_number: ownerNumber,
      visit_store_name: storeName,
      visit_address: visitAddress,
      visit_latitude: Number(latitude),
      visit_longitude: Number(longitude),
      visit_class: visitClass,
      visit_channel: visitChannel,
      visit_sub_channel: visitSubChannel,

      credit_limit: Number(creditLimit),
      credit_days: Number(creditDays),
      distributor: distributor,
    });

    await fetchRecords('visitdays', setVisitList);

    Alert.alert('Success', 'Visit Added');
    console.log('data--------->', data);

    resetForm();
    setShowForm(false);
  };

  const updateVisit = async () => {
    if (!validateForm()) return;

    await updateRecord('visitdays', editingId, {
      beat_day_id: selectedBeat,
      visit_name: visitName,
      visit_owner_number: ownerNumber,
      visit_store_name: storeName,
      visit_address: visitAddress,
      visit_latitude: Number(latitude),
      visit_longitude: Number(longitude),
      visit_class: visitClass,
      visit_channel: visitChannel,
      visit_sub_channel: visitSubChannel,

      // new fields
      credit_limit: Number(creditLimit),
      credit_days: Number(creditDays),
      distributor: distributor,
    });

    await fetchRecords('visitdays', setVisitList);

    Alert.alert('Success', 'Visit Updated');

    resetForm();
    setShowForm(false);
  };

  const removeVisit = async item => {
    await deleteRecord('visitdays', item.id);
    await fetchRecords('visitdays', setVisitList);
  };

  // edit form open
  const openEdit = item => {
    setEditingId(item.id);
    setSelectedBeat(item.beat_day_id);
    setVisitName(item.visit_name);
    setOwnerNumber(item.visit_owner_number);
    setStoreName(item.visit_store_name);
    setLatitude(String(item.visit_latitude));
    setLongitude(String(item.visit_longitude));
    setVisitClass(item.visit_class);
    setVisitChannel(item.visit_channel);
    setVisitSubChannel(item.visit_sub_channel);

    setCreditLimit(String(item.credit_limit || ''));
    setCreditDays(String(item.credit_days || ''));
    setDistributor(item.distributor || '');
    setShowForm(true);
  };

  const renderItem = ({ item }) => {
    const beatName =
      beatList.find(b => b.sf_id === item.beat_day_id)?.beat_day_name ||
      'Unknown Beat';

    console.log('BeatName----->', beatName);

    // populate from the beat day
    const beatDayDate =
      beatList.find(b => b.sf_id === item.beat_day_id)?.beat_day_date ||
      'Unknown Date';

    console.log('beatDayDate ---->', beatDayDate);

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.visit_name}</Text>

        <Text style={styles.text}>
          Beat: <Text style={{ color: 'gray' }}>{beatName}</Text>
        </Text>
        <Text style={styles.text}>
          Beat Day Date: <Text style={{ color: 'gray' }}>{beatDayDate}</Text>
        </Text>
        <Text style={styles.text}>
          Owner Number:{' '}
          <Text style={{ color: 'gray' }}>{item.visit_owner_number}</Text>
        </Text>
        <Text style={styles.text}>
          Store Name:
          <Text style={{ color: 'gray' }}>{item.visit_store_name}</Text>
        </Text>
        <Text style={styles.text}>
          Visit Address:
          <Text style={{ color: 'gray' }}>{item.visit_address}</Text>
        </Text>
        <Text style={styles.text}>
          Latitude:
          <Text style={{ color: 'gray' }}> {item.visit_latitude}</Text>
        </Text>
        <Text style={styles.text}>
          Longitude:
          <Text style={{ color: 'gray' }}>{item.visit_longitude}</Text>
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => openEdit(item)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => removeVisit(item)}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (showForm) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.label}>
          Beat Day <Text style={{ color: 'red' }}> *</Text>
        </Text>

        <Dropdown
          style={styles.dropdown}
          data={beatList}
          labelField="beat_day_name"
          valueField="sf_id"
          search
          searchPlaceholder="Search..."
          // inputSearchStyle={{ backgroundColor: '#cc3535' }}
          value={selectedBeat}
          placeholder="Select Beat Day"
          disable={editingId !== null}
          onChange={item => setSelectedBeat(item.sf_id)}
        />

        <Text style={styles.label}>
          Visit Name<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          // style={[styles.input, editingId && styles.disabledInput]}
          style={styles.input}
          value={visitName}
          onChangeText={setVisitName}
          placeholder="Enter Visit Name"
          editable={editingId === null}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Owner Number <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={ownerNumber}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={text => setOwnerNumber(text.replace(/[^0-9]/g, ''))}
          placeholder="Enter Owner Phone"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Store Name <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter Store Name"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>
          Visit Address <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={visitAddress}
          onChangeText={setVisitAddress}
          placeholder="Enter Visit Address"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Latitude <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={latitude}
          keyboardType="numeric"
          onChangeText={text => setLatitude(text.replace(/[^0-9.]/g, ''))}
          placeholder="Enter Latitude"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>
          Longitude<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={longitude}
          keyboardType="numeric"
          onChangeText={text => setLongitude(text.replace(/[^0-9.]/g, ''))}
          placeholder="Enter Longitude"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Class</Text>
        <TextInput
          style={styles.input}
          value={visitClass}
          onChangeText={setVisitClass}
          placeholder="Enter Class"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Channel</Text>
        <TextInput
          style={styles.input}
          value={visitChannel}
          onChangeText={setVisitChannel}
          placeholder="Enter Channel"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Sub Channel</Text>
        <TextInput
          style={styles.input}
          value={visitSubChannel}
          onChangeText={setVisitSubChannel}
          placeholder="Enter Sub Channel"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Credit Limit</Text>
        <TextInput
          style={styles.input}
          value={creditLimit}
          keyboardType="numeric"
          onChangeText={text => setCreditLimit(text.replace(/[^0-9]/g, ''))}
          placeholder="Enter Credit Limit"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Credit Days</Text>
        <TextInput
          style={styles.input}
          value={creditDays}
          keyboardType="numeric"
          onChangeText={text => setCreditDays(text.replace(/[^0-9]/g, ''))}
          placeholder="Enter Credit Days"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Distributor Name</Text>
        <TextInput
          style={styles.input}
          value={distributor}
          onChangeText={setDistributor}
          placeholder="Enter Distributor Name"
          placeholderTextColor="#888"
        />

        <View style={styles.onAddStyle}>
          {editingId ? (
            <TouchableOpacity style={styles.button} onPress={updateVisit}>
              <Text style={styles.buttonText}>Update Visit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={addVisit}>
              <Text style={styles.buttonText}>Add Visit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              resetForm();
              setShowForm(false);
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {visitList.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No Visits Added
        </Text>
      ) : (
        <FlatList
          data={visitList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
        <Text style={{ color: '#fff', alignSelf: 'center' }}>Add Visit</Text>
      </TouchableOpacity>
    </View>
  );
}
