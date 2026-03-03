import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../assets/css/style';

const ReusableDropdown = ({ label, data, value, onChange, isFull = false }) => {
  const dropdownValue = arr =>
    arr.map(value => ({
      label: value,
      value: value,
    }));

  return (
    <View style={isFull ? styles.fullRow : styles.col}>
      <Text style={styles.label}>{label}</Text>

      <Dropdown
        style={isFull ? styles.dropdownFull : styles.dropdown}
        data={dropdownValue(data)}
        search
        itemTextStyle={{ color: '#767676', fontSize: 13 }}
        inputSearchStyle={{
          borderColor: 'gray',
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderLeftWidth: 0,
        }}
        containerStyle={{ borderRadius: 8, marginTop: -46 }}
        labelField="label"
        valueField="value"
        placeholder="Select"
        placeholderStyle={{ color: '#767676' }}
        searchPlaceholder="Search"
        value={value}
        onChange={item => onChange(item.value)}
      />
    </View>
  );
};

export default ReusableDropdown;
