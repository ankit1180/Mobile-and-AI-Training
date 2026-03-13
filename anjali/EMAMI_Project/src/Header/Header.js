import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import logo from '../assets/Image/Logo.png';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function Header() {
  const navigation = useNavigation();
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.navBackArrow}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.titleText}>Ꮛmami</Text>
          </View>

          <View style={{ width: 30 }} />
        </View>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingTop: StatusBar.currentHeight,
  },

  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  navBackArrow: {
    width: 30,
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoImage: {
    height: 35,
    width: 35,
    marginRight: 6,
  },

  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
