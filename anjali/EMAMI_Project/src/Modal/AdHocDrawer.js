import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchRecords } from '../config/ReusableApi';

export default function AdHocDrawer({
  visible,
  onClose,
  onSubmit,
  currentVisitIds,
}) {
  const [beats, setBeats] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [expandedBeatId, setExpandedBeatId] = useState(null);
  const [selectedVisits, setSelectedVisits] = useState([]);

  useEffect(() => {
    if (visible) {
      setSelectedVisits([]);
      setExpandedBeatId(null);
      fetchRecords('beatday', data => setBeats(data));
      fetchRecords('visitdays', data => setAllVisits(data));
    }
  }, [visible]);

  const getVisitsForBeat = beatSfId => {
    return allVisits.filter(
      v => v.beat_day_id === beatSfId && !currentVisitIds.includes(v.id),
    );
  };

  const toggleBeat = beatSfId => {
    setExpandedBeatId(prev => (prev === beatSfId ? null : beatSfId));
  };

  const toggleVisitSelection = visit => {
    setSelectedVisits(prev => {
      const exists = prev.find(v => v.id === visit.id);
      if (exists) {
        return prev.filter(v => v.id !== visit.id);
      }
      return [...prev, visit];
    });
  };

  const isSelected = visitId => selectedVisits.some(v => v.id === visitId);

  const handleSubmit = () => {
    if (selectedVisits.length > 0) {
      onSubmit(selectedVisits);
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Ad-Hoc Visit Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={false}
          >
            {beats.map(beat => {
              const beatVisits = getVisitsForBeat(beat.sf_id);
              const isExpanded = expandedBeatId === beat.sf_id;

              return (
                <View key={beat.id}>
                  <TouchableOpacity
                    style={styles.beatCard}
                    activeOpacity={0.7}
                    onPress={() => toggleBeat(beat.sf_id)}
                  >
                    <View style={styles.beatInfo}>
                      <Text style={styles.beatName}>{beat.beat_day_name}</Text>
                      <Text style={styles.beatCount}>
                        {beatVisits.length} outlets
                      </Text>
                    </View>

                    <Ionicons
                      name={isExpanded ? 'remove-circle' : 'add-circle'}
                      size={30}
                      color="#9e9e9e"
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.visitsList}>
                      {beatVisits.length === 0 ? (
                        <Text style={styles.noVisits}>
                          No outlets available
                        </Text>
                      ) : (
                        beatVisits.map(visit => {
                          const selected = isSelected(visit.id);
                          return (
                            <TouchableOpacity
                              key={visit.id}
                              style={styles.visitCard}
                              activeOpacity={0.8}
                              onPress={() => toggleVisitSelection(visit)}
                            >
                              <View
                                style={[
                                  styles.checkbox,
                                  selected && styles.checkboxChecked,
                                ]}
                              >
                                {selected && (
                                  <Ionicons
                                    name="checkmark"
                                    size={15}
                                    color="#fff"
                                  />
                                )}
                              </View>

                              <View style={styles.visitInfo}>
                                <Text style={styles.visitName}>
                                  {visit.visit_store_name}
                                </Text>
                                <Text style={styles.visitCode}>
                                  Party Code: {visit.sf_id}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              selectedVisits.length === 0 && styles.submitBtnDisabled,
            ]}
            onPress={handleSubmit}
            disabled={selectedVisits.length === 0}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 20,
    maxHeight: '90%',
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  scrollArea: {
    marginBottom: 12,
  },

  // Beat Card
  beatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: '#e4f2f4',
    borderRadius: 12,
    marginVertical: 5,
    elevation: 1,
  },

  beatInfo: {
    flex: 1,
  },

  beatName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  beatCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  visitsList: {
    paddingLeft: 12,
    paddingRight: 4,
    paddingBottom: 4,
    marginBottom: 2,
    alignItems: 'center',
  },

  visitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6eded',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginVertical: 6,
    width: '95%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#9db6f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },

  checkboxChecked: {
    backgroundColor: '#1E5ACD',
    borderColor: '#1E5ACD',
  },

  visitInfo: {
    flex: 1,
  },

  visitName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d2d2d',
  },

  visitCode: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  noVisits: {
    color: '#bbb',
    fontSize: 13,
    paddingVertical: 10,
    paddingLeft: 6,
    fontStyle: 'italic',
  },

  // Submit Button
  submitBtn: {
    backgroundColor: '#0754e3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },

  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
