import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomHeader from '../Header/Header';
import BeatDay from '../components/BeatDay';
import LinearGradient from 'react-native-linear-gradient';

export default function ProductScreen() {
  return (
    <LinearGradient
      colors={['#4b77d5', '#113e98', '#4b69ab']}
      style={{ flex: 1 }}
    >
      <CustomHeader />
      <View style={styles.screenContainer}>
        <BeatDay />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -5,
    padding: 15,
  },
});
