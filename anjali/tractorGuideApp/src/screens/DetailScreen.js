import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../header/CustomHeader';
import { styles } from '../assets/css/detailsScreenStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DetailScreen() {
  //for importing data and navigation use
  const route = useRoute();
  const navigation = useNavigation();
  //destructuring of data
  const tractor = route.params?.tractor;
  if (!tractor) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    tractor.selectedVariant ?? tractor.variants?.[0]?.variantName,
  );
  const currentVariant = tractor.variants?.find(
    variant => variant.variantName === selectedVariant,
  );

  return (
    <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
      <CustomHeader title="Product Details" />

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={tractor.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* title card*/}
      <View style={styles.titleCard}>
        <View style={styles.titleSection}>
          <View style={styles.left}>
            <Text style={styles.titleName}>{tractor?.modelName}</Text>
            <Text style={styles.titleBrand}>{tractor?.brand}</Text>
          </View>

          <View style={styles.right}>
            <View style={styles.iconBox}>
              <View style={styles.iconCircle}>
                <Ionicons name="people-outline" size={18} color="#000" />
              </View>
              <Text style={styles.iconText}>Customer {'\n'}Near Me</Text>
            </View>

            <View style={styles.iconBox}>
              <View style={styles.iconCircle}>
                <Ionicons name="download-outline" size={18} color="#000" />
              </View>
              <Text style={styles.iconText}>Leaflet</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        {/* Variants section */}
        <View style={styles.variantHeader}>
          <Text style={styles.variantTitle}>Variants</Text>
          {/* go the compare varaints screen*/}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CompareDetailsScreen', {
                model: tractor,
                selectedVariants: [selectedVariant],
              })
            }
          >
            <Text style={styles.compareText}>Compare Variants</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {tractor.variants.map((variant, index) => {
            const isSelected = selectedVariant === variant.variantName;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedVariant(variant.variantName)}
                style={[styles.variant, isSelected && styles.selectedVariant]}
              >
                <Text
                  style={[
                    styles.variantText,
                    isSelected && styles.selectedVariantText,
                  ]}
                >
                  {variant.variantName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.specCard}>
        <Text style={styles.specTitle}>Specifications</Text>
        <View style={styles.divider} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {currentVariant &&
            Object.entries(currentVariant.specifications).map(
              ([key, value], index) => (
                <View key={index} style={styles.specRow}>
                  <Text style={styles.specLabel}>{key}</Text>
                  <Text style={styles.specValue}>{String(value)}</Text>
                </View>
              ),
            )}
        </ScrollView>
      </View>
    </View>
  );
}
