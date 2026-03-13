import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

export default function CheckInDrawer({ visible, onClose, onCheckIn }) {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    'Fetching Address....',
  );

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

          // console.log('Latitude:', latitude);
          // console.log('Longitude:', longitude);
          getAddressFromCoordinates(latitude, longitude);
        },
        error => {
          // console.log('Location Error Code:', error.code);
          // console.log('Location Error Message:', error.message);

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
      setImage(null);
      setIsSubmitting(false);
      setCurrentLocation('Fetching Address....');
      getCurrentLocation();
    }
  }, [visible]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onCheckIn();
    }, 1500);
  };

  const openCamera = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take photos',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
          return;
        }
      }

      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorCode) {
        console.log('Camera Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Check-In</Text>

            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
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

          <View style={styles.uploadHeader}>
            <Text style={styles.uploadTitle}>Upload Image</Text>

            <TouchableOpacity style={styles.cameraBtn} onPress={openCamera}>
              <Ionicons name="camera" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {image && (
            <View style={styles.imageBox}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}

          <TouchableOpacity
            style={[styles.checkBtn, isSubmitting && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.checkText}>Check In</Text>
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

  uploadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  uploadTitle: {
    fontWeight: '600',
    fontSize: 15,
  },

  imageBox: {
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E5ACD',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  cameraBtn: {
    backgroundColor: '#1E5ACD',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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

  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#1E5ACD',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },

  captureText: {
    color: '#1E5ACD',
    fontWeight: '600',
    fontSize: 14,
  },
});
