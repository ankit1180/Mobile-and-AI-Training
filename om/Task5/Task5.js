import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  buttonBg: '#007BFF',
};

const DarkTheme = {
  background: '#000000',
  text: '#ffffff',
  buttonBg: '#e2a522',
};

const STORAGE_KEY = '@isDarkMode'; // Key to save the mode

const Modechange = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMode !== null) {
          setIsDarkMode(savedMode === 'true'); // AsyncStorage stores strings
        }
      } catch (e) {
        console.error('Failed to load theme.');
      }
    };

    loadTheme();
  }, []);

  // Toggle theme and save to AsyncStorage
  const toggle = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(STORAGE_KEY, newMode.toString());
    } catch (e) {
      console.error('Failed to save theme.');
    }
  };

  const currentTheme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={{ color: currentTheme.text, fontSize: 18, marginBottom: 20 }}>
        Welcome To Theme Change
      </Text>

      <Button
        color={currentTheme.buttonBg}
        title={isDarkMode ? 'Switch To Light Mode' : 'Switch to Dark Mode'}
        onPress={toggle}
      />

      <Text style={{ color: currentTheme.text, marginTop: 20 }}>
        Current Mode: {isDarkMode ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
};

export default Modechange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});