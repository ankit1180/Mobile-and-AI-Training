import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/css/performance';
const Image1 = require('../assets/Image/Image1.png');
const Image2 = require('../assets/Image/Image2.png');

export default function PerformancePage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.fullCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.bigText}>13.2K/21.6K</Text>
            <Text style={styles.label}>Food (In Thousands)</Text>
          </View>
          <Image source={Image2} style={styles.logoImage} />
        </View>
      </View>

      <View style={styles.fullCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.bigText}>112L / 220L</Text>
            <Text style={styles.label}>Oil (In Liters)</Text>
          </View>
          <Image source={Image1} style={styles.logoImage} />
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.card}>
          <View style={styles.statRow}>
            <Text style={styles.bigText}>22</Text>

            <Ionicons
              name="caret-down"
              size={14}
              color="#e74c3c"
              style={{ marginLeft: 4 }}
            />
          </View>

          <Text style={styles.label}>TLS (Total Lines Sold)</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.statRow}>
            <Text style={styles.bigText}>22</Text>

            <Ionicons
              name="caret-up"
              size={14}
              color="#2ecc71"
              style={{ marginLeft: 4 }}
            />
          </View>
          <Text style={styles.label}>UTLS (Unique Total Lines Sold)</Text>
        </View>
      </View>

      <View style={styles.grid3}>
        <View style={styles.smallCard}>
          <Text style={styles.bigText}>11</Text>
          <Text style={styles.label}>Days Worked</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.bigText}>44</Text>
          <Text style={styles.label}>Outlet Visited</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.bigText}>92</Text>
          <Text style={styles.label}>Total Outlets</Text>
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.card}>
          <View style={styles.statRow}>
            <Text style={styles.bigText}>11/19</Text>

            <Ionicons
              name="caret-down"
              size={14}
              color="#e74c3c"
              style={{ marginLeft: 4 }}
            />
          </View>
          <Text style={styles.label}>MBO</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.statRow}>
            <Text style={styles.bigText}>4</Text>
            <Ionicons
              name="caret-down"
              size={14}
              color="#e74c3c"
              style={{ marginLeft: 4 }}
            />
          </View>
          <Text style={styles.label}>Bill Cuts</Text>
        </View>
      </View>
    </ScrollView>
  );
}
