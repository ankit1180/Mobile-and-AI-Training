import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import SelectTractorModal from './SelectTractorModal';

import Tractors from '../utils/Tractors.json';
import SelectCompareVariantModal from './SelectCompareVariantModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RED = '#ff1900';
const MAX_COMPARE = 4;
const CARD_W = 130;

const SPEC_ROWS = [
  { label: 'Engine Power Range', key: 'Engine Power Range (HP)' },
  { label: 'Maximum Torque (Nm)', key: 'Maximum Torque (Nm)' },
  { label: 'Engine Cylinders', key: 'Engine Cylinders' },
  { label: 'Rated RPM (r/min)', key: 'Rated RPM' },
  { label: 'Steering Type', key: 'Steering Type' },
  { label: 'Transmission Type', key: 'Transmission Type' },
  { label: 'Drive Type', key: 'Drive Type' },
  { label: 'Clutch Type', key: 'Clutch Type' },
  { label: 'Number of Gears', key: 'Number of Gears' },
  { label: 'Brake Type', key: 'Brake Type' },
  { label: 'Rear Tyre Size', key: 'Rear Tyre Size' },
];

type Tractor = (typeof Tractors)[number];

interface Props {
  selectedVariantId?: number[];
}

const CompareVariants: React.FC<Props> = ({
  selectedVariantId = [1, 2, 3],
}) => {
  //   const [selectedIds, setSelectedIds] = useState<number[]>(selectedVariantId);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    (selectedVariantId ?? []).map(Number),
  );
  const [addModalVisible, setAddModalVisible] = useState(false);

  const selected = useMemo(
    () => Tractors.filter(t => selectedIds.includes(t.id)),
    [selectedIds],
  );

  const canRemove = selected.length > 1;
  const canAdd = selectedIds.length < MAX_COMPARE;

  const removeVariant = (id: number) => {
    if (selectedIds.length <= 1) return;
    setSelectedIds(prev => prev.filter(v => v !== id));
  };

  const addVariant = (id: number) => {
    // const id = tractor.id;
    setSelectedIds(prev => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
    setAddModalVisible(false);
  };

  const headerRef = useRef<ScrollView | null>(null);
  const rowRefs = useRef<Array<ScrollView | null>>([]);
  const activeRow = useRef<number | null>(null);

  // const syncRows = (x: number, sourceIndex: number) => {
  //   rowRefs.current.forEach((ref, i) => {
  //     if (!ref || i === sourceIndex) return;
  //     ref.scrollTo({ x, animated: false });
  //   });
  // };

  const activeSource = useRef<'header' | number | null>(null);

  const syncFromHeader = (x: number) => {
    rowRefs.current.forEach(ref => ref?.scrollTo({ x, animated: false }));
  };

  const syncFromRow = (x: number, sourceRowIndex: number) => {
    headerRef.current?.scrollTo({ x, animated: false });
    rowRefs.current.forEach((ref, i) => {
      if (i === sourceRowIndex) return;
      ref?.scrollTo({ x, animated: false });
    });
  };

  // const syncRows = (x: number, sourceIndex: number) => {
  //   // sync all spec rows except source
  //   rowRefs.current.forEach((ref, i) => {
  //     if (!ref || i === sourceIndex) return;
  //     ref.scrollTo({ x, animated: false });
  //   });

  //   // sync top image row
  //   headerRef.current?.scrollTo({ x, animated: false });
  // };

  const screenWidth = Dimensions.get('window').width;
  const totalWidth = selected.length * CARD_W;
  const tableWidth = Math.max(totalWidth, screenWidth);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        style={styles.outerScroll}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
      >
        <View style={styles.stickyHeader}>
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            //scrollEnabled={false}
            ref={headerRef}
          > */}
          <ScrollView
            horizontal
            ref={headerRef}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScrollBeginDrag={() => {
              activeSource.current = 'header';
            }}
            onScroll={e => {
              if (activeSource.current !== 'header') return;
              const x = e.nativeEvent.contentOffset.x;
              syncFromHeader(x);
            }}
            onScrollEndDrag={() => {
              activeSource.current = null;
            }}
            onMomentumScrollEnd={() => {
              activeSource.current = null;
            }}
          >
            <View style={[styles.cardsRow, { width: totalWidth }]}>
              {selected.map((tractor, index) => (
                <View key={tractor.id} style={styles.card}>
                  {canRemove && (
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeVariant(tractor.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.removeBtnText}>✕</Text>
                    </TouchableOpacity>
                  )}

                  <Image
                    source={{ uri: tractor.Image_URL }}
                    style={styles.image}
                    resizeMode="stretch"
                  />
                  <Text style={styles.modelName}>{tractor.Model}</Text>
                  <Text style={styles.brandText}>
                    Variant: {tractor.Variant}
                  </Text>

                  {index < selected.length - 1 && (
                    <View style={styles.vsCircle}>
                      <Text style={styles.vsText}>VS</Text>
                    </View>
                  )}
                </View>
              ))}

              {selected.length === 1 && (
                <TouchableOpacity
                  style={styles.cardGrid}
                  activeOpacity={0.7}
                  onPress={() => setAddModalVisible(true)}
                >
                  <View style={styles.circle}>
                    <Icon name="add" size={26} color="#777" />
                  </View>
                  <Text style={styles.text}>Add Tractor</Text>
                </TouchableOpacity>
              )}

              <SelectCompareVariantModal
                visible={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                onSelectId={addVariant}
                selectedIds={selectedIds}
              />
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.addModelBtn, !canAdd && styles.addModelBtnDisabled]}
          onPress={() => {
            if (canAdd) setAddModalVisible(true);
          }}
          activeOpacity={canAdd ? 0.7 : 1}
        >
          <Text
            style={[
              styles.addModelText,
              !canAdd && styles.addModelTextDisabled,
            ]}
          >
            + Add Model
          </Text>
        </TouchableOpacity>

        <SelectCompareVariantModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
          onSelectId={addVariant}
          selectedIds={selectedIds}
        />

        <Text style={styles.specHeading}>Tractors Specification</Text>

        <View style={styles.divider} />

        

        {SPEC_ROWS.map((row, rowIndex) => (
          <View key={row.key} style={styles.specBlock}>
            <View style={styles.specLabelWrap}>
              <Text style={styles.specLabel}>{row.label}</Text>
            </View>

            <ScrollView
              horizontal
              ref={r => (rowRefs.current[rowIndex] = r)}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScrollBeginDrag={() => {
                activeSource.current = rowIndex;
              }}
              onScroll={e => {
                if (activeSource.current !== rowIndex) return;
                const x = e.nativeEvent.contentOffset.x;
                syncFromRow(x, rowIndex);
              }}
              onScrollEndDrag={() => {
                activeSource.current = null;
              }}
              onMomentumScrollEnd={() => {
                activeSource.current = null;
              }}
            >
              <View style={styles.specValuesRow}>
                {selected.map(tractor => (
                  <View
                    key={`${tractor.id}-${row.key}`}
                    style={styles.specValueCell}
                  >
                    <Text style={styles.specValue}>
                      {String(tractor[row.key] ?? '-')}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* ─── Add Model Modal ─── */}
      {/* <Modal
        transparent
        animationType="slide"
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
        statusBarTranslucent
      >
       
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setAddModalVisible(false)}
        >
          
          <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Model</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>

            {available.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyText}>No more models available</Text>
              </View>
            ) : (
              <FlatList
                data={available}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: Tractor }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => addVariant(item.id)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.modalItemTitle}>
                      {item.Model} — {item.Variant}
                    </Text>
                    <Text style={styles.modalItemSub}>Brand: {item.Brand}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.modalDivider} />}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal> */}
    </SafeAreaView>
  );
};

export default CompareVariants;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outerScroll: {
    flex: 1,
    backgroundColor: '#fff',
  },

  stickyHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  card: {
    width: CARD_W,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e6e6e6',
    paddingTop: 28,
    paddingHorizontal: 8,
    paddingBottom: 12,
    position: 'relative',
  },

  cardGrid: {
    width: CARD_W,
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    margin: 8,
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  text: {
    color: '#777',
    fontSize: 14,
  },

  // Remove button
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  removeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#555',
    lineHeight: 13,
  },

  // Tractor image
  image: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    marginBottom: 8,
  },

  // Model info
  modelName: {
    fontSize: 16,
    fontWeight: '800',
    color: RED,
    lineHeight: 20,
  },
  brandText: {
    marginTop: 3,
    fontSize: 12,
    color: '#666',
  },

  // VS badge
  vsCircle: {
    position: 'absolute',
    right: -13,
    top: 54,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  vsText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#666',
  },

  // ── Add Model button ──
  addModelBtn: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  addModelBtnDisabled: {
    borderColor: '#d0d0d0',
  },
  addModelText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  addModelTextDisabled: {
    color: '#bdbdbd',
  },

  // ── Spec section ──
  specHeading: {
    textAlign: 'center',
    color: RED,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  specBlock: {
    marginBottom: 2,
    //marginTop : 2
  },
  //   specLabelWrap: {
  //     backgroundColor: '#ebebeb',
  //     paddingVertical: 8,
  //     paddingHorizontal: 4,
  //   },
  //   specLabel: {
  //     textAlign: 'center',
  //     fontSize: 13,
  //     color: '#555',
  //     fontWeight: '600',
  //   },

  // specLabelWrap: {
  //   backgroundColor: '#ebebeb',
  //   paddingVertical: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center', // horizontal center
  // },
  // specLabel: {
  //   textAlign: 'center',
  //   alignSelf: 'center',
  //   fontSize: 13,
  //   color: '#555',
  //   fontWeight: '600',
  // },

  //   specValuesRow: {
  //     flexDirection: 'row',
  //   },

  specLabelWrap: {
    backgroundColor: '#ebebeb',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  specValuesRow: {
    flexDirection: 'row',
    justifyContent: 'center', // centers when only 1 card
  },

  specValueCell: {
    width: CARD_W,
    minHeight: 64,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  specValue: {
    fontSize: 13,
    lineHeight: 18,
    color: '#222',
    fontWeight: '700',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '72%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222',
  },
  modalClose: {
    fontSize: 14,
    fontWeight: '700',
    color: RED,
  },
  modalItem: {
    paddingVertical: 13,
  },
  modalItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  modalItemSub: {
    marginTop: 3,
    fontSize: 12,
    color: '#666',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  emptyWrap: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#aaa',
  },
  divider: {
    height: 1,
    backgroundColor: '#cfcfcf',
    marginVertical: 10,
    margin: 10,
  },
});
