import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/hometab';

// live status component
import LiveStatus from './LiveStatus';
import BeatPlan from './BeatPlan';

export default function HomeTab({
  activeTab,
  setActiveTab,
  openDrawer,
  selectedDate,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {activeTab === 'home' && <LiveStatus />}
        {activeTab === 'beat' && <BeatPlan selectedDate={selectedDate} />}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons name="home" size={24} color="#2F5DD1" />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('beat')}
        >
          <Ionicons name="calendar" size={24} color="#2F5DD1" />
          <Text style={styles.text}>Beat Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openDrawer} style={styles.navItem}>
          <Ionicons name="person" size={24} color="#2F5DD1" />
          <Text style={styles.text}>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
