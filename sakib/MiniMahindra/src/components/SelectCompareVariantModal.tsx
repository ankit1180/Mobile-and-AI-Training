
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tractors from '../utils/Tractors.json';
import { Dropdown } from 'react-native-element-dropdown';

const SelectCompareVariantModal = ({ visible, onClose, onSelectId , selectedIds = []}) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);

  const available = useMemo(
    () => Tractors.filter(t => !selectedIds.includes(Number(t.id))),
    [selectedIds],
  );

  const models = useMemo(() => [...new Set(Tractors.map(t => t.Model))], []);
  const variants = useMemo(
    () => Tractors.filter(t => t.Model === selectedModel).map(t => t.Variant),
    [selectedModel],
  );

   const modelOptions = models.map(m => ({ label: m, value: m }));
const variantOptions = variants.map(v => ({ label: v, value: v }));

  const selectedTractor = useMemo(
    () => Tractors.find(t => t.Model === selectedModel && t.Variant === selectedVariant),
    [selectedModel, selectedVariant],
  );

  return (
   <Modal
         isVisible={visible}
         onBackdropPress={onClose}
         style={styles.modal}
         backdropOpacity={0.4}
       >
         <View style={styles.container}>
           <View style={styles.header}>
             <Text style={styles.title}>Select Tractor</Text>
             <TouchableOpacity onPress={onClose}>
               <Icon name="close" size={22} color="#777" />
             </TouchableOpacity>
           </View>
   
           <View style={styles.divider} />
   
           

           <Text style={styles.label}>
  Model <Text style={styles.required}>*</Text>
</Text>

<Dropdown
  style={styles.dropdown}
  data={modelOptions}
  labelField="label"
  valueField="value"
  placeholder="Select Model"
  value={selectedModel}
  onChange={item => {
    setSelectedModel(item.value);
    setSelectedVariant(null); // keep same logic
  }}
/>

<Text style={[styles.label, { marginTop: 16 }]}>
  Variant <Text style={styles.required}>*</Text>
</Text>

<Dropdown
  style={styles.dropdown}
  data={variantOptions}
  labelField="label"
  valueField="value"
  placeholder="Select Variant"
  value={selectedVariant}
  disable={!selectedModel}
  onChange={item => {
    setSelectedVariant(item.value); // keep same logic
  }}
/>
   
           {/* <TouchableOpacity style={styles.button} on>
             <Text style={styles.buttonText}>Add Tractor</Text>
           </TouchableOpacity> */}
   
           <TouchableOpacity
             style={styles.button}
            onPress={() => {
            if (!selectedTractor) return;
            // onSelectId(selectedTractor.id);
            onSelectId(Number(selectedTractor.id));
            onClose();
          }}
           >
             <Text style={styles.buttonText}>Add Tractor</Text>
           </TouchableOpacity>
         </View>
       </Modal>
  );
};

export default SelectCompareVariantModal;





const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  container: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { 
    fontSize: 18, 
    fontWeight: '600' 
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
  },

  label: { 
    fontSize: 14, 
    color: '#444', 
    marginBottom: 6 
  },

  required: { 
    color: 'red' 
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

  placeholder: { 
    color: '#888', 
    fontSize: 15 
  },
  value: { 
    color: '#333', 
    fontSize: 15 
  },

  list: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    maxHeight: 120,
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  button: {
    marginTop: 26,
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
});
