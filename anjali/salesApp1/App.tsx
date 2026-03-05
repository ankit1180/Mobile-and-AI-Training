import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';

function App() {
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <View style={styles.topRow}>
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                  />
                  <Ionicons name="search-outline" size={18} color="#888" />
                </View>

                <TouchableOpacity style={styles.bellContainer}>
                  <Ionicons name="notifications" size={18} color="#3E6BCB" />
                </TouchableOpacity>
              </View>

              <Text style={styles.greeting}>
                Hey! <Text style={{ fontWeight: 'bold' }}>Jaydeep</Text>
              </Text>

              <View style={styles.titleRow}>
                <Text style={styles.title}>SR (Sales Representative)</Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 4 }}
                />
              </View>

              <Text style={styles.subtitle}>Current Dashboard View</Text>
            </View>

            <Home />
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 10,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },

  bellContainer: {
    marginLeft: 12,
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  greeting: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 6,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#dcdcdc',
    fontSize: 13,
    marginTop: 3,
  },
});
