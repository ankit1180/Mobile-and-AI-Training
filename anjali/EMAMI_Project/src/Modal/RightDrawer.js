import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import logo from '../assets/Image/Logo.png';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function RightDrawer({ closeDrawer }) {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: screenWidth * 0.05,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={closeDrawer}
      activeOpacity={1}
    >
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <LinearGradient
          colors={['#4b77d5', '#113e98', '#4b69ab']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ padding: 41 }}
        >
          <View style={styles.logoHeader}>
            <Image source={logo} style={styles.logoImage} />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 30,
                marginTop: 8,
              }}
            >
              Ꮛmami
            </Text>
          </View>
          <Text style={styles.name}>Anjali Kashyap</Text>
        </LinearGradient>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Product')}
          >
            <Ionicons name="bag-outline" size={24} color="#125bd9" />
            <Text style={styles.item}>Add Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('BeatDay')}
          >
            <Ionicons name="cart-outline" size={24} color="#125bd9" />
            <Text style={styles.item}>Add Beat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('VisitDay')}
          >
            <Ionicons name="desktop-outline" size={24} color="#125bd9" />
            <Text style={styles.item}>Add Visit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.bottommenuItem}>
            <Ionicons name="sync-outline" size={24} color="#000" />
            <Text style={styles.item}>Get Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottommenuItem}>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  drawer: {
    position: 'absolute',
    right: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18,
  },

  logoHeader: {
    flexDirection: 'row',
  },

  logoImage: {
    height: 50,
    width: 50,
  },

  menu: {
    padding: 20,
    marginRight: 10,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 19,
    paddingHorizontal: 5,
    borderRadius: 12,
    marginBottom: 5,
    shadowColor: '#39b6a7',
    shadowOpacity: 0.08,
    elevation: 3,
  },

  bottommenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  item: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
    color: '#333',
  },

  logout: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },

  bottom: {
    marginTop: 'auto',
    padding: 20,
    marginRight: 10,
  },
});
