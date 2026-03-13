import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../assets/Image/Logo.png';
import HomeTab from '../components/HomeTab';
import RightDrawer from '../Modal/RightDrawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderCalendar from '../Modal/HeaderCalendar';

export default function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return (
      d.getFullYear() +
      '-' +
      String(d.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getDate()).padStart(2, '0')
    );
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={['#4b77d5', '#113e98', '#4b69ab']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.content}>
          {activeTab === 'home' && (
            <>
              <View style={styles.headerTitle}>
                <Image source={logo} style={styles.logoImage} />
                <Text
                  style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                >
                  Ꮛmami
                </Text>
              </View>

              <Text style={styles.greeting}>
                🟢 Hey!{' '}
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                  Anjali Kashyap
                </Text>
              </Text>

              <Text style={styles.title}>Outlet Metro</Text>
            </>
          )}

          {activeTab === 'beat' && (
            <View>
              <HeaderCalendar onDateChange={setSelectedDate} />
            </View>
          )}
        </View>

        <HomeTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openDrawer={() => setDrawerOpen(true)}
          selectedDate={selectedDate}
        />

        {drawerOpen && <RightDrawer closeDrawer={() => setDrawerOpen(false)} />}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 10,
  },

  greeting: {
    color: '#d1c9c9',
    fontSize: 15,
    marginBottom: 6,
  },

  headerTitle: {
    flexDirection: 'row',
  },

  logoImage: {
    height: 35,
    width: 35,
    marginBottom: 9,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    color: '#dcdcdc',
    fontSize: 13,
    marginTop: 3,
  },
});
