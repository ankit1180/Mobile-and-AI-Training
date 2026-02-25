import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../assets/css/style';
import { tractorData } from '../Data/data';

export default function ModelPage({ onModelSelect, onSectionTouch }) {
  const [selectedModel, setSelectedModel] = useState(null);

  // Flatten all models
  const modelData = tractorData.flatMap(brand =>
    brand.models.map(model => ({
      label: model.modelName,
      value: model.modelName,
    })),
  );

  console.log('Modeldata.....', modelData);

  const handleChange = item => {
    setSelectedModel(item.value);

    const selectedModelObject = tractorData
      .flatMap(brand =>
        brand.models.map(model => ({ ...model, brand: brand.brand })),
      )
      .find(model => model.modelName === item.value);

    if (onModelSelect) {
      onModelSelect(selectedModelObject);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (onSectionTouch) {
          onSectionTouch(); // hide

          //set selected null
          setSelectedModel(null);
        }
      }}
    >
      <View style={styles.brandCard}>
        <Text style={styles.brandLabel}>Model</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={{ borderRadius: 8 }}
          data={modelData}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={selectedModel}
          onChange={handleChange}
          search
          searchPlaceholder="Search model"
          inputSearchStyle={{
            height: 40,
            fontSize: 14,
          }}
          placeholderStyle={{
            color: '#999',
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
