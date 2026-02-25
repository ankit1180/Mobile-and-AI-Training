import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CustomHeader from '../header/CustomHeader';
import { useRoute } from '@react-navigation/native';
import SelectTractorDrawer from '../components/SelectTractorDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function CompareDetailsScreen() {
  const [showDrawer, setShowDrawer] = useState(false);

  const route = useRoute();
  const { model, selectedVariants } = route.params;

  const [compareVariants, setCompareVariants] = useState(
    model.variants
      .filter(v => selectedVariants.includes(v.variantName))
      .map(v => ({
        ...v,
        brand: model.brand,
        image: model.image,
      })),
  );

  const topScrollRef = useRef(null);
  const rowScrollRefs = useRef([]);
  const isSyncing = useRef(false);

  // syncing function for scrolling
  const handleSyncScroll = (event, source) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const x = event.nativeEvent.contentOffset.x;
    if (source !== 'top') {
      topScrollRef.current?.scrollTo({ x, animated: false });
    }
    rowScrollRefs.current.forEach((ref, index) => {
      if (ref && source !== index) {
        ref.scrollTo({ x, animated: false });
      }
    });
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  };

  const minColumns = 2;
  const count = compareVariants.length;
  const totalColumns = Math.max(count, minColumns);

  //divide screen
  const columnWidth =
    totalColumns <= 3 ? screenWidth / totalColumns : screenWidth / 3;

  const cardVariant = [...compareVariants];

  // again show empty cards
  while (cardVariant.length < 2) {
    cardVariant.push(null);
  }

  const isLimitReached = compareVariants.length >= 4;

  const handleRemove = index => {
    const updated = [...compareVariants];
    updated.splice(index, 1);
    setCompareVariants(updated);
  };

  const handleAdd = tractor => {
    if (isLimitReached) {
      setShowDrawer(false);
      return;
    }

    const newVariant = tractor.variants.find(
      v => v.variantName === tractor.selectedVariant,
    );

    if (!newVariant) {
      setShowDrawer(false);
      return;
    }
    const newCompareItem = {
      ...newVariant,
      brand: tractor.brand,
      image: tractor.image,
    };

    console.log('newCompareItem', newCompareItem);

    setCompareVariants(prev => [...prev, newCompareItem]);
    setShowDrawer(false);
  };

  const splitTitle = title => {
    return title.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <CustomHeader title="Compare Models" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          ref={topScrollRef}
          horizontal={totalColumns > 3}
          showsHorizontalScrollIndicator={false}
          onScroll={e => handleSyncScroll(e, 'top')}
          scrollEventThrottle={16}
        >
          <View
            style={{
              flexDirection: 'row',
              width:
                totalColumns <= 3 ? screenWidth : totalColumns * columnWidth,
            }}
          >
            {cardVariant.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={[styles.topCard, { width: columnWidth }]}>
                  {item ? (
                    <>
                      <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => handleRemove(index)}
                      >
                        <Ionicons name="close-circle" size={26} color="#ccc" />
                      </TouchableOpacity>

                      <Image
                        source={item.image}
                        style={{ width: 120, height: 100 }}
                        resizeMode="contain"
                      />

                      <Text style={styles.modelName}>{item.variantName}</Text>
                      <Text style={styles.brandName}>Brand: {item.brand}</Text>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.emptyCard}
                      onPress={() => setShowDrawer(true)}
                    >
                      <Text style={styles.plus}>+</Text>
                      <Text style={{ color: '#aaa' }}>Add Tractor</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {index < cardVariant.length - 1 &&
                  cardVariant[index] &&
                  cardVariant[index + 1] && (
                    <View style={styles.vsBadge}>
                      <Text style={styles.vsText}>VS</Text>
                    </View>
                  )}
              </View>
            ))}
          </View>
        </ScrollView>

        {!isLimitReached && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowDrawer(true)}
          >
            <Text style={{ fontWeight: 'bold', color: '#777' }}>
              + Add Model
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.specTitle}>Tractors Specification</Text>

        <View style={styles.divider} />

        {Object.keys(compareVariants[0]?.specifications || {}).map(
          (key, rowIndex) => (
            <View key={rowIndex}>
              <Text style={styles.specHeading}>{splitTitle(key)}</Text>

              <ScrollView
                ref={ref => (rowScrollRefs.current[rowIndex] = ref)}
                horizontal={totalColumns > 3}
                showsHorizontalScrollIndicator={false}
                onScroll={e => handleSyncScroll(e, rowIndex)}
                scrollEventThrottle={16}
              >
                <View style={{ flexDirection: 'row' }}>
                  {cardVariant.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.specCell, { width: columnWidth }]}
                    >
                      <Text style={styles.specText}>
                        {item ? String(item.specifications[key]) : '-'}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          ),
        )}
      </ScrollView>
      {/* bottom drawer for adding tractor */}
      <SelectTractorDrawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        onAdd={handleAdd}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  topCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#ece5e5',
    height: 170,
    justifyContent: 'center',
  },

  modelName: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },

  brandName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
  },

  emptyCard: {
    height: 140,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },

  plus: {
    fontSize: 30,
    color: '#ccc',
  },

  addBtn: {
    borderWidth: 2,
    borderColor: '#cccbcb',
    padding: 10,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },

  specTitle: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },

  specHeading: {
    textAlign: 'center',
    backgroundColor: '#E0E0E0',
    padding: 8,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#8c8888',
    fontSize: 13,
  },

  divider: {
    height: 2,
    backgroundColor: '#bdbaba',
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },

  // dividerVertical: {
  //   height: '100%',
  //   backgroundColor: '#fff',
  // },

  specCell: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  specText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },

  vsBadge: {
    position: 'absolute',
    right: -15,
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    zIndex: 5,
  },

  vsText: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
  },

  closeBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  closeText: {
    color: '#777',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
