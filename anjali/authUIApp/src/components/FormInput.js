import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../assets/css/style';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {/* user text input */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="gray"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default FormInput;
