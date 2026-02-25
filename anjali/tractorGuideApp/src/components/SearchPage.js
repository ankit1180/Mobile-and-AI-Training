import React, { useState } from 'react';
import { TouchableOpacity, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './CustomDrawer';
import { styles } from '../assets/css/style';

export default function SearchPage() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View>
      {/* Search Bar */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setDrawerVisible(true)}
        style={styles.searchContainer}
      >
        <Ionicons name="search-outline" size={18} color="#9e9e9e" />
        <TextInput
          style={styles.searchInput}
          placeholder="Find Right Tractor"
          placeholderTextColor="#9e9e9e"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* drawer components for the bottom  */}
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
}
