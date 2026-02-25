import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { styles } from '../assets/css/style';

export default function FetchApi({ isConnected }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // API endpoint to fetch user data
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  const fetchUserData = async () => {
    if (!isConnected) {
      setError('No internet connection');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isConnected]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
  }, [isConnected]);

  if (loading && !refreshing)
    return <ActivityIndicator size="large" style={styles.activity} />;

  if (error) return <Text style={styles.error}>{error}</Text>;

  const renderUserItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Username :- {item.username}</Text>
      <Text>Email :- {item.email}</Text>
      <Text>Phone :- {item.phone}</Text>
      <Text>City :- {item.address.city}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>Fetch Users Information</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
