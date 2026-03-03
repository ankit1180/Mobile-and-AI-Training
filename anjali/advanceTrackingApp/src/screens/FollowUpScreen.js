import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../header/CustomHeader';
import { styles } from '../assets/css/style';
import { phoneCall } from '../helper/util';
import { formatDate } from '../helper/util';

export default function FollowUpScreen({ route }) {
  const { item } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2f2' }}>
      <CustomHeader
        title="Advance Tracker"
        name={item.name}
        status={item.status}
        showProfile={true}
        mobile={item.mobile}
        onCall={phoneCall}
      />

      <ScrollView contentContainerStyle={{ padding: 25, marginTop: 12 }}>
        <View style={styles.timelineSection}>
          <View style={styles.timelineLeft}>
            <View style={styles.upcomingCircle}>
              <Ionicons name="time-outline" size={20} color="#fff" />
            </View>
            <View style={styles.timelinedivider} />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingText}>Upcoming Follow-Up</Text>
            </View>

            <View style={styles.timelineCard}>
              <Text style={styles.timelineSub}>
                Date:{' '}
                <Text style={styles.dateStyle}>
                  {formatDate(item.followUpDueDate)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineSection}>
          <View style={styles.timelineLeft}>
            <View style={styles.timelineCircle}>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </View>
            <View style={styles.timelinedivider} />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>
                {formatDate(item.deliveryDate)}
              </Text>
            </View>

            <View style={styles.timelineCard}>
              <Text>
                <Ionicons name="calendar-outline" size={18} color="#43bf27" />{' '}
                <Text style={styles.timelineTitle}>Delivered</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineSection}>
          <View style={styles.timelineLeft}>
            <View style={styles.timelineCircle}>
              <Ionicons name="checkmark" size={18} color="#fff" />
            </View>
            <View style={styles.timelinedivider} />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{formatDate(item.bookedDate)}</Text>
            </View>

            <View style={styles.timelineCard}>
              <Text>
                <Ionicons name="calendar-outline" size={18} color="#43bf27" />{' '}
                <Text style={styles.timelineTitle}>Booked</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineSection}>
          <View style={styles.timelineLeft}>
            <View style={styles.timelineCircle}>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{formatDate(item.bookedDate)}</Text>
            </View>

            <View style={styles.timelineCard}>
              <Text>
                <Ionicons name="calendar-outline" size={18} color="#43bf27" />{' '}
                <Text style={styles.timelineTitle}>Follow-Up Created</Text>
              </Text>

              <Text style={styles.timelineSub}>
                Follow-Up By:{' '}
                <Text style={styles.dateStyle}>{item.Salesman}</Text>
              </Text>

              <Text style={styles.timelineSub}>
                Payment Mode:{' '}
                <Text style={styles.dateStyle}>{item.paymentType}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
