import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../assets/homestyle';

export default function Summary() {
  const { personal, address } = useSelector(state => state.form);

  const [personalExpanded, setPersonalExpanded] = useState(true);
  const [addressExpanded, setAddressExpanded] = useState(true);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.formContainer}
      contentContainerStyle={styles.formScrollContent}
    >
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setPersonalExpanded(!personalExpanded)}
      >
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.sectionChevron}>
          {personalExpanded ? '∧' : '∨'}
        </Text>
      </TouchableOpacity>

      <View style={styles.sectionDivider} />

      {personalExpanded && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>First Name</Text>
            <Text style={styles.summaryValue}>{personal.firstName || '—'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Last Name</Text>
            <Text style={styles.summaryValue}>{personal.lastName || '—'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Full Name</Text>
            <Text style={styles.summaryValue}>{personal.fullName || '—'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Gender</Text>
            <Text style={styles.summaryValue}>
              {personal.selectedGender || '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Marital Status</Text>
            <Text style={styles.summaryValue}>
              {personal.selectedStatus || '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Date of Birth</Text>
            <Text style={styles.summaryValue}>{personal.dob || '—'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Nationality</Text>
            <Text style={styles.summaryValue}>
              {personal.nationality || '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Email</Text>
            <Text style={styles.summaryValue}>{personal.email || '—'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Alt. Email</Text>
            <Text style={styles.summaryValue}>
              {personal.alternateEmail || '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Phone Type</Text>
            <Text style={styles.summaryValue}>
              {personal.selectedPhoneType || '—'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Phone</Text>
            <Text style={styles.summaryValue}>{personal.phone || '—'}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setAddressExpanded(!addressExpanded)}
      >
        <Text style={styles.sectionTitle}>Address Details</Text>
        <Text style={styles.sectionChevron}>{addressExpanded ? '∧' : '∨'}</Text>
      </TouchableOpacity>

      <View style={styles.sectionDivider} />

      {addressExpanded && (
        <View>
          <Text style={styles.title}>Permanent Address</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Street</Text>
              <Text style={styles.summaryValue}>{address.street || '—'}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>City</Text>
              <Text style={styles.summaryValue}>{address.city || '—'}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>State</Text>
              <Text style={styles.summaryValue}>{address.state || '—'}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Pincode</Text>
              <Text style={styles.summaryValue}>{address.pincode || '—'}</Text>
            </View>
          </View>

          <Text style={[styles.title, { marginTop: 16 }]}>Current Address</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Street</Text>
              <Text style={styles.summaryValue}>
                {address.currentStreet || '—'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>City</Text>
              <Text style={styles.summaryValue}>
                {address.currentCity || '—'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>State</Text>
              <Text style={styles.summaryValue}>
                {address.currentState || '—'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Pincode</Text>
              <Text style={styles.summaryValue}>
                {address.currentPincode || '—'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
