import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FetchApi from '../components/FetchApi';

export default function Internet() {
  const [isConnected, setIsConnected] = useState(true);
  const [loadingOffline, setLoadingOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connection = state.isConnected;
      if (!connection) {
        setLoadingOffline(true);
      } else {
        setLoadingOffline(false);
      }
      setIsConnected(connection);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!isConnected && loadingOffline && (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
            No Internet Connection
          </Text>
        </View>
      )}

      <FetchApi isConnected={isConnected} />
    </View>
  );
}
