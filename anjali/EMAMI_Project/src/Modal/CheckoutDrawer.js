import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';

export default function CheckoutDrawer({
  visible,
  onClose,
  onCheckOut,
  hasOrder,
}) {
  const [currentLocation, setCurrentLocation] = useState(
    'Fetching Address....',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toDateString();

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

      const response = await fetch(url, {
        headers: { 'User-Agent': 'EmamiApp/1.0' },
      });
      const data = await response.json();

      if (data && data.display_name) {
        setCurrentLocation(data.display_name);
      } else {
        setCurrentLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.log('Geocode error:', error);
      setCurrentLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setCurrentLocation('Location permission denied');
          return;
        }
      }

      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });

      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getAddressFromCoordinates(latitude, longitude);
        },
        error => {
          setCurrentLocation('Unable to fetch location');
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 1000,
          forceRequestLocation: true,
        },
      );
    } catch (error) {
      console.log('Location Catch Error:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      setCurrentLocation('Fetching Address....');
      setIsSubmitting(false);
      getCurrentLocation();
    }
  }, [visible]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onCheckOut(hasOrder);
    }, 1500);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Check-Out</Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#777" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            System will capture your geo-location.
          </Text>

          {isSubmitting && (
            <View style={styles.loadingBar}>
              <ActivityIndicator size={40} color="#1E5ACD" />
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={22} color="#1E5ACD" />

            <View>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{today}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="location-outline" size={22} color="red" />

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Current Location</Text>
              <Text style={styles.value}>{currentLocation}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[styles.checkBtn, isSubmitting && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.checkText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  drawer: {
    backgroundColor: '#fcfcfc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E5ACD',
  },

  subtitle: {
    color: '#777',
    marginTop: 4,
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },

  checkBtn: {
    backgroundColor: '#1E5ACD',
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    elevation: 4,
  },

  checkText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  loadingBar: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },

  loadingText: {
    color: '#1E5ACD',
    fontWeight: '600',
    fontSize: 14,
  },
});
