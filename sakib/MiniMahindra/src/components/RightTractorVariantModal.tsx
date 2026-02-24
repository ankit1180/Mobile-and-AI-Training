
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tractors from '../utils/Tractors.json';
import { Dropdown } from 'react-native-element-dropdown';

const RightTractorVariantModal = ({ rightTractorModal, onClose }) => {

  const [selectedHP, setSelectedHP] = useState(null);
  const [selectedProductHP, setSelectedProductHP] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedRearTyre, setSelectedRearTyre] = useState(null);
  const [selectedDrive, setSelectedDrive] = useState(null);


  const hpData = [...new Set(Tractors.map(t => t['Engine Power Range (HP)']))]
    .map(v => ({ label: v, value: v }));

    console.log('hpData =====>>>>> ', hpData);
    

  const productHpData = [...new Set(Tractors.map(t => t['Engine Power Range (kW)']))]
    .map(v => ({ label: v, value: v }));

  const brandData = [...new Set(Tractors.map(t => t.Brand))]
    .map(v => ({ label: v, value: v }));

  const modelData = useMemo(() => {
    if (!selectedBrand) return [];
    return [...new Set(Tractors.filter(t => t.Brand === selectedBrand) .map(t => t.Model))].map(v => ({ label: v, value: v }));
  }, [selectedBrand]);

  const variantData = useMemo(() => {
    if (!selectedModel) return [];
    return Tractors
      .filter(t => t.Model === selectedModel)
      .map(t => t.Variant)
      .map(v => ({ label: v, value: v }));
  }, [selectedModel]);

  const rearTyreData = useMemo(() => {
    if (!selectedVariant) return [];
    return [...new Set(
      Tractors
        .filter(t => t.Variant === selectedVariant)
        .map(t => t['Rear Tyre Size'])
    )].map(v => ({ label: v, value: v }));
  }, [selectedVariant]);

  const driveData = useMemo(() => {
    if (!selectedVariant) return [];
    return [...new Set(
      Tractors
        .filter(t => t.Variant === selectedVariant)
        .map(t => t['Drive Type'])
    )].map(v => ({ label: v, value: v }));
  }, [selectedVariant]);

  

  const renderDropdown = (label, data, value, setValue, placeholder, disabled=false) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, disabled && { backgroundColor: '#eee' }]}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.value}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        disable={disabled}
        onChange={item => setValue(item.value)}
      />
    </>
  );

  return (
    <Modal
      isVisible={rightTractorModal}
      onBackdropPress={onClose}
      backdropOpacity={0.4}
      style={styles.modal}
    >
      <View style={styles.container}>

       
        <View style={styles.header}>
          <Text style={styles.title}>Find Right Tractor Variant</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={22} color="#777" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

       
        <View style={styles.row}>
          <View style={styles.fieldLeft}>
            {renderDropdown('HP Category', hpData, selectedHP, setSelectedHP, 'Select')}
          </View>
          <View style={styles.fieldRight}>
            {renderDropdown('Product HP', productHpData, selectedProductHP, setSelectedProductHP, 'Select')}
          </View>
        </View>

        
 
        <View style={styles.margin}>
            {renderDropdown('Brand', brandData, selectedBrand, setSelectedBrand, 'Select Brand')}
        </View>
        

       

        <View style={styles.margin}>
        {renderDropdown('Model Group', modelData, selectedModel, setSelectedModel, 'Select Model', !selectedBrand)}

        </View>
        

        

        <View style={styles.margin}>
            {renderDropdown('Variant', variantData, selectedVariant, setSelectedVariant, 'Select Variant', !selectedModel)}
        </View>
        

        <View style={styles.row}>
          <View style={styles.fieldLeft}>
            {renderDropdown('Rear Tyre', rearTyreData, selectedRearTyre, setSelectedRearTyre, 'Select', !selectedVariant)}
          </View>
          <View style={styles.fieldRight}>
            {renderDropdown('Drive', driveData, selectedDrive, setSelectedDrive, 'Select', !selectedVariant)}
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

export default RightTractorVariantModal;





 const styles = StyleSheet.create({
  modal: { 
    justifyContent: 'flex-end', 
    margin: 0 
  },

  container: {
    backgroundColor: '#fff',
    padding: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { fontSize: 18, fontWeight: '600' },

  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
  },

  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },

  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },

  placeholder: { color: '#888', fontSize: 15 },
  value: { color: '#333', fontSize: 15 },

  list: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    maxHeight: 150,
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10
  },

  field: {
    flex: 1,
  },

  fieldLeft: {
    flex: 1,
    marginRight: 8,
  },

  fieldRight: {
    flex: 1,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
  marginTop: 25,
  backgroundColor: '#e30613',
  height: 48,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
margin:{
    margin: 10
}

});




