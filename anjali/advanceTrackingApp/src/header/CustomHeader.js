import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/css/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({
  title,
  name,
  status,
  mobile,
  onCall,
  showProfile = false,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.safeView}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Ionicons name="arrow-back" style={styles.iconStyle} />
          </TouchableOpacity>

          <Text style={styles.navTitle}>{title}</Text>

          <View style={{ width: 30 }} />
        </View>
        {/* show profile in header and get data through props */}
        {showProfile && (
          <View style={styles.profileRow}>
            <View style={styles.profileCircle}>
              <Ionicons name="person-outline" size={26} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.customerName}>{name}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                onCall(mobile);
              }}
            >
              <View style={styles.callCircle}>
                <Ionicons name="call-outline" size={20} color="#e60023" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
