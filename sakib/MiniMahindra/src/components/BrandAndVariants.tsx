
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Tractors from '../utils/Tractors.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BrandAndVariants = ({ tractor }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  console.log('tractor in brand and variant ====>>>> ', tractor);

  const allVariants = Tractors.filter(t => t.Model === tractor.Model);

  console.log('allVariants in brand and variants =====>>>> ', allVariants);

  const showSpecification = id => {
    const tractId = id;
    console.log('tractId =====>>>> ', tractId);
    const pressedVariantsList = Tractors.find(t => t.id === tractId);
    console.log('pressedVariantsList =====>>>>> ', pressedVariantsList);
    setSelectedVariant(pressedVariantsList);
  };

 useEffect(() => {
  setSelectedVariant(allVariants[0] ?? null);
}, [tractor?.Model]);


  const specRows = selectedVariant
    ? [
        {
          label: 'Engine Power\nRange',
          value: selectedVariant['Engine Power Range (HP)'],
        },
        {
          label: 'Maximum Torque\n(Nm)',
          value: selectedVariant['Maximum Torque (Nm)'],
        },
        {
          label: 'Engine Cylinders',
          value: selectedVariant['Engine Cylinders'],
        },
        { 
          label: 'Drive Type', 
          value: selectedVariant['Drive Type'] 
        },
        { 
          label: 'Rated RPM (r/min)', 
          value: selectedVariant['Rated RPM'] 
        },
        { 
          label: 'Steering Type', 
          value: selectedVariant['Steering Type'] 
        },
        {
          label: 'Transmission\nType',
          value: selectedVariant['Transmission Type'],
        },
        { 
          label: 'Clutch Type', 
          value: selectedVariant['Clutch Type'] 
        },
        { 
          label: 'Number of Gears', 
          value: selectedVariant['Number of Gears'] 
        },
        { 
          label: 'Brake Type', 
          value: selectedVariant['Brake Type'] 
        },
        { 
          label: 'Rear Tyre Size', 
          value: selectedVariant['Rear Tyre Size'] 
        },
        {
          label: 'Hydraulics Lifting\nCapacity (kg)',
          value: selectedVariant['Hydraulics Lifting Capacity (kg)'],
        },
        { 
          label: 'PTO RPM', 
          value: selectedVariant['PTO RPM'] 
        },
        {
          label: 'Service Interval',
          value: selectedVariant['Service Interval'],
        },
      ].filter(r => r.value !== undefined && r.value !== null && r.value !== '')
    : [];

  return (
  <ScrollView style={styles.page}>
        

      <Image
              source={{uri: tractor.Image_URL}}
              style={styles.image}
          />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.modelName}>{tractor.model}</Text>
          <Text style={styles.brandLabel}>
            Brand:{' '}
            <Text style={styles.brandValue}>{tractor.brand || 'OJA'}</Text>
          </Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
         
          {/* <View style={styles.iconCircle} /> */}
          <Icon name='people' size={20}/>
            <Text style={styles.iconLabel}>Customer{'\n'}Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name='download' size={20}/>
            <Text style={styles.iconLabel}>Leaflet</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

     
      <View style={styles.variantsHeader}>
        <Text style={styles.variantsTitle}>Variants</Text>
        {/* <TouchableOpacity>
          <Text style={styles.compareLink}>Compare Variants</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        horizontal
        data={allVariants}
        style={styles.variantsList}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedVariant?.id === item.id;
          return (
            <TouchableOpacity
              onPress={() => showSpecification(item.id)}
              style={[
                styles.variantChip,
                isSelected && styles.variantChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.variantChipText,
                  isSelected && styles.variantChipTextSelected,
                ]}
              >
                {item.Variant}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.divider} />

      

     
      {selectedVariant && (
        <View style={styles.specsSection}>
          <Text style={styles.specsTitle}>Specifications</Text>
          <View style={styles.divider} />

          {specRows.map((row, index) => (
            <View
              key={index}
              style={[
                styles.specRow,
                index < specRows.length - 1 && styles.specRowBorder,
              ]}
            >
              <Text style={styles.specLabel}>{row.label}</Text>
              <Text style={styles.specValue}>{String(row.value)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
   
    
  );
};

export default BrandAndVariants;

const RED = '#ff1900';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
  width: '100%',
  height: 220,
  resizeMode: 'cover',
},

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerLeft: {
    flex: 1,
  },
  modelName: {
    fontSize: 18,
    fontWeight: '700',
    color: RED,
    marginBottom: 2,
  },
  brandLabel: {
    fontSize: 13,
    color: '#888',
  },
  brandValue: {
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    alignItems: 'center',
    width: 56,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8e8e8',
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 0,
    marginVertical: 8,
  },

  /* Variants */
  variantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  variantsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  compareLink: {
    fontSize: 13,
    color: RED,
    fontWeight: '500',
  },
  variantsList: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  variantChip: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  variantChipSelected: {
    borderColor: RED,
    backgroundColor: '#fff',
  },
  variantChipText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  variantChipTextSelected: {
    color: RED,
  },

  /* Specifications */
  specsSection: {
    paddingHorizontal: 0,
  },
  specsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  specRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specLabel: {
    flex: 1,
    fontSize: 13,
    color: '#888',
    lineHeight: 19,
  },
  specValue: {
    flex: 1,
    fontSize: 13,
    color: '#222',
    fontWeight: '400',
    lineHeight: 19,
  },
});
