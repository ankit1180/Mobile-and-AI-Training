import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/css/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

//pass title as a props
export default function CustomHeader({ title }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.navBackArrow}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.navTitle}>{title}</Text>
    </View>
  );
}
