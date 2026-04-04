import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Tractors from '../utils/Tractors.json';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const ModelVariants = ({ selectedModel }) => {
  const navigation = useNavigation();
  const [compareVariants, setCompareVariants] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState([]);
  console.log(
    'selectedModel in model variants component ======>>>>>>> ',
    selectedModel,
  );

  useEffect(() => {
    console.log('compareVariants =====>>>>>> ', compareVariants);
  }, [compareVariants]);

  const allVariantsOfSelectedModel = Tractors.filter(
    t => t.Model === selectedModel,
  );

  const toggleVariant = id => {
    setSelectedVariant(prev => {
      console.log('prev in model variants =====>>>>>> ', prev);

      const updated = prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id];

      console.log('updated selection ======>>>>> ', updated);

      return updated;
    });
  };

  const handleCompare = () => {
    if (selectedVariant.length > 4) {
      Alert.alert('you cannot comapre more than 4');
      return;
    }

    navigation.navigate('CompareVariants', {selectedVariantId: selectedVariant});
  };

  console.log(
    'allVariantsOfSelectedModel in model component ======>>>>>> ',
    allVariantsOfSelectedModel,
  );

  return (
    <View style={styles.container}>
      {/* ── Header row ── */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>
          Search Results Models ({allVariantsOfSelectedModel.length})
        </Text>

        {!compareVariants ? (
          <TouchableOpacity onPress={() => setCompareVariants(true)}>
            <Text style={styles.compareText}>Compare Variants</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {compareVariants ? (
        <>
          <FlatList
            data={allVariantsOfSelectedModel}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={styles.radioRow}
                  activeOpacity={1}
                  onPress={() => toggleVariant(item.id)}
                >
                  {/* <RadioButton
                    status={
                      selectedVariant.includes(item.id)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color="#ff1900"
                  /> */}

                  <RadioButton
                    status={
                      selectedVariant.includes(item.id)
                        ? 'checked'
                        : 'unchecked'
                    }
                    color="#ff1900"
                    onPress={() => toggleVariant(item.id)}
                  />

                  <View style={styles.radioTextBlock}>
                    <Text style={styles.radioVariantName}>{item.Variant}</Text>
                    <Text style={styles.radioSubText}>
                      Brand: {item.Brand} Model: {item.Model}
                    </Text>
                  </View>
                </TouchableOpacity>

                {index < allVariantsOfSelectedModel.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            )}
          />
          {selectedVariant.length === 0 ? (
            <TouchableOpacity
              style={[styles.compareBtn, styles.compareBtnDisabled]}
              disabled={true}
            >
              <Text style={styles.compareBtnText}>Compare</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.compareBtn}
              activeOpacity={0.7}
              onPress={handleCompare}
            >
              <Text style={styles.compareBtnText}>Compare</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <FlatList
          data={allVariantsOfSelectedModel}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.card}>
                {/* Left: model info */}
                <View style={styles.cardLeft}>
                  <Text style={styles.modelName}>{item.Model}</Text>
                  <Text style={styles.hpText}>
                    {item['Engine Power Range (HP)']} HP
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.viewVariants}>View Variants</Text>
                  </TouchableOpacity>
                </View>

                {/* Right: Sales Talk button */}
                <TouchableOpacity
                  style={styles.salesBtn}
                  onPress={() =>
                    navigation.navigate('TractorDetails', { tractor: item })
                  }
                >
                  <Text style={styles.salesBtnText}>See Details</Text>
                </TouchableOpacity>
              </View>

              {index < allVariantsOfSelectedModel.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ModelVariants;

const RED = '#ff1900';

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 13,
    color: '#888',
  },
  compareText: {
    fontSize: 13,
    color: RED,
    fontWeight: '500',
  },

  /* Card */
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardLeft: {
    flex: 1,
    gap: 3,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  hpText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  viewVariants: {
    fontSize: 13,
    color: RED,
    fontWeight: '500',
  },

  /* Sales Talk button */
  salesBtn: {
    borderWidth: 1.5,
    borderColor: RED,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },
  salesBtnText: {
    fontSize: 13,
    color: RED,
    fontWeight: '500',
  },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },

  /* Radio row */
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  radioTextBlock: {
    marginLeft: 12,
    flex: 1,
  },
  radioVariantName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  radioSubText: {
    fontSize: 12,
    color: '#888',
  },
  compareBtn: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: '#ff1900',
    alignItems: 'center',
  },

  compareBtnDisabled: {
    backgroundColor: '#f2a6a6',
  },

  compareBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  compareBtnTextDisabled: {
    color: '#ffe5e5',
  },
});
