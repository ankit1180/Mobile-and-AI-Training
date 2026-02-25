import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
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
import { savePersonal } from '../redux/formSlice';
import { styles } from '../assets/homestyle';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const FirstForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { personal } = useSelector(state => state.form);

  const [fullName, setFullName] = useState(personal.fullName);
  const [email, setEmail] = useState(personal.email);
  const [phone, setPhone] = useState(personal.phone);
  const [firstName, setFirstName] = useState(personal.firstName);
  const [lastName, setLastName] = useState(personal.lastName);
  const [dob, setDob] = useState(personal.dob);
  const [nationality, setNationality] = useState(personal.nationality);
  const [alternateEmail, setAlternateEmail] = useState(personal.alternateEmail);

  const [selectedGender, setSelectedGender] = useState(personal.selectedGender);
  const [selectedStatus, setSelectedStatus] = useState(personal.selectedStatus);

  const [selectedPhoneType, setSelectedPhoneType] = useState(
    personal.selectedPhoneType,
  );

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateObj, setDateObj] = useState(dob ? new Date(dob) : new Date());

  // Collapsible sections down arrow state
  const [personalExpanded, setPersonalExpanded] = useState(true);
  const [contactExpanded, setContactExpanded] = useState(true);

  const phoneTypes = [
    { label: 'Select', value: '' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' },
  ];

  const gender = [
    { label: 'Select', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const maritalStatus = [
    { label: 'Select', value: '' },
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
  ];

  useEffect(() => {
    dispatch(
      savePersonal({
        fullName,
        email,
        phone,
        selectedGender,
        selectedStatus,
        selectedPhoneType,
        firstName,
        lastName,
        nationality,
        dob,
        alternateEmail,
      }),
    );
  }, [
    fullName,
    email,
    phone,
    selectedGender,
    selectedStatus,
    selectedPhoneType,
    firstName,
    lastName,
    nationality,
    dob,
    alternateEmail,
  ]);

  // set full name whenever first or last name changes
  useEffect(() => {
    const combined = `${firstName} ${lastName}`.trim();
    if (combined) {
      setFullName(combined);
    }
  }, [firstName, lastName]);

  const handleNext = () => {
    if (!fullName || !email || !phone || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    handleNext,
  }));

  // Date picker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');

      setDob(`${year}-${month}-${day}`);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.formContainer}
      contentContainerStyle={styles.formScrollContent}
    >
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setPersonalExpanded(!personalExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
        </View>
        <Text style={styles.sectionChevron}>
          {personalExpanded ? '∧' : '∨'}
        </Text>
      </TouchableOpacity>
      <View style={styles.sectionDivider} />

      {personalExpanded && (
        <View>
          {/* First Name */}
          <Text style={styles.fieldLabel}>
            First Name <Text style={styles.requiredStar}>*</Text>
          </Text>

          <TextInput
            style={styles.inputEditable}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            placeholderTextColor="#999"
          />

          {/* Last Name */}
          <Text style={styles.fieldLabel}>
            Last Name <Text style={styles.requiredStar}>*</Text>
          </Text>

          <TextInput
            style={styles.inputEditable}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            placeholderTextColor="#999"
          />

          {/* Full Name (auto-populated) */}
          <Text style={styles.fieldLabel}>
            Full Name <Text style={styles.requiredStar}>*</Text>
          </Text>

          <TextInput
            style={styles.inputEditable}
            value={fullName}
            editable={false}
            placeholder="Auto-Populate"
            placeholderTextColor="#999"
          />

          {/* Gender */}
          <Text style={styles.fieldLabel}>
            Gender <Text style={styles.requiredStar}>*</Text>
          </Text>

          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.pickerContainer}
              selectedValue={selectedGender}
              onValueChange={itemValue => setSelectedGender(itemValue)}
              dropdownIconColor="#999"
            >
              {gender.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          {/* Marital Status */}
          <Text style={styles.fieldLabel}>Marital Status</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.pickerContainer}
              selectedValue={selectedStatus}
              onValueChange={itemValue => setSelectedStatus(itemValue)}
              dropdownIconColor="#999"
            >
              {maritalStatus.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          {/* Date of Birth — opens DateTimePicker */}
          <Text style={styles.fieldLabel}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.inputEditable}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={{ color: dob ? '#1a1a1a' : '#999', fontSize: 14 }}>
              {dob || 'Select date of birth'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              maximumDate={new Date()}
              onChange={onDateChange}
            />
          )}

          {/* Nationality*/}
          <Text style={styles.fieldLabel}>Nationality</Text>
          <TextInput
            style={styles.inputEditable}
            value={nationality}
            onChangeText={setNationality}
            placeholder="Enter nationality"
            placeholderTextColor="#999"
          />
        </View>
      )}

      {/* Contact Information Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setContactExpanded(!contactExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        <Text style={styles.sectionChevron}>{contactExpanded ? '∧' : '∨'}</Text>
      </TouchableOpacity>
      <View style={styles.sectionDivider} />

      {contactExpanded && (
        <View>
          {/* Primary Email */}
          <Text style={styles.fieldLabel}>
            Primary Email <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.inputEditable}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          {/* Secondary Email */}
          <Text style={styles.fieldLabel}>Secondary Email</Text>
          <TextInput
            style={styles.inputEditable}
            value={alternateEmail}
            onChangeText={setAlternateEmail}
            placeholder="Enter secondary email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          {/* Phone Type Picker*/}
          <Text style={styles.fieldLabel}>Phone Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.pickerContainer}
              selectedValue={selectedPhoneType}
              onValueChange={itemValue => setSelectedPhoneType(itemValue)}
              dropdownIconColor="#999"
            >
              {phoneTypes.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          {/* Phone */}
          <Text style={styles.fieldLabel}>
            Phone <Text style={styles.requiredStar}>*</Text>
          </Text>

          <TextInput
            style={styles.inputEditable}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
      )}
    </ScrollView>
  );
});

export default FirstForm;
