import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../assets/homestyle';

export default function Navbar() {
  return (
    <View style={styles.navcontainer}>
      <TouchableOpacity style={styles.navBackArrow}>
        <Text style={styles.navBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.navTitle}>New Job Card</Text>
    </View>
  );
}
