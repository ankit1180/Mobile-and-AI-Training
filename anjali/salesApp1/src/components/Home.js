import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dropdownCard}>
          <View style={styles.row}>
            <Ionicons name="person" size={18} color="#3E6BCB" />
            <Text style={styles.dropdownText}>Ram Kumar (SR)</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={18} color="#888" />
        </View>

        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Live Status</Text>
          </View>
          <View style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Performance</Text>
          </View>
        </View>

        <View style={styles.beatRow}>
          <View style={styles.scheduleBox}>
            <Ionicons name="add" size={28} color="#107b98" marginRight={40} />
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
            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>
              Food Order{' '}
            </Text>
            <Text style={{ color: '#b5b3b3' }}>(In Thousand)</Text>
          </Text>
        </View>

        <View style={styles.fullCard}>
          <Text style={styles.bigText}>220L</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#2F5DD1" />
        <Ionicons name="calendar-outline" size={24} color="#9E9E9E" />
        <Ionicons name="add" size={28} color="#9E9E9E" />
        <Ionicons name="person" size={24} color="#9E9E9E" />
        <Ionicons name="rocket-outline" size={24} color="#9E9E9E" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },

  tabContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  activeTab: {
    flex: 1,
    backgroundColor: '#2F5DD1',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
  },

  inactiveTab: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  inactiveTabText: {
    color: '#888',
    fontWeight: 'bold',
  },

  beatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  scheduleBox: {
    backgroundColor: '#ECF5F4',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '36%',
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  scheduleText: {
    color: '#107b98',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },

  storeBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: '60%',
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  storeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  storeSub: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  bigGreenText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28B463',
  },

  cardLabel: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 6,
  },

  smallText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  fullCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#eaf2f1',
  },
  bottomNav: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
