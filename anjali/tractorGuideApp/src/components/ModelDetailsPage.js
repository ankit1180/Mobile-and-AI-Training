import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CompareVariants from './CompareVariants';

export default function ModelDetailsPage({ model, onBack, onCompare }) {
  const [compareVar, setCompareVar] = useState(false);
  const navigation = useNavigation();

  if (!model) return null;
  const countVariant = model?.variants?.length || 0;

  const renderVariant = ({ item }) => (
    <View style={styles.variantCard}>
      <View>
        <Text style={styles.variantTitle}>{item.variantName}</Text>
        <Text style={styles.engineName}>{item.specifications.enginePower}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {
              tractor: {
                modelName: model.modelName,
                brand: model.brand,
                image: model.image,
                variants: model.variants,
                selectedVariant: item.variantName,
              },
            })
          }
        >
          <Text style={styles.linkText}>View Variants</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() =>
          navigation.navigate('Details', {
            tractor: {
              modelName: model.modelName,
              brand: model.brand,
              image: model.image,
              variants: model.variants,
              selectedVariant: item.variantName,
            },
          })
        }
      >
        <Text style={styles.buttonText}>See Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.mainCard}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>
            Search Results Models{' '}
            <Text style={styles.countStyle}>{countVariant}</Text>
          </Text>

          {/* send all the variants with this model */}
          <TouchableOpacity
            onPress={
              () => setCompareVar(!compareVar)
              // onCompare();
            }
          >
            {/* for cancel and compare Model toggle */}
            <Text style={styles.compareText}>
              {compareVar ? 'Cancel' : 'Compare Models'}
            </Text>
          </TouchableOpacity>
        </View>

        <Image source={model.image} style={styles.modelImage} />

        {/* compare Variants component */}

        {compareVar && (
          <CompareVariants model={model} onBack={() => setCompareVar(false)} />
        )}

        {/* Scrollable Variant Section */}
        <View>
          {!compareVar && (
            <FlatList
              data={model.variants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderVariant}
              // divider card separation
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              // showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    marginTop: 16,
  },

  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
  },

  compareText: {
    fontSize: 12,
    color: '#e60023',
    fontWeight: 'bold',
  },

  modelImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },

  variantCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  engineName: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 12,
  },

  separator: {
    height: 2,
    backgroundColor: '#E0E0E0',
  },

  linkText: {
    fontSize: 12,
    marginTop: 4,
    color: 'red',
    fontWeight: 'bold',
  },

  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 2,
  },

  buttonText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  countStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
