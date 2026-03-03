import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../header/CustomHeader';
import { styles } from '../assets/css/style';

export default function SummaryScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <CustomHeader title="Advance Tracker (Summary)" />

      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="document-text-outline" size={16} />
            <Text style={styles.summaryTitle}> Summary</Text>
          </View>

          <View style={[styles.summaryRow, { backgroundColor: '#eeeeee' }]}>
            <Text style={styles.summaryLabel}>Month Open Advance</Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Deliveries</Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>

          <View style={[styles.summaryRow, { backgroundColor: '#eeeeee' }]}>
            <Text style={styles.summaryLabel}>Retails</Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Open Adv(as on date)</Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>

          <View style={[styles.summaryRow, { backgroundColor: '#eeeeee' }]}>
            <Text style={styles.summaryLabel}>Expected retails this month</Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Adv Tracking Follow-Up Overdue
            </Text>
            <Text style={styles.summaryValue}>0</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { marginTop: 15 }]}>
          <View style={styles.summaryHeader}>
            <Ionicons name="calendar-outline" size={16} />
            <Text style={styles.summaryTitle}> Open Advances (Days)</Text>
          </View>

          <View style={styles.daysContainer}>
            <View style={styles.dayBox}>
              <Text style={styles.dayLabel}>{'<30 Days'}</Text>
              <Text style={styles.dayValue}>00</Text>
              <View style={styles.verticalDivider} />
            </View>

            <View style={styles.dayBox}>
              <Text style={styles.dayLabel}>30-60</Text>
              <Text style={styles.dayValue}>00</Text>
              <View style={styles.verticalDivider} />
            </View>

            <View style={styles.dayBox}>
              <Text style={styles.dayLabel}>60-90</Text>
              <Text style={styles.dayValue}>00</Text>
              <View style={styles.verticalDivider} />
            </View>

            <View style={styles.dayBox}>
              <Text style={styles.dayLabel}>{'>90'}</Text>
              <Text style={styles.dayValue}>00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
