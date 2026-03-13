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

export default function ChangeBeatDrawer({
  visible,
  onClose,
  onSubmit,
  currentBeatId,
}) {
  const [beats, setBeats] = useState([]);
  const [selectedBeat, setSelectedBeat] = useState(null);

  useEffect(() => {
    if (visible) {
      fetchRecords('beatday', data => setBeats(data));
      setSelectedBeat(null);
    }
  }, [visible]);

  const handleSubmit = () => {
    if (selectedBeat) {
      onSubmit(selectedBeat);
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Change Beat</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={false}
          >
            {beats.map(beat => {
              const selected = selectedBeat?.id === beat.id;

              return (
                <TouchableOpacity
                  key={beat.id}
                  style={styles.beatCard}
                  activeOpacity={0.8}
                  onPress={() => setSelectedBeat(beat)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selected && styles.checkboxChecked,
                    ]}
                  >
                    {selected && (
                      <Ionicons name="checkmark" size={15} color="#fff" />
                    )}
                  </View>

                  <View style={styles.beatInfo}>
                    <Text style={styles.beatName}>{beat.beat_day_name}</Text>
                    <Text style={styles.beatDate}>{beat.beat_day_date}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              !selectedBeat && styles.submitBtnDisabled,
            ]}
            disabled={!selectedBeat}
            onPress={handleSubmit}
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
    maxHeight: '80%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  scrollArea: {
    marginTop: 10,
    marginBottom: 12,
  },

  beatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e4f2f4',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginVertical: 6,
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

  beatInfo: {
    flex: 1,
  },

  beatName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d2d2d',
  },

  beatDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  submitBtn: {
    backgroundColor: '#0754e3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  submitBtnDisabled: {
    backgroundColor: '#ccc',
  },

  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
