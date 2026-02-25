import React, { useState, Alert, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { tractorData } from '../Data/data';

export default function SelectTractorDrawer({ visible, onClose, onAdd }) {
  //const [brand, setBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // const brandData = tractorData.map(item => ({
  //   label: item.brand,
  //   value: item.brand,
  // }));

  // const selectedBrand = tractorData.find(b => b.brand === brand);

  const modelData = tractorData.flatMap(brand =>
    brand.models.map(model => ({
      label: model.modelName,
      value: model.modelName,
      brand: brand.brand,
    })),
  );

  const selectedModelObj = tractorData
    .flatMap(brand =>
      brand.models.map(model => ({
        ...model,
        brand: brand.brand,
      })),
    )
    .find(m => m.modelName === selectedModel);

  const variantData = selectedModelObj
    ? selectedModelObj.variants.map(v => ({
        label: v.variantName,
        value: v.variantName,
      }))
    : [];

  const handleAdd = () => {
    if (!selectedModelObj || !selectedVariant) {
      Alert.alert('Please select model and variant');
      return;
    }

    const variantObject = selectedModelObj.variants.find(
      v => v.variantName === selectedVariant,
    );

    onAdd({
      brand: selectedModelObj.brand,
      modelName: selectedModelObj.modelName,
      image: selectedModelObj.image,
      variants: selectedModelObj.variants,
      selectedVariant: variantObject.variantName,
    });

    onClose();
  };

  //for reset data for dropdown
  useEffect(() => {
    if (!visible) {
      setSelectedModel(null);
      setSelectedVariant(null);
    }
  });

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={drawerStyles.overlay}>
        <View style={drawerStyles.drawer}>
          <View style={drawerStyles.header}>
            <Text style={drawerStyles.title}>Select Tractor</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* <Dropdown
            style={drawerStyles.dropdown}
            data={brandData}
            labelField="label"
            valueField="value"
            placeholder="Select Brand"
            value={brand}
            onChange={item => {
              setBrand(item.value);
              setSelectedModel(null);
              setSelectedVariant(null);
            }}
          /> */}

          <Dropdown
            style={drawerStyles.dropdown}
            data={modelData}
            labelField="label"
            valueField="value"
            placeholder="Select Model"
            value={selectedModel}
            onChange={item => {
              setSelectedModel(item.value);
              setSelectedVariant(null);
            }}
            // disable={!brand}
          />

          <Dropdown
            style={drawerStyles.dropdown}
            data={variantData}
            labelField="label"
            valueField="value"
            placeholder="Select Variant"
            value={selectedVariant}
            onChange={item => setSelectedVariant(item.value)}
            disable={!selectedModel}
          />

          <TouchableOpacity style={drawerStyles.addButton} onPress={handleAdd}>
            <Text style={drawerStyles.addButtonText}>Add Tractor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const drawerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  addButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
