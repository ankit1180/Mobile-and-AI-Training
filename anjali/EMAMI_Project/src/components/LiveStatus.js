import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PerformancePage from './PerformancePage';
import { styles } from '../assets/css/livestatus';
const Image2 = require('../assets/Image/Image2.png');
const Image1 = require('../assets/Image/Image1.png');

export default function LiveStatus() {
  const [tabChange, setTabChange] = useState('live');

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dropdownCard}>
          <View style={styles.row}>
            <Ionicons name="person" size={18} color="#3E6BCB" />
            <Text style={styles.dropdownText}>Ram Kumar (SR)</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={18} color="#888" />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setTabChange('live')}
            style={[
              styles.tabButton,
              tabChange === 'live' ? styles.activeLeft : styles.inactiveLeft,
            ]}
          >
            <Text
              style={
                tabChange === 'live' ? styles.activeText : styles.inactiveText
              }
            >
              Live Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTabChange('performance')}
            style={[
              styles.tabButton,
              tabChange === 'performance'
                ? styles.activeRight
                : styles.inactiveRight,
            ]}
          >
            <Text
              style={
                tabChange === 'performance'
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              Performance
            </Text>
          </TouchableOpacity>
        </View>

        {tabChange === 'live' ? (
          <>
            <View style={styles.beatRow}>
              <View style={styles.scheduleBox}>
                <Ionicons
                  name="add"
                  size={28}
                  color="#107b98"
                  marginRight={40}
                />
                <Text style={styles.scheduleText}>Schedule Beat</Text>
              </View>

              <View style={styles.storeBox}>
                <Text style={styles.storeTitle}>Shree Ji General Store</Text>
                <Text style={styles.storeSub}>Current Beat</Text>
              </View>
            </View>

            <View style={styles.grid}>
              <View style={styles.card}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.timeText}>9:22{'\n'}AM</Text>
                  <Ionicons name="time-outline" size={20} color="#F5B041" />
                </View>
                <Text style={styles.cardLabel}>Attendance Time</Text>
              </View>

              <View style={styles.card}>
                <Text style={[styles.bigGreenText]}>Active</Text>
                <Text style={[styles.cardLabel, { marginTop: 25 }]}>
                  Attendance Status
                </Text>
              </View>

              <View style={styles.card}>
                <Ionicons name="image-outline" size={45} color="#49a8af" />
                <Text style={[styles.cardLabel, { marginTop: 7 }]}>
                  Attendance Image
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.bigText}>9</Text>
                <Text style={styles.cardLabel}>Planned {'\n'}Outlet</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.bigText}>33%</Text>
                <Text style={styles.cardLabel}>
                  ISC <Text style={{ color: '#b5b3b3' }}>(In %)</Text>
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.bigText}>2/5</Text>
                <Text style={styles.cardLabel}>Productive v/s Total Call</Text>
              </View>
            </View>

            <View style={styles.fullCard}>
              <Text style={styles.bigText}>44.2K</Text>
              <Text style={styles.smallText}>
                <Text
                  style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}
                >
                  Food Order{' '}
                </Text>
                <Text style={{ color: '#b5b3b3' }}>(In Thousand)</Text>
              </Text>
              <Image source={Image2} style={styles.logoImage} />
            </View>

            <View style={styles.fullCard}>
              <Text style={styles.bigText}>220L</Text>
              <Image source={Image1} style={styles.logoImage} />
            </View>
          </>
        ) : (
          <PerformancePage />
        )}
      </ScrollView>
    </View>
  );
}
