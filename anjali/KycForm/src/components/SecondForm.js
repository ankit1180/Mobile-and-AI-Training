import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../redux/formSlice';
import { styles } from '../assets/homestyle';
import CheckBox from '@react-native-community/checkbox';

const SecondForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { address } = useSelector(state => state.form);

  // Permanent address
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city);
  const [stateName, setStateName] = useState(address.state);
  const [pincode, setPincode] = useState(address.pincode);

  // Current address
  const [currentStreet, setCurrentStreet] = useState(address.currentStreet);
  const [currentCity, setCurrentCity] = useState(address.currentCity);
  const [currentState, setCurrentState] = useState(address.currentState);
  const [currentPincode, setCurrentPincode] = useState(address.currentPincode);

  const [isSameAddress, setIsSameAddress] = useState(false);

  const [permanentExpanded, setPermanentExpanded] = useState(true);
  const [currentExpanded, setCurrentExpanded] = useState(true);

  useEffect(() => {
    dispatch(
      saveAddress({
        street,
        city,
        state: stateName,
        pincode,
        currentStreet: isSameAddress ? street : currentStreet,
        currentCity: isSameAddress ? city : currentCity,
        currentState: isSameAddress ? stateName : currentState,
        currentPincode: isSameAddress ? pincode : currentPincode,
      }),
    );
  }, [
    street,
    city,
    stateName,
    pincode,
    currentStreet,
    currentCity,
    currentState,
    currentPincode,
    isSameAddress,
    dispatch,
  ]);

  const handleSameAddress = value => {
    setIsSameAddress(value);
    if (value) {
      setCurrentStreet(street);
      setCurrentCity(city);
      setCurrentState(stateName);
      setCurrentPincode(pincode);
    } else {
      setCurrentStreet('');
      setCurrentCity('');
      setCurrentState('');
      setCurrentPincode('');
    }
  };

  const handleNext = () => {
    if (!street || !city || !stateName || !pincode) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    handleNext,
  }));

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.formContainer}
      contentContainerStyle={styles.formScrollContent}
    >
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setPermanentExpanded(!permanentExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Permanent Address</Text>
        </View>
        <Text style={styles.sectionChevron}>
          {permanentExpanded ? '∧' : '∨'}
        </Text>
      </TouchableOpacity>
      <View style={styles.sectionDivider} />

      {permanentExpanded && (
        <View>
          <Text style={styles.fieldLabel}>
            Street <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.inputEditable}
            value={street}
            onChangeText={setStreet}
            placeholder="Enter street address"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            City <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.inputEditable}
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            State <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.inputEditable}
            value={stateName}
            onChangeText={setStateName}
            placeholder="Enter state"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            Pincode <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.inputEditable}
            value={pincode}
            onChangeText={setPincode}
            placeholder="Enter pincode"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.checkboxRow}>
        <CheckBox
          value={isSameAddress}
          onValueChange={handleSameAddress}
          style={styles.checkbox}
          tintColors={{ true: '#e60023', false: '#ccc' }}
        />
        <Text style={styles.checkboxLabel}>
          Current address same as permanent
        </Text>
      </View>

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setCurrentExpanded(!currentExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Current Address</Text>
        </View>
        <Text style={styles.sectionChevron}>{currentExpanded ? '∧' : '∨'}</Text>
      </TouchableOpacity>
      <View style={styles.sectionDivider} />

      {currentExpanded && (
        <View>
          <Text style={styles.fieldLabel}>
            Street <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.inputEditable,
              isSameAddress && { backgroundColor: '#f0f0f0' },
            ]}
            value={isSameAddress ? street : currentStreet}
            onChangeText={setCurrentStreet}
            editable={!isSameAddress}
            placeholder="Enter street address"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            City <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.inputEditable,
              isSameAddress && { backgroundColor: '#f0f0f0' },
            ]}
            value={isSameAddress ? city : currentCity}
            onChangeText={setCurrentCity}
            editable={!isSameAddress}
            placeholder="Enter city"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            State <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.inputEditable,
              isSameAddress && { backgroundColor: '#f0f0f0' },
            ]}
            value={isSameAddress ? stateName : currentState}
            onChangeText={setCurrentState}
            editable={!isSameAddress}
            placeholder="Enter state"
            placeholderTextColor="#999"
          />

          <Text style={styles.fieldLabel}>
            Pincode <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.inputEditable,
              isSameAddress && { backgroundColor: '#f0f0f0' },
            ]}
            value={isSameAddress ? pincode : currentPincode}
            onChangeText={setCurrentPincode}
            editable={!isSameAddress}
            placeholder="Enter pincode"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      )}
    </ScrollView>
  );
});

export default SecondForm;
