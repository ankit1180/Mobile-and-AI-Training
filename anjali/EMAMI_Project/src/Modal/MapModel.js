import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function MapModel({ location }) {
  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);
  const [mapType, setMapType] = useState('standard');

  useEffect(() => {
    if (location) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);

      mapRef.current?.animateToRegion(newRegion, 500);
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          setRegion(newRegion);
        },
        error => console.log(error),
        { enableHighAccuracy: false, timeout: 20000 },
      );
    }
  }, [location]);

  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 300);
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 300);
  };

  if (!region) return null;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        mapType={mapType}
        showsUserLocation
        userInterfaceStyle="light"
        customMapStyle={[]}
      >
        {location && <Marker coordinate={location} pinColor="red" />}
      </MapView>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, mapType === 'standard' && styles.activeBtn]}
          onPress={() => setMapType('standard')}
        >
          <Text style={styles.toggleText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            mapType === 'satellite' && styles.activeBtn,
          ]}
          onPress={() => setMapType('satellite')}
        >
          <Text style={styles.toggleText}>Satellite</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomBtn} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.zoomBtn} onPress={zoomOut}>
          <Text style={styles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  toggleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },

  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  activeBtn: {
    backgroundColor: '#1976D2',
  },

  toggleText: {
    fontSize: 12,
    color: '#000',
  },

  zoomContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  zoomBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 6,
    alignItems: 'center',
  },

  zoomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
